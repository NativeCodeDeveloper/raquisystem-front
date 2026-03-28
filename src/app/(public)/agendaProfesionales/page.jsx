'use client'

import {useState, useEffect} from "react";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function AgendaProfesionales() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [listaProfesionales, setListaProfesionales] = useState([]);

    function irAgendaProfesional(id_profesional) {
        router.push(`/agendaEspecificaProfersional/${id_profesional}`);
    }

    async function seleccionarProfesionales() {
        try {
            const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
            });

            const dataProfesionales = await res.json();
            setListaProfesionales(Array.isArray(dataProfesionales) ? dataProfesionales : []);

        }catch {
            return toast.error('No ha sido posible listar profesionales. Intenta nuevamente.');
        }
    }

    useEffect(() => {
        seleccionarProfesionales()
    },[])

    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111c_0%,#091824_55%,#071420_100%)] px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#D4AF6A]/8 blur-[120px]" />

            <div className="mx-auto max-w-5xl">
                <div className="animate-reveal-up text-center">
                    <div className="inline-flex items-center gap-3">
                        <span className="h-px w-6 bg-[#D4AF6A]/60" />
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF6A]">
                            Agenda Online
                        </p>
                        <span className="h-px w-6 bg-[#D4AF6A]/60" />
                    </div>
                    <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                        Nuestros Profesionales
                    </h1>
                    <p className="mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed text-white/60">
                        Selecciona un profesional para ver su disponibilidad y agendar tu evaluación.
                    </p>
                </div>

                <div className="animate-reveal-up-delay mt-16 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {listaProfesionales.map((profesional, index) => (
                        <button
                            key={profesional.id_profesional}
                            style={{animationDelay: `${index * 120}ms`}}
                            onClick={() => irAgendaProfesional(profesional.id_profesional)}
                            className="animate-reveal-up group relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/[0.10] bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.025)_100%)] p-7 text-left opacity-0 shadow-[0_30px_55px_-42px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF6A]/30 hover:shadow-[0_8px_40px_-10px_rgba(212,175,106,0.20)] sm:p-8"
                        >
                            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4AF6A]/0 blur-3xl transition-all duration-500 group-hover:bg-[#D4AF6A]/12" />
                            <div className="absolute left-0 top-0 h-[2px] w-0 bg-[linear-gradient(90deg,#D4AF6A,transparent)] transition-all duration-500 group-hover:w-full" />

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF6A]/25 bg-[#D4AF6A]/10 text-base font-bold text-[#D4AF6A] transition-all duration-500 group-hover:border-[#D4AF6A]/50 group-hover:bg-[#D4AF6A]/20">
                                {profesional.nombreProfesional?.charAt(0)}
                            </div>

                            <h2 className="mt-5 text-lg font-semibold tracking-wide text-white">
                                {profesional.nombreProfesional}
                            </h2>
                            <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-white/60">
                                {profesional.descripcionProfesional}
                            </p>

                            <div className="mt-6 flex w-full items-center justify-between border-t border-white/8 pt-5">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF6A]">
                                    Ver agenda
                                </span>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF6A]/25 bg-[#D4AF6A]/10 transition-all duration-300 group-hover:border-[#D4AF6A]/50 group-hover:bg-[#D4AF6A]/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#D4AF6A] transition-all duration-300 group-hover:translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
