import HeroSection from "@/components/section/hero-section";
import JourneySection from "@/components/section/journey-section";
import VenturesSection from "@/components/section/ventures-section";
import HopesHavenSection from "@/components/section/hopes-haven-section";
import PressSection from "@/components/section/press-section";
import ContactSection from "@/components/section/contact-section";

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col">
      <section id="home">
        <HeroSection />
      </section>
      <section id="journey">
        <JourneySection />
      </section>
      <section id="ventures" className="py-20 md:py-28">
        <VenturesSection />
      </section>
      <section id="hopes-haven" className="py-20 md:py-28">
        <HopesHavenSection />
      </section>
      <section id="press" className="py-20 md:py-28">
        <PressSection />
      </section>
      <section id="contact" className="py-20 md:py-28 pb-32 max-w-4xl mx-auto px-6 w-full">
        <ContactSection />
      </section>
    </main>
  );
}
