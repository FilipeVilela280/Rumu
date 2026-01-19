import HomeContent from "./HomeContent"; 
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rumu Studio | From Concept To Reality | 3D Visualization",
  description: "Estúdio especializado em renderização 3D de interiores e exteriores. Transformamos conceitos em realidade com foco no detalhe, iluminação e realismo.",
  
  // ADICIONA AS PALAVRAS-CHAVE AQUI:
  keywords: [
    "Rumu Studio",
    "Rumu",
    "Portugal",
    "3D Rendering Portugal",
    "Visualização Arquitetónica",
    "Design de Interiores 3D",
    "Renders Realistas",
    "Arquitetura 3D",
    "Modelação 3D",
    "CGI Architecture",
    "Renderização Externa",
    "Renderização Interna",
    "Estúdio de 3D",
    "Rumu Studio",
  "3D Architectural Visualization",
  "High-end 3D Rendering",
  "Photorealistic Renders",
  "Architectural CGI",
  "Interior Design Rendering",
  "Exterior 3D Visualization",
  "3D Interior Design",
  "3D Modeling Services",
  "Real Estate Rendering",
  "CGI Studio",
  "Digital Architecture",
  "3D Artist Portugal"
  ],

  openGraph: {
    title: "Rumu Studio | Especialistas em Visualização 3D",
    description: "Vê os nossos projetos de renderização 3D focado no realismo.",
    images: ["/LOGO_PNG_BRANCO.png"],
    type: "website",
  },
};

export default function Page() {
  return <HomeContent />;
}