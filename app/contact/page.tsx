// app/contact/page.tsx
import ContactContent from "./ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get a Quote | Rumu Studio",
  description: "Start your project with Rumu Studio. Contact us for high-end 3D rendering services and architectural visualization quotes.",
  keywords: ["Contact Rumu Studio", "3D Rendering Quote", "Hire 3D Artist", "Architectural Visualization Contact"],
};

export default function Page() {
  return <ContactContent />;
}