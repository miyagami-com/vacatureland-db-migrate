// import { supabase } from "./supabase";

// const TABLES_TO_EXCLUDE_IN_TRUNCATION = ["whitelabel_themes"];

// const getAllTables = async () => {
//   const { data, error } = await supabase.rpc("get_all_public_table_names");
//   console.log(data);
//   return data?.map((table) => table.table_name) ?? [];
// };

// const truncateTable = async (tableName: string) => {
//   const { data, error } = await supabase
//     .from(tableName as any)
//     .delete()
//     .neq("id", -1);

//   console.log(data);
// };

// const truncateAllTables = async () => {
//   const tables = await getAllTables();
//   for (const table of tables) {
//     if (TABLES_TO_EXCLUDE_IN_TRUNCATION.includes(table)) {
//       continue;
//     }
//     await truncateTable(table);
//   }
// };

// truncateAllTables();
