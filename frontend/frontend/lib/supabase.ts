import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ywbtjjnfgvrybyuxixsv.supabase.co";
const supabaseKey = "sb_publishable_ToQc7aO0GkuPQEBaPK1PJA_yJLuaOhy";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);