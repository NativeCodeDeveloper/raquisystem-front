import Navbar from "@/Componentes/Navbar";
import FooterRevitalize from "@/Componentes/Footer";
import ToasterClient from "@/Componentes/ToasterClient";
import WhatsAppFloatButton from "@/Componentes/WhatsAppFloatButton";
import CarritoProvider from "@/ContextosGlobales/CarritoContext";
import ObjetoPagarProvider from "@/ContextosGlobales/ObjetoPagarContext";

export default function PublicLayout({ children }) {
  return (
    <CarritoProvider>
      <ObjetoPagarProvider>
        <div className="public-site relative min-h-screen bg-[radial-gradient(circle_at_top,#dff2ef_0%,#f4faf9_38%,#f8fafc_100%)] text-slate-900">
          <ToasterClient />
          <Navbar />
          <main className="relative pt-24 md:pt-12">{children}</main>
          <FooterRevitalize />
          <WhatsAppFloatButton />
        </div>
      </ObjetoPagarProvider>
    </CarritoProvider>
  );
}
