'use client'

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { siGithub, siGoogle } from 'simple-icons'
//import console from "console";

import { ClipLoader } from 'react-spinners';    // Jacob S using this. use "npm install react-spinners" in the terminal. 


export default function LoginMenu() {
  const [open, setOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter()
  const supabase = createClient()
  const [errorMessage, setErrorMessage] = useState('')
  const [signingIn, setSigningIn] = useState(false);
  // let [loading, setLoading] = useState(true);

  function renderSignInLoader() {
    if (!signingIn) return null;

    return (
      <div role="status" className="flex items-center gap-2">
        <ClipLoader size={16} aria-hidden="true" />
        <span>Signing in…</span>
      </div>
    );
  }

  async function doubleClickGuard(authService: Function) {
    if (signingIn) { return; }
    setSigningIn(true);
    // show loading indicator here? 
    // setLoading(!loading); 
    console.log('Signing in...');       // this gets logged when pressing the button. 

    try {
      await authService();
    } catch (error) {
      // not sure what to put here. Will check later
      setSigningIn(false);
    }
  }

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

    router.replace('/welcome');
    setOpen(false);
    router.refresh();

  }

  async function signInWithGitHub() {
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      throw error;
    }
  }
  async function signInWithGoogle() {
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOAuth({   // I need to throw an error here for the doubleClickProtection
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) setErrorMessage(error.message);
    if (error) throw error;                                   // add this to all authenticators 
  }

  async function signInWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })


    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setOpen(false);
    router.push('/');
    router.refresh();
  }

  async function signUpWithEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })


    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setOpen(false);
    router.push('/');
    router.refresh();
  }
  return (
    <div className="relative" ref={menuRef}>
      <button className="action_button" onClick={() => setOpen(!open)}>Login</button>
      {open && (
        <div className="menu absolute overflow-scroll right-0 max-h-[calc(95vh-var(--header-height))]">
          {errorMessage && (
            <div className="text-white text-xs bg-red-400 p-2 rounded flex justify-between">
              <b><p className="">{errorMessage}</p></b>
              <p className="bg-red-500 rounded-full">❕</p>
            </div>
          )}

          <form onSubmit={isSignUp ? signUpWithEmail : signInWithEmail} className="flex flex-col gap-2">
            <div className="flex gap-2">
              <label htmlFor="email">Email:</label>
              <input id="email" type="email" name="email" placeholder="Enter an email" required />
            </div>
            <div className="flex gap-2">
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" name="password" placeholder="Enter a password" required />
            </div>
            <button onClick={() => setIsSignUp(false)} className="action_button w-fit" type="submit" >Login</button>
            <button onClick={() => setIsSignUp(true)} className="action_button w-fit" type="submit" >Sign Up</button>
          </form>

          <div className="flex gap-2 w-max">
          </div>
          <div className="flex gap-4 w-fit p-2">
            <button className="w-8 h-8 bg-[var(--color-action)] flex items-center justify-center rounded-full" onClick={() => doubleClickGuard(signInWithGitHub)} disabled={signingIn}>

              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="white"
                aria-hidden="true"><path d={siGithub.path} />
              </svg>
            </button>
            <button className="w-8 h-8 bg-[var(--color-action)] flex items-center justify-center rounded-full" onClick={() => doubleClickGuard(signInWithGoogle)} disabled={signingIn}>
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="white" >
                <path d={siGoogle.path} />
              </svg>
            </button>
          </div>
          {renderSignInLoader()}
        </div>
      )
      }
    </div >
  )
}
