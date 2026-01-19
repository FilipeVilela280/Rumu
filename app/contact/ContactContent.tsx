"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, Send, Youtube, CheckCircle2, MessageCirclePlus,Menu,X } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para esconder o título após 3 segundos ao entrar na página
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpeza do timer ao sair da página
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Erro ao enviar a mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de ligação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#d3b890] w-full overflow-x-hidden font-satoshi">

      {/* NAVBAR */}
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
              
              <div className="flex flex-col gap-8 mt-20">
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

      {/* LOGO FIXO */}
      <div className="fixed top-6 left-4 md:left-6 z-50 md:px-7 pointer-events-none">
        <Link href="/">
          <div className="fixed top-6 left-6 z-50 px-7 pointer-events-none">
            <Image src="/LOGO_PNG_BRANCO.png" alt="Logo" width={150} height={40} className="object-contain pointer-events-auto" />
          </div>
        </Link>
      </div>




      {/* FORMULÁRIO DE CONTACTO */}
      <section className="pt-44 pb-40 px-8 max-w-4xl mx-auto">
        <div className="flex flex-col gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-white whitespace-pre-line">
              {isSubmitted ? "THANK \n YOU" : "GET IN  TOUCH"}
            </h1>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-6 w-full"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] uppercase tracking-[0.3em] text-white font-bold">Name</label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors text-black text-sm uppercase tracking-[0.1em] placeholder:text-white/50 font-satoshi"
                      placeholder="Your Name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] uppercase tracking-[0.3em] text-white font-bold">Email</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors text-black text-sm uppercase tracking-[0.1em] placeholder:text-white/50 font-satoshi"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[14px] uppercase tracking-[0.3em] text-white font-bold">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={8}
                      className="bg-transparent border-b border-black/20 py-2 focus:border-black outline-none transition-colors text-black text-sm uppercase tracking-[0.1em] placeholder:text-white/50 font-satoshi resize-none"
                      placeholder="Tell us about your project"
                    />
                  </div>

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="mt-4 flex items-center justify-between group border border-black/20 px-6 py-4 hover:bg-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="text-[10px] font-black text-white group-hover:text-[#efe9d8] uppercase tracking-[0.4em] transition-colors">
                      {isLoading ? "Sending..." : "Send Message"}
                    </span>
                    <Send size={15} className={`text-white group-hover:text-[#efe9d8] group-hover:translate-x-1 transition-all ${isLoading ? 'animate-pulse' : ''}`} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-start gap-6 py-10"
                >
                  <div className="flex items-center gap-4 text-white">
                    <CheckCircle2 size={32} strokeWidth={1.5} />
                    <p className="text-sm uppercase tracking-[0.2em] font-bold">Message sent successfully.</p>
                  </div>
                  <p className="text-gray-700 text-sm uppercase tracking-[0.1em] leading-relaxed max-w-md">
                    Thank you for reaching out. Our team will review your message and get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-[10px] font-black text-white uppercase tracking-[0.4em] border-b border-white pb-1 hover:opacity-60 transition-opacity"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* INFO CONTACTOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-black/10 pt-16"
          >
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Direct Contact</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-700 leading-loose">
                geral@rumustudio.pt <br /> +351 910 891 529
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Location</h3>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-700">Guimarães, Portugal</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-black">Social Media</h3>
              <div className="flex flex-row gap-5 items-center mt-2">
                <a href="https://www.instagram.com/rumu.studios/" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity"><Instagram size={24} strokeWidth={1.5} /></a>
                <a href="https://www.linkedin.com/company/110907501/" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity"><Linkedin size={24} strokeWidth={1.5} /></a>
                <a href="https://www.youtube.com/channel/UCHoKpJq_jZLIH8EpNBs0rpg" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity"><Youtube size={24} strokeWidth={1.5} /></a>
                <a href="https://wa.me/351910891529" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-50 transition-opacity"><MessageCirclePlus size={32} strokeWidth={1} /></a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#d3b890] py-10 border-t border-black/5">
        <div className="w-full flex flex-col md:flex-row justify-between items-start px-10">
          <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">
            © 2025 Rumu Studio.
          </p>

        </div>
      </footer>
    </main>
  );
}