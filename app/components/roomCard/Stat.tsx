'use client';

export default function Stat({ label, value, accent, colSpan }: { label: string; value: string | number; accent?: boolean; colSpan?: boolean }) {
  return (
    <div className={`bg-slate-50 rounded-lg px-2.5 py-2 ${colSpan ? "col-span-2" : ""}`}>
      <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wide leading-none mb-0.5">
        {label}
      </p>
      <p
        className={`font-semibold text-xs ${
          accent ? "text-[#06457F]" : "text-slate-600"
        }`}
      >
        {value}
      </p>
    </div>
  );
}