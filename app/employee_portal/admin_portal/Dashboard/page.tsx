import { createAdminClient } from "@/utils/supabase/admin"

export default async function Dashboard() {
  const supabase = await createAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })

  if (error) {
    throw new Error('Failed to fetch new users')
  }

  const users = data.users;

  const totalUsers = users.length
  const patients = users.filter(
    user => user.app_metadata?.role === 'patient'
  ).length
  const doctors = users.filter(
    user => user.app_metadata?.role === 'doctor'
  ).length
  const receptionists = users.filter(
    user => user.app_metadata?.role === 'receptionist'
  ).length
  const admin = users.filter(
    user => user.app_metadata?.role === 'admin'
  ).length


  return (
    <div className="flex gap-2 overflow-x-scroll">
      <div className="gap-2 box shrink-0">
        <h1>Total Users:</h1>
        <p>
          {totalUsers}
        </p>
      </div>
      <div className="box shrink-0">
        <h1>Patients:</h1>
        <p>
          {patients}
        </p>
      </div>
      <div className="box shrink-0">
        <h1>Doctors:</h1>
        <p>
          {doctors}
        </p>
      </div>
      <div className="box shrink-0">
        <h1>Receptionists:</h1>
        <p>
          {receptionists}
        </p>
      </div>
      <div className="box shrink-0">
        <h1>Admins:</h1>
        <p>
          {admin}
        </p>
      </div>
    </div>
  )
}
