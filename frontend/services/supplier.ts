import { api } from '@/lib/api';

export type SupplierProfile = { id: number; userId: number; name: string; phone: string; description?: string | null };

export const getMySupplierProfile = () => api.get<SupplierProfile | null>('/supplier/me');
export const saveMySupplierProfile = (payload: { name: string; phone: string; description?: string }) =>
  api.post<SupplierProfile>('/supplier/me', payload);
