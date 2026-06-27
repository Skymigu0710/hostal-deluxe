import { Producto } from "@/app/types/inventario";
import { PRODUCTOS_INICIAL } from "@/app/data/inventario";

export const inventarioService = {

  // HOY: retorna mock
  // CON DB: return fetch('/api/productos').then(r => r.json())
  getAll: async (): Promise<Producto[]> => {
    return PRODUCTOS_INICIAL;
  },

  // HOY: no hace nada, el estado local lo maneja
  // CON DB: return fetch(`/api/productos/${id}`, { method: 'PATCH', body: JSON.stringify(cambios) })
  editar: async (id: string, cambios: Partial<Producto>): Promise<void> => {
    console.log("editar", id, cambios);
  },

  // HOY: no hace nada
  // CON DB: return fetch('/api/productos', { method: 'POST', body: JSON.stringify(data) })
  agregar: async (data: Omit<Producto, "id" | "creadoEn" | "actualizadoEn">): Promise<void> => {
    console.log("agregar", data);
  },

  // HOY: no hace nada
  // CON DB: return fetch(`/api/productos/${id}`, { method: 'DELETE' })
  eliminar: async (id: string): Promise<void> => {
    console.log("eliminar", id);
  },

  // HOY: no hace nada
  // CON DB: return fetch(`/api/productos/${id}/stock`, { method: 'PATCH', body: JSON.stringify({ cantidad }) })
  descontarStock: async (id: string, cantidad: number): Promise<void> => {
    console.log("descontarStock", id, cantidad);
  },
};