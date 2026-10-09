"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { Suspense, useRef } from "react";

// CORRIGIDO: O caminho aponta para o ficheiro que está na mesma pasta (ou ajuste conforme a sua estrutura)
import { getGalleryItems } from "./galleryConfig";

// Estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";

const allMediaItems = getGalleryItems();

function CarouselContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Referência para guardar todos os elementos de vídeo e poder controlá-los
  const videoRefs = useRef([]);

  const imgParam = searchParams.get("img");
  const videoParam = searchParams.get("video");

  let targetParamKey = "";
  if (imgParam) {
    targetParamKey = `img=${imgParam}`;
  } else if (videoParam) {
    targetParamKey = `video=${videoParam}`;
  }

  const initialIndex = allMediaItems.findIndex(
    (item) => item.paramKey === targetParamKey
  );

  const activeIndex = initialIndex !== -1 ? initialIndex : 0;

  // Função executada sempre que muda de slide no carrossel
  const handleSlideChange = (swiper) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === swiper.activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  return (
    <main className="fixed inset-0 bg-white z-[200] flex items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-10 right-10 z-[300] text-black text-2xl font-light hover:opacity-50 transition-opacity bg-transparent border-none cursor-pointer"
      >
        CLOSE ✕
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={true}
        initialSlide={activeIndex}
        loop={false}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          setTimeout(() => handleSlideChange(swiper), 100);
        }}
        className="w-full h-full"
      >
        {allMediaItems.map((item, index) => (
          <SwiperSlide
            key={item.id}
            className="flex items-center justify-center p-4 md:p-20"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {item.type === "video" ? (
               <video
  ref={(el) => {
    videoRefs.current[index] = el;
  }}
  src={item.src}
  autoPlay
  controls
  playsInline
  preload="metadata"
  className="max-w-full max-h-full object-contain"
  onLoadedMetadata={(e) => {
    // Verifica se a duração do vídeo é superior a 30 segundos
    if (e.currentTarget.duration > 30) {
      e.currentTarget.muted = false; // Tem mais de 30s: com áudio
    } else {
      e.currentTarget.muted = true;  // Tem 30s ou menos: fica mudo
    }
  }}
/>
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                  priority={index === activeIndex}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white h-screen w-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <CarouselContent />
    </Suspense>
  );
}