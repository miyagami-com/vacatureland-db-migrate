import fs from "fs";
import { Client } from "pg";
import dotenv from "dotenv";
import { execSync } from "child_process";

dotenv.config(); // Load environment variables from .env

// Define table and column mappings
const tableMapping: { [key: string]: string } = {
  accounts_customuser: "users",
  accounts_agencycompany: "employers",
  taggit_tag: "tags2",
  // jobs_hierarchicaltag: "jobs_hierarchicaltag",
  jobs_joboffer: "job_posts",
  jobs_taggedjoboffer: "job_posts_tags",
  links_link: "whitelabels",
  links_linkgroup: "whitelabel_groups",
  core_subdomainconfiguration: "whitelabel_themes",
  newsletter_newsletterhistoryentry: "newsletter_history",
  newsletter_subscriber: "newsletter_subscribers",
  search_savedquery: "job_alerts",
  // orders_order: "orders_order",
  orders_paymentrequest: "orders_paymentrequest",
};

const columnMapping: { [tableName: string]: { [oldColumn: string]: string } } =
  {
    employers: {
      employer_id: "user_id",
    },
    // orders_order: {
    //   user_id: "employer_id",
    // },
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

// Step 1. Drop and recreate the target database to start with a clean slate.
console.log("Dropping and recreating database 'vacatureland-old'...");
runShellCommand("dropdb --if-exists vacatureland-old");
runShellCommand("createdb vacatureland-old");

// Step 2. Restore the dump using pg_restore.
// The --no-owner flag prevents changing object ownership to roles (e.g. 'vluser') that don't exist locally.
console.log("Restoring dump file into 'vacatureland-old' database...");
runShellCommand(
  `pg_restore --no-owner --clean --if-exists -d vacatureland-old ${dumpFile}`
);

// (Optional) Step 3. Dump original data for backup.
console.log("Dumping original data to 'original_data.sql'...");
runShellCommand("pg_dump vacatureland-old -f original_data.sql");

// Step 4. Build migration queries to rename tables and columns.
const migrationQueries: string[] = [];

// Generate table-renaming commands.
// Skip renaming if the target name equals the source name.
for (const [oldTable, newTable] of Object.entries(tableMapping)) {
  if (oldTable !== newTable) {
    migrationQueries.push(`ALTER TABLE ${oldTable} RENAME TO ${newTable};`);
  } else {
    console.log(
      `Skipping renaming of table '${oldTable}' as no change is needed.`
    );
  }
}

// Generate column-renaming commands.
for (const [table, columns] of Object.entries(columnMapping)) {
  for (const [oldCol, newCol] of Object.entries(columns)) {
    migrationQueries.push(
      `ALTER TABLE ${table} RENAME COLUMN ${oldCol} TO ${newCol};`
    );
  }
}

// Write migration queries to a SQL file for record.
const migrationSQL = migrationQueries.join("\n");
const migrationSQLFile = "vacatureland-old-mapped.sql";
fs.writeFileSync(migrationSQLFile, migrationSQL, "utf8");
console.log(`Migration SQL commands written to "${migrationSQLFile}".`);

// Step 5. Execute the migration queries on the database.
async function runMigrations() {
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

    // Execute each migration query sequentially.
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
}

runMigrations().then(() => {
  // Step 6. Dump the transformed (cleaned) database into an SQL file.
  console.log("Dumping migrated data to 'cleaned_data.sql'...");
  runShellCommand("pg_dump vacatureland-old -f cleaned_data.sql");
  console.log("Database migration completed successfully.");
});
