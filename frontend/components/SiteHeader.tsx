"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useStore();
  const [q, setQ] = useState("");

  return (
    <header style={{ borderBottom:"1px solid var(--line)", background:"#fff" }}>
      <div className="container" style={{ padding:"12px 16px" }}>
        <div className="row" style={{ justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
          <div className="row" style={{ gap: 12 }}>
            <Link href="/" style={{ fontWeight:900, letterSpacing:0.5, color:"var(--brand)", fontSize: 22 }}>
              ALLO
            </Link>
            <span className="muted" style={{ fontSize: 12, display: pathname === "/" ? "none" : "inline" }}>
              объявления без лишнего
            </span>
          </div>

          <div className="row" style={{ flex:1, maxWidth: 520 }}>
            <input
              className="input"
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Поиск…"
              onKeyDown={(e)=>{
                if (e.key === "Enter") router.push(`/search?q=${encodeURIComponent(q)}`);
              }}
            />
            <button className="btn" onClick={()=>router.push(`/search?q=${encodeURIComponent(q)}`)}>
              Найти
            </button>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <Link className="btn primary" href="/add">Разместить</Link>
            <Link className="btn" href={user ? "/me" : "/login"}>
              {user ? "Профиль" : "Войти"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
