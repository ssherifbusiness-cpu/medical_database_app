'use client'

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from 'lucide-react'
import Image from "next/image";

type ProfileMenuProps = {
  avatar: string | null;
  email: string | undefined;
}


export default function ProfileMenu({ avatar, email }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, []);

  async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out:', error.message);
      return
    }

    router.replace('/');
    setOpen(false);
    router.refresh();

  }
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        {avatar ? (
          <Image
            src={avatar}
            alt="Profile Picture"
            width={20}
            height={20}
            className="h-5 w-5 rounded"
          />
        ) : (
          <div className="h-10 w-10 rounded">
            <User />
          </div>
        )}
      </button>

      {open && (
        <div className="menu absolute right-0">
          <div className="flex gap-2 w-max">
            {avatar ? (
              <Image
                src={avatar}
                alt="Profile Picture"
                width={20}
                height={20}
                className="h-5 w-5 rounded full"
              />
            ) : (
              <User />
            )}
            <p className="text-xs">{email}</p>
          </div>
          <button onClick={signOut} className="action_button z-3">Sign Out</button>
        </div>
      )}
    </div>
  )
}
