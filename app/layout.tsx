import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FRC - Calculadora de Custo de Roupas",
  description: "Calcule o custo de produção das suas peças de roupa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}
