'use client';

import React, { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        setIsLoading(true);

        try {
            // Simulación de petición de autenticación
            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Login exitoso:', { email, rememberMe });
            // Aquí se redireccionaría o guardaría el token
        } catch (err) {
            setError('Credenciales incorrectas. Intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#00072D] text-slate-100 font-[Inter] antialiased overflow-hidden">
            {/* SECCIÓN IZQUIERDA: Formulario de Login */}
            <div className="flex flex-col justify-between w-full md:w-[45%] lg:w-[40%] xl:w-[35%] p-8 sm:p-12 md:p-16 bg-[#00072D] z-10 shadow-2xl">
                {/* Logo / Encabezado superior */}
                <div className="flex items-center space-x-3 mb-8 md:mb-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-400 shadow-lg shadow-blue-500/30">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        SISTEMA DE ACCESO
                    </span>
                </div>

                {/* Contenedor del Formulario */}
                <div className="w-full max-w-md mx-auto my-auto py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                            ¡Bienvenido de nuevo!
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Ingresa tus credenciales para acceder a tu panel de control.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-2 animate-shake">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 11-18 0" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="usuario@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-[#000a35] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="password">
                                    Contraseña
                                </label>
                                <a
                                    href="#forgot"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-[#000a35] border border-slate-700/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Recordar contraseña */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 rounded border-slate-700 bg-[#000a35] text-blue-600 focus:ring-blue-500/20 focus:ring-offset-0 focus:ring-2"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-slate-300 select-none cursor-pointer">
                                Mantener sesión iniciada
                            </label>
                        </div>

                        {/* Acvceder*/}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-1.5">
                                    <span>Acceder</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Derechos reservados */}
                <div className="text-center md:text-left text-xs text-slate-500 mt-8 md:mt-0">
                    <p>&copy; {new Date().getFullYear()} Hostal Deluxe Miraflores. Todos los derechos reservados.</p>
                </div>
            </div>

            {/* Seccion derecha */}
            <div className="hidden md:flex md:w-[55%] lg:w-[60%] xl:w-[65%] relative bg-[#000525] items-center justify-center overflow-hidden">
                <img
                    src="/images/habitacion.jpg"
                    alt="Dashboard Abstract Interface"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105 hover:scale-100 transition-transform duration-[10000ms] ease-out"
                />

                {/* Degradado/Overlay para fundir la imagen con la sección izquierda */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00072D] via-[#00072D]/50 to-transparent" />

                {/* Efecto de luz de fondo */}
                <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />

                {/* Contenido decorativo sobre la imagen */}
                <div className="relative z-10 max-w-lg p-12 text-left">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-6 inline-block">
                        Consola Administrativa
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
                        Hostal Deluxe Miraflores
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed font-light">
                        Control total en una sola plataforma.                    </p>
                </div>
            </div>
        </div>
    );
}