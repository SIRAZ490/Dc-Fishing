import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ParallaxBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section ref={ref} className="relative py-20 min-h-[500px]">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1600)`,
          y,
        }}
      />
      <div className="absolute inset-0 bg-[#0A2342]/70" />
      <div className="relative z-10 h-full flex items-center justify-center text-center" style={{ paddingLeft: 'clamp(24px, 6vw, 96px)', paddingRight: 'clamp(24px, 6vw, 96px)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-[5px] text-sm">Dive Deeper</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mt-3 mb-5 leading-tight">
            Explore the<br />
            <span className="text-[#00B4D8]">Ocean World</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            From surface snorkeling to deep sea diving — we have all the professional gear you need.
          </p>
          <Link
            to="/shop?cat=diving-masks"
            className="inline-flex items-center gap-2 bg-[#00B4D8] text-white font-bold px-10 py-4 rounded-full hover:bg-[#0096b8] transition-all duration-300 hover:scale-105 text-lg"
          >
            Shop Diving Gear <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>

      {/* Wave bottom */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60 }}>
        <path fill="#F8F5F0" d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}
