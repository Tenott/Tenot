import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from '../_jwt';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });
  const payload = decodeJwt(token);
  if (!payload) return NextResponse.json({ user: null }, { status: 200 });

  return NextResponse.json({ user: { id: payload.sub, role: payload.role } }, { status: 200 });
}
