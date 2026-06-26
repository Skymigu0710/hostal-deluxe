'use client';
import { Room } from "@/app/types/room";
import  RoomCard  from "../components/RoomCard";

interface RoomSectionProps {
  title: string;
  rooms: Room[];         // reutilizas el tipo central
  onExtra: (room: Room | null) => void;
  onCancelar: (room: Room) => void;
}
export default function RoomSection({ title, rooms, onExtra, onCancelar }: RoomSectionProps) {
  
  if (rooms.length === 0) return null;
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-slate-700 font-bold text-base uppercase tracking-widest">
          {title}
        </h2>
        <span className="bg-[#06457F]/10 text-[#06457F] font-bold text-xs px-2.5 py-0.5 rounded-full">
          {rooms.length}
        </span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} onExtra={onExtra} onCancelar={onCancelar} />
        ))}
      </div>
    </section>
  );
}