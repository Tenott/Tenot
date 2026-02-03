"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useStore((s) => s.setUser);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser({
            id: String(data.user.id),
            name: data.user.email || "",
            role: data.user.role,
          });
        }
      })
      .catch(() => {
        // Не авторизован - это нормально
      });
  }, [setUser]);

  return <>{children}</>;
}
