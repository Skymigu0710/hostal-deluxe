import { NextResponse } from 'next/server';
import { listarHabitaciones } from '@/app/services/habitaciones.service';
import { ApiError } from '@/app/lib/api-client';

export async function GET() {
  try {
    const habitaciones = await listarHabitaciones();
    return NextResponse.json(habitaciones);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}