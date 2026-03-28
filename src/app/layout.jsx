import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Geist, Geist_Mono, Poppins } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600"],
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.revitalizepro.cl"
);

export const metadata = {
  title: {
    default: "Revitalize Pro | Rehabilitación Integral y Regeneración",
    template: "%s | Revitalize Pro",
  },
  description:
    "Centro clínico especializado en rehabilitación integral, manejo del dolor, terapias complementarias y regeneración de tejidos en Providencia, Santiago.",
  keywords: [
    "Revitalize Pro",
    "rehabilitación integral",
    "dolor crónico",
    "postquirúrgico",
    "terapias complementarias",
    "regeneración de tejidos",
    "presoterapia",
    "Providencia",
  ],
  authors: [{ name: "Revitalize Pro", url: metadataBase.href }],
  publisher: "Revitalize Pro",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  openGraph: {
    title: "Revitalize Pro | Rehabilitación Integral y Regeneración",
    description:
      "Abordaje clínico personalizado para dolor, disfunción y alteraciones del tejido.",
    url: metadataBase.href,
    siteName: "Revitalize Pro",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revitalize Pro",
    description:
      "Rehabilitación integral y terapias regenerativas con enfoque clínico.",
  },
  icons: {
    icon: "/logopequeño.png",
    shortcut: "/logopequeño.png",
    apple: "/logopequeño.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
