import Link from "next/link";

export default function Sidebar() {
  return (
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
  );
}
