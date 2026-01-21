"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/categories";
import { ItemCard } from "@/components/ItemCard";

export default function SearchPage() {
  const { items } = useStore();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("");
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [condition, setCondition] = useState<string>("");
  const [sort, setSort] = useState<"new" | "cheap" | "expensive">("new");

  const results = useMemo(() => {
    let list = [...items];

    if (q.trim()) {
      const s = q.trim().toLowerCase();
      list = list.filter(
        (it) =>
          it.title.toLowerCase().includes(s) ||
          it.description.toLowerCase().includes(s)
      );
    }

    if (category) list = list.filter((it) => it.category === category);

    if (city.trim()) {
      const c = city.trim().toLowerCase();
      list = list.filter((it) => it.city.toLowerCase().includes(c));
    }

    const min = minPrice ? Number(minPrice) : undefined;
    const max = maxPrice ? Number(maxPrice) : undefined;

    if (min !== undefined && !Number.isNaN(min)) {
      list = list.filter((it) => it.price >= min);
    }
    if (max !== undefined && !Number.isNaN(max)) {
      list = list.filter((it) => it.price <= max);
    }

    if (condition) list = list.filter((it) => it.condition === condition);

    // ✅ createdAt у тебя string -> сортируем через Date.getTime()
    if (sort === "new") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    if (sort === "cheap") list.sort((a, b) => a.price - b.price);
    if (sort === "expensive") list.sort((a, b) => b.price - a.price);

    return list;
  }, [items, q, category, city, minPrice, maxPrice, condition, sort]);

  return (
    <div className="grid">
      <aside
        className="card"
        style={{
          gridColumn: "span 3",
          position: "sticky",
          top: 16,
          alignSelf: "start",
        }}
      >
        <div className="h2">Поиск</div>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <input
            className="input"
            placeholder="Например: айфон, диван..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Все категории</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <div className="row" style={{ gap: 10 }}>
            <input
              className="input"
              placeholder="Цена от"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="input"
              placeholder="до"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <select value={condition} onChange={(e) => setCondition(e.target.value)}>
            <option value="">Состояние: любое</option>
            <option value="new">Новое</option>
            <option value="used">Б/у</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
            <option value="new">Сортировка: свежее</option>
            <option value="cheap">Сначала дешевле</option>
            <option value="expensive">Сначала дороже</option>
          </select>

          <Link className="btn primary" href="/add">
            Разместить
          </Link>

          <p className="muted" style={{ margin: 0, fontSize: 12 }}>
            MVP: фильтры и объявления хранятся локально в браузере.
          </p>
        </div>
      </aside>

      <section style={{ gridColumn: "span 9" }}>
        <div className="row" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
          <div className="h2">Результаты</div>
          <div className="muted">{results.length} объявл.</div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "repeat(3,minmax(0,1fr))",
            gap: 16,
          }}
        >
          {results.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}

          {results.length === 0 && (
            <div className="card" style={{ gridColumn: "1 / -1" }}>
              Ничего не найдено. Попробуй изменить фильтры или{" "}
              <Link href="/add" style={{ color: "var(--brand)", fontWeight: 700 }}>
                размести объявление
              </Link>
              .
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
