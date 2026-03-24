export default function TerminosYCondiciones() {
  const currentYear = new Date().getFullYear();

  const blocks = [
    {
      title: "1. Alcance del servicio",
      text: "Revitalize Pro entrega servicios de rehabilitación integral, terapias complementarias y regeneración de tejidos. Toda intervención se define tras evaluación clínica previa.",
    },
    {
      title: "2. Agenda y asistencia",
      text: "Las atenciones se realizan con reserva previa. Para reagendar o cancelar, solicita el cambio con al menos 24 horas de anticipación.",
    },
    {
      title: "3. Evaluación y contraindicaciones",
      text: "Cada paciente debe informar antecedentes médicos, medicamentos y condiciones relevantes. Revitalize Pro puede reprogramar o suspender procedimientos si existe riesgo clínico.",
    },
    {
      title: "4. Pagos y confirmación",
      text: "Las condiciones de pago, promociones y confirmación de reserva se informan al momento de agendar. El detalle final depende del plan terapéutico indicado por el profesional.",
    },
    {
      title: "5. Resultados esperados",
      text: "Los resultados clínicos dependen de la condición inicial, adherencia al tratamiento y respuesta individual del paciente. No se garantizan resultados idénticos entre personas.",
    },
    {
      title: "6. Protección de datos",
      text: "La información entregada por pacientes se utiliza únicamente para gestión clínica, coordinación de citas y comunicaciones relacionadas con la atención.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/20">
            <span className="text-xl font-semibold text-white">RP</span>
          </div>
          <h1 className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Términos y Condiciones
          </h1>
          <p className="mt-2 text-sm text-slate-500">Revitalize Pro · Providencia, Santiago</p>
        </header>

        <main className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200">
          <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-500" />

          <div className="space-y-6 p-6 sm:p-10">
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Este documento resume las condiciones generales aplicables a la atención clínica y al uso de canales
              digitales de Revitalize Pro. Si necesitas una versión contractual específica, solicítala por correo o
              WhatsApp antes de confirmar tu tratamiento.
            </p>

            {blocks.map((item) => (
              <section key={item.title}>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">{item.text}</p>
              </section>
            ))}

            <section className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Canales oficiales de contacto</h3>
              <p className="mt-3 text-sm text-slate-700 sm:text-base">WhatsApp: +56 9 2808 5737</p>
              <p className="text-sm text-slate-700 sm:text-base">Email: contacto@revitalizepro.cl</p>
              <p className="text-sm text-slate-700 sm:text-base">
                Dirección: Avenida Nueva Providencia 1881, oficina 1822, Providencia, Santiago.
              </p>
            </section>
          </div>
        </main>

        <footer className="mt-6 text-center text-xs text-slate-500">
          © {currentYear} Revitalize Pro. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
