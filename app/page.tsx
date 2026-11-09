import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function Home() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Authentication Failed", error.message);
  }
  if (!user) {
    redirect('/welcome');
  }

  const role = user.app_metadata?.role;

  switch (role) {
    case 'admin':
      redirect('/employee_portal/admin_portal');
    case 'doctor':
      redirect('/employee_portal/doctor_portal');
    case 'receptionist':
      redirect('/employee_portal/receptionist_portal');
    case 'patient':
      redirect('/patient_portal');
    default:
      redirect('/welcome')
  }
}
