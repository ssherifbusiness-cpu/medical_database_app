import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import ProfileMenu from './ProfileMenu';
import LoginMenu from './LoginMenu';

export default async function Header() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  const avatar = user?.user_metadata?.avatar_url
  return (
    <header className="header">
      <nav className="p-2 flex items-center justify-between">
        <Link href="/">MythiCorp</Link>
        <div>
          {user ? (
            <>
              <ProfileMenu avatar={avatar} email={user.email} />
            </>

          ) : (
            <LoginMenu />
          )}
        </div>
      </nav>
    </header>
  )
}
