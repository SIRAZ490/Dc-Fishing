import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "James O'Brien",
    role: "Professional Angler",
    rating: 5,
    text: "Best fishing gear I've ever used. The Shimano rod is absolutely incredible — light, sensitive and powerful. DC Fishing is my go-to store.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Sara Mitchell",
    role: "Freediving Instructor",
    rating: 5,
    text: "The Cressi fins and mask are top quality. My students love them and so do I. DC Fishing always delivers on time with great packaging.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Marco Rossi",
    role: "Spearfishing Champion",
    rating: 5,
    text: "The Mares speargun is a game changer. Fast shipping and excellent customer service. Highly recommend DC Fishing to any serious diver!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Lena Hoffmann",
    role: "Scuba Diver",
    rating: 5,
    text: "Great selection of wetsuits. My Mares suit keeps me warm even in cold water. The team at DC Fishing gave me perfect advice on sizing.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Karim Nassar",
    role: "Weekend Fisherman",
    rating: 5,
    text: "Ordered the Penn spinning reel and it arrived the next day. The quality is outstanding for the price. Will definitely order again!",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Nour Khalil",
    role: "Underwater Photographer",
    rating: 5,
    text: "I bought the Scubapro mask and fins — absolutely love them. The website is easy to navigate and the prices are very competitive.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="w-full relative z-10"
        style={{ padding: "0 clamp(16px, 5vw, 80px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">
            Reviews
          </span>
          <h2 className="text-[32px] font-black text-[#FF6B35] mt-2">
            What Our Customers Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 h-full flex flex-col">
                <Quote size={28} className="text-[#FF6B35] mb-4 shrink-0" />
                <p className="text-[#0A2342] text-[14px] leading-relaxed flex-1 mb-5">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#00B4D8]"
                  />
                  <div>
                    <p className="text-[#0A2342] font-bold text-[14px]">
                      {t.name}
                    </p>
                    <p className="text-gray-500 text-[12px]">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
