'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from './useMe';

export function useRequireRole(roles: string[]) {
  const router = useRouter();
  const { user, loading } = useMe();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!roles.includes(user.role)) {
      router.push('/');
    }
  }, [loading, user, roles, router]);

  return { user, loading };
}
