import { supabase } from "../src/supabase";

export const resetIDSequeneces = async () => {
  await supabase.rpc("reset_sequences");
};
