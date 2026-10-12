import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    console.error('OAuth callback missing code:', {
      error: searchParams.get('error'),
      description: searchParams.get('error_description'),
    })

    return NextResponse.redirect(
      `${origin}/login?error=missing_code`
    )
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('OAuth code exchange failed:', error.message)

    return NextResponse.redirect(
      `${origin}/login?error=code_exchange_failed`
    )
  }

  console.log('OAuth authentication successful!')

  return NextResponse.redirect(`${origin}/login`)
}
