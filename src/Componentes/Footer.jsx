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
      <h3 className="text-2xl text-white">{title}</h3>
      <span className="mt-2 block h-[2px] w-16 bg-gradient-to-r from-teal-300 to-cyan-300" />
      <ul className="mt-5 space-y-3 text-sm text-slate-300">
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
    <footer className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-[2rem] border border-cyan-900/35 bg-[linear-gradient(180deg,#0f2a36_0%,#133441_56%,#102e3a_100%)] p-7 shadow-[0_40px_78px_-50px_rgba(2,8,22,0.9)] sm:p-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Empresa" links={companyLinks} />
          <FooterColumn title="Ayuda" links={helpLinks} />
          <FooterColumn title="Servicios" links={serviceLinks} />

          <div>
            <h3 className="text-2xl text-white">Síguenos</h3>
            <span className="mt-2 block h-[2px] w-16 bg-gradient-to-r from-teal-300 to-cyan-300" />
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-slate-100 transition hover:border-cyan-200/50 hover:bg-white/20"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-300" /> +56 9 2808 5737
              </p>
              <p className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 text-cyan-300" />
                L-V 10:00 – 14:00 / 15:00 – 18:00 · Sáb 09:00 – 16:00
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 border-t border-white/12 pt-7 lg:grid-cols-[1fr_1.25fr]">
          <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-5 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">Ubicación</p>
            <h4 className="mt-2 text-2xl text-white">Revitalize Pro · Providencia</h4>
            <p className="mt-3 leading-7">Avenida Nueva Providencia 1881, oficina 1822, Santiago de Chile.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/12 bg-white/95">
            <iframe
              title="Mapa ubicación Revitalize Pro"
              src="https://www.google.com/maps?q=Avenida+Nueva+Providencia+1881,+Providencia,+Santiago&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[220px] w-full"
            />
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/12 pt-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Revitalize Pro. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <a
              href="https://nativecode.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline decoration-cyan-400/60 underline-offset-2 transition hover:text-cyan-200"
            >
              nativecode.cl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
