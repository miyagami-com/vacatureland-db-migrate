import fs from "fs";
import { Client } from "pg";
import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

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

// Helper function to safely quote SQL identifiers.
function quoteIdentifier(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

// Helper function to ensure a sequence exists, based on a default value.
// It extracts the sequence name from expressions like:
//   nextval('job_post_questions_id_seq'::regclass)
async function ensureSequenceExists(
  client: Client,
  defaultVal: string
): Promise<void> {
  const match = /nextval\('([^']+)'::regclass\)/.exec(defaultVal);
  if (match) {
    const seqName = match[1];
    const sql = `CREATE SEQUENCE IF NOT EXISTS ${quoteIdentifier(seqName)};`;
    console.log(`Ensuring sequence ${seqName} exists with SQL: ${sql}`);
    await client.query(sql);
  }
}

/**
 * Processes the user-defined enums from user_defined_cols.json.
 * It groups the enum values by enum_name and builds a mapping from table/column
 * to the proper enum type name.
 * It then checks if the enum type exists in PG, and if not, creates it.
 *
 * Returns a mapping object: { [tableName]: { [columnName]: enumType } }
 */
async function processUserDefinedEnums(
  client: Client
): Promise<{ [tableName: string]: { [columnName: string]: string } }> {
  let userDefined: any[];
  try {
    const userDefinedStr = fs.readFileSync("user_defined_cols.json", "utf8");
    userDefined = JSON.parse(userDefinedStr);
  } catch (err) {
    console.error("Error reading user_defined_cols.json", err);
    process.exit(1);
  }

  const enumMapping: { [tableName: string]: { [columnName: string]: string } } =
    {};
  const enumValues: { [enumName: string]: Set<string> } = {};
  userDefined.forEach((entry: any) => {
    const table = entry.table_name;
    const column = entry.column_name;
    const enumName = entry.enum_name;
    const enumValue = entry.enum_value;
    if (!enumMapping[table]) {
      enumMapping[table] = {};
    }
    if (enumMapping[table][column] && enumMapping[table][column] !== enumName) {
      console.warn(
        `Conflicting enum names for ${table}.${column}: ${enumMapping[table][column]} vs ${enumName}`
      );
    } else {
      enumMapping[table][column] = enumName;
    }
    if (!enumValues[enumName]) {
      enumValues[enumName] = new Set();
    }
    enumValues[enumName].add(enumValue);
  });

  // For each enum type, check if it exists in PG, and if not, create it.
  for (const enumName in enumValues) {
    const res = await client.query("SELECT 1 FROM pg_type WHERE typname = $1", [
      enumName,
    ]);
    if (res.rowCount === 0) {
      const valuesArray = Array.from(enumValues[enumName]);
      const valuesList = valuesArray.map((val) => `'${val}'`).join(", ");
      const createEnumSQL = `CREATE TYPE ${enumName} AS ENUM (${valuesList});`;
      console.log(
        `Creating enum type '${enumName}' with SQL: ${createEnumSQL}`
      );
      await client.query(createEnumSQL);
    } else {
      console.log(`Enum type '${enumName}' already exists.`);
    }
  }
  return enumMapping;
}

/**
 * Reads array_columns.json and builds a mapping for array columns.
 * For each record it maps table and column to an effective data type.
 * For example, if udt_name is "_text", it returns "text[]" for that column.
 */
function getArrayColumnsMapping(): {
  [tableName: string]: { [columnName: string]: string };
} {
  let arrData: any[];
  try {
    const arrStr = fs.readFileSync("array_columns.json", "utf8");
    arrData = JSON.parse(arrStr);
  } catch (err) {
    console.error("Error reading array_columns.json", err);
    return {};
  }

  const mapping: { [tableName: string]: { [columnName: string]: string } } = {};
  for (const row of arrData) {
    const table = row.table_name;
    const column = row.column_name;
    let effectiveArrayType: string;
    if (row.udt_name && row.udt_name.startsWith("_")) {
      effectiveArrayType = row.udt_name.substring(1) + "[]";
    } else {
      effectiveArrayType = "text[]";
    }
    if (!mapping[table]) {
      mapping[table] = {};
    }
    mapping[table][column] = effectiveArrayType;
  }
  return mapping;
}

