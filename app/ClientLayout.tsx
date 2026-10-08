"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import localFont from "next/font/local";
import Lottie from "lottie-react";
import animacaoLogo from "../public/AnimacaoLogo.json";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevPathname = useRef(pathname);

  // 1. Marcar quando o componente foi montado no browser
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Controlar o loading apenas em mudanças REAIS de página
  useEffect(() => {
    if (!mounted) return;

    // Se o pathname mudou e não é galeria
    if (prevPathname.current !== pathname) {
      const isEnteringGallery = pathname?.startsWith("/gallery");
      const isExitingGallery = prevPathname.current?.startsWith("/gallery");

      if (!isEnteringGallery && !isExitingGallery) {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 1500);
        prevPathname.current = pathname;
        return () => clearTimeout(timer);
      }
    }
    
    prevPathname.current = pathname;
  }, [pathname, mounted]);

  // Enquanto o Next.js carrega o HTML básico (Server Side)
  if (!mounted) {
    return (
      <body className={`${satoshi.variable} font-satoshi antialiased`}>
        {children}
      </body>
    );
  }

  return (
    <body className={`${satoshi.variable} font-satoshi antialiased`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }} // Já começa visível para não piscar
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#d3b890]"
          >
            <div className="w-[300px] md:w-[500px]">
              <Lottie 
                animationData={animacaoLogo} 
                loop={true} 
                autoplay={true} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </body>
  );
}