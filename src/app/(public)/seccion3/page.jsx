"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const FALLBACK_CASE_IMAGE = "/ac3.png";

const FALLBACK_TESTIMONIOS = [
  {
    title:
      "Noté una mejora real en mi dolor lumbar y en mi movilidad desde las primeras sesiones.",
    image: FALLBACK_CASE_IMAGE,
  },
  {
    title:
      "Después de mi cirugía pude recuperar función con un plan claro y seguimiento constante.",
    image: FALLBACK_CASE_IMAGE,
  },
  {
    title:
      "El tratamiento fue profesional, personalizado y con resultados sostenibles en el tiempo.",
    image: FALLBACK_CASE_IMAGE,
  },
];

const ACCENT_STYLES = [
  "border-cyan-200 bg-cyan-50/70",
  "border-teal-200 bg-teal-50/70",
  "border-emerald-200 bg-emerald-50/70",
];

export default function Seccion3() {
  const scrollerRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
  const [listaPublicaciones, setListaPublicaciones] = useState([]);

  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  async function listarPublicacionesSeccion3() {
    try {
      const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!res.ok) {
        setListaPublicaciones([]);
        return;
      }

      const publicaciones = await res.json();
      setListaPublicaciones(Array.isArray(publicaciones) ? publicaciones : []);
    } catch {
      setListaPublicaciones([]);
    }
  }

  useEffect(() => {
    listarPublicacionesSeccion3();
  }, []);

  const testimonios =
    listaPublicaciones.length > 0
      ? listaPublicaciones.map((publicacion) => ({
          title: publicacion.descripcionPublicaciones,
          image: `https://imagedelivery.net/${CLOUDFLARE_HASH}/${publicacion.imagenPublicaciones_primera}/card`,
        }))
      : FALLBACK_TESTIMONIOS;

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;

    const firstCardWidth = container.firstElementChild?.clientWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const amount =
      firstCardWidth > 0
        ? Math.round(firstCardWidth + gap)
        : Math.round(container.clientWidth * 0.85);
    const nextLeft = direction === "left" ? -amount : amount;

    container.scrollBy({ left: nextLeft, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="testimonios"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#f8fbfc_0%,#f1f7fa_58%,#edf3f8_100%)] py-24 text-slate-900 sm:py-28"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Testimonios y evolución clínica</p>
              <h2 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                Historias reales de pacientes con mejora funcional y reducción del dolor.
              </h2>
              <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-600">
                Cada testimonio refleja un tratamiento clínico personalizado, seguimiento constante y objetivos
                terapéuticos claros.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-10 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                aria-label="Desplazar hacia la izquierda"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition duration-300 hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                aria-label="Desplazar hacia la derecha"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition duration-300 hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </RevealOnScroll>

          <div
            ref={scrollerRef}
            className="hide-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2"
          >
            {testimonios.map((item, index) => (
              <RevealOnScroll
                key={`${item.title}-${index}`}
                className="w-[90%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              >
                <article
                  className={`relative h-full rounded-3xl border p-6 shadow-[0_28px_58px_-46px_rgba(15,23,42,0.42)] sm:p-7 ${
                    ACCENT_STYLES[index % ACCENT_STYLES.length]
                  } ${index % 3 === 0 ? "md:-rotate-[0.4deg]" : index % 3 === 1 ? "md:rotate-[0.35deg]" : ""}`}
                >
                  <p className="pointer-events-none absolute right-6 top-4 text-6xl leading-none text-slate-300/40">“</p>

                  <div className="flex items-center gap-3">
                    <img
                      src={imageErrors[item.image] ? FALLBACK_CASE_IMAGE : item.image}
                      alt={`Paciente testimonio ${index + 1}`}
                      loading="lazy"
                      className="h-14 w-14 rounded-full border border-white object-cover object-center shadow-sm"
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [item.image]: true,
                        }))
                      }
                    />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Paciente Revitalize Pro</p>
                      <p className="mt-1 text-sm text-slate-700">Caso clínico personalizado</p>
                    </div>
                  </div>

                  <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">{item.title}</p>

                  <div className="mt-7 flex items-center justify-between border-t border-slate-200/80 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Evolución funcional</span>
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-teal-700 ring-1 ring-teal-200">
                      Testimonio real
                    </span>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        id="agenda"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#07111c_0%,#091824_55%,#071420_100%)] py-20 text-white sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="rounded-[2rem] border border-[#D4AF6A]/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] px-6 py-14 text-center backdrop-blur-sm sm:px-10">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-6 bg-[#D4AF6A]/60" />
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF6A]">Agenda online</p>
                <span className="h-px w-6 bg-[#D4AF6A]/60" />
              </div>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-5xl">
                Agenda tu evaluación clínica y comencemos tu proceso de recuperación.
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-sm font-light leading-8 text-white/65 sm:text-base">
                Iniciamos con evaluación integral para definir objetivos terapéuticos, plan de tratamiento y
                seguimiento profesional.
              </p>
              <Link
                href="/agendaProfesionales"
                aria-label="Reservar evaluación"
                className="mt-9 inline-flex w-full max-w-xs justify-center rounded-full bg-[linear-gradient(135deg,#D4AF6A_0%,#C49A52_100%)] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#07111c] shadow-[0_4px_20px_-4px_rgba(212,175,106,0.45)] transition hover:brightness-110"
              >
                Agenda tu evaluación
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
