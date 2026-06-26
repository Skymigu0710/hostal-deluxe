'use client';

import React, { useState } from 'react';
import { Room } from "@/app/types/room";


interface ModalExtraProps {
  room: Room;          // reutilizas el tipo central
  onClose: () => void;
  onConfirmar: (totalExtra: number) => void;
}

export default function ModalExtra({ room, onClose, onConfirmar  }: ModalExtraProps) {
  const PRECIO_HORA_EXTRA = 10;
  const [horasExtra, setHorasExtra] = useState(0);
  const [observacion, setObservacion] = useState("");
  const [montoManual, setMontoManual] = useState("");

  const handleConfirmar = () => {
    onConfirmar(totalExtra);
    onClose();
  };

  const totalExtra =
    horasExtra * PRECIO_HORA_EXTRA +
    (parseFloat(montoManual || "0") || 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[Inter] bg-[#FAF9F6]/20  backdrop-blur-sm">
      <div className="bg-[#FAF9F6] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* header */}
        <div className="bg-[#06457F] px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
              Habitación {room.clientes}
            </p>
            <h2 className="text-white font-bold text-lg leading-tight">
              Agregar Extra
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white cursor-pointer transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* body */}
        <div className="p-6 space-y-5">
          {/* horas extra */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Tiempo extra{" "}
              <span className="font-normal text-slate-400">
                (S/ {PRECIO_HORA_EXTRA}.00 / hora)
              </span>
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHorasExtra((h) => Math.max(0, h - 1))}
                className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-lg flex items-center justify-center transition-colors"
              >
                −
              </button>
              <span className="text-2xl font-bold text-slate-700 w-8 text-center">
                {horasExtra}
              </span>
              <button
                onClick={() => setHorasExtra((h) => h + 1)}
                className="w-9 h-9 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
              <span className="text-slate-400 text-sm ml-1">
                = S/ {(horasExtra * PRECIO_HORA_EXTRA).toFixed(2)}
              </span>
            </div>
          </div>

          {/* monto manual */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Monto adicional manual{" "}
              <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                S/
              </span>
              <input
                type="number"
                min="0"
                step="0.50"
                value={montoManual}
                onChange={(e) => setMontoManual(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm  focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* observacion */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Observación{" "}
              <span className="font-normal text-slate-400">(opcional)</span>
            </label>
            <textarea
              rows={3}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: cliente solicitó toallas adicionales..."
              className="w-full px-4 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm  focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* resumen */}
          {totalExtra > 0 && (
            <div className="bg-[#06457F]/5 border border-[#06457F]/15 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Total a cobrar extra
              </span>
              <span className="text-[#06457F] font-bold text-lg">
                S/ {totalExtra.toFixed(2)}
              </span>
            </div>
          )}
        </div>

        {/* footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border cursor-pointer border-slate-200 bg-[#F2F4F7] text-slate-500 text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="flex-1 py-2.5 bg-[#06457F] hover:bg-[#262B40] text-[#FAF9F6] cursor-pointer hover:text-white rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Confirmar extra
          </button>
        </div>
      </div>
    </div>
  );
}