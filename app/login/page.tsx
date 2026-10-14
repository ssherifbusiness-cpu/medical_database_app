
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error && error.name !== 'AuthSessionMissingError') {
        setErrorMessage(error.message)
      }
      setEmail(data.user?.email ?? null)
      setLoading(false)
    })
  }, [supabase])

  async function signInWithGitHub() {
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) setErrorMessage(error.message)
  }
  async function signInWithGoogle() {
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) setErrorMessage(error.message)
  }


  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setErrorMessage(error.message)
    } else {
      setEmail(null)
    }
  }

  return (
    <main style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Medical Database Application</h1>
      <h2>Supabase OAuth Authentication</h2>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      {loading ? (
        <p>Checking login status...</p>
      ) : email ? (
        <>
          <h3>Successfully signed in!</h3>
          <p>Welcome, {email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <div>
          <button onClick={signInWithGitHub}>
            Sign In with GitHub
          </button>
          <button onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </div>
      )}
    </main>
  )
}
