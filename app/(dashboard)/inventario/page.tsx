"use client";
import { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { useInventario } from "@/app/hooks/useInventario";
import { Producto } from "@/app/types/inventario";
import ModalProducto from "@/app/components/inventario/ModalProducto";
import ProductoFila from "@/app/components/inventario/ProductoFila";
import SelectCustom from "@/app/components/SelectCustom";

export default function Inventario() {
    const { productos, agregarProducto, editarProducto, eliminarProducto, descontarStock } = useInventario();
    const [modal, setModal] = useState<{ abierto: boolean; modo: "agregar" | "editar"; producto?: Producto }>({
        abierto: false, modo: "agregar",
    });
    const [busqueda, setBusqueda] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");

    const productosFiltrados = productos.filter((p) => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = filtroCategoria === "todas" || p.categoria === filtroCategoria;
        return coincideNombre && coincideCategoria;
    });

    const handleGuardar = (data: Omit<Producto, "id" | "creadoEn" | "actualizadoEn">) => {
        if (modal.modo === "agregar") {
            agregarProducto(data);
        } else if (modal.producto) {
            editarProducto(modal.producto.id, data);
        }
    };

    const handleCambiarStock = (id: string, nuevoStock: number) => {
        editarProducto(id, { stock: Math.max(0, nuevoStock) });
    };

    const bajoStock = productos.filter((p) => p.stock <= p.stockMinimo).length;

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#FAF9F6] font-[Inter]">
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen">

                {/* HEADER */}
                <header className="sticky top-0 z-30 bg-[#FAF9F6]/90 backdrop-blur border-b border-slate-100 px-6 md:px-10 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-slate-800 font-black text-xl leading-none">
                            Inventario de Productos
                        </h1>
                        {bajoStock > 0 && (
                            <p className="text-red-400 text-xs font-medium mt-0.5">
                                {bajoStock} producto{bajoStock > 1 ? "s" : ""} con stock bajo
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => setModal({ abierto: true, modo: "agregar" })}
                        className="flex items-center gap-2 bg-[#06457F] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#053a6a] transition-colors"
                    >
                        <span className="text-lg leading-none">+</span>
                        Nuevo producto
                    </button>
                </header>

                <div className="px-6 md:px-10 py-6 flex-1">
                    <div className="bg-[#FFFFFF] border border-slate-200 rounded-2xl p-5 mb-5 shadow-xl">
                        {/* Filtros */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div>
                                <label className=" text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                                    Productos
                                </label>
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A]  focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm"
                                />
                            </div>
                            <SelectCustom
                                label="Categoría"
                                value={filtroCategoria}
                                onChange={setFiltroCategoria}
                                opciones={[
                                    { label: "Todas las Categorías", value: "todas" },
                                    { label: "Bebidas", value: "bebida" },
                                    { label: "Snacks", value: "snack" },
                                    { label: "Piqueos", value: "piqueo" },
                                ]}
                            />


                        </div>

                    </div>

                    {/* Tabla */}
                    <div className="hidden lg:block bg-[#F2F4F7]  rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-900 bg-[#06457F]  text-[#FAF9F6] font-semibold text-xs tracking-wider uppercase">
                                    <th className="py-4 px-6">Producto</th>
                                    <th className="py-4 px-6">Categoría</th>
                                    <th className="py-4 px-6">Stock</th>
                                    <th className="py-4 px-6">Precio</th>
                                    <th className="py-4 px-6 ">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300 text-sm">
                                {productosFiltrados.length === 0 ? (
                                    <tr className="">
                                        <td colSpan={5} className="py-4 px-6">
                                            No hay productos que coincidan con la búsqueda.
                                        </td>
                                    </tr>
                                ) : (
                                    productosFiltrados.map((p) => (
                                        <ProductoFila
                                            key={p.id}
                                            producto={p}
                                            onEditar={(prod) => setModal({ abierto: true, modo: "editar", producto: prod })}
                                            onEliminar={eliminarProducto}
                                            onCambiarStock={handleCambiarStock}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Contador */}
                    <p className="text-slate-400 text-xs mt-3 text-right">
                        {productosFiltrados.length} de {productos.length} productos
                    </p>
                </div>
            </main>

            {/* Modal */}
            {modal.abierto && (
                <ModalProducto
                    modo={modal.modo}
                    producto={modal.producto}
                    onGuardar={handleGuardar}
                    onClose={() => setModal({ abierto: false, modo: "agregar" })}
                />
            )}
        </div>
    );
}