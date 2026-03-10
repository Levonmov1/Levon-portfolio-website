import dynamic from "next/dynamic";
import HeroSection from "@/components/section/hero-section";
import LazySection from "@/components/ui/lazy-section";

const JourneySection = dynamic(() => import("@/components/section/journey-section"));
const VenturesSection = dynamic(() => import("@/components/section/ventures-section"));
const HopesHavenSection = dynamic(() => import("@/components/section/hopes-haven-section"));
const PressSection = dynamic(() => import("@/components/section/press-section"));
const ContactSection = dynamic(() => import("@/components/section/contact-section"));

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col">
      <section id="home">
        <HeroSection />
      </section>
      <LazySection>
        <section id="journey">
          <JourneySection />
        </section>
      </LazySection>
      <LazySection>
        <section id="ventures">
          <VenturesSection />
        </section>
      </LazySection>
      <LazySection>
        <section id="hopes-haven" className="pb-20 md:pb-28">
          <HopesHavenSection />
        </section>
      </LazySection>
      <LazySection>
        <section id="press" className="py-20 md:py-28">
          <PressSection />
        </section>
      </LazySection>
      <LazySection>
        <section id="contact" className="py-20 md:py-28 pb-32 max-w-4xl mx-auto px-6 w-full">
          <ContactSection />
        </section>
      </LazySection>
    </main>
  );
}
