import { supabase } from "../src/supabase";

export const resetIDSequeneces = async () => {
  const { error } = await supabase.rpc("reset_sequences");

  if (error) {
    console.error("Error resetting sequences:", error);
  } else {
    console.log("Sequences reset successfully");
  }
};
