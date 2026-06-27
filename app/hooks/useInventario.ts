"use client";
import { useState } from "react";
import { Producto } from "@/app/types/inventario";
import { PRODUCTOS_INICIAL } from "@/app/data/inventario"; // 👈 único cambio

export function useInventario() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIAL); // 👈 único cambio

  // CREATE — reemplazar con POST /api/productos
  const agregarProducto = (data: Omit<Producto, "id" | "creadoEn" | "actualizadoEn">) => {
    const nuevo: Producto = {
      ...data,
      id: `prod-${Date.now()}`,
      creadoEn: new Date().toISOString(),
      actualizadoEn: new Date().toISOString(),
    };
    setProductos((prev) => [...prev, nuevo]);
  };

  // UPDATE — reemplazar con PATCH /api/productos/:id
  const editarProducto = (id: string, cambios: Partial<Omit<Producto, "id" | "creadoEn">>) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...cambios, actualizadoEn: new Date().toISOString() } : p
      )
    );
  };

  // DELETE — reemplazar con DELETE /api/productos/:id
  const eliminarProducto = (id: string) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  // Usado desde ventas: descuenta stock
  const descontarStock = (id: string, cantidad: number) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, stock: Math.max(0, p.stock - cantidad), actualizadoEn: new Date().toISOString() }
          : p
      )
    );
  };

  return { productos, agregarProducto, editarProducto, eliminarProducto, descontarStock };
}