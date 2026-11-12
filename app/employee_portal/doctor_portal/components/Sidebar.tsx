import Link from "next/link";

export default function Sidebar() {
    return (
        <nav className="z-1 sidebar h-full flex flex-col sticky"
        aria-label="Doctor Portal Sidebar">
            <Link href="/employee_portal/doctor_portal/Dashboard" className="p-2 sidebar_element">Dashboard</Link>
            </nav>
    );
}