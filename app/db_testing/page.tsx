// This page returns the most recently created patient's info. Definitely has to be changed in the future but for now it's fine
import {
    getMostRecentPatient,
    createPatient,
    updatePatient,
    deletePatient,
} from "@/utils/supabase/crud";

// Tests database connection by reading the most recent patient. If no patient exists, we insert Anna Adler. 
export default async function CrudTestPage() {
    let patient = await getMostRecentPatient();

    if (!patient.data) {
        const created = await createPatient(
            "Anna",
            "Adler",
            "Aspirin"
        );

        patient = created;
    }

    return (
        <main>
            <h1>Supabase Database Test</h1>

            <section>
                <h2>Most recently created patient:</h2>

                <pre>
                    {JSON.stringify(patient, null, 2)}
                </pre>
            </section>
        </main>
    );
}