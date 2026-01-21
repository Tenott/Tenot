"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useStore, type Item } from "@/lib/store";
import { formatPrice, formatTime } from "@/lib/format";
import { categoriesById } from "@/lib/categories";
import { ItemCard } from "@/components/ItemCard";

type StoreMaybeFav = {
  items: Item[];
  toggleFav?: (id: string) => void;
  isFav?: (id: string) => boolean;
};

export default function ItemPage() {
  const params = useParams<{ id: string }>();

  // достаём стор безопасно (чтобы build не падал, если toggleFav/isFav нет)
  const store = useStore() as unknown as StoreMaybeFav;
  const items = store.items ?? [];
  const toggleFav = store.toggleFav ?? (() => {});
  const isFav = store.isFav ?? (() => false);

  const id = params.id;

  const item = useMemo(() => items.find((i) => i.id === id), [items, id]);

  const similar = useMemo(() => {
    if (!item) return [];
    return items
      .filter((i) => i.category === item.category && i.id !== item.id)
      .sort(
  (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)

      .slice(0, 6);
  }, [items, item]);

  if (!item) {
    return (
      <div className="card">
        Объявление не найдено.{" "}
        <Link
          href="/search"
          style={{ color: "var(--brand)", fontWeight: 700 }}
        >
          Вернуться к поиску
        </Link>
      </div>
    );
  }

  const catName = categoriesById[item.category]?.name ?? item.category;

  return (
    <div className="grid">
      <section style={{ gridColumn: "span 8" }}>
        <div className="card">
          <div
            className="row"
            style={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <div>
              <div className="badge">
                {catName} • {item.city}
              </div>
              <h1 className="h2" style={{ marginTop: 10 }}>
                {item.title}
              </h1>

              {/* FIX: formatTime ждёт number */}
              <div className="muted" style={{ marginTop: 6 }}>
                {formatTime(item.createdAt)}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div className="h2" style={{ color: "var(--brand)" }}>
                {formatPrice(item.price)}
              </div>

              <button className="btn" onClick={() => toggleFav(item.id)}>
                {isFav(item.id) ? "★ В избранном" : "☆ В избранное"}
              </button>
            </div>
          </div>

          <hr />

          <div className="grid">
            <div style={{ gridColumn: "span 7" }}>
              <div className="card" style={{ background: "var(--soft)" }}>
                <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>
                  Фото (MVP)
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                    gap: 10,
                  }}
                >
                  {item.photos?.length ? (
                    item.photos.slice(0, 6).map((p, idx) => (
                      <div
                        key={idx}
                        style={{
                          border: "1px solid var(--line)",
                          borderRadius: 12,
                          overflow: "hidden",
                          background: "#fff",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p}
                          alt=""
                          style={{
                            width: "100%",
                            height: 120,
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="muted">Нет фото</div>
                  )}
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <div className="h2">Описание</div>
                <p style={{ whiteSpace: "pre-wrap" }}>{item.description}</p>
              </div>
            </div>

            <div style={{ gridColumn: "span 5" }}>
              <div className="card">
                <div className="h2">Контакты</div>

                {/* FIX: в Item нет sellerName/phone — ставим заглушки */}
                <div className="muted" style={{ marginTop: 8 }}>
                  Продавец: Пользователь
                </div>
                <div className="muted">Телефон: +7 ••• •• ••</div>

                <div className="row" style={{ marginTop: 12, flexWrap: "wrap" }}>
                  <button
                    className="btn primary"
                    onClick={() => alert("Телефон (MVP): +7 000 000-00-00")}
                  >
                    Показать телефон
                  </button>
                  <button
                    className="btn"
                    onClick={() => alert("Чат добавим на следующем этапе 🙂")}
                  >
                    Написать
                  </button>
                </div>

                <hr />

                <div className="h2">Параметры</div>
                <div className="kv" style={{ marginTop: 10 }}>
                  <div>
                    <b>Состояние</b>
                    <br />
                    <span className="muted">
                      {item.condition === "new" ? "Новое" : "Б/у"}
                    </span>
                  </div>
                  <div>
                    <b>Категория</b>
                    <br />
                    <span className="muted">{catName}</span>
                  </div>
                </div>

                <div className="row" style={{ marginTop: 12 }}>
                  <button
                    className="btn"
                    onClick={() => alert("Жалоба отправлена (заглушка).")}
                  >
                    Пожаловаться
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <h2 className="h2">Похожие объявления</h2>
              <Link className="btn" href="/search">
                К поиску
              </Link>
            </div>

            <div
              style={{
                marginTop: 10,
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                gap: 16,
              }}
            >
              {similar.map((it) => (
                <ItemCard key={it.id} item={it} />
              ))}
            </div>
          </div>
        )}
      </section>

      <aside style={{ gridColumn: "span 4" }}>
        <div className="card" style={{ background: "var(--soft)" }}>
          <div className="h2">ALLO</div>
          <p className="muted" style={{ marginTop: 8 }}>
            Объявления без лишнего. В MVP контакты открываются кнопкой.
          </p>
          <Link className="btn primary" href="/add">
            Разместить своё
          </Link>
        </div>
      </aside>
    </div>
  );
}
