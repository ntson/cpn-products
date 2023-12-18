interface Params<TRequestBody = any> {
  path: string;
  method: string;
  requestBody?: TRequestBody;
  authorization?: string;
}

export async function callApi<TRequestBody = any>(
  params: Params<TRequestBody>
) {
  const { path, method, requestBody, authorization } = params;

  const baseUrl = 'https://dummyjson.com';

  let body: string | undefined;
  if (requestBody) {
    body = JSON.stringify(requestBody);
  }

  const res = await fetch(`${baseUrl}/${path}`, {
    method,
    body,
    headers: {
      'Content-type': 'application/json',
      authorization,
    } as HeadersInit,
  });

  const data = await res.json();

  return data;
}
