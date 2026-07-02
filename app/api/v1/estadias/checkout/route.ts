import { NextResponse } from 'next/server';
import { realizarCheckout } from '@/app/services/estadias.service';
import { ApiError } from '@/app/lib/api-client';

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const estadia = await realizarCheckout(body);
    return NextResponse.json(estadia);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}