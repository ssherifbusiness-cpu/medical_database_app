// This is a page designed to use the CRUD features found in utils/supabase/CRUD.ts
// to test whether or not the database connection and RLS is functioning as expected

import {
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
} from "@/utils/supabase/crud";

export default async function CrudTestPage() {
    // C
    const created = await createPatient(
        "Zoroaster",
        "Zamalodchikova",
        "Zyrtec"
    );

    const patientId = created.data?.id;

    // R
    const read = patientId
        ? await getPatient(patientId)
        : { data: null, error: "Patient record CREATE failed!" };

    // U
    const updated = patientId
        ? await updatePatient(patientId, {
            medications: "Zyrtec, Zanaflex",
        })
        : { data: null, error: "Patient record UPDATE failed!" };

    // D
    const deleted = patientId
        ? await deletePatient(patientId)
        : { error: "Patient record DELETE failed!" };

    return (
        <main>
            <h1>Supabase (Patient) CRUD Test</h1>

            <section>
                <h2>1. Create</h2>
                <pre>{JSON.stringify(created, null, 2)}</pre>
            </section>

            <section>
                <h2>2. Read</h2>
                <pre>{JSON.stringify(read, null, 2)}</pre>
            </section>

            <section>
                <h2>3. Update</h2>
                <pre>{JSON.stringify(updated, null, 2)}</pre>
            </section>

            <section>
                <h2>4. Delete</h2>
                <pre>{JSON.stringify(deleted, null, 2)}</pre>
            </section>
        </main>
    );
}