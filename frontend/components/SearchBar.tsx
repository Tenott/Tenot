"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="row" style={{ gap: 10, flexWrap:"wrap" }}>
      <input className="input" style={{ flex: 1, minWidth: 240 }} value={q} onChange={e=>setQ(e.target.value)} placeholder="Что ищете?" />
      <input className="input" style={{ width: 170 }} value={city} onChange={e=>setCity(e.target.value)} placeholder="Город" />
      <button className="btn primary" onClick={() => {
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        if (city.trim()) params.set("city", city.trim());
        router.push(`/search?${params.toString()}`);
      }}>
        Найти
      </button>
    </div>
  );
}
