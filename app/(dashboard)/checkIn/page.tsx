'use client';

import { useState } from "react";
import ModalExtra from "@/app/components/modals/ExtraRegistry";
import RoomSection from "@/app/components/RoomSection";
import { Room } from "@/app/types/room";
import Sidebar from "@/app/components/Sidebar";
import ModalNuevoRegistro from "@/app/components/modals/NewRegitry";
import { useEstadiasActivas } from "@/app/hooks/useEstadiasActivas";

export default function RoomManagement() {


  /*  STATES PRINCIPALES*/
  const { data: rooms = [], isLoading, refetch } = useEstadiasActivas();

  const [extraRoom, setExtraRoom] = useState<Room | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  /* FILTROS PARA TARJETAS*/
  const ocupadas = rooms.filter(r => r.estado === "ocupada");
  const reservadas = rooms.filter(r => r.estado === "reservada");


const handleCheckout = async (room: Room) => {
  try {
    const res = await fetch('/api/v1/estadias/checkout', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estadiaId: Number(room.id) }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'No se pudo hacer el checkout');
    }
    refetch(); // la habitación desaparece de "activas" porque pasa a FINALIZADA
  } catch (err) {
    console.error(err);
    alert(err instanceof Error ? err.message : 'Error al hacer checkout');
  }
};
  /* muestra modal extra y actualiza monto*/
const handleConfirmarExtra = (totalExtra: number) => {
  // ⚠️ TODO: falta endpoint/tabla en el backend para persistir montoExtra
  alert('Funcionalidad de extras pendiente: falta soporte en el backend.');
  setExtraRoom(null);
};


return (
  <div className="flex flex-col md:flex-row min-h-screen bg-[#FAF9F6] font-[Inter]">
    <Sidebar />
    <main className="flex-1 flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur border-b border-slate-100 px-6 md:px-10 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-slate-800 font-black text-xl leading-none">
            Control de Habitaciones
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            {ocupadas.length} ocupadas · {reservadas.length} reservadas
          </p>
        </div>

        {/* botón abrir modal */}
        <button className="px-5 py-2.5 bg-[#06457F] hover:bg-[#262B40] text-white cursor-pointer hover:text-white rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15  disabled:cursor-not-allowed"
          onClick={() => setIsNewModalOpen(true)}>
          <span className="text-lg leading-none">+</span> Registrar
        </button>
      </header>
      <div className="flex-1 px-6 md:px-10 py-8 max-w-7xl w-full mx-auto">
        {/* TARJETAS */}
        <RoomSection title="Ocupadas" rooms={ocupadas} onExtra={setExtraRoom} onCancelar={handleCheckout} />
        <RoomSection title="Reservas" rooms={reservadas} onExtra={setExtraRoom} onCancelar={handleCheckout} />
      </div>
    </main>
    {/* MODAL NUEVO */}
    <ModalNuevoRegistro isOpen={isNewModalOpen} onClose={() => setIsNewModalOpen(false)} />
    {/* modal extra */}
    {extraRoom && (
      <ModalExtra room={extraRoom} onClose={() => setExtraRoom(null)} onConfirmar={handleConfirmarExtra} />
    )}
  </div>
);
}