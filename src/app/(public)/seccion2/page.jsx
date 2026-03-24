"use client";

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

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
];

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  const [infoData, setInfoData] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

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

  return (
    <section
      id="terapias-complementarias"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#0f2a36_0%,#113542_55%,#0f2d39_100%)] py-24 text-white sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/14 bg-white/[0.04] p-7 text-center backdrop-blur-sm sm:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Terapias complementarias y regeneración</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-balance text-4xl leading-[1.07] sm:text-5xl lg:text-6xl">
              Tecnología terapéutica aplicada a dolor, tejido y recuperación funcional.
            </h2>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-200">
              Protocolos avanzados para acelerar evolución clínica, mejorar respuesta del paciente y potenciar resultados
              de rehabilitación.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {servicesToRender.map((service, index) => (
            <RevealOnScroll
              key={service.id || service.name}
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              className={[
                "h-full",
                index === 0 ? "xl:col-span-2" : "",
              ].join(" ")}
            >
              <Link
                href="/agendaProfesionales"
                aria-label={`Agendar para ${service.name}`}
                className={[
                  "group relative block h-full overflow-hidden rounded-3xl border border-white/14 bg-slate-900/35",
                  index === 0 ? "min-h-[380px]" : "min-h-[330px]",
                ].join(" ")}
              >
                <img
                  src={imageErrors[service.image] ? FALLBACK_IMAGE : service.image}
                  alt={service.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={() =>
                    setImageErrors((current) => ({
                      ...current,
                      [service.image]: true,
                    }))
                  }
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.2)_0%,rgba(2,6,23,0.88)_100%)]" />

                <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cyan-100">
                      Terapia {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-white/65">Agenda online</span>
                  </div>

                  <div className={index === 0 ? "max-w-2xl" : "max-w-xl"}>
                    <h3 className={index === 0 ? "text-3xl leading-tight text-white sm:text-[2rem]" : "text-2xl leading-tight text-white"}>
                      {service.name}
                    </h3>
                    <p className={index === 0 ? "mt-4 text-base leading-8 text-white/85" : "mt-4 text-sm leading-8 text-white/85 sm:text-base"}>
                      {service.description ||
                        "Aplicamos un protocolo clínico individual para acelerar la recuperación y mejorar la calidad del tejido."}
                    </p>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
