"use client";

import Link from "next/link";

export default function MisionVisionPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#f3fbfa_0%,#f7fafc_100%)] text-slate-900">
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(20,184,166,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.14),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:items-start xl:px-12">
          <article className="rounded-3xl border border-teal-100 bg-white p-8 shadow-[0_24px_65px_-45px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Revitalize Pro</p>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl">Misión</h1>
            <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
              Brindar un tratamiento clínico integral para dolor, rehabilitación postquirúrgica y regeneración de tejidos,
              combinando terapias complementarias y seguimiento personalizado para recuperar funcionalidad y calidad de vida.
            </p>
          </article>

          <article className="rounded-3xl border border-cyan-100 bg-white p-8 shadow-[0_24px_65px_-45px_rgba(15,23,42,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Enfoque clínico</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Visión</h2>
            <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
              Ser referente en Providencia y Santiago por integrar rehabilitación, terapias complementarias y regeneración
              estética terapéutica en un modelo clínico confiable, humano y basado en resultados medibles.
            </p>

            <div className="mt-8 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
              <p>Atención centrada en la causa del problema, no solo en el síntoma.</p>
              <p>Protocolos ajustados según evolución individual del paciente.</p>
              <p>Resultados funcionales y mejoría real del tejido.</p>
            </div>
          </article>
        </div>

        <div className="relative mx-auto mt-12 flex w-full max-w-7xl flex-wrap gap-3 px-6 md:px-10 xl:px-12">
          <Link
            href="/agendaProfesionales"
            className="rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Agenda tu evaluación
          </Link>
          <Link
            href="/contacto"
            className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