export async function main() {
  console.log("Setting up database 'vacatureland-final'...");
  runShellCommand("dropdb --if-exists vacatureland-final");
  runShellCommand("createdb vacatureland-final");

  if (fs.existsSync("cleaned_data.sql")) {
    console.log(
      "Restoring cleaned_data.sql into 'vacatureland-final' database..."
    );
    runShellCommand("psql vacatureland-final -f cleaned_data.sql");
  } else {
    console.log(
      "cleaned_data.sql does not exist. Proceeding with an empty 'vacatureland-final' database."
    );
  }

  console.log("Reading final_db_goal.json...");
  let finalDbGoal: any[];
  try {
    const finalDbGoalStr = fs.readFileSync("final_db_goal.json", "utf8");
    finalDbGoal = JSON.parse(finalDbGoalStr);
  } catch (err) {
    console.error("Error reading or parsing final_db_goal.json:", err);
    process.exit(1);
  }

  const tableDefs: { [tableName: string]: any[] } = {};
  for (const colDef of finalDbGoal) {
    const tableName = colDef.table_name;
    if (!tableDefs[tableName]) {
      tableDefs[tableName] = [];
    }
    tableDefs[tableName].push(colDef);
  }

  const client = new Client({
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    port: Number(process.env.PGPORT) || 5432,
    database: "vacatureland-final",
  });
  await client.connect();
  console.log("Connected to 'vacatureland-final'.");

  const enumMapping = await processUserDefinedEnums(client);
  const arrayMapping = getArrayColumnsMapping();

  // For each table defined in final_db_goal.json, create or update the schema
  for (const [tableName, columns] of Object.entries(tableDefs)) {
    const tableExistsRes = await client.query(
      "SELECT to_regclass($1) as regclass",
      [`public.${tableName}`]
    );
    const tableExists = tableExistsRes.rows[0].regclass !== null;

    if (!tableExists) {
      console.log(`Table '${tableName}' does not exist. Creating table...`);

      // Ensure sequences exist for any default values that call nextval(...)
      for (const col of columns) {
        if (col.column_default && col.column_default.includes("nextval")) {
          await ensureSequenceExists(client, col.column_default);
        }
      }

      const colDefs = columns
        .map((col: any) => {
          let effectiveType = col.data_type;
          if (effectiveType.toUpperCase() === "USER-DEFINED") {
            if (
              enumMapping[tableName] &&
              enumMapping[tableName][col.column_name]
            ) {
              effectiveType = enumMapping[tableName][col.column_name];
            } else {
              console.log(
                `No enum mapping found for column '${col.column_name}' in table '${tableName}', converting to text.`
              );
              effectiveType = "text";
            }
          } else if (effectiveType.toUpperCase() === "ARRAY") {
            if (
              arrayMapping[tableName] &&
              arrayMapping[tableName][col.column_name]
            ) {
              effectiveType = arrayMapping[tableName][col.column_name];
            } else {
              console.log(
                `No array mapping found for column '${col.column_name}' in table '${tableName}', converting to text[].`
              );
              effectiveType = "text[]";
            }
          }
          let line = `${quoteIdentifier(col.column_name)} ${effectiveType}`;
          if (col.is_nullable === "NO") {
            line += " NOT NULL";
          }
          if (col.column_default !== null) {
            line += ` DEFAULT ${col.column_default}`;
          }
          return line;
        })
        .join(",\n  ");
      const createTableSQL = `CREATE TABLE ${quoteIdentifier(
        tableName
      )} (\n  ${colDefs}\n);`;
      console.log(`Creating table '${tableName}' with SQL:\n${createTableSQL}`);
      await client.query(createTableSQL);
    } else {
      console.log(`Table '${tableName}' exists. Verifying columns...`);
      // For each column, if it is missing, add it via ALTER TABLE.
      for (const col of columns) {
        const colRes = await client.query(
          `SELECT column_name 
           FROM information_schema.columns 
           WHERE table_schema = 'public' 
             AND table_name = $1 
             AND column_name = $2`,
          [tableName, col.column_name]
        );
        if (colRes.rowCount === 0) {
          console.log(
            `Column '${col.column_name}' is missing in table '${tableName}'. Adding column...`
          );
          if (col.column_default && col.column_default.includes("nextval")) {
            await ensureSequenceExists(client, col.column_default);
          }
          let effectiveType = col.data_type;
          if (effectiveType.toUpperCase() === "USER-DEFINED") {
            if (
              enumMapping[tableName] &&
              enumMapping[tableName][col.column_name]
            ) {
              effectiveType = enumMapping[tableName][col.column_name];
            } else {
              console.log(
                `No enum mapping found for column '${col.column_name}' in table '${tableName}', converting to text.`
              );
              effectiveType = "text";
            }
          } else if (effectiveType.toUpperCase() === "ARRAY") {
            if (
              arrayMapping[tableName] &&
              arrayMapping[tableName][col.column_name]
            ) {
              effectiveType = arrayMapping[tableName][col.column_name];
            } else {
              console.log(
                `No array mapping found for column '${col.column_name}' in table '${tableName}', converting to text[].`
              );
              effectiveType = "text[]";
            }
          }
          let addColSQL = `ALTER TABLE ${quoteIdentifier(
            tableName
          )} ADD COLUMN ${quoteIdentifier(col.column_name)} ${effectiveType}`;
          if (col.is_nullable === "NO") {
            addColSQL += " NOT NULL";
          }
          if (col.column_default !== null) {
            addColSQL += ` DEFAULT ${col.column_default}`;
          }
          addColSQL += ";";
          console.log(`Executing: ${addColSQL}`);
          await client.query(addColSQL);
        } else {
          console.log(
            `Column '${col.column_name}' already exists in table '${tableName}'.`
          );
        }
      }
    }
  }

  await client.end();
  console.log("Database schema adjustments completed.");

  console.log("Dumping the final database schema to 'final_data.sql'...");
  runShellCommand("pg_dump vacatureland-final -f final_data.sql");
  console.log("Final database dump created as 'final_data.sql'.");

  console.log(
    "Dumping the final data (COPY commands) to 'final_data_inserts.sql'..."
  );
  runShellCommand(
    "pg_dump --data-only vacatureland-final -f final_data_inserts.sql"
  );
  console.log(
    "Final data dump (using COPY) created as 'final_data_inserts.sql'."
  );
}

if (require.main === module) {
  main().catch((err) => {
    console.error("Error in getFinalSQL script:", err);
    process.exit(1);
  });
}
