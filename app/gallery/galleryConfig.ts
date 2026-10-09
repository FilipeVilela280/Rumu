// src/data/galleryConfig.ts

export const TOTAL_IMAGENS = 58;

export interface MediaItem {
  id: string | number;
  type: "image" | "video";
  src: string;
  alt: string;
  href?: string;
  paramKey: string;
  width?: number;
  height?: number;
}

// Defina aqui a posição dos vídeos: "afterImageIndex" é o índice da imagem (0 a 57)
export const videoPlacements: { [afterIndex: number]: { src: string; alt: string; videoNumber: number } } = {
  9:  { src: "/video1.mp4", alt: "Video Project 1", videoNumber: 1 },  // Após img 10 (index 9)
  22: { src: "/video2.mp4", alt: "Video Project 2", videoNumber: 2 },  // Após img 23 (index 22)
  36: { src: "/video3.mp4", alt: "Video Project 3", videoNumber: 3 },  // Após img 37 (index 36)
  49: { src: "/video4.mp4", alt: "Video Project 4", videoNumber: 4 },  // Após img 50 (index 49)
  53: { src: "/video5.mp4", alt: "Video Project 5", videoNumber: 5 },  // Após img 54 (index 53)
5: { src: "/video6.mp4", alt: "Video Project 5", videoNumber: 6 },  // Após img 54 (index 53)
  4: { src: "/video7.mp4", alt: "Video Project 5", videoNumber: 7 },  // Após img 54 (index 53)
  // Se adicionar mais vídeos, basta adicioná-los aqui!
};

// Função única que gera a lista combinada para qualquer página usar
export const getGalleryItems = (): MediaItem[] => {
  const images = Array.from({ length: TOTAL_IMAGENS }, (_, i) => ({
    id: i + 1,
    type: "image" as const,
    src: `/img${i + 1}.jpg`,
    alt: `Project ${i + 1}`,
    href: `/gallery?img=${i + 1}`,
    paramKey: `img=${i + 1}`,
    width: 800,
    height: Math.random() > 0.5 ? 1200 : 600, // Altura dinâmica se precisar
  }));

  const combined: MediaItem[] = [];

  images.forEach((image, index) => {
    combined.push(image);

    // Verifica se existe algum vídeo programado para entrar após esta imagem
    const videoData = videoPlacements[index];
    if (videoData) {
      combined.push({
        id: `video-${videoData.videoNumber}`,
        type: "video",
        src: videoData.src,
        alt: videoData.alt,
        href: `/gallery?video=${videoData.videoNumber}`,
        paramKey: `video=${videoData.videoNumber}`,
        width: 800,
        height: 600,
      });
    }
  });

  return combined;
};