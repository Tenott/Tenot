"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ItemCard } from "@/components/ItemCard";

export default function MyItemsPage() {
  const { user, items, removeItem } = useStore();

  if (!user) {
    return (
      <div className="card">
        Нужен вход.{" "}
        <Link href="/login" style={{ color: "var(--brand)", fontWeight: 700 }}>
          Войти
        </Link>
      </div>
    );
  }

  const my = items
    .filter((i) => i.sellerId === user.id)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <h1 className="h2">Мои объявления</h1>
        <Link className="btn primary" href="/add">
          Разместить
        </Link>
      </div>

      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(3,minmax(0,1fr))",
          gap: 16,
        }}
      >
        {my.map((it) => (
          <div key={it.id} style={{ position: "relative" }}>
            <ItemCard item={it} />
            <button
              className="btn"
              type="button"
              style={{ position: "absolute", top: 10, right: 10, background: "#fff" }}
              onClick={() => {
                if (confirm("Удалить объявление?")) removeItem(it.id);
              }}
            >
              Удалить
            </button>
          </div>
        ))}

        {my.length === 0 && (
          <div className="card">
            Пока нет объявлений.{" "}
            <Link href="/add" style={{ color: "var(--brand)", fontWeight: 700 }}>
              Разместить
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
