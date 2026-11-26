'use client'
import { useState } from "react";

type User = {
  id: string;
  email: string | null;
  banned_until: string | null;
  created_at: string;
  confirmed_at: string | null;
  confirmation_sent_at: string | null;
  is_anonymous: boolean;
  is_sso_user: boolean;
  invited_at: string | null;
  last_sign_in_at: string | null;

  phone: string | null;
  app_metadata: {
    provider: string;
    providers: string[];
    role?: string;

  };
}

export default function Appointmnets() {
  async function deleteUser(userId: string) {
    const response = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" })

    const result = await response.json()
    if (!response.ok) {
      console.error(result.error);
      return;
    }
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }
  async function updateRole(userId: string, role: string) {
    const response = await fetch('/api/admin/users/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, role }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      return;
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId
          ? {
            ...user,
            app_metadata: {
              ...user.app_metadata,
              role,
            },
          }
          : user
      )
    );
  }

  const [users, setUsers] = useState<User[]>([]);
  return (
    <div>
      <h1>Appointmnets</h1>
      <button className="action_button">+ New Appointment</button>
      <div className="flex flex-col gap-4">
        <div>User Management</div>
        <table className="w-fit">
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="">{user.email}</td>
                <td className="">
                  <select
                    value={user.app_metadata?.role ?? ''}
                    onChange={(e) => updateRole(user.id, e.target.value)}>
                    <option value="" disabled>Unassigned</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="">
                  <button onClick={() => deleteUser(user.id)} className="bg-red-400 hover:bg-red-300 p-2 rounded">
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
