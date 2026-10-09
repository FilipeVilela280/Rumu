"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Youtube, MessageCirclePlus, Menu, X } from "lucide-react";
import { getGalleryItems, MediaItem } from "@/app/gallery/galleryConfig";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gridItems, setGridItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    // Carrega a lista unificada e misturada de forma automática e segura
    setGridItems(getGalleryItems());
  }, []);

  const getColumnItems = (colIndex: number, numCols: number) => {
    return gridItems.filter((_, index) => index % numCols === colIndex);
  };

  return (
    <main className="min-h-screen bg-[#d3b890] w-full overflow-x-hidden font-satoshi">
      {/* ... (o seu código de Navbar, Logo e Footer mantém-se igual) ... */}

      {/* GRID MASONRY */}
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
          className="md:hidden text-white hover:opacity-70 transition-opacity bg"
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
      <section className="w-full px-0 py-1">
        <div className="flex flex-col md:flex-row gap-1">
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-0">
              {getColumnItems(colIndex, 3).map((item) => {
                if (!item) return null;

                return item.type === "video" ? (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full mb-1"
                  >
                    <Link href={item.href || "#"} className="block w-full group relative">
                      <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:brightness-90"
                        onEnded={(e) => {
                          e.currentTarget.currentTime = 0;
                          e.currentTarget.play();
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full mb-1"
                  >
                    <Link href={item.href || "#"} className="block w-full group relative">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width || 800}
                        height={item.height || 600}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:brightness-90"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
      {/* ... rodapé ... */}
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