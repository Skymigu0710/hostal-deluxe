"use client";
import { useState } from "react";
import { Producto } from "@/app/types/inventario";

const INICIAL: Producto[] = [
  { id: "prod-1", nombre: "Pepsi",       categoria: "bebida", stock: 24, stockMinimo: 5, precioVenta: 3.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-2", nombre: "Inka Cola",   categoria: "bebida", stock: 18, stockMinimo: 5, precioVenta: 3.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-3", nombre: "Coca Cola",   categoria: "bebida", stock: 30, stockMinimo: 5, precioVenta: 3.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-4", nombre: "Papitas Lay's", categoria: "snack", stock: 15, stockMinimo: 3, precioVenta: 2.50, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-5", nombre: "Doritos",     categoria: "snack", stock: 12, stockMinimo: 3, precioVenta: 2.50, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
  { id: "prod-6", nombre: "Piqueos",     categoria: "piqueo", stock: 8,  stockMinimo: 2, precioVenta: 5.00, activo: true, creadoEn: new Date().toISOString(), actualizadoEn: new Date().toISOString() },
];

export function useInventario() {
  const [productos, setProductos] = useState<Producto[]>(INICIAL);

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

  // DELETE (soft) — reemplazar con DELETE /api/productos/:id
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