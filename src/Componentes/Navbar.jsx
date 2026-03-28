"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sobre el profesional", href: "/mision-y-vision" },
  { label: "Contacto", href: "/contacto" },
];

const serviceItems = [
  { label: "Ver todos los servicios", href: "/servicios" },
  { label: "Rehabilitación y dolor", href: "/servicios#rehabilitacion-y-dolor" },
  { label: "Terapias complementarias", href: "/servicios#terapias-complementarias" },
  { label: "Rehabilitación postquirúrgica", href: "/servicios#postquirurgica" },
  { label: "Regeneración de tejidos", href: "/servicios#regeneracion-tejidos" },
  { label: "Corporal terapéutica", href: "/servicios#corporal-terapeutica" },
  { label: "Área capilar", href: "/servicios#capilar" },
];

function ServicesDropdown({ mobile = false, onSelect }) {
  if (mobile) {
    return (
      <details className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-white/90">
        <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] uppercase tracking-[0.14em] [&::-webkit-details-marker]:hidden">
          Servicios
          <ChevronDown className="h-4 w-4" />
        </summary>
        <div className="mt-3 space-y-1 border-t border-white/10 pt-3">
          {serviceItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onSelect}
              className="block rounded-lg px-3 py-2 text-[11px] tracking-[0.12em] text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </details>
    );
  }

  return (
    <details className="group relative flex h-9 items-center">
      <summary className="inline-flex h-9 cursor-pointer list-none items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-white/78 transition-colors duration-200 hover:text-white [&::-webkit-details-marker]:hidden">
        Servicios
        <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
      </summary>
      <ul className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-[310px] -translate-x-1/2 rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(4,18,26,0.98)_0%,rgba(6,26,36,0.98)_100%)] p-2 shadow-[0_28px_45px_-22px_rgba(2,8,22,0.85)] backdrop-blur-2xl">
        {serviceItems.map((item, index) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={[
                "block rounded-xl px-3 py-2 text-[11px] tracking-[0.12em] text-white/85 transition hover:bg-white/10 hover:text-white",
                index === 0 ? "border border-white/15 bg-white/5" : "",
              ].join(" ")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4AF6A]/15 bg-[linear-gradient(180deg,rgba(5,12,22,0.96)_0%,rgba(7,17,28,0.92)_100%)] text-white shadow-[0_1px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl">

      {/* logo raquisystem */}
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 md:h-24 md:px-8 lg:px-6">
        <Link href="/#inicio" aria-label="Ir al inicio" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative h-28 w-44 sm:h-32 sm:w-52 md:h-36 md:w-60">
            <Image
              src="/logors.png"
              alt="RaquiSystem"
              fill
              priority
              sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
              className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <nav aria-label="Menú principal" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.label} className="flex items-center">
                <Link
                  href={item.href}
                  className="inline-flex h-9 items-center text-[11px] uppercase tracking-[0.15em] text-white/78 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center">
              <ServicesDropdown />
            </li>
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/agendaProfesionales"
            aria-label="Agendar evaluación"
            className="hidden items-center rounded-full border border-[#D4AF6A]/40 bg-[linear-gradient(135deg,#D4AF6A_0%,#C49A52_100%)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#07111c] shadow-[0_2px_14px_-4px_rgba(212,175,106,0.45)] transition hover:brightness-110 lg:inline-flex"
          >
            Agenda tu evaluación
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20 xl:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(3,16,24,0.95)_0%,rgba(5,20,30,0.95)_100%)] xl:hidden",
          isOpen ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-transparent px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-white/85 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <ServicesDropdown mobile onSelect={() => setIsOpen(false)} />

          <Link
            href="/agendaProfesionales"
            onClick={() => setIsOpen(false)}
            aria-label="Agendar evaluación desde menú móvil"
            className="mt-2 rounded-xl bg-[linear-gradient(135deg,#D4AF6A_0%,#C49A52_100%)] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-[#07111c] shadow-[0_2px_14px_-4px_rgba(212,175,106,0.40)] transition hover:brightness-110"
          >
            Agenda tu evaluación
          </Link>
        </div>
      </div>
    </header>
  );
}
