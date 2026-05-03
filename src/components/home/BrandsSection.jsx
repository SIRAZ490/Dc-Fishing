import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";
import { brands } from "../../data/products";
import "swiper/css";

export default function BrandsSection() {
  return (
    <section className="py-20 bg-white border-t border-b border-gray-100">
      <div style={{ padding: "0 clamp(24px, 6vw, 96px)" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">
            Our Brands
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-black text-[#FF6B35] mt-2">
            Trusted Brands We Carry
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          speed={3000}
          loop
          slidesPerView="auto"
          spaceBetween={40}
        >
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <SwiperSlide key={i} style={{ width: "auto" }}>
              <div className="flex flex-col items-center justify-center gap-3 min-w-[160px] rounded-3xl bg-gray-50 p-4 hover:bg-[#0A2342] group transition-all duration-300 cursor-pointer">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 object-contain"
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors">
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
