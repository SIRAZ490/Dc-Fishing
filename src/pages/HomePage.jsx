import HeroSlider from '../components/home/HeroSlider';
import CategorySection from '../components/home/CategorySection';
import OffersSection from '../components/home/OffersSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import TestimonialsSection from '../components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <CategorySection />
      <OffersSection />
      <FeaturedProducts />
      <TestimonialsSection />
    </main>
  );
}
