'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar'; // Ajusta la ruta relativa según tu proyecto
import SelectCustom from "@/app/components/SelectCustom";
import { Room } from "@/app/types/room";
import EditRegistry from "@/app/components/modals/EditRegistry";

const REGISTROS_INICIALES: Room[] = [
    {
        id: 'reg-1',
        habitacion: '101',
        clientes: 'Juan Pérez',
        dni: '12345678',
        horaEntrada: '08:30',
        turno: 'Día',
        estado: 'ocupada',
        monto: 80,
        tipoPago: 'Efectivo',
        notas: 'Ninguna',
        duracion: 2.5,
        tiempoActivo: '2:40',
        fecha: new Date().toISOString().split('T')[0],
        montoExtra: 0,
    },
    {
      id: 'reg-2',
        habitacion: '102',
        clientes: 'Juan Pérez',
        dni: '12345678',
        horaEntrada: '08:30',
        turno: 'Día',
        estado: 'ocupada',
        monto: 80,
        tipoPago: 'Efectivo',
        notas: 'Ninguna',
        duracion: 2.5,
        tiempoActivo: '2:40',
        fecha: new Date().toISOString().split('T')[0],
        montoExtra: 0,
    },
    {
        id: 'reg-3',
        habitacion: '103',
        clientes: 'Juan Pérez',
        dni: '12345678',
        horaEntrada: '08:30',
        turno: 'Día',
        estado: 'ocupada',
        monto: 80,
        tipoPago: 'Efectivo',
        notas: 'Ninguna',
        duracion: 2.5,
        tiempoActivo: '2:40',
        fecha: new Date().toISOString().split('T')[0],
         montoExtra: 0,
    },
];

export default function RegistrosPage() {
    const [registros, setRegistros] = useState<Room[]>(REGISTROS_INICIALES);
    const HABITACIONES = ['101', '102', '103', '201', '202', '203'];

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

    const handleSaveEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRegistro || !editNombre || !editDni || editMonto === '') return;

        setRegistros((prev) =>
            prev.map((reg) =>
                reg.id === selectedRegistro.id
                    ? {
                        ...reg,
                        habitacion: editHabitacion,
                        clientes: editNombre,
                        dni: editDni.trim(),
                        monto: Number(editMonto),
                        tipoPago: editTipoPago,
                    }
                    : reg
            )
        );

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
                                    { label: "Día", value: "Día" },
                                    { label: "Noche", value: "Noche" },
                                ]}
                            />

                            <SelectCustom
                                label="Estado"
                                value={filtroEstado}
                                onChange={setFiltroEstado}
                                opciones={[
                                    { label: "Todos los Estados", value: "Todos" },
                                    { label: "Ocupada", value: "ocupada" },
                                    { label: "En Limpieza", value: "limpieza" },
                                    { label: "Mantenimiento", value: "Mantenimiento" },
                                    { label: "Disponible", value: "Disponible" },
                                    { label: "Cancelado", value: "Cancelado" },
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
                                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${reg.turno === 'Día' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'
                                                        }`}>
                                                        {reg.turno}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-600">{reg.tipoPago}</td>
                                                <td className="py-4 px-6 font-bold text-slate-600 ">
                                                    S/ {reg.monto.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${reg.estado === 'ocupada' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                                                        reg.estado === 'reservada' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' :
                                                            reg.estado === 'cancelado' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
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

                            {/* Móvil: Tarjetas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                                {registrosFiltrados.map((reg) => (
                                    <div
                                        key={reg.id}
                                        className={`bg-[#00072D] border border-slate-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors ${reg.estado === 'cancelado' ? 'opacity-60' : ''
                                            }`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <span className="bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-black px-3 py-1 rounded-xl border border-[#C9A84C]/15">
                                                HAB. {reg.habitacion}
                                            </span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${reg.estado === 'ocupada' ? 'bg-green-500/10 text-green-400' :
                                                reg.estado === 'reservada' ? 'bg-amber-500/10 text-amber-400' :
                                                 reg.estado === 'limpieza' ? 'bg-amber-500/10 text-amber-400' :
                                                 reg.estado === 'mantenimiento' ? 'bg-amber-500/10 text-amber-400' :
                                                    reg.estado === 'cancelado' ? 'bg-red-500/10 text-red-400' :
                                                        reg.estado === 'disponible' ? 'bg-blue-500/10 text-blue-400' :
                                                            'bg-slate-500/10 text-slate-400'
                                                }`}>
                                                {reg.estado}
                                            </span>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-bold text-white">{reg.clientes}</h4>
                                            <p className="text-xs text-slate-400 mt-1">DNI: {reg.dni}</p>

                                            <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-[#000523]/40 p-3 rounded-xl border border-slate-800/40">
                                                <div>
                                                    <span className="text-slate-500 block">Llegada</span>
                                                    <span className="text-white font-semibold font-mono">{reg.horaEntrada}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Turno</span>
                                                    <span className="text-white font-semibold">{reg.turno}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Monto</span>
                                                    <span className="text-[#C9A84C] font-bold font-mono">S/ {reg.monto.toFixed(2)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-500 block">Método</span>
                                                    <span className="text-slate-300">{reg.tipoPago}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-2 border-t border-slate-800/50">
                                            <button
                                                onClick={() => handleOpenEditModal(reg)}
                                                className="px-4 py-2 w-full bg-slate-850 hover:bg-[#C9A84C]/20 text-slate-200 hover:text-[#C9A84C] font-bold text-xs rounded-xl transition-colors border border-slate-700"
                                            >
                                                Editar Registro
                                            </button>
                                        </div>
                                    </div>
                                ))}
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