import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createAdminClient } from "@/utils/supabase/admin"

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    )
  }

  if (user.app_metadata?.role != "receptionist") {
    return NextResponse.json(
      { error: "Not authorized" },
      { status: 403 }
    )
  }

  const { email, password } = await request.json()
  // TODO:: Add some testing of email, pw, and role feilds

  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
    app_metadata: {
      role: "patient",
    },
  })

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({
    message: "User created successfully",
    user: data.user,
  })
}

export async function GET() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    )
  }
  if (user.app_metadata?.role !== "receptionist") {
    return NextResponse.json(
      { error: "Receptionists only" },
      { status: 401 }
    )
  }
  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.listUsers()

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }
  const patients = data.users.filter(
    (user) => user.app_metadata?.role === "patient"
  )
  return NextResponse.json({

    users: patients,
  })
}
