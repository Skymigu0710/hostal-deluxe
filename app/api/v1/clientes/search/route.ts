import { NextResponse } from 'next/server';
import { buscarClientes } from '@/app/services/clientes.service';
import { ApiError } from '@/app/lib/api-client';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const termino = searchParams.get('termino') ?? '';

    if (!termino.trim()) {
      return NextResponse.json([]);
    }

    const clientes = await buscarClientes(termino);
    return NextResponse.json(clientes);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}