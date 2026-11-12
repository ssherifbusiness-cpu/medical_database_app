import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DoctorDashboard() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/welcome')
    }
    if (user.app_metadata?.role !== 'doctor') {
        redirect('/');
    }
    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
        <p className="text-lg">Welcome, {user.email}!</p>
        <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">My Patients</h2>
            <p className="text-gray-600">Here you can view and manage your patients.</p>
        </section>

        <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">My Appointments</h2>
            <p className="text-gray-600">Here you can view and manage your appointments.</p>
        </section>
        </main>
    );
}
