import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  return NextResponse.json({ success: true })
}
