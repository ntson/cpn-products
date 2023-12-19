import { User } from '@/app/models/user';
import { callApi } from '@/app/services/callApi';

export async function login(body: Pick<User, 'username' | 'password'>) {
  const data = await callApi({
    path: 'auth/login',
    method: 'POST',
    requestBody: body,
  });

  return data;
}
