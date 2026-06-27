'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  currentSection?: string;
}

export default function Sidebar({ currentSection = 'registros' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'CheckIn',
      label: 'Check In',
      href: '/checkIn',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 17l5-5m0 0l-5-5m5 5H3"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21V3"
          />
        </svg>
      ),
    },
    {
      id: 'ventas',
      label: 'Ventas',
      href: '/ventas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'registros',
      label: 'Registros',
      href: '/registros',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'inventario',
      label: 'Inventario',
      href: '/inventario',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
          />
        </svg>
      ),
    },
    {
      id: 'clientes',
      label: 'Clientes',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),

      badge: 'Próximamente',
    },
    {
      id: 'habitaciones',
      label: 'Habitaciones',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },

  ];

  return (
    <>
      {/* Botón de Hamburguesa para Móviles */}
      <div className="md:hidden flex items-center justify-between bg-[#00072D] text-white p-4 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#00072D] font-bold text-lg shadow-md shadow-[#C9A84C]/20">
            H
          </div>
          <span className="font-extrabold tracking-wider text-[#C9A84C]">HOSTAL DELUXE</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          aria-label="Abrir Menú"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop oscuro en móvil cuando el sidebar está abierto */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Contenedor del Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#06457F] border-r border-slate-800/80 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:h-screen ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Cabecera / Branding */}
        <div>
          <div className="p-6 border-b border-[#FAF9F6] flex items-center space-x-3">
            <div>
              <h1 className="font-black tracking-widest text-[#FAF9F6] text-lg leading-none">
                HOSTAL
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mt-1">
                Deluxe Miraflores System
              </span>
            </div>
          </div>

          {/* Menú de Navegación */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const isItemActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isItemActive
                    ? 'bg-gradient-to-r from-[#262B40]/15 to-[#FAF9F6]/5 border-l-4 border-[#FAF9F6] text-[#FAF9F6] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isItemActive ? 'text-[#FAF9F6]' : 'text-slate-500 group-hover:text-slate-300'}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full uppercase font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-[#000523]">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-[#C9A84C] font-semibold border border-slate-700">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">Administrador</p>
              <p className="text-[10px] text-slate-500 truncate">Turno: Día</p>
            </div>
            <button
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
              title="Cerrar sesión"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}