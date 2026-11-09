'use client'

import { useEffect, useRef, useState } from "react";

export default function NewUser() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }

    } document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    }
  }, []);

  return (
    <div ref={menuRef} className="relative z-3">
      <button onClick={() => { setOpen(!open) }} className="action_button">+ New User</button>
      {open && (
        <div className="card overflow-scroll">
          <form className="flex flex-col gap-2">
            <h1 className="text-2xl"><b>Create a New User:</b></h1>
            <div className="flex gap-2">
              <label>Email:</label>
              <input type="text" name="email" placeholder="Enter an email" required />
            </div>
            <div className="flex gap-2">
              <label>Password:</label>
              <input type="text" name="password" placeholder="Enter an email" required />
            </div>
            <button className="action_button w-fit" type="submit" >Submit</button>
          </form>
        </div>
      )}
    </div>

  )
}
