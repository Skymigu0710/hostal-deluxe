'use client';

import { useState } from "react";
import ModalExtra from "@/app/components/modals/ExtraRegistry";
import RoomSection from "@/app/components/RoomSection";
import { Room } from "@/app/types/room";
import Sidebar from "@/app/components/Sidebar";
import ModalNuevoRegistro from "@/app/components/modals/NewRegitry";

export default function RoomManagement() {

  /* =========================
     📦 DATA INICIAL (tarjetas)
  ==========================*/
  const initialRooms: Room[] = [
    {
      id: 'reg-1',
      habitacion: '101',
      clientes: 'Juan Pérez',
      dni: '12345678',
      horaEntrada: '08:30',
      turno: 'Día',
      estado: 'ocupada',
      monto: 80,
      tipoPago: 'Tarjeta',
      notas: 'Ninguna',
      duracion: 2.5,
      tiempoActivo: '2:40',
      fecha: new Date().toISOString().split('T')[0],
      montoExtra: 0,
    },
    {
      id: 'reg-2',
      habitacion: '101',
      clientes: 'Juan Pérez',
      dni: '12345678',
      horaEntrada: '08:30',
      turno: 'Día',
      estado: 'reservada',
      monto: 80,
      tipoPago: 'Efectivo',
      notas: 'Ninguna',
      duracion: 2.5,
      tiempoActivo: '2:40',
      fecha: new Date().toISOString().split('T')[0],
      montoExtra: 0,
    },
    // ... (dejas los demás igual)
  ];

  const HABITACIONES = ['101', '102', '103', '201', '202', '203'];

  /* =========================
     🧠 STATES PRINCIPALES
  ==========================*/
  const [rooms, setRooms] = useState(initialRooms);
  const [extraRoom, setExtraRoom] = useState<Room | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  /* =========================
     📊 FILTROS PARA TARJETAS
  ==========================*/
  const ocupadas = rooms.filter(r => r.estado === "ocupada");
  const reservadas = rooms.filter(r => r.estado === "reservada");

  /* =========================
     👤 CLIENTES (base local)
  ==========================*/
  const [clientes, setClientes] = useState([
    { id: '1', nombre: 'Juan Pérez', dni: '12345678', estado: 'Regular' },
    { id: '2', nombre: 'Carlos García', dni: '11223344', estado: 'Lista Negra' },
  ]);

  /* =========================
     📝 FORM NUEVO REGISTRO
  ==========================*/
  const [newHabitacion, setNewHabitacion] = useState('101');
  const [newDni, setNewDni] = useState('');
  const [newNombre, setNewNombre] = useState('');
  const [newMonto, setNewMonto] = useState<number | ''>('');
  const [newTipoPago, setNewTipoPago] = useState<'Efectivo' | 'Tarjeta'>('Efectivo');
  const [newNotas, setNewNotas] = useState('');

  /* =========================
     ⚠️ MODAL LISTA NEGRA
  ==========================*/
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningClientName, setWarningClientName] = useState('');

  /* =========================
     🔍 VALIDACIÓN DNI
  ==========================*/
  const handleDniChange = (dniVal: string) => {
    setNewDni(dniVal);

    const client = clientes.find(c => c.dni === dniVal.trim());

    if (client) {
      if (client.estado === 'Lista Negra') {
        setWarningClientName(client.nombre);
        setIsWarningModalOpen(true);
        setNewNombre('');
      } else {
        setNewNombre(client.nombre);
      }
    } else {
      setNewNombre('');
    }
  };
  /* =========================
   CANCELAR REGISTRO (eliminar tarjeta)
==========================*/
  const handleCancelar = (room: Room) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === room.id
          ? { ...r, estado: "cancelado" }  // queda en el registro del turno
          : r
      ).filter((r) => r.id !== room.id)   // desaparece del contenedor visual
    );
  };
  /* =========================
 muestra modal extra y actualiza monto
==========================*/
  const handleConfirmarExtra = (totalExtra: number) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === extraRoom?.id
          ? { ...r, montoExtra: totalExtra }
          : r
      )
    );
    setExtraRoom(null);
  };

  /* =========================
     ➕ CREAR REGISTRO (CLAVE)
  ==========================*/
  const handleCreateRegistro = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDni || !newNombre || newMonto === '') return;

    const client = clientes.find(c => c.dni === newDni.trim());

    // 🚫 bloquear lista negra
    if (client && client.estado === 'Lista Negra') {
      setWarningClientName(client.nombre);
      setIsWarningModalOpen(true);
      return;
    }

    // 🆕 registrar cliente nuevo
    if (!client) {
      setClientes(prev => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          nombre: newNombre,
          dni: newDni,
          estado: 'Regular',
        }
      ]);
    }

    /* =========================
       🔥 CREAR ROOM (LO IMPORTANTE)
       👉 Esto alimenta las tarjetas
    ==========================*/
    const newRoom: Room = {
      id: `reg-${Date.now()}`,
      habitacion: newHabitacion,
      clientes: newNombre,
      dni: newDni,
      horaEntrada: new Date().toTimeString().slice(0, 5),
      turno: 'Día',
      monto: newMonto,
      tipoPago: newTipoPago,
      notas: newNotas || 'Ninguna',
      duracion: 4,
      tiempoActivo: "00:00",
      estado: "ocupada",
      fecha: new Date().toISOString().split('T')[0],
      montoExtra: 0,
    };

    // ✅ actualizar tarjetas en tiempo real
    setRooms(prev => [newRoom, ...prev]);

    // 🔄 reset form
    setNewHabitacion('101');
    setNewDni('');
    setNewNombre('');
    setNewMonto('');
    setNewTipoPago('Efectivo');
    setNewNotas('');

    setIsNewModalOpen(false);
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
          <RoomSection title="Ocupadas" rooms={ocupadas} onExtra={setExtraRoom} onCancelar={handleCancelar} />
          <RoomSection title="Reservas" rooms={reservadas} onExtra={setExtraRoom} onCancelar={handleCancelar} />
        </div>
      </main>
      {/* MODAL NUEVO */}
      <ModalNuevoRegistro
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateRegistro}
        newHabitacion={newHabitacion}
        setNewHabitacion={setNewHabitacion}
        newDni={newDni}
        handleDniChange={handleDniChange}
        newNombre={newNombre}
        setNewNombre={setNewNombre}
        newMonto={newMonto}
        setNewMonto={setNewMonto}
        newTipoPago={newTipoPago}
        setNewTipoPago={setNewTipoPago}
        newNotas={newNotas}
        setNewNotas={setNewNotas}
        clientes={clientes}
        HABITACIONES={HABITACIONES}
      />
      {/* MODAL CRÍTICO: ADVERTENCIA LISTA NEGRA */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b0202] border-2 border-red-500/60 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto animate-pulse">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <h3 className="text-xl font-extrabold text-red-500 uppercase tracking-wider">
                INGRESO BLOQUEADO
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                <p>
                  Huésped: <b className="text-white underline">{warningClientName}</b>
                </p>
                <p>
                  Este cliente está registrado en la <span className="text-red-400 font-bold">LISTA NEGRA</span> de Hostal Deluxe.
                </p>
                <p className="text-xs text-slate-400">
                  Por políticas de seguridad del establecimiento, tiene estrictamente prohibido el alquiler de habitaciones.
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsWarningModalOpen(false);
                    setNewDni('');
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Entendido / Cancelar Registro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* modal extra */}
      {extraRoom && (
        <ModalExtra room={extraRoom} onClose={() => setExtraRoom(null)} onConfirmar={handleConfirmarExtra} />
      )}
    </div>
  );
}