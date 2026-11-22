import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="receptionist-sidebar overflow-scroll">
      <h2>MYTHICorp</h2>
      <p>Receptionist Portal</p>

      <div className="receptionist-nav-bar">
        <Link href="/employee_portal/receptionist_portal">Dashboard</Link>
        <Link href="/employee_portal/receptionist_portal/patient_check_in">Patient Check-In</Link>
        <Link href="/employee_portal/receptionist_portal/appointments">Appointments</Link>
        <Link href="/employee_portal/receptionist_portal/patient_search">Patient Search</Link>
        <Link href="/employee_portal/receptionist_portal/patient_registration">Patient Registration</Link>
      </div>
    </aside>
  );
}
