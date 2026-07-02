'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Ajusta la ruta relativa según tu proyecto
import SelectCustom from "@/app/components/SelectCustom";
import { Room } from "@/app/types/room";
import EditRegistry from "@/app/components/modals/EditRegistry";
import { useEstadias } from "@/app/hooks/useEstadias";


export default function RegistrosPage() {
    const { data: registrosBackend, isLoading } = useEstadias();
    const [registros, setRegistros] = useState<Room[]>([]);

    useEffect(() => {
        if (registrosBackend) {
            setRegistros(registrosBackend);
        }
    }, [registrosBackend]);

    // Filtros
    const [filtroFecha, setFiltroFecha] = useState<string>('');
    const [filtroTurno, setFiltroTurno] = useState<string>('Todos');
    const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
    const [busqueda, setBusqueda] = useState<string>('');

    useEffect(() => {
        setFiltroFecha(new Date().toISOString().split('T')[0]);
    }, []);

    // Modales
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [selectedRegistro, setSelectedRegistro] = useState<Room | null>(null);

    // Formulario: Editar Registro
    const [editHabitacion, setEditHabitacion] = useState('');
    const [editDni, setEditDni] = useState('');
    const [editNombre, setEditNombre] = useState('');
    const [editMonto, setEditMonto] = useState<number | ''>('');
    const [editTipoPago, setEditTipoPago] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');




    const handleOpenEditModal = (reg: Room) => {
        setSelectedRegistro(reg);
        setEditHabitacion(reg.habitacion);
        setEditDni(reg.dni);
        setEditNombre(reg.clientes);
        setEditMonto(reg.monto);
        setEditTipoPago(reg.tipoPago);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedRegistro(null);
    };

    // Filtrado final
    const registrosFiltrados = registros.filter((reg) => {
        const coincideFecha = !filtroFecha || reg.fecha === filtroFecha;
        const coincideTurno = filtroTurno === 'Todos' || reg.turno === filtroTurno;
        const coincideEstado = filtroEstado === 'Todos' || reg.estado === filtroEstado;

        const query = busqueda.toLowerCase().trim();
        const coincideBusqueda =
            !query ||
            reg.habitacion.toLowerCase().includes(query) ||
            reg.clientes.toLowerCase().includes(query) ||
            reg.dni.toLowerCase().includes(query);

        return coincideFecha && coincideTurno && coincideEstado && coincideBusqueda;
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FAF9F6] font-[Inter] text-slate-200">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur border-b border-slate-100 px-6 md:px-10 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-800 font-black text-xl leading-none">
                            Gestión de Registros
                        </h1>
                        <p className="text-slate-400 text-xs mt-0.5">
                            Monitoreo y administración de entradas, habitaciones y turnos de facturación.
                        </p>
                    </div>

                </header>
                {/* Filtros */}
                <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full transition-all duration-200">
                    <div className="bg-[#FFFFFF] border rounded-2xl p-5 mb-8 shadow-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                                    Fecha del Día
                                </label>
                                <input
                                    type="date"
                                    value={filtroFecha}
                                    onChange={(e) => setFiltroFecha(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm"
                                />
                            </div>

                            <SelectCustom
                                label="Turno"
                                value={filtroTurno}
                                onChange={setFiltroTurno}
                                opciones={[
                                    { label: "Todos los Turnos", value: "Todos" },
                                    { label: "Matutino", value: "MATUTINO" },
                                    { label: "Vespertino", value: "VESPERTINO" },
                                    { label: "Nocturno", value: "NOCTURNO" },
                                ]}
                            />

                            <SelectCustom
                                label="Estado"
                                value={filtroEstado}
                                onChange={setFiltroEstado}
                                opciones={[
                                    { label: "Todos los Estados", value: "Todos" },
                                    { label: "Activa", value: "ACTIVA" },
                                    { label: "Finalizada", value: "FINALIZADA" },
                                    { label: "Cancelada", value: "CANCELADA" },
                                ]}
                            />
                            <div className="lg:col-span-2">
                                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                                    Búsqueda Rápida
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Habitación, huésped o DNI..."
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] placeholder-slate-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Listado */}
                    {registrosFiltrados.length === 0 ? (
                        <div className=" border  rounded-2xl p-12 text-center shadow-xl">
                            <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg font-bold text-slate-600 mb-1">Sin registros encontrados</h3>
                            <p className="text-slate-400 text-xs max-w-sm mx-auto">
                                No hay coincidencias con los filtros aplicados para la fecha seleccionada.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Escritorio: Tabla */}
                            <div className="hidden lg:block bg-[#FFFFFF] border  rounded-2xl overflow-hidden shadow-xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-900 bg-[#06457F]  text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase">
                                            <th className="py-4 px-6">HAB.</th>
                                            <th className="py-4 px-6">HUÉSPED</th>
                                            <th className="py-4 px-6">DNI</th>
                                            <th className="py-4 px-6">LLEGADA</th>
                                            <th className="py-4 px-6">TURNO</th>
                                            <th className="py-4 px-6">PAGO</th>
                                            <th className="py-4 px-6">MONTO</th>
                                            <th className="py-4 px-6">ESTADO</th>
                                            <th className="py-4 px-6 text-right">ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-300 text-sm">
                                        {registrosFiltrados.map((reg) => (
                                            <tr
                                                key={reg.id}
                                                className={`hover:bg-[#E2E8F0] transition-colors ${reg.estado === 'cancelado' ? 'opacity-55' : ''
                                                    }`}
                                            >
                                                <td className="py-4 px-6  ">
                                                    <span className="text-slate-600 px-2.5 py-1 ">
                                                        {reg.habitacion}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-medium text-slate-600">{reg.clientes}</td>
                                                <td className="py-4 px-6 text-slate-600">{reg.dni}</td>
                                                <td className="py-4 px-6 text-slate-600 font-mono">{reg.horaEntrada}</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${reg.turno === 'MATUTINO' ? 'bg-amber-500/10 text-amber-400' :
                                                            reg.turno === 'VESPERTINO' ? 'bg-orange-500/10 text-orange-400' :
                                                                'bg-indigo-500/10 text-indigo-400'
                                                        }`}>
                                                        {reg.turno}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-600">{reg.tipoPago}</td>
                                                <td className="py-4 px-6 font-bold text-slate-600 ">
                                                    S/ {reg.monto.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${reg.estado === 'ACTIVA' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                                                        reg.estado === 'FINALIZADA' ? 'bg-slate-500/15 text-slate-400 border border-slate-500/25' :
                                                            reg.estado === 'CANCELADA' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
                                                                'bg-slate-500/15 text-slate-400 border border-slate-500/25'
                                                        }`}>
                                                        {reg.estado}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => handleOpenEditModal(reg)}
                                                        className="px-3 py-1.5 bg-[#06457F] hover:bg-[#262B40] text-[#FAF9F6] cursor-pointer hover:text-white rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        Editar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </>
                    )}
                </div>

            </main>


            {/* MODAL: EDITAR REGISTRO */}
            {isEditModalOpen && selectedRegistro && (
                <EditRegistry registro={selectedRegistro} setRegistros={setRegistros} onClose={handleCloseEditModal} />
            )}


        </div>
    );
}