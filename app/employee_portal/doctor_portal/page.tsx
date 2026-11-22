import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function DoctorPortal() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/welcome')
    }

    if (user.app_metadata?.role !== 'doctor') {
        redirect('/');
    }
    redirect ('/employee_portal/doctor_portal/Dashboard');
  }