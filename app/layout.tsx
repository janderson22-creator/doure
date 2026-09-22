import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { BRAND } from "@/lib/catalog";

export const metadata: Metadata = {
  title: `${BRAND.name} | Faça seu pedido`,
  description: `${BRAND.tagline} Escolha o tamanho, o sabor e envie seu pedido pelo WhatsApp.`,
};

export const viewport: Viewport = {
  themeColor: "#fff3c1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
