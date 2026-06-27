"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useInventario } from "@/app/hooks/useInventario";
import { Producto } from "@/app/types/inventario";
import { LineaVenta, Venta } from "@/app/types/venta";

export default function Ventas() {
    const { productos, descontarStock } = useInventario();
    const [lineas, setLineas] = useState<LineaVenta[]>([]);
    const [metodoPago, setMetodoPago] = useState<Venta["metodoPago"]>("Efectivo");
    const [ventasGuardadas, setVentasGuardadas] = useState<Venta[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("todas");

    const productosFiltrados = productos.filter((p) =>
        p.stock > 0 &&
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtroCategoria === "todas" || p.categoria === filtroCategoria)
    );

    const total = lineas.reduce((acc, l) => acc + l.subtotal, 0);

    const agregarLinea = (producto: Producto) => {
        setLineas((prev) => {
            const existe = prev.find((l) => l.productoId === producto.id);
            const stockDisponible = producto.stock;
            if (existe) {
                if (existe.cantidad >= stockDisponible) return prev; // no supera stock
                return prev.map((l) =>
                    l.productoId === producto.id
                        ? { ...l, cantidad: l.cantidad + 1, subtotal: (l.cantidad + 1) * l.precioUnitario }
                        : l
                );
            }
            return [...prev, {
                id: `linea-${Date.now()}`,
                productoId: producto.id,
                nombre: producto.nombre,
                cantidad: 1,
                precioUnitario: producto.precioVenta,
                subtotal: producto.precioVenta,
            }];
        });
    };

    const cambiarCantidad = (id: string, cantidad: number) => {
        if (cantidad <= 0) {
            setLineas((prev) => prev.filter((l) => l.id !== id));
            return;
        }
        const linea = lineas.find((l) => l.id === id);
        const producto = productos.find((p) => p.id === linea?.productoId);
        if (producto && cantidad > producto.stock) return; // no supera stock
        setLineas((prev) =>
            prev.map((l) =>
                l.id === id ? { ...l, cantidad, subtotal: cantidad * l.precioUnitario } : l
            )
        );
    };

    const quitarLinea = (id: string) => {
        setLineas((prev) => prev.filter((l) => l.id !== id));
    };

    const confirmarVenta = () => {
        if (lineas.length === 0) return;
        lineas.forEach((l) => descontarStock(l.productoId, l.cantidad));
        const nueva: Venta = {
            id: `venta-${Date.now()}`,
            lineas,
            total,
            metodoPago,
            creadoEn: new Date().toISOString(),
        };
        // CON DB: await ventaService.crear(nueva)
        setVentasGuardadas((prev) => [nueva, ...prev]);
        setLineas([]);
        setMetodoPago("Efectivo");
    };

    const field = "w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

    const CATEGORIA_COLOR: Record<string, string> = {
        bebida: "bg-blue-50 text-blue-600",
        snack: "bg-amber-50 text-amber-600",
        piqueo: "bg-emerald-50 text-emerald-600",
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FAF9F6] font-[Inter]">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen">

                {/* HEADER */}
                <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur border-b border-slate-100 px-6 md:px-10 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-800 font-black text-xl leading-none">Ventas</h1>
                        {lineas.length > 0 && (
                            <p className="text-[#06457F] text-xs font-medium mt-0.5">
                                {lineas.length} producto{lineas.length > 1 ? "s" : ""} en venta actual
                            </p>
                        )}
                    </div>
                </header>

                <div className="px-6 md:px-10 py-6 flex-1 flex flex-col xl:flex-row gap-6">

                    {/* ── IZQUIERDA: catálogo ── */}
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-5 mb-5 shadow-xl">
                            <label className=" text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                                Productos
                            </label>
                            {/* Filtros */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className={field}
                                />
                                <select
                                    value={filtroCategoria}
                                    onChange={(e) => setFiltroCategoria(e.target.value)}
                                    className="px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="todas">Todas</option>
                                    <option value="bebida">Bebidas</option>
                                    <option value="snack">Snacks</option>
                                    <option value="piqueo">Piqueos</option>
                                </select>
                            </div>
                        </div>


                        {/* Grid de productos */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {productosFiltrados.length === 0 ? (
                                <p className="col-span-3 text-center text-slate-400 text-sm py-10">
                                    Sin productos disponibles.
                                </p>
                            ) : (
                                productosFiltrados.map((p) => {
                                    const enCarrito = lineas.find((l) => l.productoId === p.id);
                                    return (
                                        <button
                                            key={p.id}
                                            onClick={() => agregarLinea(p)}
                                            className={`bg-[#FFFFFF] border border-slate-200 rounded-2xl p-5 mb-5 shadow-xl text-left hover:shadow-sm transition-all group relative ${enCarrito ? "border-[#06457F]/40" : "border-slate-100 hover:border-[#06457F]/20"
                                                }`}
                                        >
                                            {/* badge cantidad en carrito */}
                                            {enCarrito && (
                                                <span className="absolute top-3 right-3 bg-[#06457F] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                                    {enCarrito.cantidad}
                                                </span>
                                            )}
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${CATEGORIA_COLOR[p.categoria]}`}>
                                                {p.categoria}
                                            </span>
                                            <p className="text-slate-700 font-semibold text-sm mt-2 group-hover:text-[#06457F] transition-colors">
                                                {p.nombre}
                                            </p>
                                            <p className="text-[#06457F] font-bold text-sm mt-1">
                                                S/ {p.precioVenta.toFixed(2)}
                                            </p>
                                            <p className={`text-[10px] font-medium mt-1 ${p.stock <= p.stockMinimo ? "text-red-400" : "text-slate-400"}`}>
                                                Stock: {p.stock}
                                            </p>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* ── DERECHA: venta actual + historial ── */}
                    <div className="w-full xl:w-80 flex flex-col gap-4">

                        {/* Venta actual */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                            <div className="px-4 py-3 border-b bg-[#06457F] border-slate-100 flex items-center justify-between">
                                <h2 className="text-white font-bold text-sm">Venta actual</h2>
                                {lineas.length > 0 && (
                                    <button
                                        onClick={() => setLineas([])}
                                        className="text-[10px] text-red-400 hover:text-red-500 font-medium transition-colors"
                                    >
                                        Limpiar
                                    </button>
                                )}
                            </div>

                            {/* Líneas */}
                            <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                                {lineas.length === 0 ? (
                                    <p className="text-center text-slate-400 text-xs py-8 px-4">
                                        Toca un producto para agregarlo.
                                    </p>
                                ) : (
                                    lineas.map((l) => (
                                        <div key={l.id} className="flex items-center gap-2 px-4 py-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-700 text-sm font-medium truncate">{l.nombre}</p>
                                                <p className="text-slate-400 text-xs">S/ {l.precioUnitario.toFixed(2)} c/u</p>
                                            </div>
                                            {/* +/- */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => cambiarCantidad(l.id, l.cantidad - 1)}
                                                    className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold transition-colors"
                                                >
                                                    −
                                                </button>
                                                <span className="w-5 text-center text-sm font-bold text-slate-700">
                                                    {l.cantidad}
                                                </span>
                                                <button
                                                    onClick={() => cambiarCantidad(l.id, l.cantidad + 1)}
                                                    className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-slate-700 text-sm font-semibold w-14 text-right">
                                                S/ {l.subtotal.toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => quitarLinea(l.id)}
                                                className="text-slate-300 hover:text-red-400 transition-colors text-lg leading-none"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Total + pago + confirmar */}
                            {lineas.length > 0 && (
                                <div className="border-t border-slate-100 p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500 text-sm font-medium">Total</span>
                                        <span className="text-[#06457F] font-black text-xl">S/ {total.toFixed(2)}</span>
                                    </div>
                                    <select
                                        value={metodoPago}
                                        onChange={(e) => setMetodoPago(e.target.value as Venta["metodoPago"])}
                                        className={field}
                                    >
                                        <option>Efectivo</option>
                                        <option>Tarjeta</option>
                                        <option>Transferencia</option>
                                    </select>
                                    <button
                                        onClick={confirmarVenta}
                                        className="w-full py-2.5 rounded-xl bg-[#06457F] text-white text-sm font-semibold hover:bg-[#053a6a] transition-colors"
                                    >
                                        Confirmar venta
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Historial del día */}
                        {ventasGuardadas.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                    <h2 className="text-slate-700 font-bold text-sm">Ventas del día</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#06457F]/10 text-[#06457F] font-bold text-xs px-2 py-0.5 rounded-full">
                                            {ventasGuardadas.length}
                                        </span>
                                        <span className="text-slate-500 text-xs font-semibold">
                                            S/ {ventasGuardadas.reduce((a, v) => a + v.total, 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="divide-y divide-slate-50 max-h-56 overflow-y-auto">
                                    {ventasGuardadas.map((v) => (
                                        <div key={v.id} className="px-4 py-3 flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-slate-600 text-xs font-medium truncate">
                                                    {v.lineas.map((l) => `${l.nombre} x${l.cantidad}`).join(", ")}
                                                </p>
                                                <p className="text-slate-400 text-[10px] mt-0.5">{v.metodoPago}</p>
                                            </div>
                                            <span className="text-slate-700 font-bold text-sm flex-shrink-0">
                                                S/ {v.total.toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}