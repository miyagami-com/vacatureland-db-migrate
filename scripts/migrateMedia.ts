import fs from "node:fs/promises";
import path from "node:path";
import { supabase } from "../src/supabase";

const migrateMedia = async () => {
  const folders = ["logos"];
  const batchSize = 100; // Adjust this value based on your needs

  // check if media directory exists

  const mediaDir = path.join(process.cwd(), "media");

  if (!(await fs.exists(mediaDir))) {
    console.error("Media directory does not exist");
    return;
  }

  // for each file in each folder in the media directory, upload to supabase in batches

  // eslint-disable-next-line no-restricted-syntax
  for (const folder of folders) {
    // eslint-disable-next-line no-await-in-loop
    const dirEnts = await fs.readdir(path.join(mediaDir, folder), {
      withFileTypes: true,
    });

    const filesAll = dirEnts
      .filter((dirEnt) => dirEnt.isFile())
      .map((file) => file.name)
      .reverse();

    // const files = filesAll

    const files = filesAll.slice(
      filesAll.findIndex((file) => file.startsWith("tmphnln1T"))
    );

    console.log(files.length, filesAll.length);

    // Process files in batches
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const uploadPromises = batch.map(async (file) => {
        const data = await fs.readFile(
          path.join(process.cwd(), "src/lib/scripts/media", folder, file)
        );

        console.log(`Uploading ${file} to ${folder} bucket`);

        const { error } = await supabase.storage
          .from(folder)
          .upload(file, data);

        if (error) {
          console.error(`Error uploading ${file}:`, error);
          console.log("\n\n");
        }
      });

      // eslint-disable-next-line no-await-in-loop
      await Promise.all(uploadPromises);
    }
  }

  // const { data: media, error } = await supabase.storage.from('').upload();
};

export default migrateMedia;
