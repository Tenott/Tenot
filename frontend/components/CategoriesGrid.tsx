"use client";

import Link from "next/link";
import { categories } from "@/lib/categories";

export function CategoriesGrid() {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,minmax(0,1fr))", gap: 12 }}>
      {categories.map(c => (
        <Link key={c.id} className="card" href={`/search?category=${encodeURIComponent(c.id)}`}
          style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{c.name}</div>
            <div className="muted" style={{ fontSize: 12 }}>{c.hint}</div>
          </div>
          <span className="badge">→</span>
        </Link>
      ))}
    </div>
  );
}
