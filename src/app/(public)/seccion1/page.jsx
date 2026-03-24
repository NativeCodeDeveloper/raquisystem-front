import RevealOnScroll from "@/Componentes/RevealOnScroll";

const pillars = [
  {
    title: "Rehabilitación musculoesquelética",
    text: "Recuperamos movilidad, fuerza y función para lesiones, sobrecarga muscular y limitaciones funcionales.",
    tone: "from-teal-50 to-cyan-50 border-teal-100",
  },
  {
    title: "Manejo clínico del dolor",
    text: "Abordaje terapéutico para dolor crónico y agudo con protocolos personalizados según evaluación funcional.",
    tone: "from-cyan-50 to-sky-50 border-cyan-100",
  },
  {
    title: "Terapias complementarias",
    text: "Integramos neuromodulación, TENS, ultrasonido y ondas de choque para potenciar la recuperación.",
    tone: "from-emerald-50 to-teal-50 border-emerald-100",
  },
  {
    title: "Seguimiento profesional",
    text: "Tratamientos ajustados a tu respuesta clínica para resultados duraderos y recuperación real del tejido.",
    tone: "from-slate-50 to-cyan-50 border-slate-200",
  },
];

export default function Seccion1() {
  return (
    <section
      id="rehabilitacion-dolor"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#f2fbfa_0%,#eef6f8_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Rehabilitación y dolor</p>
          <h2 className="mt-4 max-w-4xl text-balance text-4xl leading-[0.96] sm:text-5xl lg:text-6xl">
            Tratamos la causa del dolor para recuperar movilidad, función y tejido.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-600 sm:text-base">
            Un modelo clínico personalizado que combina rehabilitación integral y terapias complementarias según
            evolución real del paciente.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-4 lg:grid-cols-12 lg:auto-rows-[minmax(170px,auto)]">
          {pillars.map((item, index) => {
            const layoutClass =
              index === 0
                ? "lg:col-span-7 lg:row-span-2"
                : index === 1
                ? "lg:col-span-5"
                : index === 2
                ? "lg:col-span-5"
                : "lg:col-span-12";

            return (
              <RevealOnScroll key={item.title} className={layoutClass} delayClass="delay-100">
                <article
                  className={`h-full rounded-3xl border bg-gradient-to-br ${item.tone} p-6 shadow-[0_28px_55px_-45px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1`}
                >
                  <div className="flex justify-end">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">0{index + 1}</span>
                  </div>

                  <h3 className="mt-5 max-w-xl text-2xl leading-tight text-slate-900 sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{item.text}</p>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
