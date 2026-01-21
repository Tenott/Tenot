'use client';

import { useState } from 'react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async () => {
    setError(null);
    try {
      await login(email, password);
      router.push('/');
    } catch (e: any) {
      setError('Не удалось войти');
    }
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 520 }}>
      <h1 className="h2">Вход</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          className="input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? <div className="muted">{error}</div> : null}
        <button className="btn primary" onClick={submit}>Войти</button>
      </div>
    </div>
  );
}
