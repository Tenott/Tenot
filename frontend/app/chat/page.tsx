"use client";

import { Suspense } from "react";
import ChatClient from "./ChatClient";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="card">Загрузка чата...</div>}>
      <ChatClient />
    </Suspense>
  );
}
