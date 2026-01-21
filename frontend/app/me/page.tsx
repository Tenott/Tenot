"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function MeHome() {
  const { user, logout } = useStore();

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

  const info = [user.name, user.city, user.phone].filter(Boolean).join(" • ");

  return (
    <div className="grid">
      <section style={{ gridColumn: "span 8" }}>
        <div className="card">
          <div className="h2">Личный кабинет</div>

          <p className="muted" style={{ marginTop: 8 }}>
            {info || "Профиль"}
          </p>

          <div className="row" style={{ flexWrap: "wrap", marginTop: 12 }}>
            <Link className="btn primary" href="/me/items">
              Мои объявления
            </Link>
            <Link className="btn" href="/me/fav">
              Избранное
            </Link>
            <Link className="btn" href="/me/settings">
              Настройки
            </Link>

            <button className="btn" type="button" onClick={() => logout()}>
              Выйти
            </button>
          </div>
        </div>
      </section>

      <aside style={{ gridColumn: "span 4" }}>
        <div className="card" style={{ background: "var(--soft)" }}>
          <div className="h2">Быстро</div>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <Link className="btn primary" href="/add">
              Разместить
            </Link>
            <Link className="btn" href="/search">
              Поиск
            </Link>
            <Link className="btn" href="/admin">
              Админка (MVP)
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
