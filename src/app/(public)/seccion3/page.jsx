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
        className="scroll-mt-24 bg-[linear-gradient(180deg,#eef8f8_0%,#f6fbfc_55%,#f8fcff_100%)] py-20 text-slate-900 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-teal-700">
                  Testimonios y evolución clínica
                </p>
                <h2 className="mt-4 max-w-3xl text-balance text-4xl leading-tight sm:text-5xl">
                  Testimonios de pacientes con avances reales en dolor y recuperación.
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByAmount("left")}
                  aria-label="Desplazar hacia la izquierda"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-white text-teal-700 shadow-sm transition duration-300 hover:bg-teal-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByAmount("right")}
                  aria-label="Desplazar hacia la derecha"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-white text-teal-700 shadow-sm transition duration-300 hover:bg-teal-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </RevealOnScroll>

          <div
            ref={scrollerRef}
            className="hide-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {testimonios.map((item, index) => (
              <RevealOnScroll
                key={`${item.title}-${index}`}
                className="w-[88%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                delayClass={index === 0 ? "delay-100" : "delay-150"}
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-[0_28px_60px_-40px_rgba(15,23,42,0.5)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageErrors[item.image] ? FALLBACK_CASE_IMAGE : item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [item.image]: true,
                        }))
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.45)_100%)]" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/85 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-700">
                      Paciente Revitalize Pro
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <p className="text-3xl leading-none text-teal-600">“</p>
                    <h3 className="mt-2 text-base leading-8 text-slate-700 sm:text-lg">{item.title}</h3>
                    <div className="mt-5 border-t border-slate-100 pt-4 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                      Resultado funcional y seguimiento personalizado
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section
        id="agenda"
        className="scroll-mt-24 bg-[linear-gradient(180deg,#f4fbfa_0%,#edf6f8_100%)] py-20 text-slate-900 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="rounded-[2rem] border border-teal-100 bg-white px-6 py-14 text-center shadow-[0_30px_64px_-45px_rgba(15,23,42,0.45)] sm:px-10">
              <p className="text-xs uppercase tracking-[0.22em] text-teal-700">Agenda online</p>
              <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl leading-tight tracking-[0.01em] sm:text-4xl lg:text-5xl">
                Agenda tu evaluación clínica y comencemos tu recuperación.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 tracking-[0.01em] text-slate-600 sm:text-base">
                Iniciamos con evaluación personalizada para definir objetivos, protocolo terapéutico y seguimiento.
              </p>
              <Link
                href="/agendaProfesionales"
                aria-label="Reservar evaluación"
                className="mt-8 inline-flex w-full max-w-xs justify-center rounded-full bg-slate-900 px-8 py-3 text-xs uppercase tracking-[0.14em] text-white transition duration-300 hover:bg-slate-700"
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
