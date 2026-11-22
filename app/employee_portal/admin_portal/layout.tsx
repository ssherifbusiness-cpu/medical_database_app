import Sidebar from "./components/Sidebar";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export default async function AdminLayout({ children }: LayoutProps<"/">) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/')
  }
  if (user.app_metadata?.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="flex w-max min-w-full">
      <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] shrink-0 z-1">
        <Sidebar />
      </div>
      <div className="p-2 min-w-0 flex-1 p-2 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
