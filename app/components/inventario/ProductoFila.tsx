"use client";
import { Producto } from "@/app/types/inventario";

interface Props {
  producto: Producto;
  onEditar: (p: Producto) => void;
  onEliminar: (id: string) => void;
  onCambiarStock: (id: string, stock: number) => void;
}

const CATEGORIA_COLOR: Record<Producto["categoria"], string> = {
  bebida: "bg-blue-50 text-blue-600",
  snack: "bg-amber-50 text-amber-600",
  piqueo: "bg-emerald-50 text-emerald-600",
};

export default function ProductoFila({ producto, onEditar, onEliminar, onCambiarStock }: Props) {
  const bajoDe = producto.stock <= producto.stockMinimo;

  return (
    <tr className="border-b border-slate-200 bg-[#FFFFFF] text-slate-100 hover:bg-[#E2E8F0]  transition-colors group">

      <td className="py-4 px-6 text-slate-600">
        <span className="font-semibold text-sm">{producto.nombre}</span>
      </td>

   
      <td className="py-4 px-6">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${CATEGORIA_COLOR[producto.categoria]}`}>
          {producto.categoria}
        </span>
      </td>

   
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onCambiarStock(producto.id, producto.stock - 1)}
            disabled={producto.stock === 0}
            className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 disabled:opacity-30 text-xs font-bold transition-colors"
          >
            −
          </button>
          <span className={`w-8 text-center font-bold text-sm ${bajoDe ? "text-red-500" : "text-slate-700"}`}>
            {producto.stock}
          </span>
          <button
            onClick={() => onCambiarStock(producto.id, producto.stock + 1)}
            className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-xs font-bold transition-colors"
          >
            +
          </button>
          {bajoDe && (
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">
              bajo
            </span>
          )}
        </div>
      </td>


      <td className="py-4 px-6">
        <span className="text-slate-600 text-sm">S/ {producto.precioVenta.toFixed(2)}</span>
      </td>

   
      <td className="py-4 px-6">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEditar(producto)}
            className="py-1.5 px-3 text-xs font-medium text-[#06457F] border border-[#06457F]/30 rounded-lg hover:bg-[#06457F] hover:text-white transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(producto.id)}
            className="py-1.5 px-3 text-xs font-medium text-red-400 border border-red-200 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}