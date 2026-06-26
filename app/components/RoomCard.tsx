'use client';

import React, { useState } from 'react';
import { Room } from "@/app/types/room";
import Stat from "../components/roomCard/Stat";
import EstadoBadge from "../components/roomCard/EstadoBadge";

interface ModalExtraProps {
  room: Room;
  onExtra: (room: Room) => void; // función para manejar el evento de agregar extra
  onCancelar: (room: Room) => void;
}



export default function RoomCard({ room, onExtra, onCancelar }: ModalExtraProps) {


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* franja superior de color por estado */}
      <div
        className={`h-1 w-full ${room.estado === "ocupada" ? "bg-emerald-400" : "bg-amber-400"
          }`}
      />

      <div className="p-5">
        {/* fila superior: número + estado + kill */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-[#06457F]/8 rounded-xl px-3 py-1.5">
              <span className="text-[#06457F] font-black text-xl leading-none">
                {room.habitacion}
              </span>
            </div>
            <EstadoBadge estado={room.estado} />
          </div>
          {/* kill — extremo derecho */}
          <button
            title="Marcar en lista negra"
            className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg p-1.5 transition-colors flex-shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </button>
        </div>

        {/* clientes */}
        <p className="text-slate-700 font-semibold text-sm leading-snug mb-3">
          {room.clientes}
        </p>

        {/* datos en grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Stat label="Ingreso" value={room.horaEntrada} />
          <Stat label="Duración" value={`${room.duracion}h`} />
          <Stat
            label="Monto"
            value={`S/ ${room.monto.toFixed(2)}`}
            accent
          />
          <Stat label="Pago" value={room.tipoPago} />
          <Stat label="Tiempo activo" value={room.tiempoActivo} colSpan />
          <Stat label="Monto extra a pagar" value={`S/ ${room.montoExtra.toFixed(2)}`} colSpan />
        </div>
        {/* acciones */}
        <div className="flex gap-2">
          <button className="flex-1 py-2 px-3 bg-gradient-to-r from-[#06457F] to-[#262B40] hover:to-[#06457F] text-white font-semibold text-xs rounded-xl transition-all duration-200 shadow-sm">
            Finalizar estadía
          </button>
          <button
            onClick={() => onCancelar(room)}
            className="py-2 px-4 rounded-xl border cursor-pointer border-slate-200 bg-[#F2F4F7] text-slate-500 text-xs font-medium hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => onExtra(room)}
            className="py-2 px-4 border border-[#06457F] text-[#06457F] hover:bg-[#06457F] hover:text-white font-semibold text-xs rounded-xl transition-all duration-200"
          >
            Extra
          </button>
        </div>
      </div>
    </div>
  );
}