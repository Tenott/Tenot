'use client';

import { useEffect, useState } from 'react';
import { me } from '@/services/auth';

export function useMe() {
  const [user, setUser] = useState<null | { id: number; role: string }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    me()
      .then((r) => {
        if (alive) setUser(r.user);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { user, loading };
}
