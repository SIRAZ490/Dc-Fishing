import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    tag: 'Spearfishing',
    title: 'Hunt the',
    titleAccent: 'Deep',
    subtitle: 'Professional spearguns, wetsuits & freediving gear for serious hunters',
    cta: 'Shop Spearguns',
    ctaLink: '/shop?cat=spearfishing',
    ctaSecondary: 'View All',
    ctaSecondaryLink: '/shop',
    image: 'https://images.unsplash.com/photo-1674419365589-6286fc0d6371?w=1800&auto=format&fit=crop&q=85',
    overlay: 'from-[#0A2342]/80 via-[#0A2342]/40 to-transparent',
    accent: '#00B4D8',
  },
  {
    id: 2,
    tag: 'Rod & Rail Fishing',
    title: 'Cast Your',
    titleAccent: 'Perfect Line',
    subtitle: 'Premium rods, reels & tackle for every fishing style — shore, boat or deep sea',
    cta: 'Shop Fishing Gear',
    ctaLink: '/shop?cat=fishing-rods',
    ctaSecondary: 'View Reels',
    ctaSecondaryLink: '/shop?cat=fishing-reels',
    image: 'https://images.unsplash.com/photo-1582658085438-790f8837944b?w=1800&auto=format&fit=crop&q=85',
    overlay: 'from-[#0A2342]/75 via-[#0A2342]/35 to-transparent',
    accent: '#FF6B35',
  },
  {
    id: 3,
    tag: 'Apnea & Freediving',
    title: 'Breathe,',
    titleAccent: 'Dive, Repeat',
    subtitle: 'Long blade fins, low-volume masks & carbon wetsuits for elite freedivers',
    cta: 'Shop Freediving',
    ctaLink: '/shop?cat=fins',
    ctaSecondary: 'View Masks',
    ctaSecondaryLink: '/shop?cat=diving-masks',
    image: 'https://images.unsplash.com/photo-1602199926649-2e5e447bab97?w=1800&auto=format&fit=crop&q=85',
    overlay: 'from-[#0A2342]/80 via-[#0A2342]/40 to-transparent',
    accent: '#00B4D8',
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: 'easeOut' },
  }),
};

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 130px)', minHeight: 520 }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} !w-8 !h-1.5 !rounded-sm"></span>`,
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        loop
        speed={1000}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background — Ken Burns zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                animation: activeIndex === idx ? 'kenBurns 8s ease-in-out forwards' : 'none',
              }}
            />

            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full">
                <AnimatePresence mode="wait">
                  {activeIndex === idx && (
                    <div className="max-w-2xl" style={{ marginLeft: 'clamp(40px, 15vw, 280px)' }}>
                      {/* Tag */}
                      <motion.div
                        key={`tag-${idx}`}
                        custom={0.1}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="mb-4"
                      >
                        <span
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[4px] rounded-full border"
                          style={{ padding: '12px 36px' }}
                          style={{ color: slide.accent, borderColor: slide.accent, backgroundColor: `${slide.accent}15` }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: slide.accent }} />
                          {slide.tag}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h1
                        key={`title-${idx}`}
                        custom={0.25}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-5"
                      >
                        {slide.title}{' '}
                        <span style={{ color: slide.accent }}>{slide.titleAccent}</span>
                      </motion.h1>

                      {/* Subtitle */}
                      <motion.p
                        key={`sub-${idx}`}
                        custom={0.4}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                      >
                        {slide.subtitle}
                      </motion.p>

                      {/* CTAs */}
                      <motion.div
                        key={`cta-${idx}`}
                        custom={0.55}
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-3"
                      >
                        <Link
                          to={slide.ctaLink}
                          className="flex items-center gap-3 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm"
                          style={{ backgroundColor: slide.accent, padding: '12px 36px' }}
                        >
                          {slide.cta} <ArrowRight size={16} />
                        </Link>
                        <Link
                          to={slide.ctaSecondaryLink}
                          className="flex items-center gap-3 text-white font-semibold rounded-full border border-white/40 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-sm"
                          style={{ padding: '10px 24px' }}
                        >
                          {slide.ctaSecondary}
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom nav arrows */}
      <button className="hero-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button className="hero-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-14 right-6 z-20 text-white/60 text-xs font-mono tabular-nums">
        <span className="text-white font-bold text-sm">{String(activeIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        {String(slides.length).padStart(2, '0')}
      </div>

      {/* Bottom diagonal divider */}
      <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height: 80, display: 'block' }}>
          <polygon points="0,80 1440,0 1440,80" fill="white" />
        </svg>
      </div>

      {/* Scroll arrow */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50 hidden md:block">
        <ChevronDown size={26} />
      </div>

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.08); }
          40%  { transform: scale(1.0);  }
          100% { transform: scale(1.1);  }
        }
        .swiper-pagination {
          bottom: 28px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          display: flex !important;
          gap: 6px !important;
        }
        .swiper-pagination-bullet {
          background: rgba(255,255,255,0.4) !important;
          opacity: 1 !important;
          border-radius: 2px !important;
          width: 28px !important;
          height: 4px !important;
          transition: all 0.3s !important;
          margin: 0 !important;
        }
        .swiper-pagination-bullet-active {
          background: white !important;
          width: 44px !important;
        }
      `}</style>
    </div>
  );
}
