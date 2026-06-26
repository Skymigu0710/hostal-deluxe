'use client';

export default function EstadoBadge({ estado }: { estado: string }) {
  const isOcupada = estado === "ocupada";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isOcupada
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOcupada ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {isOcupada ? "Ocupada" : "Reservada"}
    </span>
  );
}