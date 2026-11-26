'use client'

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/supabase/client"

export default function NewUser() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [errorMessage, setErrorMessage] = useState('')

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
  async function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const role = formData.get("role") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setErrorMessage("You must be logged in")
      return
    }

    const response = await fetch("/api/receptionist/register_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        email,
        password,
        role
      })
    })

    const result = await response.json()

    if (!response.ok) {
      setErrorMessage(result.error)
      return
    }

    setOpen(false);


  }

  return (
    <div ref={menuRef} className="">
      <button onClick={() => { setOpen(!open) }} className="action_button">+ New User</button>
      {open && (
        <div className="z-2  fixed inset-0 m-auto w-[75vw] h-[75vh]">
          <button onClick={() => setOpen(!open)} className="z-3 bg-red-100 border-red-400 border-4 absolute rounded-full p-1 top-0 -right-12 flex w-10 h-10 items-center justify-center hover:bg-red-200 right-0 right-[-16] top-[-16]">❌</button>
          <div className="card overflow-scroll z-2">

            <form onSubmit={registerUser} className="flex flex-col gap-4">
              {errorMessage && (
                <div className="text-white text-xs bg-red-400 p-2 rounded flex justify-between">
                  <b><p className="">{errorMessage}</p></b>
                  <p className="bg-red-500 rounded-full">❕</p>
                </div>
              )}

              <h1 className="text-2xl"><b>Create a New Patient:</b></h1>
              <div className="flex gap-2">
                <label></label>
                <select required className="outline p-2" name="role" id="role">
                  <option value="" disabled >Pick A Role</option>
                  <option value="admin" disabled>Admin</option>
                  <option value="doctor" disabled>Doctor</option>
                  <option value="patient">Patient</option>
                  <option value="receptionist" disabled>Receptionist</option>
                </select>
              </div>
              <div className="flex gap-2">
                <label>Email:</label>
                <input type="email" name="email" placeholder="Enter an email" required />
              </div>
              <div className="flex gap-2">
                <label>Password:</label>
                <input type="password" name="password" placeholder="Enter a password" required />
              </div>
              <button className="action_button w-fit" type="submit" >Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>

  )
}
