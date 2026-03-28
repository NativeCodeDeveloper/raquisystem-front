"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const FALLBACK_IMAGE = "/fondo1.png";

const FALLBACK_SLIDES = [
  {
    id: "revitalize-default",
    image: FALLBACK_IMAGE,
    alt: "Revitalize Pro rehabilitación integral",
    badge: "Revitalize Pro · Enfoque clínico",
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
      setDataPortada(Array.isArray(data) ? data : []);
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
      badge: "Revitalize Pro · Rehabilitación integral",
      title: portada.tituloPortadaCarrusel || "Agenda tu evaluación clínica",
      text:
        portada.descripcionPublicacionesPortada ||
        "Abordaje integral para dolor, postquirúrgico y regeneración de tejidos.",
    }));
  }, [CLOUDFLARE_HASH, dataPortada]);

  useEffect(() => {
    if (activeIndex > slides.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

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
  const mobileSlide = slides[0] || FALLBACK_SLIDES[0];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#07111c_0%,#091824_55%,#071420_100%)] pb-12 pt-28 text-white md:pb-16 md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(212,175,106,0.10),transparent_40%),radial-gradient(ellipse_at_88%_5%,rgba(14,165,233,0.13),transparent_38%),radial-gradient(ellipse_at_50%_100%,rgba(20,184,166,0.08),transparent_50%)]" />
      <div className="premium-gridline pointer-events-none absolute inset-0 opacity-[0.12]" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-7 px-4 sm:px-6 lg:grid-cols-12 lg:items-stretch lg:gap-8 lg:px-10">
        <article className="relative flex h-full min-h-[520px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.025)_100%)] p-6 shadow-[0_0_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-8 lg:col-span-5 lg:p-10">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#D4AF6A]/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Top: badge + logo */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-5 bg-[#D4AF6A]/70" />
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D4AF6A]">Revitalize Pro · Providencia</p>
            </div>
            <div className="mt-5">
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.2rem]">
                Revitalize<span className="text-[#D4AF6A]"> Pro</span>
              </h1>
              <p className="mt-2 text-sm font-light tracking-wide text-white/55">
                Rehabilitación integral · Providencia, Santiago
              </p>
            </div>
          </div>

          {/* Middle: CTA buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/agendaProfesionales"
              className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF6A_0%,#C49A52_100%)] px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#07111c] shadow-[0_4px_20px_-4px_rgba(212,175,106,0.45)] transition hover:brightness-110 sm:w-auto"
            >
              Agenda tu evaluación
            </Link>
            <Link
              href="/servicios"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/[0.07] px-7 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white/90 transition hover:border-white/40 hover:bg-white/12 sm:w-auto"
            >
              Ver tratamientos
            </Link>
          </div>

          {/* Bottom: stats */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-3.5 transition hover:border-[#D4AF6A]/30 hover:bg-white/[0.05]">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">Especialidad</p>
              <p className="mt-2 text-[12px] font-medium leading-snug text-white/90">Dolor y postquirúrgico</p>
            </div>
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-3.5 transition hover:border-[#D4AF6A]/30 hover:bg-white/[0.05]">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">Soporte</p>
              <p className="mt-2 text-[12px] font-medium leading-snug text-white/90">TENS · Ondas · Presoterapia</p>
            </div>
            <div className="rounded-2xl border border-white/[0.09] bg-white/[0.03] p-3.5 transition hover:border-[#D4AF6A]/30 hover:bg-white/[0.05]">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">Objetivo</p>
              <p className="mt-2 text-[12px] font-medium leading-snug text-white/90">Mejora real del tejido</p>
            </div>
          </div>
        </article>

        <article className="relative flex h-full flex-col lg:col-span-7">
          <div className="relative mt-1 overflow-hidden rounded-[2rem] border border-white/14 bg-slate-900/20 md:hidden">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={imageErrors[mobileSlide.image] ? FALLBACK_IMAGE : mobileSlide.image}
                alt={mobileSlide.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
                onError={() =>
                  setImageErrors((current) => ({
                    ...current,
                    [mobileSlide.image]: true,
                  }))
                }
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.04)_0%,rgba(7,24,33,0.68)_100%)]" />
              <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/15 bg-[#0a1e2c]/80 p-4 backdrop-blur-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4AF6A]/90">{mobileSlide.badge}</p>
                <h2 className="mt-2 text-xl font-semibold leading-tight text-white">{mobileSlide.title}</h2>
                <p className="mt-1.5 text-sm leading-7 text-white/80">{mobileSlide.text}</p>
              </div>
            </div>
          </div>

          <div
            className="relative hidden flex-1 overflow-hidden rounded-[2rem] border border-white/14 bg-slate-900/20 md:block"
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
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.05)_0%,rgba(7,24,33,0.76)_100%)]" />
                  </figure>
                );
              })}

              {slides.length > 1 && (
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-2 sm:left-5 sm:right-5">
                  <p className="rounded-full border border-white/28 bg-black/28 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-white/85">
                    Imagen {activeIndex + 1} de {slides.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Slide anterior"
                      onClick={goPrev}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-black/28 text-white transition hover:bg-black/44"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Siguiente slide"
                      onClick={goNext}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/28 bg-black/28 text-white transition hover:bg-black/44"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/12 bg-[#07111c]/82 p-5 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="h-px w-4 bg-[#D4AF6A]/70" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4AF6A]/90">{currentSlide.badge}</p>
                </div>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[1.9rem]">{currentSlide.title}</h2>
                <p className="mt-2 text-sm leading-7 text-white/75 sm:text-[0.9rem]">{currentSlide.text}</p>
              </div>
            </div>
          </div>

          {slides.length > 1 && (
            <div className="hide-scrollbar mt-4 hidden gap-2 overflow-x-auto pb-1 md:flex">
              {slides.slice(0, 8).map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "relative w-20 shrink-0 overflow-hidden rounded-xl border transition sm:w-24",
                    activeIndex === index
                      ? "border-[#D4AF6A] shadow-[0_0_10px_-2px_rgba(212,175,106,0.5)]"
                      : "border-white/15 hover:border-white/30",
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
