"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import localFont from "next/font/local";
import Lottie from "lottie-react";

import animacaoLogo from "../public/AnimacaoLogo.json";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
});

function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }} // Começa visível
      exit={{ opacity: 0 }}    // Desaparece suavemente
      transition={{ duration: 0.5 }}
      // Use z-index alto para garantir que fique por cima de tudo
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#d3b890]" // Tente mudar esta cor para testar (ex: bg-red-500)
    >
      <div className="w-[300px] md:w-[500px]">
        <Lottie animationData={animacaoLogo} loop autoplay />
      </div>
    </motion.div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inicia o loading
    setIsLoading(true);

    // Remove o loading após 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]); // Roda toda vez que a rota muda

  return (
    <html lang="pt">
      <body className={`${satoshi.variable} font-satoshi antialiased`}>
        {/* O children é renderizado SEMPRE, o loading fica por cima */}
        {children}
        
        <AnimatePresence>
          {isLoading && <LoadingScreen key="loader" />}
        </AnimatePresence>
      </body>
    </html>
  );
}