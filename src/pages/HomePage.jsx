import HeroSlider from "../components/home/HeroSlider";
import CategorySection from "../components/home/CategorySection";
import OffersSection from "../components/home/OffersSection";
import BrandsSection from "../components/home/BrandsSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TestimonialsSection from "../components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-6">
      <HeroSlider />
      <CategorySection />
      <OffersSection />
      <BrandsSection />
      <FeaturedProducts />
      <TestimonialsSection />
    </main>
  );
}
