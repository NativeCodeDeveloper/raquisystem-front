"use client";

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FALLBACK_IMAGE = "/ac3.png";

const FALLBACK_SERVICES = [
  {
    id: "fallback-1",
    name: "Neuromodulación y TENS",
    description: "Protocolos de electroterapia para modular dolor y mejorar recuperación funcional.",
    image: FALLBACK_IMAGE,
  },
  {
    id: "fallback-2",
    name: "Ondas de choque y ultrasonido",
    description: "Estimulación terapéutica para regeneración de tejido y tratamiento de sobrecarga muscular.",
    image: FALLBACK_IMAGE,
  },
  {
    id: "fallback-3",
    name: "Presoterapia clínica",
    description: "Mejora de drenaje, circulación y control de edema en procesos de rehabilitación.",
    image: FALLBACK_IMAGE,
  },
  {
    id: "fallback-4",
    name: "Rehabilitación funcional",
    description: "Ejercicio terapéutico dirigido para recuperar fuerza, estabilidad y movilidad articular.",
    image: FALLBACK_IMAGE,
  },
];

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  const [infoData, setInfoData] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef(null);

  const services = infoData.map((item) => ({
    id: item.id_publicacionesTituloDescripcion,
    name: item.publicacionesTitulo,
    description: item.publicacionesDescripcion,
    image: `https://imagedelivery.net/${CLOUDFLARE_HASH}/${item.publicacionesTituloDescripcionImagen}/card`,
  }));

  const servicesToRender = services.length > 0 ? services : FALLBACK_SERVICES;

  async function loadServices() {
    try {
      const res = await fetch(
        `${API}/publicacionesTituloDetalle/seleccionarPublicacionesTituloDetalle`,
        {
          method: "GET",
          headers: { Accept: "application/json" },
          mode: "cors",
        }
      );

      if (!res.ok) {
        return toast.error("No fue posible cargar los servicios en este momento.");
      }

      const data = await res.json();
      setInfoData(Array.isArray(data) ? data : []);
    } catch {
      return toast.error("Error de conexión al cargar servicios.");
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const scrollToCard = (index) => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = el.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveCard(index);
    }
  };

  const goPrev = () => scrollToCard(Math.max(0, activeCard - 1));
  const goNext = () => scrollToCard(Math.min(servicesToRender.length - 1, activeCard + 1));

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = Array.from(el.children);
    const scrollLeft = el.scrollLeft;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveCard(closest);
  };

  return (
    <section
      id="terapias-complementarias"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#07111c_0%,#091824_55%,#071420_100%)] py-24 text-white sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">

        {/* Header */}
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#D4AF6A]/60" />
              <p className="text-[10px] font-medium uppercase tracking-[0.30em] text-[#D4AF6A]">
                Terapias complementarias y regeneración
              </p>
              <span className="h-px w-8 bg-[#D4AF6A]/60" />
            </div>
            <h2 className="mx-auto mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Tecnología terapéutica aplicada a dolor, tejido y recuperación funcional.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-light leading-8 text-white/60">
              Protocolos avanzados para acelerar evolución clínica, mejorar respuesta del paciente y potenciar resultados de rehabilitación.
            </p>
          </div>
        </RevealOnScroll>

        {/* Carousel */}
        <div className="relative mt-14">

          {/* Prev button */}
          <button
            type="button"
            aria-label="Anterior"
            onClick={goPrev}
            disabled={activeCard === 0}
            className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF6A]/30 bg-[#07111c]/90 p-3 text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] backdrop-blur-sm transition hover:border-[#D4AF6A]/60 hover:bg-[#D4AF6A]/10 disabled:cursor-not-allowed disabled:opacity-30 md:flex lg:-left-5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Cards track */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="hide-scrollbar flex gap-5 overflow-x-auto scroll-smooth pb-3 [scroll-snap-type:x_mandatory]"
          >
            {servicesToRender.map((service, index) => (
              <div
                key={service.id || service.name}
                className="w-[82vw] shrink-0 [scroll-snap-align:start] sm:w-[48%] xl:w-[calc(33.333%-14px)]"
              >
                <Link
                  href="/agendaProfesionales"
                  aria-label={`Agendar para ${service.name}`}
                  className="group relative block h-[380px] overflow-hidden rounded-3xl border border-white/[0.10] bg-[#060e18] transition-all duration-500 hover:border-[#D4AF6A]/30 hover:shadow-[0_8px_40px_-10px_rgba(212,175,106,0.20)] sm:h-[420px]"
                >
                  {/* Image */}
                  <img
                    src={imageErrors[service.image] ? FALLBACK_IMAGE : service.image}
                    alt={service.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                    loading="lazy"
                    onError={() =>
                      setImageErrors((current) => ({
                        ...current,
                        [service.image]: true,
                      }))
                    }
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.10)_0%,rgba(4,10,20,0.55)_50%,rgba(4,10,20,0.95)_100%)]" />

                  {/* Top badge */}
                  <div className="absolute left-5 top-5">
                    <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF6A]/35 bg-[#07111c]/70 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#D4AF6A] backdrop-blur-sm">
                      <span className="h-1 w-1 rounded-full bg-[#D4AF6A]" />
                      Terapia {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Top right tag */}
                  <div className="absolute right-5 top-5">
                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm">
                      Agenda online
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    {/* Gold line accent */}
                    <div className="mb-4 h-px w-8 bg-[linear-gradient(90deg,#D4AF6A,transparent)]" />
                    <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 text-sm font-light leading-7 text-white/70">
                      {service.description ||
                        "Aplicamos un protocolo clínico individual para acelerar la recuperación y mejorar la calidad del tejido."}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.20em] text-[#D4AF6A] transition-all group-hover:gap-3">
                      <span>Reservar ahora</span>
                      <span className="h-px w-5 bg-[#D4AF6A] transition-all group-hover:w-8" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            type="button"
            aria-label="Siguiente"
            onClick={goNext}
            disabled={activeCard === servicesToRender.length - 1}
            className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF6A]/30 bg-[#07111c]/90 p-3 text-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.6)] backdrop-blur-sm transition hover:border-[#D4AF6A]/60 hover:bg-[#D4AF6A]/10 disabled:cursor-not-allowed disabled:opacity-30 md:flex lg:-right-5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {servicesToRender.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a terapia ${i + 1}`}
              onClick={() => scrollToCard(i)}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                activeCard === i
                  ? "w-7 bg-[#D4AF6A]"
                  : "w-1.5 bg-white/25 hover:bg-white/45",
              ].join(" ")}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
