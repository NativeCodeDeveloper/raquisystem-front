import RevealOnScroll from "@/Componentes/RevealOnScroll";

const pillars = [
  {
    title: "Rehabilitación musculoesquelética",
    text: "Recuperamos movilidad, fuerza y función para lesiones, sobrecarga muscular y limitaciones funcionales.",
  },
  {
    title: "Manejo clínico del dolor",
    text: "Abordaje terapéutico para dolor crónico y agudo con protocolos personalizados según evaluación funcional.",
  },
  {
    title: "Terapias complementarias",
    text: "Integramos neuromodulación, TENS, ultrasonido y ondas de choque para potenciar la recuperación.",
  },
  {
    title: "Seguimiento profesional",
    text: "Tratamientos ajustados a tu respuesta clínica para resultados duraderos y recuperación real del tejido.",
  },
];

const metrics = [
  { label: "Enfoque", value: "Clínico y funcional" },
  { label: "Protocolos", value: "Personalizados" },
  { label: "Objetivo", value: "Recuperación real" },
  { label: "Seguimiento", value: "Sesión a sesión" },
];

export default function Seccion1() {
  return (
    <section
      id="rehabilitacion-dolor"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#f7fcfb_0%,#eff7fa_100%)] py-20 text-slate-900 sm:py-24 lg:flex lg:min-h-svh lg:items-center lg:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll className="text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-6 bg-[#D4AF6A]/60" />
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF6A]">Rehabilitación y dolor</p>
            <span className="h-px w-6 bg-[#D4AF6A]/60" />
          </div>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]">
            Tratamos la causa del dolor con un enfoque clínico personalizado.
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-[15px] font-light leading-8 text-slate-600 sm:text-base">
            Integramos rehabilitación, terapias complementarias y regeneración de tejido para resultados funcionales
            sostenibles y medibles.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:gap-6">
          <RevealOnScroll className="h-full">
            <aside className="flex h-full flex-col rounded-[2rem] border border-[#D4AF6A]/25 bg-white p-6 shadow-[0_28px_56px_-44px_rgba(15,23,42,0.35)] sm:p-7">
              <div className="flex items-center gap-2">
                <span className="h-px w-4 bg-[#D4AF6A]/70" />
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4AF6A]">Método Revitalize Pro</p>
              </div>
              <h3 className="mt-5 text-3xl font-semibold leading-tight text-slate-900 sm:text-[2rem]">
                Evaluación, tratamiento y ajuste continuo.
              </h3>
              <p className="mt-4 text-sm font-light leading-8 text-slate-600 sm:text-base">
                Diseñamos cada intervención según respuesta clínica del paciente, priorizando alivio del dolor,
                movilidad y recuperación de tejido.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                    <p className="mt-1.5 text-sm font-medium text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </RevealOnScroll>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {pillars.map((item, index) => (
              <RevealOnScroll key={item.title} delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_24px_50px_-42px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF6A]/40 hover:shadow-[0_8px_30px_-10px_rgba(212,175,106,0.15)] sm:p-6">
                  <span className="absolute left-0 top-0 h-full w-1 bg-[linear-gradient(180deg,#D4AF6A,#C49A52_60%,transparent)]" />

                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                      Bloque {String(index + 1).padStart(2, "0")}
                    </p>
                    <div className="h-1 w-14 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[linear-gradient(90deg,#D4AF6A,#C49A52)]" style={{ width: `${72 + index * 7}%` }} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm font-light leading-8 text-slate-600">{item.text}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
