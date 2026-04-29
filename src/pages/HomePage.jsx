import HeroSlider from '../components/home/HeroSlider';
import CategorySection from '../components/home/CategorySection';
import OffersSection from '../components/home/OffersSection';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <CategorySection />
      <OffersSection />
      <FeaturedProducts />
    </main>
  );
}
