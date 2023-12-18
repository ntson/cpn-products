import { Product } from '@/app/models/product';
import { callApi } from '@/app/services/callApi';

export async function addProduct(body: Omit<Product, 'id'>) {
  const data = await callApi({
    path: 'products/add',
    method: 'POST',
    requestBody: body,
  });

  return data;
}
