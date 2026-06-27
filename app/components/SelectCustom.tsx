"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  opciones: { label: string; value: string }[];
}

export default function SelectCustom({ label, value, onChange, opciones }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const labelActual = opciones.find((o) => o.value === value)?.label ?? opciones[0].label;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <label className=" text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm flex items-center justify-between transition-colors hover:border-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      >
        <span>{labelActual}</span>
        <span className={`text-slate-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
          ▾
        </span>
      </button>

      <div className={`absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden transition-all duration-200 origin-top ${
        open
          ? "opacity-100 scale-y-100 translate-y-0"
          : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
      }`}>
        {opciones.map((opcion) => (
          <button
            key={opcion.value}
            type="button"
            onClick={() => { onChange(opcion.value); setOpen(false); }}
            className={`w-full px-3 py-2 text-sm text-left transition-colors ${
              value === opcion.value
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-[#4A4A4A] hover:bg-[#F2F4F7]"
            }`}
          >
            {opcion.label}
          </button>
        ))}
      </div>
    </div>
  );
}