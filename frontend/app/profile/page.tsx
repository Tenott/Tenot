'use client';

import { useEffect, useState } from 'react';
import { useRequireRole } from '@/hooks/useRequireRole';
import { getFavorites, type Favorite } from '@/services/favorites';
import { getMyChats, type Chat } from '@/services/chat';
import Link from 'next/link';

export default function BuyerProfile() {
  const { user, loading } = useRequireRole(['BUYER']);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!user) return;
    getFavorites().then(setFavorites).catch(() => {});
    getMyChats().then(setChats).catch(() => {});
  }, [user]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div className="card" style={{ padding: 18 }}>
        <h1 className="h2">Личный кабинет покупателя</h1>
        <div className="muted">Ваши диалоги и избранные объявления</div>
      </div>

      <div className="card" style={{ padding: 18 }}>
        <h2 className="h2">Диалоги</h2>
        {chats.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
            {chats.map((c) => (
              <Link key={c.id} className="btn" href={`/chat?chatId=${c.id}`}>Чат #{c.id} (объявление {c.listingId})</Link>
            ))}
          </div>
        ) : (
          <div className="muted" style={{ marginTop: 10 }}>Пока нет диалогов</div>
        )}
      </div>

      <div className="card" style={{ padding: 18 }}>
        <h2 className="h2">Избранное</h2>
        {favorites.length ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12, marginTop: 10 }}>
            {favorites.map((f) => (
              <Link key={f.id} href={`/listing/${f.listingId}`} className="card" style={{ padding: 12 }}>
                <div style={{ fontWeight: 600 }}>{f.listing.title}</div>
                <div className="muted">{f.listing.price} ₽</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="muted" style={{ marginTop: 10 }}>Пока пусто</div>
        )}
      </div>
    </div>
  );
}
