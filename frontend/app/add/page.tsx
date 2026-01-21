"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { categories } from "@/lib/categories";

export default function AddPage() {
  const router = useRouter();
  const { user, addItem } = useStore();

  const [category, setCategory] = useState<string>(categories[0]?.id ?? "auto");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState(user?.city ?? "");
  const [condition, setCondition] = useState<"new" | "used">("used");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState("");

  const canPublish = useMemo(() => {
    return (
      title.trim().length >= 6 &&
      Number(price) > 0 &&
      city.trim().length >= 2 &&
      description.trim().length >= 10
    );
  }, [title, price, city, description]);

  if (!user) {
    return (
      <div className="card">
        <p>
          Для публикации нужен вход.{" "}
          <a href="/login" style={{ color: "var(--brand)", fontWeight: 700 }}>
            Войти
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="grid">
      <section style={{ gridColumn: "span 8" }}>
        <div className="card">
          <div className="h2">Разместить объявление</div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* Категория */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Категория
              </div>
              <select
                value={category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCategory(e.target.value)
                }
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Заголовок */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Заголовок
              </div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: iPhone 13, отличное состояние"
              />
            </label>

            {/* Цена */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Цена
              </div>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₽"
              />
            </label>

            {/* Город */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Город
              </div>
              <input value={city} onChange={(e) => setCity(e.target.value)} />
            </label>

            {/* Состояние */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Состояние
              </div>
              <select
                value={condition}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCondition(e.target.value as "new" | "used")
                }
              >
                <option value="new">Новое</option>
                <option value="used">Б/у</option>
              </select>
            </label>

            {/* Описание */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Описание
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
              />
            </label>

            {/* Фото */}
            <label>
              <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                Фото (URL через запятую)
              </div>
              <input value={photos} onChange={(e) => setPhotos(e.target.value)} />
            </label>

            {/* Кнопка */}
            <button
              disabled={!canPublish}
              onClick={() => {
                addItem({
                  title,
                  price: Number(price),
                  city,
                  category,
                  condition,
                  description,
                  photos: photos
                    .split(",")
                    .map((p) => p.trim())
                    .filter(Boolean),
                });

                router.push("/");
              }}
            >
              Опубликовать
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
