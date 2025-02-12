import fs from "fs";
import { Client } from "pg";
import dotenv from "dotenv";
import { execSync } from "child_process";
import { select } from "@clack/prompts";
import { main as runFinalSQL } from "./getFinalSQL";
import migrateUsers from "../scripts/migrateUsers";
import migrateMedia from "../scripts/migrateMedia";
import generateJobPlaceLatLong from "../scripts/generateJobPlaceLatLong";

dotenv.config();

const migrationScripts = {
  "Migrate Users": migrateUsers,
  "Migrate Media": migrateMedia,
  "Generate Job Place Lat/Long": generateJobPlaceLatLong,
} as const;

async function runSQLMigration() {
  // Define table and column mappings
  const tableMapping: { [key: string]: string } = {
    accounts_customuser: "users",
    accounts_agencycompany: "employers",
    taggit_tag: "tags2",
    jobs_joboffer: "job_posts",
    jobs_taggedjoboffer: "job_posts_tags",
    links_link: "whitelabels",
    links_linkgroup: "whitelabel_groups",
    core_subdomainconfiguration: "whitelabel_themes",
    newsletter_newsletterhistoryentry: "newsletter_history",
    newsletter_subscriber: "newsletter_subscribers",
    search_savedquery: "job_alerts",
    orders_paymentrequest: "orders_paymentrequest",
  };

  const columnMapping: {
    [tableName: string]: { [oldColumn: string]: string };
  } = {
    employers: {
      employer_id: "user_id",
    },
  };

  // Helper function to run shell commands synchronously.
  function runShellCommand(command: string) {
    try {
      console.log(`> ${command}`);
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      console.error(`Error executing command: ${command}`);
      console.error(error);
      process.exit(1);
    }
  }

  // Step 0. Ensure that the dump file exists.
  const dumpFile = "database.dump";
  if (!fs.existsSync(dumpFile)) {
    console.error(
      `Dump file "${dumpFile}" not found. Please ensure it is in the project root.`
    );
    process.exit(1);
  }

  // Step 1. Drop and recreate the target database
  console.log("Dropping and recreating database 'vacatureland-old'...");
  runShellCommand("dropdb --if-exists vacatureland-old");
  runShellCommand("createdb vacatureland-old");

  // Step 2. Restore the dump
  console.log("Restoring dump file into 'vacatureland-old' database...");
  runShellCommand(
    `pg_restore --no-owner --clean --if-exists -d vacatureland-old ${dumpFile}`
  );

  // Step 3. Dump original data for backup
  console.log("Dumping original data to 'original_data.sql'...");
  runShellCommand("pg_dump vacatureland-old -f original_data.sql");

  // Step 4. Build migration queries
  const migrationQueries: string[] = [];

  for (const [oldTable, newTable] of Object.entries(tableMapping)) {
    if (oldTable !== newTable) {
      migrationQueries.push(`ALTER TABLE ${oldTable} RENAME TO ${newTable};`);
    } else {
      console.log(
        `Skipping renaming of table '${oldTable}' as no change is needed.`
      );
    }
  }

  for (const [table, columns] of Object.entries(columnMapping)) {
    for (const [oldCol, newCol] of Object.entries(columns)) {
      migrationQueries.push(
        `ALTER TABLE ${table} RENAME COLUMN ${oldCol} TO ${newCol};`
      );
    }
  }

  const migrationSQL = migrationQueries.join("\n");
  const migrationSQLFile = "vacatureland-old-mapped.sql";
  fs.writeFileSync(migrationSQLFile, migrationSQL, "utf8");
  console.log(`Migration SQL commands written to "${migrationSQLFile}".`);

  // Step 5. Execute the migration queries
  const client = new Client({
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    port: Number(process.env.PGPORT) || 5432,
    database: "vacatureland-old",
  });

  try {
    await client.connect();
    console.log("Connected to 'vacatureland-old' database.");

    for (const query of migrationQueries) {
      console.log(`Executing: ${query}`);
      await client.query(query);
    }
    console.log("All migration queries executed successfully.");
  } catch (error) {
    console.error("Error executing migration queries:", error);
    process.exit(1);
  } finally {
    await client.end();
  }

  // Step 6. Dump the transformed database
  console.log("Dumping migrated data to 'cleaned_data.sql'...");
  runShellCommand("pg_dump vacatureland-old -f cleaned_data.sql");
  console.log("Database migration completed successfully.");

  await runFinalSQL();
  console.log("getFinalSQL completed. Final database migration finished.");
}

async function main() {
  console.log("Welcome to Vacatureland Migration Tool\n");

  const choice = await select({
    message: "What would you like to do?",
    options: [
      { label: "Run SQL Migration", value: "sql" },
      { label: "Migrate Users", value: "users" },
      { label: "Migrate Media", value: "media" },
      { label: "Generate Job Place Lat/Long", value: "job-places" },
    ],
  });

  if (!choice) {
    console.log("No option selected. Exiting...");
    process.exit(0);
  }

  try {
    if (choice === "sql") {
      await runSQLMigration();
    } else {
      const scriptMap = {
        users: "Migrate Users",
        media: "Migrate Media",
        "job-places": "Generate Job Place Lat/Long",
      } as const;

      const scriptName = scriptMap[choice as keyof typeof scriptMap];
      console.log(`\nRunning ${scriptName}...\n`);
      await migrationScripts[scriptName]();
    }
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
