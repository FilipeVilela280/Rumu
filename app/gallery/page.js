"use client";
import { useSearchParams, useRouter } from "next/navigation"; // Importar useRouter
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

// Estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";

// --- CORREÇÃO 1: O número de imagens deve ser igual ao da Home (93) ---
const totalImages = 58; 
const allImages = Array.from({ length: totalImages }, (_, i) => `/img${i + 1}.jpg`);

function CarouselContent() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Hook para navegação
  
  const imgParam = searchParams.get("img");
  // Se o param for maior que o total, volta ao 0 para evitar erros
  const parsedIndex = imgParam ? parseInt(imgParam) - 1 : 0;
  const initialImgIndex = (parsedIndex >= 0 && parsedIndex < totalImages) ? parsedIndex : 0;

  return (
    <main className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
      
      {/* --- CORREÇÃO 2: Botão Back usa histórico do browser para não perder scroll --- */}
      <button 
        onClick={() => router.back()}
        className="absolute top-10 right-10 z-[300] text-black text-2xl font-light hover:opacity-50 transition-opacity bg-transparent border-none cursor-pointer"
      >
        CLOSE ✕
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        initialSlide={initialImgIndex}
        loop={true}
        className="w-full h-full"
      >
        {allImages.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center p-4 md:p-20">
            <div className="relative w-full h-full">
              {/* Nota: Adicionei sizes para otimização */}
              <Image
                src={src}
                alt={`Render ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
                priority={index === initialImgIndex}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          color: #000 !important;
          padding: 0 10px;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 24px !important;
          font-weight: bold;
        }
        @media (max-width: 640px) {
          .swiper-button-next, .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="bg-white h-screen w-screen flex items-center justify-center">Loading...</div>}>
      <CarouselContent />
    </Suspense>
  );
}
