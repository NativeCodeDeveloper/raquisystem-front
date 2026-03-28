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
        <div className="public-site relative min-h-screen bg-[#07111c] text-white">
          <ToasterClient />
          <Navbar />
          <main className="relative pt-12 md:pt-12">{children}</main>
          <FooterRevitalize />
          <WhatsAppFloatButton />
        </div>
      </ObjetoPagarProvider>
    </CarritoProvider>
  );
}
