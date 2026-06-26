"use client";

import { SelectAnimado } from "../SelectAnimado";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  // Estados del formulario
  newHabitacion: string;
  setNewHabitacion: (v: string) => void;
  newDni: string;
  handleDniChange: (v: string) => void;
  newNombre: string;
  setNewNombre: (v: string) => void;
  newMonto: number | '';        // ← corregido
  setNewMonto: (v: number | '') => void;  // ← corregido
  newTipoPago: string;
  setNewTipoPago: (v: any) => void;
  newNotas: string;
  setNewNotas: (v: string) => void;
  clientes: { dni: string; nombre: string; estado: string }[];
  HABITACIONES: string[];
}

export default function NewRegitry({
  isOpen, onClose, onSubmit,
  newHabitacion, setNewHabitacion,
  newDni, handleDniChange,
  newNombre, setNewNombre,
  newMonto, setNewMonto,
  newTipoPago, setNewTipoPago,
  newNotas, setNewNotas,
  clientes, HABITACIONES,
}: Props) {
  if (!isOpen) return null;

  const clienteEncontrado = clientes.find(c => c.dni === newDni.trim());
  const estaEnListaNegra = clienteEncontrado?.estado === 'Lista Negra';
  const esClienteRegular = clienteEncontrado?.estado === 'Regular';

  return (
    <div className="fixed inset-0 bg-[#FAF9F6]/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFFFF] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="bg-[#06457F] px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]"></span>
            <span>Registrar Entrada</span>
          </h3>
          <button onClick={onClose} className="text-slate-400  cursor-pointer hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 bg-[#FFFFFF]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Habitación
              </label>
              <SelectAnimado
                value={newHabitacion}
                onChange={(val) => setNewHabitacion(val)}
                options={HABITACIONES.map((h) => ({ label: `Hab. ${h}`, value: h }))}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Hora de entrada
              </label>
              <input
                type="text"
                disabled
                value={`${new Date().toTimeString().split(' ')[0].substring(0, 5)} (Hora actual)`}
                className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm cursor-not-allowed select-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              DNI del Huésped
            </label>
            <input
              type="text"
              required
              maxLength={8}
              placeholder="Ingresa DNI para buscar..."
              value={newDni}
              onChange={(e) => handleDniChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm"
            />
            {newDni.trim().length >= 4 && (
              <div className="mt-1.5 text-[11px] font-semibold">
                {estaEnListaNegra ? (
                  <span className="text-red-400">❌ CLIENTE EN LISTA NEGRA: Registro bloqueado</span>
                ) : clienteEncontrado ? (
                  <span className="text-green-400">✔️ Cliente regular encontrado: {clienteEncontrado.nombre}</span>
                ) : (
                  <span className="text-amber-400">✏️ Cliente nuevo. Se registrará automáticamente.</span>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Nombre y Apellidos
            </label>
            <input
              type="text"
              required
              placeholder="Nombre completo"
              value={newNombre}
              onChange={(e) => setNewNombre(e.target.value)}
              disabled={esClienteRegular}
              className={`w-full px-3 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm ${esClienteRegular ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Monto (S/)
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="80.00"
                value={newMonto}
                onChange={(e) => setNewMonto(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Tipo de Pago
              </label>
              <SelectAnimado
                value={newTipoPago}
                onChange={(val) => setNewTipoPago(val)}
                options={[
                  { label: "Efectivo", value: "Efectivo" },
                  { label: "Tarjeta", value: "Tarjeta" },
                  { label: "Transferencia", value: "Transferencia" }
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Notas / Observaciones
            </label>
            <textarea
              placeholder="Detalles sobre el equipaje, toallas, DNI físico escaneado, etc."
              value={newNotas}
              onChange={(e) => setNewNotas(e.target.value)}
              className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm h-20 resize-none"
            />
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 rounded-xl border cursor-pointer border-slate-200 bg-[#F2F4F7] text-slate-500 text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={estaEnListaNegra}
              className="w-1/2 py-3 bg-[#06457F] hover:bg-[#262B40] text-[#FAF9F6] cursor-pointer hover:text-white font-bold rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}