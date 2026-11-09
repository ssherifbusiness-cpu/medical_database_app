import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';

const validRoles = [
  'patient',
  'doctor',
  'receptionist',
  'admin',
];
export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
  if (user.app_metadata?.role !== 'admin') {
    return NextResponse.json(
      { error: 'Not authorized' },
      { status: 403 }
    );
  }
  const { userId, role } = await request.json();

  if (
    typeof userId !== 'string' ||
    !validRoles.includes(role)
  ) {
    return NextResponse.json(
      { error: "Invalid user ID or role" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { role },
  });

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }
  return NextResponse.json({
    message: 'User role updated successfully',
  });

}


export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json(
      { error: 'Not Authenticated' },
      { status: 401 },
    );
  }

  if (user.app_metadata?.role != 'admin') {
    return NextResponse.json(
      { error: "Sorry buddy, get ur perms up, what are you even doing here?" },
      { status: 403 },
    );
  }
  const admin = createAdminClient();

  const { data, error: fetchError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 100,
  });

  if (fetchError) {
    return NextResponse.json(
      { error: fetchError.message },
      { status: 500 },
    )
  }

  return NextResponse.json({
    users: data.users,
  });
}
