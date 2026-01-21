"use client";

import Link from "next/link";
import type { Item } from "@/lib/store";
import { categoriesById } from "@/lib/categories";
import { useStore } from "@/lib/store";

type Props = {
  item: Item;
};

export function ItemCard({ item }: Props) {
  const { toggleFav, isFav } = useStore();

  const cat = categoriesById[item.category]?.name ?? item.category;
  const fav = isFav(item.id);

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Link href={`/item/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="h3" style={{ margin: 0 }}>{item.title}</div>

        <div className="muted" style={{ marginTop: 6 }}>
          {cat} • {item.city} • {item.condition === "new" ? "Новое" : "Б/у"}
        </div>

        <div style={{ marginTop: 8, fontWeight: 800, fontSize: 18 }}>
          {item.price.toLocaleString("ru-RU")} ₽
        </div>

        <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
          {new Date(item.createdAt).toLocaleString("ru-RU")}
        </div>
      </Link>

      <button className="btn" onClick={() => toggleFav(item.id)}>
        {fav ? "Убрать из избранного" : "В избранное"}
      </button>
    </div>
  );
}
