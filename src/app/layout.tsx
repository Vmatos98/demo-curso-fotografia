import type { Metadata } from "next";
import "./globals.css";
import DemoBar from "@/components/DemoBar";

export const metadata: Metadata = {
  title: "LUMINA Master Academy | Curso Profissional de Fotografia",
  description: "Aprenda fotografia do zero ao avançado com aulas gravadas em 4K, encontros semanais ao vivo, materiais práticos e consultorias individuais.",
  keywords: ["curso de fotografia", "fotografia profissional", "consultoria de fotografia", "aulas ao vivo", "lightroom", "fotometria"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <DemoBar />
        {children}
      </body>
    </html>
  );
}
