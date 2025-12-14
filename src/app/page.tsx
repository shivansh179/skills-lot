import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  ProcessSection,
  BenefitsSection,
  CategoriesSection,
  TestimonialsSection,
  CTASection,
} from '@/components/sections';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProcessSection />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
