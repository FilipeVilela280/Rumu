// app/layout.tsx
import { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rumustudio.com'),
  title: {
    default: "Rumu Studio | 3D Visualization",
    template: "%s | Rumu Studio" // Isto faz com que o título do About seja "About Us | Rumu Studio"
  },
  description: "High-end 3D architectural visualization and rendering services.",
  icons: {
    icon: "/favicon.ico", // Garante que tens este ficheiro na pasta public
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}