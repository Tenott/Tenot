'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireRole } from '@/hooks/useRequireRole';
import { createListing } from '@/services/listings';
import { getCategories, type Category } from '@/services/categories';

export default function NewListingPage() {
  const { loading } = useRequireRole(['SUPPLIER']);
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ title: '', article: '', description: '', price: 0, categoryId: 0 });

  useEffect(() => {
    getCategories().then((c) => {
      setCategories(c);
      if (c[0]?.id) setForm((f) => ({ ...f, categoryId: c[0].id }));
    });
  }, []);

  if (loading) return null;

  const submit = async () => {
    await createListing({
      title: form.title,
      article: form.article,
      description: form.description,
      price: Number(form.price),
      categoryId: Number(form.categoryId),
    });
    router.push('/supplier');
  };

  return (
    <div className="card" style={{ padding: 18, maxWidth: 720 }}>
      <h1 className="h2">Новое объявление</h1>
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 10 }}>
        <input className="input" placeholder="Название" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="input" placeholder="Артикул" value={form.article} onChange={(e) => setForm({ ...form, article: e.target.value })} />
        <textarea className="input" placeholder="Описание" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="input" type="number" placeholder="Цена" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        <select className="input" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="btn primary" onClick={submit}>Создать</button>
      </div>
    </div>
  );
}
