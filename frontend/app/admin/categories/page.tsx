'use client';

import { useEffect, useState } from 'react';
import { useRequireRole } from '@/hooks/useRequireRole';
import { getCategories, createCategory, deleteCategory, type Category } from '@/services/categories';

export default function AdminCategories() {
  const { loading } = useRequireRole(['ADMIN']);
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState('');

  const reload = async () => setItems(await getCategories());

  useEffect(() => { reload(); }, []);

  const create = async () => {
    const n = name.trim();
    if (!n) return;
    await createCategory(n);
    setName('');
    await reload();
  };

  const remove = async (id: number) => {
    await deleteCategory(id);
    await reload();
  };

  if (loading) return null;

  return (
    <div className="card" style={{ padding: 18 }}>
      <h1 className="h2">Категории</h1>

      <div className="row" style={{ gap: 8, marginTop: 12 }}>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Новая категория" />
        <button className="btn primary" onClick={create}>Создать</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {items.map((c) => (
          <div key={c.id} className="row" style={{ justifyContent: 'space-between', borderTop: '1px solid var(--border)', padding: '10px 0' }}>
            <div>{c.name}</div>
            <button className="btn" onClick={() => remove(c.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}
