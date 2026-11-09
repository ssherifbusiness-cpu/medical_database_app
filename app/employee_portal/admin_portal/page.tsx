import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function AdminPortal() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/login')
  }
  if (user.app_metadata?.role !== 'admin') {
    redirect('/');
  }
}

