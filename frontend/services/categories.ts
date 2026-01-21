import { api } from '@/lib/api';

export type Category = { id: number; name: string };

export const getCategories = () => api.get<Category[]>('/categories');
export const createCategory = (name: string) => api.post<Category>('/categories', { name });
export const deleteCategory = (id: number) => api.del<any>(`/categories/${id}`);
