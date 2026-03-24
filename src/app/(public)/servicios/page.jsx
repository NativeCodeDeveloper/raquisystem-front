"use client";

import Link from "next/link";

const sections = [
  {
    id: "rehabilitacion-y-dolor",
    title: "Área rehabilitación y dolor",
    intro:
      "Intervenciones clínicas para recuperar funcionalidad, movilidad y control del dolor en lesiones agudas y crónicas.",
    items: [
      "Rehabilitación musculoesquelética",
      "Tratamiento de dolor crónico",
      "Tendinitis y fascitis plantar",
      "Contracturas y sobrecarga muscular",
    ],
  },
  {
    id: "terapias-complementarias",
    title: "Área terapias complementarias",
    intro:
      "Aplicamos tecnologías terapéuticas que aceleran la recuperación y potencian los resultados clínicos.",
    items: [
      "Electropunción",
      "TENS (electroterapia)",
      "Ultrasonido terapéutico",
      "Ondas de choque (dolor y regeneración)",
      "Presoterapia (drenaje, circulación y recuperación)",
    ],
  },
  {
    id: "postquirurgica",
    title: "Área rehabilitación postquirúrgica",
    intro:
      "Acompañamiento especializado para mejorar cicatrización, disminuir edema y recuperar tejidos después de cirugía.",
    items: [
      "Tratamiento de fibrosis",
      "Manejo de cicatrices",
      "Recuperación postquirúrgica",
      "Presoterapia para drenaje linfático y reducción de edema",
    ],
  },
  {
    id: "regeneracion-tejidos",
    title: "Área regeneración de tejidos",
    intro:
      "Protocolos de bioestimulación para mejorar calidad de tejido, colágeno y procesos regenerativos.",
    items: [
      "Dermapen (microneedling)",
      "Fibroblast (plasma pen)",
      "Inducción de colágeno con dermógrafo (estrías)",
    ],
  },
  {
    id: "corporal-terapeutica",
    title: "Área corporal terapéutica",
    intro:
      "Tratamientos corporales con criterio terapéutico para circulación, edema, fibrosis y calidad de tejido.",
    items: [
      "Ondas de choque corporal (celulitis y fibrosis)",
      "Cavitación terapéutica",
      "Radiofrecuencia",
      "Ultrasonido",
      "Presoterapia estética (retención de líquidos, celulitis y circulación)",
    ],
  },
  {
    id: "capilar",
    title: "Área capilar",
    intro: "Evaluación e intervención orientada a salud del cuero cabelludo y estímulo de crecimiento capilar.",
    items: ["Tricología capilar", "Estimulación de crecimiento capilar"],
  },
];

export default function ServicioPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#f4fbfa_0%,#f7fafc_100%)] text-slate-900">
      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-24 md:px-10 md:pb-20 md:pt-28 xl:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Servicios</p>
        <h1 className="mt-5 max-w-5xl text-4xl leading-tight sm:text-5xl">
          Rehabilitación integral y regeneración de tejidos con enfoque clínico.
        </h1>
        <p className="mt-7 max-w-3xl text-base leading-relaxed text-slate-600">
          Tratamos dolor, disfunción y alteraciones del tejido desde una base terapéutica. Nuestra meta es lograr
          resultados funcionales, sostenibles y personalizados para cada paciente.
        </p>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-7 px-6 pb-24 md:grid-cols-2 md:px-10 xl:px-12">
        {sections.map((section, index) => (
          <article
            id={section.id}
            key={section.id}
            className="scroll-mt-28 rounded-3xl border border-teal-100 bg-white p-7 shadow-[0_22px_50px_-38px_rgba(15,23,42,0.55)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              Área {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-2xl leading-snug text-slate-900">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{section.intro}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {section.items.map((item) => (
                <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:px-10 md:py-20 xl:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Siguiente paso</p>
            <h3 className="mt-4 max-w-2xl text-3xl leading-tight text-slate-900">
              Agenda tu evaluación para definir el mejor protocolo terapéutico.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agendaProfesionales"
              className="rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Agenda online
            </Link>
            <a
              href="https://wa.me/56928085737"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
