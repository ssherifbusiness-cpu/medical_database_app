import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        "Your project's URL and Key are required to create a Supabase client! " +
        "Check your Supabase project's API settings: https://supabase.com/dashboard/project/_/settings/api"
    );
}

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) =>
    createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // Handled when called from Server Components.
                    // The `setAll` method may be called from a Server Component.
                    // This can be ignored if you have middleware refreshing user sessions.
                }
            },
        },
    });