import { NextResponse } from 'next/server';
import { listarEstadiasActivas } from '@/app/services/estadias.service';
import { ApiError } from '@/app/lib/api-client';

export async function GET() {
  try {
    const estadias = await listarEstadiasActivas();
    return NextResponse.json(estadias);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}