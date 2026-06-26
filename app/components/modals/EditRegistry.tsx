"use client";

import { useState } from "react";
import { Room } from "@/app/types/room";
import { SelectAnimado } from "@/app/components/SelectAnimado";

interface Props {
    registro: Room;              // registro que viene de la tarjeta
    setRegistros: any;           // función para actualizar lista
    onClose: () => void;         // cerrar modal
}

export default function EditRegistry({ registro, setRegistros, onClose }: Props) {

    //  Estado del modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(true);

    //  Estados del formulario (se llenan con datos de la tarjeta)
    const [editHabitacion, setEditHabitacion] = useState(registro.habitacion);
    const [editNombre, setEditNombre] = useState(registro.clientes);
    const [editDni, setEditDni] = useState(registro.dni);
    const [editMonto, setEditMonto] = useState<number | ''>(registro.monto);
    const [editTipoPago, setEditTipoPago] = useState(registro.tipoPago);
    const [editEstado, setEditEstado] = useState(registro.estado);

    //  Guardar cambios
    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();

        // validación básica
        if (!editNombre || !editDni || editMonto === '') return;

        // actualizar lista (conecta con tus tarjetas)
        setRegistros((prev: Room[]) =>
            prev.map((reg) =>
                reg.id === registro.id
                    ? {
                        ...reg,
                        habitacion: editHabitacion,
                        clientes: editNombre,
                        dni: editDni.trim(),
                        monto: Number(editMonto),
                        tipoPago: editTipoPago,
                        estado: editEstado,
                    }
                    : reg
            )
        );

        // cerrar modal
        setIsEditModalOpen(false);
        onClose();
    };

    // 🔹 habitaciones mock (puedes moverlo a constantes)
    const HABITACIONES = ["101", "102", "103", "104"];
    const ESTADOS = [
        { label: "Ocupada", value: "ocupada" },
        { label: "En Limpieza", value: "en_limpieza" },
        { label: "Mantenimiento", value: "mantenimiento" },
        { label: "Disponible", value: "disponible" },
        { label: "Cancelado", value: "cancelado" },
    ];
    if (!isEditModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#FAF9F6]/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-[#FFFFFF] border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">

                {/*  Header */}
                <div className="bg-[#06457F] px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500">
                        </span>
                        <span>Editar Registro (Hab. {editHabitacion})
                        </span>
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSaveEdit} className="p-6 space-y-4 bg-[#FFFFFF]">

                    {/* Habitación + Estado */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                                Habitación
                            </label>
                            <SelectAnimado
                                value={editHabitacion}
                                onChange={(val) => setEditHabitacion(val)}
                                options={HABITACIONES.map((h) => ({ label: `Hab. ${h}`, value: h }))}
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                                Estado
                            </label>
                            <SelectAnimado
                                value={editEstado}
                                onChange={(val) => setEditEstado(val as any)}
                                options={ESTADOS}
                            />
                        </div>
                    </div>

                    {/* DNI */}
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                            DNI del huésped
                        </label>
                        <input
                            type="text"
                            value={editDni}
                            onChange={(e) => setEditDni(e.target.value)}
                            placeholder="Ej. 12345678"
                            className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Nombre */}
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={editNombre}
                            onChange={(e) => setEditNombre(e.target.value)}
                            placeholder="Ej. María García López"
                            className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Monto + Pago */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                                Monto (S/.)
                            </label>
                            <input
                                type="number"
                                value={editMonto}
                                onChange={(e) => setEditMonto(e.target.value === '' ? '' : Number(e.target.value))}
                                placeholder="0.00"
                                className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm placeholder-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">
                                Tipo de pago
                            </label>
                            <div className="relative">
                                <select
                                    value={editTipoPago}
                                    onChange={(e) => setEditTipoPago(e.target.value as any)}
                                    className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 appearance-none"
                                >
                                    <option>Efectivo</option>
                                    <option>Tarjeta</option>
                                    <option>Transferencia</option>
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/2 py-2.5 rounded-xl border border-slate-200 bg-[#F2F4F7] text-slate-500 text-sm font-medium hover:bg-slate-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2.5 bg-[#06457F] hover:bg-[#262B40] text-[#FAF9F6] cursor-pointer hover:text-white  rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}