import { NextResponse } from 'next/server';
import { realizarCheckIn } from '@/app/services/estadias.service';
import { ApiError } from '@/app/lib/api-client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const estadia = await realizarCheckIn(body);
    return NextResponse.json(estadia, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}