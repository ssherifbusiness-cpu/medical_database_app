import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="z-1 sidebar h-full flex flex-col sticky"
      aria-label="Receptionist Portal Sidebar">
      <Link href="/employee_portal/receptionist_portal/Appointments" className="p-2 sidebar_element">Appointments</Link>
    </nav>
  );
}
