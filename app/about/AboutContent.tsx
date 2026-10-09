"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Youtube, MessageCirclePlus, Menu, X } from "lucide-react";

// =====================================================
// COMPONENTE AUXILIAR PARA TRANSIÇÃO SUAVE (CROSSFADE)
// =====================================================
const FadeImageItem = ({ src, alt, isActive }) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={alt === "Project 1"}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
};

export default function AboutPage() {
  const [currentImg, setCurrentImg] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalImages = 58;

  useEffect(() => {
    // Timer para as imagens (troca a cada 10 segundos)
    const timerImages = setInterval(() => {
      setCurrentImg((prev) => (prev >= totalImages ? 1 : prev + 1));
    }, 10000);

    return () => clearInterval(timerImages);
  }, []);

  return (
    <main className="min-h-screen bg-[#d3b890] w-full overflow-x-hidden font-satoshi">
      
      {/* NAVBAR RESPONSIVA */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-8 py-8 md:py-10 flex justify-end items-center">
        
        {/* Menu Desktop (Esconde no Mobile) */}
        <div className="hidden md:flex gap-6 px-7 py-1">
          <Link href="/" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">Projects</Link>
          <Link href="/about" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">About Us</Link>
          <Link href="/contact" className="text-white text-lg font-bold uppercase tracking-[2px] hover:opacity-70 transition-opacity">Contact Us</Link>
        </div>

        {/* Botão Hambúrguer (Apenas Mobile) */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden text-white hover:opacity-70 transition-opacity"
        >
          <Menu size={35} strokeWidth={1.5} />
        </button>

        {/* Menu Lateral Mobile Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#d3b890] z-[110] flex flex-col p-10 md:hidden"
            >
              <div className="flex justify-end">
                <button onClick={() => setIsMenuOpen(false)} className="text-black">
                  <X size={40} strokeWidth={1} />
                </button>
              </div>
              
              <div className="flex flex-col gap-8 mt-20" >
                <Link onClick={() => setIsMenuOpen(false)} href="/" className="text-black text-4xl font-black uppercase tracking-widest">Projects</Link>
                <Link onClick={() => setIsMenuOpen(false)} href="/about" className="text-black text-4xl font-black uppercase tracking-widest">About Us</Link>
                <Link onClick={() => setIsMenuOpen(false)} href="/contact" className="text-black text-4xl font-black uppercase tracking-widest">Contact Us</Link>
              </div>

              <div className="mt-auto flex gap-6 pb-10">
                <Instagram size={28} strokeWidth={1} className="text-black" />
                <Linkedin size={28} strokeWidth={1} className="text-black" />
                <Youtube size={28} strokeWidth={1} className="text-black" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* LOGO FIXO ADAPTÁVEL */}
      <div className="fixed top-6 left-6 z-[105] px-2 md:px-7 pointer-events-none">
        <Link href="/">
          <Image 
            src="/LOGO_PNG_BRANCO.png" 
            alt="Logo" 
            width={130} 
            height={40} 
            priority
            className={`object-contain pointer-events-auto transition-all duration-500 ${isMenuOpen ? 'invert' : ''}`} 
          />
        </Link>
      </div>

      {/* CONTEÚDO SOBRE NÓS */}
      <section className="pt-48 pb-70 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* TEXTO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-8"
          >
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-widest leading-none text-white">
              RUMU <br /> STUDIO
            </h1>
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] leading-loose text-gray-700 max-w-md">
              We are a studio focused on creating high-fidelity 3D visualizations for architecture and interiors.
              Our commitment is to transform concepts into visual realities.
              <br /><br />
              Through technological innovation and a keen artistic eye, we help architects and designers communicate their visions in an impactful and comprehensive way.
            </p>
          </motion.div>

          {/* CARROSSEL AUTOMÁTICO (SUPER SMOOTH / CROSSFADE) */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#c9af88]">
            {Array.from({ length: totalImages }, (_, i) => i + 1).map((imgIndex) => (
              <FadeImageItem
                key={`img-${imgIndex}`}
                src={`/img${imgIndex}.jpg`}
                alt={`Project ${imgIndex}`}
                isActive={imgIndex === currentImg}
              />
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#d3b890] py-8 border-t border-black/5 font-satoshi">
        <div className="w-full flex flex-col md:flex-row justify-between items-center px-10 gap-6 md:gap-0">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
            © 2025 Rumu Studio.
          </p>

          <div className="flex flex-row gap-5 items-center">
            <a href="https://www.instagram.com/rumu.studios/" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity">
              <Instagram size={24} strokeWidth={1} />
            </a>
            <a href="https://www.linkedin.com/company/110907501/" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity">
              <Linkedin size={24} strokeWidth={1} />
            </a>
            <a href="https://www.youtube.com/channel/UCHoKpJq_jZLIH8EpNBs0rpg" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity">
              <Youtube size={24} strokeWidth={1} />
            </a>
            <a href="https://wa.me/351910891529" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity">
              <MessageCirclePlus size={24} strokeWidth={1} />
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}