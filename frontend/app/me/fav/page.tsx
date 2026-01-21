"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ItemCard } from "@/components/ItemCard";

export default function FavPage() {
  const { favIds, items } = useStore();
  const fav = items
  .filter((i) => favIds.includes(i.id))
  .sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <div className="row" style={{ justifyContent:"space-between" }}>
        <h1 className="h2">Избранное</h1>
        <Link className="btn" href="/search">К поиску</Link>
      </div>
      <div style={{ marginTop: 12, display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap:16 }}>
        {fav.map(it => <ItemCard key={it.id} item={it} />)}
        {fav.length === 0 && (
          <div className="card">
            Пока пусто. Открой <Link href="/search" style={{ color:"var(--brand)", fontWeight:700 }}>поиск</Link> и добавь объявления в избранное.
          </div>
        )}
      </div>
    </div>
  );
}
