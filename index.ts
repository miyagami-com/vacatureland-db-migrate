import { Client } from "pg";
import dotenv from "dotenv";
import { execSync } from "child_process";

dotenv.config(); // Load environment variables from .env

// Define table and column mappings
const tableMapping: { [key: string]: string } = {
  accounts_customuser: "users",
  accounts_agencycompany: "employers",
  taggit_tag: "tags2",
  jobs_hierarchicaltag: "jobs_hierarchicaltag",
  jobs_joboffer: "job_posts",
  jobs_taggedjoboffer: "job_posts_tags",
  links_link: "whitelabels",
  links_linkgroup: "whitelabel_groups",
  core_subdomainconfiguration: "whitelabel_themes",
  newsletter_newsletterhistoryentry: "newsletter_history",
  newsletter_subscriber: "newsletter_subscribers",
  search_savedquery: "job_alerts",
  orders_order: "orders_order",
  orders_paymentrequest: "orders_paymentrequest",
};

const columnMapping: { [tableName: string]: { [oldColumn: string]: string } } =
  {
    accounts_agencycompany: {
      employer_id: "user_id",
    },
    orders_order: {
      user_id: "employer_id",
    },
  };

async function migrateData() {
  // check if vacatureland-old exists
  // if not, create it from ./database.dump

  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "vacatureland-old",
    password: "postgres",
    port: 5432,
  });

  await client.connect().catch(async (err) => {
    console.log("Error connecting to vacatureland-old:", err);
    // create it from ./database.dump

    const pgClient = new Client({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "postgres",
      port: 5432,
    });

    await pgClient.connect();
    await pgClient.query('CREATE DATABASE "vacatureland-old"');
    await pgClient.end();

    execSync(
      `pg_restore -U postgres -h localhost -p 5432 -d "vacatureland-old" ./database.dump`
    );
  });

  // Step 1: Create 'vacatureland-old-mapped' database using client.query
  try {
    console.log("Creating database 'vacatureland-old-mapped'...");
    await client.query('CREATE DATABASE "vacatureland-old-mapped"');
    console.log("Database 'vacatureland-old-mapped' created successfully.");
  } catch (err) {
    console.log("Database already exists or error creating database:", err);
  }

  // Step 2: Dump schema and data from 'vacatureland-old'
  console.log("Dumping schema and data from 'vacatureland-old'...");
  try {
    execSync(
      'pg_dump -U postgres -h localhost -p 5432 -F c -b -v -f "vacatureland-old.dump" "vacatureland-old"'
    );
    console.log("Schema and data dump completed.");
  } catch (err) {
    console.log("Error during dump:", err);
  }

  // Step 3: Restore the dump into 'vacatureland-old-mapped'
  console.log("Restoring dump into 'vacatureland-old-mapped'...");
  try {
    execSync(
      'pg_restore -U postgres -h localhost -p 5432 -d "vacatureland-old-mapped" -v "vacatureland-old.dump"'
    );
    console.log("Restore completed.");
  } catch (err) {
    console.log("Error during restore:", err);
  }

  client.end();

  const clientMapped = new Client({
    user: "postgres",
    host: "localhost",
    database: "vacatureland-old-mapped",
    password: "postgres",
    port: 5432,
  });

  await clientMapped.connect();

  // Step 4: Apply table and column mapping changes
  console.log("Applying table and column mapping changes...");
  for (const oldTable in tableMapping) {
    const newTable = tableMapping[oldTable];
    try {
      console.log(`Renaming table ${oldTable} to ${newTable}...`);
      await clientMapped.query(
        `ALTER TABLE "${oldTable}" RENAME TO "${newTable}"`
      );
      console.log(`Table ${oldTable} renamed to ${newTable}`);

      // Apply column renaming if any
      const columnMap = columnMapping[oldTable] || {};
      for (const oldColumn in columnMap) {
        const newColumn = columnMap[oldColumn];
        try {
          console.log(
            `Renaming column ${oldColumn} to ${newColumn} in table ${newTable}...`
          );
          await clientMapped.query(
            `ALTER TABLE "${newTable}" RENAME COLUMN "${oldColumn}" TO "${newColumn}"`
          );
          console.log(`Column ${oldColumn} renamed to ${newColumn}`);
        } catch (err) {
          if (err instanceof Error) {
            console.log(`Error renaming column ${oldColumn}:`, err.message);
          } else {
            console.log(`Error renaming column ${oldColumn}:`, err);
          }
        }
      }
    } catch (err) {
      console.log(`Error renaming table ${oldTable}:`, (err as Error).message);
    }
  }

  // Step 5: Delete all tables that aren't in our mapping
  console.log("Cleaning up unused tables...");
  try {
    // Get all tables in the database
    const tablesResult = await clientMapped.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
    `);

    // Create a set of tables we want to keep (the keys from tableMapping)
    const tablesToKeep = new Set(Object.values(tableMapping));

    // Delete tables that aren't in our mapping
    for (const row of tablesResult.rows) {
      const tableName = row.tablename;
      if (!tablesToKeep.has(tableName)) {
        console.log(`Dropping table: ${tableName}`);
        await clientMapped.query(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);
      }
    }
    console.log("Cleanup completed successfully");
  } catch (err) {
    console.log("Error during cleanup:", (err as Error).message);
  }

  // Create dump of original database before any changes
  console.log("Creating dump of original database...");
  try {
    execSync(
      "pg_dump -U postgres -h localhost -p 5432 --data-only " +
        "--no-owner --no-privileges " +
        '-f "original_data.sql" "vacatureland-old"'
    );

    // Fix NULL values in the original dump file
    if (process.platform === "darwin") {
      execSync("sed -i '' 's/\\\\N/NULL/g' original_data.sql");
    } else {
      execSync("sed -i 's/\\\\N/NULL/g' original_data.sql");
    }

    console.log(
      "Original database dump created successfully as 'original_data.sql'"
    );
  } catch (err) {
    console.log(
      "Error creating original database dump:",
      (err as Error).message
    );
  }

  // Step 6: Create final SQL dump of cleaned database
  console.log("Creating final SQL dump of cleaned database...");
  try {
    // Then append the data dump using COPY statements
    execSync(
      "pg_dump -U postgres -h localhost -p 5432 --data-only " +
        "--no-owner --no-privileges " +
        "--column-inserts " +
        '-a >> cleaned_data.sql "vacatureland-old-mapped"'
    );

    console.log("Final SQL dump created successfully as 'cleaned_data.sql'");
  } catch (err) {
    console.log("Error creating final SQL dump:", (err as Error).message);
  }

  // Fix NULL values in the dump file with cross-platform compatible sed
  console.log("Modifying NULL representations in the dump file...");
  try {
    if (process.platform === "darwin") {
      // macOS version
      execSync("sed -i '' 's/\\\\N/NULL/g' cleaned_data.sql");
    } else {
      // Linux version
      execSync("sed -i 's/\\\\N/NULL/g' cleaned_data.sql");
    }
    console.log("NULL values updated successfully");
  } catch (err) {
    console.log("Error updating NULL values:", (err as Error).message);
  }

  await clientMapped.end();
}

migrateData().catch((err) => console.error("Migration error:", err.message));
