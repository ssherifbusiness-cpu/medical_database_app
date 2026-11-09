import Link from "next/link"

export default function Sidebar() {
  return (
    <div className="z-1 sidebar h-full flex flex-col sticky">
      <Link href="/employee_portal/admin_portal/ChangePerms" className="p-2 sidebar_element">User Management</Link>
      <Link href="/employee_portal/admin_portal/Dashboard" className="p-2 sidebar_element">Dashboard</Link>
    </div>
  )
}
