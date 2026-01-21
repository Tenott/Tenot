"use client";

import { useMemo } from "react";
import { useStore } from "@/lib/store";
import { ItemCard } from "@/components/ItemCard";

export function FreshList() {
  const { items } = useStore();

  const fresh = useMemo(() => {
    return [...items]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 6); // ✅ сколько показывать (можешь менять)
  }, [items]);

  if (fresh.length === 0) {
    return (
      <div className="card">
        Пока нет объявлений.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      {fresh.map((it) => (
        <ItemCard key={it.id} item={it} />
      ))}
    </div>
  );
}
