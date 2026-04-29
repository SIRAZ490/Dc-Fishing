import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { motion } from 'framer-motion';
import { brands } from '../../data/products';
import 'swiper/css';

export default function BrandsSection() {
  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-gray-400 uppercase tracking-widest text-xs font-semibold">Trusted Brands We Carry</span>
        </motion.div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: false }}
          speed={3000}
          loop
          slidesPerView="auto"
          spaceBetween={40}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <SwiperSlide key={i} style={{ width: 'auto' }}>
              <div className="flex items-center justify-center h-14 px-8 rounded-xl bg-gray-50 hover:bg-[#0A2342] group transition-all duration-300 cursor-pointer whitespace-nowrap">
                <span className="font-black text-lg text-gray-300 group-hover:text-[#00B4D8] transition-colors tracking-wider">
                  {brand.name}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
