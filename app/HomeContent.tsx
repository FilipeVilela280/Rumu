"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Youtube, MessageCirclePlus, Menu, X } from "lucide-react";

const TOTAL_IMAGENS = 80;

interface ProjectItem {
  id: number;
  src: string;
  alt: string;
  href: string;
  width: number;
  height: number;
  type: "image" | "text_block";
}

// --- ALTERAÇÃO 1: Margem inferior (Vertical) ajustada para mb-1 (4px) ---
const ProjectImage = ({ src, alt, width, height, href }: { src: string; alt: string; width: number; height: number; href: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full mb-1" // <--- AQUI: Mudou de "mb-4 md:mb-6" para "mb-1"
  >
    <Link href={href} className="block w-full group relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="w-full h-auto object-cover transition-transform duration-700 group-hover:brightness-90"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
    </Link>
  </motion.div>
);

export default function Home() {
  const [showTitle, setShowTitle] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gridItems, setGridItems] = useState<ProjectItem[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const generateRandomDimensions = () => {
      const isPortrait = Math.random() > 0.5;
      return {
        width: 800,
        height: isPortrait ? 1200 : 600
      };
    };

    const images: ProjectItem[] = Array.from({ length: TOTAL_IMAGENS }, (_, i) => {
      const dims = generateRandomDimensions();
      return {
        id: i,
        src: `/img${i + 1}.jpg`,
        alt: `Project ${i + 1}`,
        href: `/gallery?img=${i + 1}`,
        width: dims.width,
        height: dims.height,
        type: "image"
      };
    });

    setGridItems(images);

    const timer = setTimeout(() => setShowTitle(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getColumnItems = (colIndex: number, numCols: number) => {
    return gridItems.filter((_, index) => index % numCols === colIndex);
  };

  return (
    <main className="min-h-screen bg-[#d3b890] w-full overflow-x-hidden font-satoshi">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-8 md:py-10 flex justify-end items-center">
        <div className="hidden md:flex gap-6 px-7 py-1">
          <Link href="/" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">Projects</Link>
          <Link href="/about" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">About Us</Link>
          <Link href="/contact" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">Contact Us</Link>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white hover:opacity-70 transition-opacity">
          <Menu size={35} strokeWidth={1.5} />
        </button>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#d3b890] z-[110] flex flex-col p-10 md:hidden"
            >
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="text-black"><X size={40} strokeWidth={1} /></button>
              </div>
              <div className="flex flex-col gap-8 mt-20">
                <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-black text-4xl font-black uppercase tracking-widest">Projects</Link>
                <Link onClick={() => setIsMenuOpen(false)} href="/about" className="text-black text-4xl font-black uppercase tracking-widest">About Us</Link>
                <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="text-black text-4xl font-black uppercase tracking-widest">Contact Us</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* LOGO */}
      <div className="fixed top-6 left-6 z-[105] px-2 md:px-7 pointer-events-none">
        <Link href="/">
          <Image 
            src="/LOGO_PNG_BRANCO.png" alt="Logo" width={130} height={40} priority
            className={`object-contain pointer-events-auto transition-all duration-500 ${isMenuOpen ? 'invert' : ''}`} 
          />
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-center">
            <source src="/horizontal.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 pointer-events-none bg-black/30" />
        </div>
        <AnimatePresence>
          {showTitle && (
            <motion.h1
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 1.2 }}
              className="relative z-20 text-white text-5xl md:text-7xl font-black uppercase tracking-[0.15em] leading-none text-center px-4"
            >
              FROM CONCEPT <br /> TO REALITY
            </motion.h1>
          )}
        </AnimatePresence>
      </section>

      {/* GRID MASONRY INTELIGENTE */}
      <section className="w-full px-4 md:px-0 py-1">
        {/* --- ALTERAÇÃO 2: Gap Horizontal ajustado para gap-1 (4px) --- */}
        <div className="flex flex-col md:flex-row gap-2"> 
          
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-0">
              
              {/* Bloco de Texto Fixo na Coluna do Meio */}
              {colIndex === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  // --- ALTERAÇÃO 3: Margem do texto ajustada para mb-1 para combinar com as imagens ---
                  className="mb-1 bg-[#d3b890] p-12 text-center text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed text-gray-600"
                >
                  Interior and Exterior 3D renders focused on <br /> detail, lighting, and realism.
                </motion.div>
              )}

              {/* Itens da Coluna */}
              {getColumnItems(colIndex, 3).map((item) => (
                <ProjectImage 
                  key={item.id} 
                  src={item.src} 
                  alt={item.alt} 
                  width={item.width} 
                  height={item.height}
                  href={item.href} 
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#d3b890] py-10 border-t border-black/5">
        <div className="w-full flex flex-col md:flex-row justify-between items-start px-10">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">© 2025 Rumu Studio.</p>
          <div className="flex flex-row gap-5 items-center mt-6 md:mt-0">
            <Instagram size={28} strokeWidth={1} className="text-black hover:opacity-50 transition-opacity cursor-pointer" />
            <Linkedin size={28} strokeWidth={1} className="text-black hover:opacity-50 transition-opacity cursor-pointer" />
            <Youtube size={28} strokeWidth={1} className="text-black hover:opacity-50 transition-opacity cursor-pointer" />
            <MessageCirclePlus size={28} strokeWidth={1} className="text-black hover:opacity-50 transition-opacity cursor-pointer" />
          </div>
        </div>
      </footer>
    </main>
  );
}