import { NextResponse } from 'next/server';

export async function POST() {
  const out = NextResponse.json({ ok: true });
  out.cookies.set({
    name: 'token',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return out;
}
