// app/api/v1/auth/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginRequest } from '@/app/services/auth.service';
import { ApiError } from '@/app/lib/api-client';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const { token, ...usuario } = await loginRequest({ username, password });
    // usuario = { username: "admin", role: "ADMIN", message: "Login exitoso" }

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ usuario });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}