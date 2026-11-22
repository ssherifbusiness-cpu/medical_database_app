import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ReceptionistPortal() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect('/')
  }
  if (user.app_metadata?.role !== 'receptionist') {
    redirect('/');
  }

  return (
    <div className="receptionist-container">
      <main className="receptionist-main">
        <section id="dashboard" className="receptionist-section">
          <h1>Receptionist Dashboard</h1>
          <p>Welcome to the MYTHICorp front desk.</p>

          <div className="dashboard-boxes">
            <Link href="receptionist_portal/patient_check_in/" className="dashboard-box">
              <h3>Patient Check-In</h3>
              <p>Check in arriving patients.</p>
            </Link>

            <Link href="receptionist_portal/appointments/" className="dashboard-box">
              <h3>Appointments</h3>
              <p>View and schedule appointments.</p>
            </Link>

            <Link href="receptionist_portal/patient_search/" className="dashboard-box">
              <h3>Patient Search</h3>
              <p>Find existing patient records.</p>
            </Link>

            <Link href="receptionist_portal/patient_registration/" className="dashboard-box">
              <h3>Patient Registration</h3>
              <p>Register a new patient.</p>
            </Link>
          </div>


          <div className="dashboard-information">
            <div className="information-card">
              <h3>Total Patients</h3>
              <p>3</p>
            </div>

            <div className="information-card">
              <h3>Total Appointments</h3>
              <p>2</p>
            </div>

            <div className="information-card">
              <h3>Checked In</h3>
              <p>0</p>
            </div>
          </div>

        </section>



        {/* patient check in */}


      </main>

    </div>
  )

}

