// app/about/page.tsx
import AboutContent from "./AboutContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Rumu Studio | Architectural Storytelling",
  description: "Learn more about Rumu Studio. We are a team of 3D artists dedicated to high-end architectural visualization and digital design.",
  keywords: ["About Rumu Studio", "3D Artists Portugal", "Architectural Storytelling", "CGI Professionals"],
};

export default function Page() {
  return <AboutContent />;
}