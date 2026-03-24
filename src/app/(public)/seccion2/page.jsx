"use client";

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH =
    process.env.NEXT_PUBLIC_CLOUDFLARE_HASH || "aCBUhLfqUcxA2yhIBn1fNQ";

  const [infoData, setInfoData] = useState([]);

  const services = infoData.map((item) => ({
    id: item.id_publicacionesTituloDescripcion,
    name: item.publicacionesTitulo,
    description: item.publicacionesDescripcion,
    image: `https://imagedelivery.net/${CLOUDFLARE_HASH}/${item.publicacionesTituloDescripcionImagen}/card`,
  }));

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
      className="scroll-mt-24 bg-[linear-gradient(180deg,#f8fcfb_0%,#f3f8fb_100%)] py-20 text-slate-900 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Terapias complementarias y regeneración
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-3xl leading-tight tracking-[0.01em] sm:text-4xl lg:text-5xl">
            Tecnologías terapéuticas para recuperación de tejidos y mejora funcional.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealOnScroll
              key={service.id || service.name}
              delayClass={index % 2 === 0 ? "delay-100" : "delay-150"}
              className="h-full"
            >
              <Link
                href="/agendaProfesionales"
                aria-label={`Agendar para ${service.name}`}
                className="group block h-full overflow-hidden rounded-3xl border border-cyan-100 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-200"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08)_0%,rgba(2,6,23,0.6)_100%)]" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg leading-snug tracking-[0.01em] text-slate-900">{service.name}</h3>
                  <p className="mt-2 text-sm leading-7 tracking-[0.01em] text-slate-600">
                    {service.description ||
                      "Aplicamos un protocolo clínico individual para acelerar la recuperación y mejorar la calidad del tejido."}
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
