import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  context: any
) {
  const path = context?.params?.path as string[];

  const url = `${process.env.API_URL}/${path.join('/')}`;

  const response = await fetch(url, {
    headers: {
      authorization: request.headers.get('authorization') ?? '',
    },
  });

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: response.headers,
  });
}
