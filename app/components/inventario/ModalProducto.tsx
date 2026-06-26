"use client";
import { useState, useEffect } from "react";
import { Producto } from "@/app/types/inventario";

interface Props {
  modo: "agregar" | "editar";
  producto?: Producto;
  onGuardar: (data: Omit<Producto, "id" | "creadoEn" | "actualizadoEn">) => void;
  onClose: () => void;
}

const EMPTY = {
  nombre: "",
  categoria: "bebida" as Producto["categoria"],
  stock: 0,
  stockMinimo: 3,
  precioVenta: 0,
  activo: true,
};

export default function ModalProducto({ modo, producto, onGuardar, onClose }: Props) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre,
        categoria: producto.categoria,
        stock: producto.stock,
        stockMinimo: producto.stockMinimo,
        precioVenta: producto.precioVenta,
        activo: producto.activo,
      });
    }
  }, [producto]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(form);
    onClose();
  };

  const field = "w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100";
  const label = "block text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1";

  return (
    <div className="fixed inset-0 bg-[#FAF9F6]/20 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-[#FFFFFF] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl">
        {/* header */}
        <div className="bg-[#06457F] px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            {modo === "agregar" ? "Nuevo producto" : "Editar producto"}
          </h3>
          <button onClick={onClose} className="text-slate-400 cursor-pointer hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-[#FFFFFF]">
       
          <div>
            <label className={label}>Nombre</label>
            <input
              required
              type="text"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Ej. Chifles"
              className={field}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className={label}>Categoría</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value as Producto["categoria"] })}
              className={field}
            >
              <option value="bebida">Bebida</option>
              <option value="snack">Snack</option>
              <option value="piqueo">Piqueo</option>
            </select>
          </div>

          {/* Stock + Mínimo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Stock actual</label>
              <input
                required
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                className={field}
              />
            </div>
            <div>
              <label className={label}>Stock mínimo</label>
              <input
                required
                type="number"
                min={0}
                value={form.stockMinimo}
                onChange={(e) => setForm({ ...form, stockMinimo: Number(e.target.value) })}
                className={field}
              />
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className={label}>Precio de venta (S/.)</label>
            <input
              required
              type="number"
              min={0}
              step={0.50}
              value={form.precioVenta}
              onChange={(e) => setForm({ ...form, precioVenta: Number(e.target.value) })}
              className={field}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl cursor-pointer border border-slate-200 bg-[#F2F4F7] text-slate-500 text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl  cursor-pointer bg-[#06457F] text-white text-sm font-semibold hover:bg-[#053a6a] transition-colors"
            >
              {modo === "agregar" ? "Agregar" : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}