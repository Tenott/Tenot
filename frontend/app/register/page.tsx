'use client';

import { useState } from 'react';
import { register } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [role, setRole] = useState<'BUYER' | 'SUPPLIER'>('BUYER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async () => {
    setError(null);
    try {
      await register({ email, password, role });
      router.push('/');
    } catch {
      setError('Не удалось зарегистрироваться');
    }
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 520 }}>
      <h1 className="h2">Регистрация</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
        <select className="input" value={role} onChange={(e) => setRole(e.target.value as any)}>
          <option value="BUYER">Покупатель</option>
          <option value="SUPPLIER">Поставщик</option>
        </select>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="input"
          placeholder="Пароль (мин. 6)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <div className="muted">{error}</div> : null}
        <button className="btn primary" onClick={submit}>Создать аккаунт</button>
      </div>
    </div>
  );
}
