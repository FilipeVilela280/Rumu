import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Indica ao Next.js para gerar ficheiros estáticos (HTML/CSS/JS)
  images: {
    unoptimized: true, // Necessário para que as imagens funcionem sem um servidor Node.js ativo
  },
  // Se o teu site estiver numa subpasta do domínio, adiciona: basePath: '/pasta'
};

export default nextConfig;