import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function ReceptionistPortal() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/')
  }
  if (user.app_metadata?.role !== 'receptionist') {
    redirect('/');
  }
  return (
    <div>Home</div>
  )
}

