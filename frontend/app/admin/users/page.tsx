'use client';

import { useEffect, useState } from 'react';
import { useRequireRole } from '@/hooks/useRequireRole';
import { adminGetUsers, adminSetUserRole, type AdminUser } from '@/services/admin';

export default function AdminUsers() {
  const { loading } = useRequireRole(['ADMIN']);
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    adminGetUsers().then(setUsers);
  }, []);

  const setRole = async (id: number, role: AdminUser['role']) => {
    const updated = await adminSetUserRole(id, role);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  };

  if (loading) return null;

  return (
    <div>
      <h1 className="h2">Пользователи</h1>
      {users.map((u) => (
        <div key={u.id} className="card" style={{ padding: 12, marginBottom: 10 }}>
          <div><b>{u.email}</b></div>
          <div className="muted">Role: {u.role}</div>
          <div style={{ marginTop: 8 }}>
            <button className="btn" onClick={() => setRole(u.id, 'BUYER')}>BUYER</button>{' '}
            <button className="btn" onClick={() => setRole(u.id, 'SUPPLIER')}>SUPPLIER</button>{' '}
            <button className="btn" onClick={() => setRole(u.id, 'ADMIN')}>ADMIN</button>
          </div>
        </div>
      ))}
    </div>
  );
}
