import { createClient } from "@/utils/supabase/server";

// TODO: Maybe incorporate names into getPatient as well
// Read one single patient given id
export async function getPatient(id: number) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();

    return { data, error };
}

// Read the most recently created patient
export async function getMostRecentPatient() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

    return { data, error };
}

// Create a patient
export async function createPatient(
    firstName: string,
    lastName: string,
    medications: string
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("patients")
        .insert({
            firstName,
            lastName,
            medications,
        })
        .select()
        .single();

    return { data, error };
}

// update a patient's records
export async function updatePatient(
    id: number,
    updates: {
        firstName?: string;
        lastName?: string;
        medications?: string;
    }
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("patients")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    return { data, error };
}

// Deletes a patient given id
export async function deletePatient(id: number) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("patients")
        .delete()
        .eq("id", id);

    return { error }; // TODO: make this acc return something on success
}