"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const FALLBACK_IMAGE = "/fondo1.png";

const FALLBACK_SLIDES = [
  {
    id: "revitalize-default",
    image: FALLBACK_IMAGE,
    alt: "Revitalize Pro rehabilitación integral",
    badge: "Revitalize Pro | Enfoque clínico",
    title: "Recupera función, movilidad y bienestar.",
    text: "Tratamos dolor, disfunción y alteraciones del tejido con un plan personalizado de rehabilitación y regeneración.",
  },
];

export default function Portada() {
  const [dataPortada, setDataPortada] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const touchStartX = useRef(null);

  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  async function cargarPortada() {
    try {
      const res = await fetch(`${API}/carruselPortada/seleccionarCarruselPortada`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setDataPortada(data);
      } else {
        setDataPortada([]);
      }
    } catch {
      toast.error("No fue posible cargar la portada. Intenta nuevamente.");
    }
  }

  useEffect(() => {
    cargarPortada();
  }, []);

  const slides = useMemo(() => {
    if (!Array.isArray(dataPortada) || dataPortada.length === 0) {
      return FALLBACK_SLIDES;
    }

    return dataPortada.map((portada, index) => ({
      id: `${portada.id_publicacionesPortada || index}`,
      image: `https://imagedelivery.net/${CLOUDFLARE_HASH}/${portada.imagenPortada}/portada`,
      alt: portada.tituloPortadaCarrusel || "Portada Revitalize Pro",
      badge: "Revitalize Pro | Rehabilitación integral",
      title: portada.tituloPortadaCarrusel || "Agenda tu evaluación clínica",
      text:
        portada.descripcionPublicacionesPortada ||
        "Abordaje integral para dolor, postquirúrgico y regeneración de tejidos.",
    }));
  }, [CLOUDFLARE_HASH, dataPortada]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => clearInterval(intervalId);
  }, [slides.length]);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;

    if (Math.abs(distance) > 45) {
      if (distance > 0) goPrev();
      else goNext();
    }

    touchStartX.current = null;
  };

  const currentSlide = slides[activeIndex] || FALLBACK_SLIDES[0];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#071823_0%,#0b2230_50%,#0d1d29_100%)] pb-12 pt-28 text-white md:pb-16 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(20,184,166,0.22),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(6,182,212,0.2),transparent_34%)]" />
      <div className="premium-gridline pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch lg:gap-8 lg:px-10">
        <article className="relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.045] p-7 backdrop-blur-md sm:p-9">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
            Revitalize Pro · Providencia
          </p>
          <h1 className="mt-4 max-w-xl text-balance text-[2.2rem] leading-[1.05] sm:text-[2.9rem] lg:text-[3.2rem]">
            Recuperación funcional, dolor bajo control.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-8 text-slate-100/82 sm:text-base">
            Integramos rehabilitación, terapias complementarias y regeneración de tejidos para
            abordar la causa del problema, no solo el síntoma.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/agendaProfesionales"
              className="inline-flex w-full justify-center rounded-full bg-emerald-300 px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-emerald-200 sm:w-auto"
            >
              Agenda tu evaluación
            </Link>
            <Link
              href="/servicios"
              className="inline-flex w-full justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/16 sm:w-auto"
            >
              Ver tratamientos
            </Link>
          </div>

          <div className="mt-auto grid grid-cols-1 gap-3 pt-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/65">Especialidad</p>
              <p className="mt-1 text-sm text-white">Dolor y postquirúrgico</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/65">Soporte</p>
              <p className="mt-1 text-sm text-white">TENS · Ondas · Presoterapia</p>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-3">
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/65">Objetivo</p>
              <p className="mt-1 text-sm text-white">Mejora real del tejido</p>
            </div>
          </div>
        </article>

        <article className="relative flex h-full flex-col">
          <div
            className="relative flex-1 overflow-hidden rounded-[2rem] border border-white/14 bg-black/25"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[16/10] min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[520px]">
              {slides.map((slide, index) => {
                const isActive = index === activeIndex;
                const hasError = imageErrors[slide.image];

                return (
                  <figure
                    key={slide.id}
                    className={[
                      "absolute inset-0 transition-opacity duration-700 ease-out",
                      isActive ? "opacity-100" : "pointer-events-none opacity-0",
                    ].join(" ")}
                  >
                    <img
                      src={hasError ? FALLBACK_IMAGE : slide.image}
                      alt={slide.alt}
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      loading={isActive ? "eager" : "lazy"}
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [slide.image]: true,
                        }))
                      }
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.05)_0%,rgba(4,10,18,0.78)_100%)]" />
                  </figure>
                );
              })}

              {slides.length > 1 && (
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2">
                  <p className="rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85">
                    Imagen {activeIndex + 1} de {slides.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Slide anterior"
                      onClick={goPrev}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-black/25 text-white transition hover:bg-black/45"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Siguiente slide"
                      onClick={goNext}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-black/25 text-white transition hover:bg-black/45"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/42 p-5 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/80">{currentSlide.badge}</p>
                <h2 className="mt-2 text-2xl leading-tight text-white sm:text-[2rem]">{currentSlide.title}</h2>
                <p className="mt-2 text-sm leading-7 text-white/80">{currentSlide.text}</p>
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <div className="hide-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative w-20 shrink-0 overflow-hidden rounded-xl border transition sm:w-24",
                    activeIndex === index
                      ? "border-emerald-300"
                      : "border-white/15 hover:border-white/32",
                  ].join(" ")}
                  aria-label={`Ir al slide ${index + 1}`}
                >
                  <img
                    src={imageErrors[slide.image] ? FALLBACK_IMAGE : slide.image}
                    alt={slide.alt}
                    className="h-16 w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
