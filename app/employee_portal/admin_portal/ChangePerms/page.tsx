'use client';
import { useEffect, useState } from 'react';
import NewUser from '../components/NewUser';

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
export default function ChangePerms() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('/api/admin/users/role');
      const result = await response.json();
      if (response.ok) {
        setUsers(result.users);
      } else {
        console.error(result.error);
      }
    }
    fetchUsers();
  }, [])


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


  return (
    <div className="flex flex-col gap-4">
      <div>User Management</div>
      <NewUser />
      <table>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.app_metadata?.role ?? ''}
                  onChange={(e) => updateRole(user.id, e.target.value)}>
                  <option value="">Unassigned</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
