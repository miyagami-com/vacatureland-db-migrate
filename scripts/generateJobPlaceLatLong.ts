import { supabase } from "../src/supabase";
import type { Database } from "../types/supabase.db";
import fs from "node:fs/promises";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

type FetchInBatchesParams = {
  table: keyof Database["public"]["Tables"];
  select?: string;
  eq?: {
    [key: string]: string;
  }[];
  date?: string;
};

// status = 2 inactive (46k rows)

const fetchInBatches = async (params: FetchInBatchesParams) => {
  const { table, select = "*", eq, date } = params;
  const limit = 1000;
  const rows = [];

  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const query = supabase
      .from(table)
      .select(select)
      .range(offset, offset + limit - 1);

    if (eq) {
      eq.forEach((condition) => {
        query.eq(Object.keys(condition)[0], Object.values(condition)[0]);
      });
    }

    if (date) {
      query.gte("available_to", date).lte("available_from", date);
    }

    // eslint-disable-next-line no-await-in-loop
    const { data, error } = await query.throwOnError();

    if (error) {
      console.error("Error fetching:", (error as Error).message);

      return;
    }

    rows.push(...data);

    if (data.length < limit) {
      hasMore = false;
    } else {
      offset += limit;
      console.log("Fetched:", rows.length);
    }
  }

  return rows;
};

const getJobPostsFromJson = async () => {
  try {
    const jobPosts = await fs.readFile(
      `${import.meta.dirname}/jobPosts.json`,
      "utf-8"
    );

    return JSON.parse(jobPosts);
  } catch (error) {
    console.error("Error reading jobPosts.json:", error);
    return null;
  }
};

const jobPlacesToHaveNetherlandsLatLong = [
  "Landelijk",
  "Nederland",
  "Netherlands",
];

const generateJobPlaceLatLong = async () => {
  let jobPosts;

  const jobPostsFromJson = await getJobPostsFromJson();

  if (jobPostsFromJson) {
    jobPosts = jobPostsFromJson;
  } else {
    jobPosts = await fetchInBatches({
      table: "job_posts",
      date: new Date().toISOString(),
      eq: [{ status: "1" }],
      select: "id, job_place",
    });
  }

  // write jobPosts to a json file
  await fs.writeFile(
    `${import.meta.dirname}/jobPosts.json`,
    JSON.stringify(jobPosts, null, 2)
  );

  console.log(jobPosts.length);

  // eslint-disable-next-line no-restricted-syntax
  for (const jobPost of jobPosts) {
    const { id, job_place: jobPlace } = jobPost;

    console.log({ id, jobPlace });

    if (!jobPlace) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (jobPlacesToHaveNetherlandsLatLong.includes(jobPlace)) {
      // eslint-disable-next-line no-await-in-loop
      await supabase
        .from("job_posts")
        .update({
          job_place_lat: 52.1326,
          job_place_long: 5.2913,
        })
        .eq("id", id);

      // eslint-disable-next-line no-continue
      continue;
    }

    // check if there's lat lang already
    // eslint-disable-next-line no-await-in-loop
    const { data: jobPostData } = await supabase
      .from("job_posts")
      .select("job_place_lat, job_place_long")
      .eq("id", id)

      .single();

    if (jobPostData?.job_place_lat && jobPostData?.job_place_long) {
      console.log(
        "Already has lat long:",
        jobPostData?.job_place_lat,
        jobPostData?.job_place_long
      );

      // eslint-disable-next-line no-continue
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${jobPlace}&key=${GOOGLE_MAPS_API_KEY}`
    ).catch((error) => {
      throw new Error(error);
    });

    // eslint-disable-next-line no-await-in-loop
    const data = await response.json();

    console.log({ data });

    const { lat, lng } = data.results[0].geometry.location;

    console.log({ lat, lng });

    // eslint-disable-next-line no-await-in-loop
    const { error } = await supabase
      .from("job_posts")
      .update({
        job_place_lat: lat,
        job_place_long: lng,
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating job place:", error);
      return;
    }
  }
};

export default generateJobPlaceLatLong;
