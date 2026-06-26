import { useState, useRef, useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function SelectAnimado({ value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value || o.label === value);

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
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-3 py-2 bg-[#F2F4F7] border border-slate-200 rounded-xl text-[#4A4A4A] text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 flex items-center justify-between transition-colors hover:border-slate-300"
      >
        <span>{selected?.label ?? "Seleccionar"}</span>
        <span
          className={`text-slate-400 text-xs transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden
          transition-all duration-200 origin-top
          ${open ? "opacity-100 scale-y-100 translate-y-0" : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"}
        `}
      >
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onChange(opt.value);
              setOpen(false);
            }}
            className={`
              w-full text-left px-3 py-2 text-sm transition-colors
              ${value === opt.value || value === opt.label
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-[#4A4A4A] hover:bg-[#F2F4F7]"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}