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
    <div ref={menuRef} className="">
      <button onClick={() => { setOpen(!open) }} className="action_button">+ New User</button>
      {open && (
        <div className="z-2  fixed inset-0 m-auto w-[75vw] h-[75vh]">
          <button onClick={() => setOpen(!open)} className="z-3 bg-red-100 border-red-400 border-4 absolute rounded-full p-1 top-0 -right-12 flex w-10 h-10 items-center justify-center hover:bg-red-200 right-0 right-[-16] top-[-16]">❌</button>
          <div className="card overflow-scroll z-2">
            <form className="flex flex-col gap-4">
              <h1 className="text-2xl"><b>Create a New User:</b></h1>
              <div className="flex gap-2">
                <label></label>
                <select required className="outline p-2" name="role" id="role">
                  <option selected value="" disabled>Pick A Role</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="flex gap-2">
                <label>Email:</label>
                <input type="text" name="email" placeholder="Enter an email" required />
              </div>
              <div className="flex gap-2">
                <label>Password:</label>
                <input type="text" name="password" placeholder="Enter a password" required />
              </div>
              <button className="action_button w-fit" type="submit" >Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>

  )
}
