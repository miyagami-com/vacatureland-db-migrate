import { supabase } from "../src/supabase";

const migrateUsers = async () => {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching users:", error.message);
    return;
  }

  console.log("Fetched user length:", users.length);

  for (const user of users) {
    const { email } = user;

    const {
      data: { user: createdUser },
      error,
    } = await supabase.auth.admin.createUser({
      // TODO:
      email: email,
      password: "_",
    });

    if (error) {
      console.error("Error creating user:", error);
      return;
    }

    console.log("Created user:", createdUser);
    break;
  }
};

export default migrateUsers;
