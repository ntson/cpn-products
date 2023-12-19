import { productFactory } from '@/app/mocks/products';
import { HttpResponse, http } from 'msw';

export const handler = [
  http.get('https://dummyjson.com/products', () => {
    return HttpResponse.json(productFactory.buildList(5));
  }),
  http.post('https://dummyjson.com/products/add', () => {}),
  http.get('https://dummyjson.com/users/1', () => {}),
  http.post('https://dummyjson.com/auth/login', () => {}),
];
