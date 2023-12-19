import { User } from '@/app/models/user';
import { callApi } from '@/app/services/callApi';
import { jwtDecode } from 'jwt-decode';

export async function getCurrentUser() {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return null;
  }

  try {
    const payload: User & { exp: number } = jwtDecode(token);

    const { exp } = payload;

    if (Date.now() / 1000 > exp) {
      return null;
    }

    const path = `users/${payload.id}`;
    const data = await callApi({ path, method: 'GET' });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
