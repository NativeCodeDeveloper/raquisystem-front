"use client";

import Link from "next/link";

const beneficios = [
  "Evaluación clínica más precisa",
  "Protocolos personalizados según tejido",
  "Mejor control de edema, dolor y fibrosis",
  "Recuperación funcional con seguimiento",
  "Complemento para rehabilitación y postquirúrgico",
  "Resultados sostenibles en el tiempo",
];

export default function UltraformerPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#0c1c2c_0%,#102838_100%)] text-white">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-24 md:px-10 md:pb-24 md:pt-28 lg:grid-cols-[1.15fr_1fr] lg:items-center xl:px-12 xl:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">Regeneración terapéutica</p>
          <h1 className="mt-5 text-4xl leading-tight sm:text-5xl">Tecnología aplicada a recuperación real</h1>
          <p className="mt-7 text-sm leading-relaxed text-slate-200 sm:text-base">
            En Revitalize Pro utilizamos herramientas clínicas para mejorar regeneración de tejidos,
            controlar dolor y acelerar recuperación postquirúrgica y funcional.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-slate-200 sm:text-base">
            Integramos tratamientos como ondas de choque, presoterapia y protocolos de bioestimulación
            dentro de una estrategia terapéutica global.
          </p>

          <Link
            href="/agendaProfesionales"
            className="mt-10 inline-flex rounded-full bg-emerald-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Agenda tu evaluación
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.85)]">
          <h2 className="text-2xl">¿Qué logramos con este enfoque?</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-100 sm:text-base">
            {beneficios.map((item) => (
              <li key={item} className="rounded-xl border border-white/15 bg-white/5 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
