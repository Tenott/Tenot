"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function SettingsPage() {
  const { user, updateProfile } = useStore();
  const [name, setName] = useState(user?.name ?? "");
  const [city, setCity] = useState(user?.city ?? "");

  if (!user) {
    return (
      <div className="card">
        Нужен вход. <Link href="/login" style={{ color:"var(--brand)", fontWeight:700 }}>Войти</Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ maxWidth: 680 }}>
      <div className="h2">Настройки</div>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop: 12 }}>
        <label>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Имя</div>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </label>
        <label>
          <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Город</div>
          <input className="input" value={city} onChange={e=>setCity(e.target.value)} />
        </label>
        <button className="btn primary" onClick={()=>updateProfile({ name, city })}>
          Сохранить
        </button>
        <p className="muted" style={{ fontSize: 12, margin: 0 }}>
          Профиль хранится в браузере (localStorage).
        </p>
      </div>
    </div>
  );
}
