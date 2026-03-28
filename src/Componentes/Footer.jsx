import Link from "next/link";
import { Clock3, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";

const companyLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sobre el profesional", href: "/mision-y-vision" },
  { label: "Nuestros servicios", href: "/servicios" },
  { label: "Términos y condiciones", href: "/terminosCondiciones" },
];

const helpLinks = [
  { label: "Agenda online", href: "/agendaProfesionales" },
  { label: "Contacto", href: "/contacto" },
  { label: "WhatsApp directo", href: "https://wa.me/56928085737", external: true },
  {
    label: "Ubicación",
    href: "https://maps.google.com/?q=Avenida+Nueva+Providencia+1881+Oficina+1822+Providencia+Santiago",
    external: true,
  },
];

const serviceLinks = [
  { label: "Rehabilitación y dolor", href: "/servicios#rehabilitacion-y-dolor" },
  { label: "Terapias complementarias", href: "/servicios#terapias-complementarias" },
  { label: "Postquirúrgica", href: "/servicios#postquirurgica" },
  { label: "Regeneración de tejidos", href: "/servicios#regeneracion-tejidos" },
];

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/56928085737", icon: MessageCircle },
  { label: "Instagram", href: "https://www.instagram.com/revitalizepro.cl", icon: Instagram },
  {
    label: "Mapa",
    href: "https://maps.google.com/?q=Avenida+Nueva+Providencia+1881+Oficina+1822+Providencia+Santiago",
    icon: MapPin,
  },
  { label: "Teléfono", href: "tel:+56928085737", icon: Phone },
];

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <div className="mt-2 h-px w-10 bg-[linear-gradient(90deg,#D4AF6A,transparent)]" />
      <ul className="mt-5 space-y-3 text-sm text-white/60">
        {links.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterRevitalize() {
  return (
    <footer className="bg-[linear-gradient(180deg,#07111c_0%,#091824_55%,#071420_100%)] px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-[#D4AF6A]/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] p-7 shadow-[0_40px_78px_-50px_rgba(0,0,0,0.8)] sm:p-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="RaquiSystem" links={companyLinks} />
          <FooterColumn title="Ayuda" links={helpLinks} />
          <FooterColumn title="Servicios" links={serviceLinks} />

          <div>
            <h3 className="text-lg font-semibold text-white">Síguenos</h3>
            <div className="mt-2 h-px w-10 bg-[linear-gradient(90deg,#D4AF6A,transparent)]" />
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={item.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white/70 transition hover:border-[#D4AF6A]/50 hover:bg-[#D4AF6A]/10 hover:text-[#D4AF6A]"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#D4AF6A]" /> +56 9 2808 5737
              </p>
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 text-[#D4AF6A]" />
                L-V 10:00 – 14:00 / 15:00 – 18:00 · Sáb 09:00 – 16:00
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-white/8 pt-7 lg:grid-cols-[1fr_1.25fr]">
          <div className="rounded-2xl border border-white/8 bg-white/3 p-5 text-sm text-white/60">
            <p className="text-[10px] font-medium uppercase tracking-[0.20em] text-[#D4AF6A]">Ubicación</p>
            <h4 className="mt-2 text-xl font-semibold text-white">Revitalize Pro · Providencia</h4>
            <p className="mt-3 leading-7">Avenida Nueva Providencia 1881, oficina 1822, Santiago de Chile.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/95">
            <iframe
              title="Mapa ubicación Revitalize Pro"
              src="https://www.google.com/maps?q=Avenida+Nueva+Providencia+1881,+Providencia,+Santiago&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[220px] w-full"
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/8 pt-5 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Revitalize Pro. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://nativecode.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF6A]/80 underline decoration-[#D4AF6A]/40 underline-offset-2 transition hover:text-[#D4AF6A]"
            >
              nativecode.cl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
