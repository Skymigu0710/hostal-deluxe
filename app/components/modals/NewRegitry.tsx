'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useHabitaciones } from '@/app/hooks/useHabitaciones';
import { useBuscarCliente } from '@/app/hooks/useBuscarCliente';
import { useCheckIn } from '@/app/hooks/useCheckIn';
import { CrearEstadiaRequest } from '@/app/types/estadia';

interface FormValues {
  habitacionId: number;
  busquedaCliente: string;
  clienteId: number | null;
  modoUso: 'HORAS' | 'NOCHE';
  horasEstimadas?: number;
  nochesEstimadas?: number;
}

interface ModalNuevoRegistroProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNuevoRegistro({ isOpen, onClose }: ModalNuevoRegistroProps) {
  const { register, handleSubmit, watch, setValue, reset } = useForm<FormValues>({
    defaultValues: { modoUso: 'HORAS', clienteId: null, busquedaCliente: '' },
  });

  const [warningCliente, setWarningCliente] = useState<string | null>(null);

  const busqueda = watch('busquedaCliente');
  const modoUso = watch('modoUso');
  const clienteId = watch('clienteId');

  const { data: habitaciones, isLoading: loadingHabitaciones } = useHabitaciones();
  const { data: clientesEncontrados, isLoading: buscandoCliente } = useBuscarCliente(busqueda);
  const { mutate: crearEstadia, isPending, error: errorCheckIn } = useCheckIn();

  const seleccionarCliente = (cliente: {
    id: number;
    nombreCompleto: string;
    esProblematico: boolean;
    motivoProblema: string | null;
  }) => {
    if (cliente.esProblematico) {
      setWarningCliente(`${cliente.nombreCompleto}: ${cliente.motivoProblema ?? 'Cliente en lista negra'}`);
      setValue('clienteId', null);
      return;
    }
    setValue('clienteId', cliente.id);
    setValue('busquedaCliente', cliente.nombreCompleto);
    setWarningCliente(null);
  };

  const onSubmit = (data: FormValues) => {
    if (!data.clienteId) return;

    const payload: CrearEstadiaRequest = {
      clienteId: data.clienteId,
      habitacionId: data.habitacionId,
      modoUso: data.modoUso,
      ...(data.modoUso === 'HORAS'
        ? { horasEstimadas: data.horasEstimadas }
        : { nochesEstimadas: data.nochesEstimadas }),
    };

    crearEstadia(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    setWarningCliente(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-[Inter] bg-[#FAF9F6]/20 backdrop-blur-sm">
      <div className="bg-[#FAF9F6] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        {/* header */}
        <div className="bg-[#06457F] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <p className="text-white/70 text-xs font-medium uppercase tracking-widest">
              Check-In
            </p>
            <h2 className="text-white font-bold text-lg leading-tight">
              Nuevo Registro
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/60 hover:text-white cursor-pointer transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* body */}
        <form
          id="form-nuevo-registro"
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5 overflow-y-auto"
        >
          {/* habitación */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Habitación
            </label>
            <select
              {...register('habitacionId', { valueAsNumber: true, required: true })}
              disabled={loadingHabitaciones}
              className="w-full px-4 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
            >
              <option value="">
                {loadingHabitaciones ? 'Cargando habitaciones...' : 'Selecciona habitación'}
              </option>
              {habitaciones
                ?.filter((h) => h.estado === 'DISPONIBLE')
                .map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.numero} — {h.tipo}
                  </option>
                ))}
            </select>
          </div>

          {/* búsqueda cliente */}
          <div className="relative">
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Cliente{' '}
              <span className="font-normal text-slate-400">( DNI o nombre)</span>
            </label>
            <input
              {...register('busquedaCliente')}
              onChange={(e) => {
                setValue('busquedaCliente', e.target.value);
                setValue('clienteId', null);
                setWarningCliente(null);
              }}
              placeholder="Ej: 73214589 o Juan Pérez"
              autoComplete="off"
              className="w-full px-4 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />

            {buscandoCliente && (
              <p className="text-slate-400 text-xs mt-1.5">Buscando...</p>
            )}

            {!clienteId && clientesEncontrados && clientesEncontrados.length > 0 && (
              <ul className="absolute z-10 w-full mt-1.5 bg-[#FAF9F6] border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                {clientesEncontrados.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => seleccionarCliente(c)}
                    className="px-4 py-2.5 text-sm text-[#4A4A4A] hover:bg-[#06457F]/5 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                  >
                    <span className="font-medium">{c.nombreCompleto}</span>
                    <span className="text-slate-400"> — {c.dni}</span>
                  </li>
                ))}
              </ul>
            )}

            {clienteId && (
              <p className="text-emerald-600 text-xs mt-1.5 font-medium">✓ Cliente seleccionado</p>
            )}
          </div>

          {/* modo de uso */}
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
              Modo de uso
            </label>
            <select
              {...register('modoUso')}
              className="w-full px-4 py-2.5 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            >
              <option value="HORAS">Por horas</option>
              <option value="NOCHE">Por noche</option>
            </select>
          </div>

          {errorCheckIn && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-sm font-medium">{errorCheckIn.message}</p>
            </div>
          )}

          {warningCliente && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-amber-700 text-sm font-medium">⚠️ {warningCliente}</p>
            </div>
          )}
        </form>

        {/* footer */}
        <div className="px-6 pb-6 pt-1 flex gap-3 shrink-0">
          <button
            onClick={handleClose}
            type="button"
            className="flex-1 py-2.5 rounded-xl border cursor-pointer border-slate-200 bg-[#F2F4F7] text-slate-500 text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            form="form-nuevo-registro"
            type="submit"
            disabled={isPending || !clienteId}
            className="flex-1 py-2.5 bg-[#06457F] hover:bg-[#262B40] text-[#FAF9F6] cursor-pointer hover:text-white rounded-xl transition-all shadow-lg shadow-[#C9A84C]/15 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
          >
            {isPending ? 'Registrando...' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
