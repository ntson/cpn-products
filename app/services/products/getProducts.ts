import { callApi } from '@/app/services/callApi';

export async function getProducts(limit: number, skip: number) {
  const path = `products?limit=${limit}&skip=${skip}`;
  const data = await callApi({ path, method: 'GET' });

  return data;
}
