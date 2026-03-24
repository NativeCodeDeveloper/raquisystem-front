"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Clock3, Instagram, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactCards = [
  {
    title: "Ubicación",
    value: "Avenida Nueva Providencia 1881, oficina 1822, Providencia",
    href: "https://maps.google.com/?q=Avenida+Nueva+Providencia+1881+Oficina+1822+Providencia+Santiago",
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+56 9 2808 5737",
    href: "https://wa.me/56928085737",
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: "contacto@revitalizepro.cl",
    href: "mailto:contacto@revitalizepro.cl",
    icon: Mail,
  },
  {
    title: "Instagram",
    value: "@revitalizepro.cl",
    href: "https://www.instagram.com/revitalizepro.cl",
    icon: Instagram,
  },
];

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  async function enviarCorreo() {
    try {
      if (!nombre || !email || !mensaje) {
        return toast.error("Completa todos los campos para enviar tu mensaje.");
      }

      const res = await fetch(`${API}/correo/contacto`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, mensaje }),
        mode: "cors",
        cache: "no-cache",
      });

      if (!res.ok) {
        return toast.error("No se pudo enviar tu solicitud. Intenta nuevamente.");
      }

      const respuestaBackend = await res.json();

      if (respuestaBackend.message === true) {
        setNombre("");
        setEmail("");
        setMensaje("");
        return toast.success("Tu consulta fue enviada correctamente.");
      }

      return toast.error("Correo no válido. Verifica e intenta otra vez.");
    } catch {
      return toast.error("Ocurrió un error inesperado. Intenta nuevamente.");
    }
  }

  return (
    <main className="bg-[linear-gradient(180deg,#f4fbfa_0%,#f8fafc_100%)] text-slate-900">
      <section className="relative overflow-hidden py-24 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(20,184,166,0.18),transparent_35%),radial-gradient(circle_at_88%_2%,rgba(14,165,233,0.12),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_1.05fr] xl:px-12 xl:gap-14">
          <aside className="rounded-[2rem] border border-teal-100 bg-white/80 p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-700">Contacto</p>
            <h1 className="mt-4 text-4xl leading-[1.02] text-slate-900 sm:text-5xl">
              Agenda tu evaluación clínica en Revitalize Pro.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Escríbenos para evaluar dolor, postquirúrgico, regeneración de tejido o tratamientos complementarios.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.title}</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-800">{item.value}</p>
                  </>
                );

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300"
                  >
                    {content}
                  </a>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Horario de atención</p>
              <div className="mt-3 flex items-start gap-3 text-sm text-slate-700">
                <Clock3 className="mt-0.5 h-4 w-4 text-slate-500" />
                <div className="space-y-1.5">
                  <p>Lunes a viernes: 10:00 – 14:00 / 15:00 – 18:00</p>
                  <p>Sábado: 09:00 – 16:00</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-white/80 bg-white p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Formulario de contacto</p>
            <h2 className="mt-4 text-3xl leading-tight text-slate-900 sm:text-4xl">
              Cuéntanos tu caso y te orientaremos con un plan inicial.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              También puedes indicar si prefieres respuesta por WhatsApp, llamada o correo.
            </p>

            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                enviarCorreo();
              }}
            >
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <Input
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Camila Pérez"
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: correo@ejemplo.com"
                  className="h-11 rounded-xl border-slate-300 bg-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="min-h-[150px] rounded-xl border-slate-300 bg-white"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Enviar mensaje
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
