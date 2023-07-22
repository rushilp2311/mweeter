import { createClient } from "@supabase/supabase-js";

console.log(process.env.NEXT_SUPABASE_URL);

const supabase = createClient(
  process.env.NEXT_SUPABASE_URL!,
  process.env.NEXT_SUPABASE_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

export { supabase };
