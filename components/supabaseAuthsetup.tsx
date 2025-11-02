// (This example is for React/Next.js)
import { useAuth } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

// Get your Supabase URL and Key from your .env file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const useSupabaseClient = () => {
  const { getToken } = useAuth();
  const [supabase, setSupabase] = useState<any | null>(null);

  useEffect(() => {
    if (getToken) {
      // This is the key part:
      // 1. Get the special "supabase" token from Clerk
      // 2. Create a new Supabase client
      // 3. Tell the client to get the token from Clerk
      const createClerkSupabaseClient = async () => {
        const token = await getToken({ template: "supabase" });
        
        const client = createClient(supabaseUrl, supabaseKey, {
          global: {
            // Set the Authorization header on every request
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        });
        setSupabase(client);
      };

      createClerkSupabaseClient();
    }
  }, [getToken]);

  return supabase;
};