
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

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) {
      setErrorMessage(error.message)
    } else {
      setEmail(null)
    }
  }

  return (
      <main className="login-box">
    <div className="login">
      <h1 className="login-title">Medical Database Application</h1>
      <h2 className="login-subtitle">Supabase OAuth Authentication</h2>

      {errorMessage && <p className="login-error" role="alert">{errorMessage}</p>}

      {loading ? (
        <p className="login-status">Checking login status...</p>
      ) : email ? (
                      
        <div className="login-form">
          <h3 className="login-success">Successfully signed in!</h3>
          <p className="login-status">Welcome, {email}</p>
          <button className="submit-button" onClick={signOut}>Sign Out</button>
                          
                  </div>
              ) : (
              <div className="login-form">
              <p className="login-status">Sign into medical database</p>
              
        <button className="submit-button" onClick={signInWithGitHub}>
          Sign In with GitHub
              </button>
          </div>
      )}
      </div>
    </main>
  )
}
