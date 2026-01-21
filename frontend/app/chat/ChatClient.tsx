"use client";

import { useSearchParams } from "next/navigation";

export default function ChatClient() {
  const sp = useSearchParams();
  const to = sp.get("to") ?? "";

  return (
    <div className="card">
      <div className="h2">Чат</div>
      <div className="muted" style={{ marginTop: 8 }}>
        to = {to || "(не задано)"}
      </div>
    </div>
  );
}
