'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRequireRole } from '@/hooks/useRequireRole';
import { getMySupplierProfile, saveMySupplierProfile } from '@/services/supplier';
import { getMyListings, toggleListing, type Listing } from '@/services/listings';

export default function SupplierPage() {
  const { user, loading } = useRequireRole(['SUPPLIER']);
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({ name: '', phone: '', description: '' });
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (loading) return;
    (async () => {
      const p = await getMySupplierProfile();
      if (p) {
        setProfile(p);
        setForm({ name: p.name || '', phone: p.phone || '', description: p.description || '' });
      }
      const my = await getMyListings();
      setListings(my);
    })().catch(() => {});
  }, [loading]);

  const save = async () => {
    const p = await saveMySupplierProfile(form);
    setProfile(p);
    alert('Профиль сохранен');
  };

  const onToggle = async (id: number, isActive: boolean) => {
    const updated = await toggleListing(id, !isActive);
    setListings(prev => prev.map(x => (x.id === id ? updated : x)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: 18 }}>
        <h1 className="h2">Кабинет поставщика</h1>
        <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
          <input className="input" placeholder="Название" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Телефон" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <textarea className="input" placeholder="Описание" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <button className="btn primary" onClick={save}>Сохранить</button>
        </div>
      </div>

      <div className="card" style={{ padding: 18 }}>
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 className="h2">Мои объявления</h2>
          <Link className="btn" href="/supplier/listings/new">+ Добавить</Link>
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {listings.map(l => (
            <div key={l.id} className="card" style={{ padding: 12, background: 'var(--soft)' }}>
              <div className="row" style={{ justifyContent: 'space-between' }}>
                <b>{l.title}</b>
                <span className="muted">{l.isActive ? 'активно' : 'скрыто'}</span>
              </div>
              <div className="muted">{l.price} ₽ • {l.category?.name}</div>
              <div style={{ marginTop: 8 }}>
                <button className="btn" onClick={() => onToggle(l.id, l.isActive)}>
                  {l.isActive ? 'Скрыть' : 'Активировать'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
