

export default function ReceptionistPortal() {
  return (
    <div className="receptionist-container">
          <aside className="receptionist-sidebar">
              <h2>MYTHICorp</h2>
              <p>Receptionist Portal</p>

              <div className="receptionist-nav-bar">
                  <a href="#dashboard">Dashboard</a>
                  <a href="#checkin">Patient Check-In</a>
                  <a href="#appointments">Appointments</a>
                  <a href="#patientsearch">Patient Search</a>
                  <a href="#patientregister">Patient Registration</a>
              </div>
          </aside>
          <main className="receptionist-main">
              <section id="dashboard" className="receptionist-section">
                  <h1>Receptionist Dashboard</h1>
                  <p>Welcome to the MYTHICorp front desk.</p>

                  <div className="dashboard-boxes">
                      <a href="#checkin" className="dashboard-box">
                          <h3>Patient Check-In</h3>
                      <p>Check in arriving patients.</p>
                      </a>

                      <a href="#appointments" className="dashboard-box">
                          <h3>Appointments</h3>
                      <p>View and schedule appointments.</p>
                      </a>

                      <a href="#patientsearch" className="dashboard-box">
                          <h3>Patient Search</h3>
                      <p>Find existing patient records.</p>
                      </a>

                      <a href="#patientregister" className="dashboard-box">
                          <h3>Patient Registration</h3>
                      <p>Register a new patient.</p>
                      </a>
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
