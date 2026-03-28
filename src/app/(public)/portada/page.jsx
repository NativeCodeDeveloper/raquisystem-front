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
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#07111c] py-16 pt-32 text-white md:pt-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(212,175,106,0.10),transparent_40%),radial-gradient(ellipse_at_88%_5%,rgba(14,165,233,0.13),transparent_38%),radial-gradient(ellipse_at_50%_100%,rgba(20,184,166,0.08),transparent_50%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <article className="relative flex flex-col justify-center py-4 lg:col-span-5 lg:py-8">


          {/* H1 + descripción */}
          <div className="mt-3">
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-[4rem]">
              Revitalize<span className="text-[#D4AF6A]"> Pro</span>
            </h1>

            <img 
          src="/logopequeño.png" 
          alt="logo raquisystem"
          height={90}
          width={90}
          className="mt-4 object-center items-center justify-center mx-auto rounded-full"
          />

            <p className="mt-5 text-justify max-w-sm text-base font-light leading-8 text-white/60">
              Rehabilitación integral, manejo del dolor y regeneración de tejidos, nuestra atención de calidad es lo que nuestros pacientes se merecen.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/agendaProfesionales"
              className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#D4AF6A_0%,#C49A52_100%)] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#07111c] shadow-[0_4px_20px_-4px_rgba(212,175,106,0.45)] transition hover:brightness-110 sm:w-auto"
            >
              Agenda tu evaluación
            </Link>
            <Link
              href="/servicios"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.14em] text-white/80 transition hover:border-white/40 hover:text-white sm:w-auto"
            >
              Ver tratamientos
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">Especialidad</p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-white/85">Dolor y postquirúrgico</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">Soporte</p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-white/85">TENS · Ondas · Presoterapia</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">Objetivo</p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-white/85">Mejora real del tejido</p>
            </div>
          </div>
        </article>

        <article
          className="relative flex flex-col justify-center lg:col-span-7"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="relative w-full overflow-hidden rounded-3xl"
            style={{ minHeight: "clamp(380px, 60vh, 700px)" }}
          >
            {/* Slides */}
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
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,18,0.10)_0%,rgba(7,24,33,0.82)_100%)]" />
                </figure>
              );
            })}

            {/* Side arrows */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Slide anterior"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:border-[#D4AF6A]/60 hover:bg-[#D4AF6A]/20 hover:text-[#D4AF6A]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Siguiente slide"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:border-[#D4AF6A]/60 hover:bg-[#D4AF6A]/20 hover:text-[#D4AF6A]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {/* Dot indicators — vertical, right side */}
            {slides.length > 1 && (
              <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1.5">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Ir al slide ${index + 1}`}
                    className={[
                      "rounded-full transition-all duration-300",
                      activeIndex === index
                        ? "h-5 w-1.5 bg-[#D4AF6A]"
                        : "h-1.5 w-1.5 bg-white/40 hover:bg-white/70",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}

            {/* Bottom info overlay — floating on gradient, no card box */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-7 pt-16 sm:px-8 sm:pb-8">
              <div className="flex items-center gap-2">
                <span className="h-px w-4 bg-[#D4AF6A]/80" />
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4AF6A]">
                  {currentSlide.badge}
                </p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[1.75rem]">
                {currentSlide.title}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-7 text-white/75">
                {currentSlide.text}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
