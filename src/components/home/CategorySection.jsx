import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    slug: 'fishing',
    subtitle: 'Rods, Reels & Tackle',
    title: 'Fishing',
    image: 'https://images.unsplash.com/photo-1607524191306-7fec3d6b44b6?w=900&h=520&fit=crop',
    path: '/shop?cat=fishing-rods',
  },
  {
    slug: 'spearfishing',
    subtitle: 'Spearguns & Gear',
    title: 'Spearfishing',
    image: 'https://images.unsplash.com/photo-1674419365574-70eaaed5d4e1?w=900&h=520&fit=crop',
    path: '/shop?cat=spearfishing',
  },
  {
    slug: 'diving',
    subtitle: 'Apnea & Freediving',
    title: 'Diving',
    image: 'https://images.unsplash.com/photo-1462947760324-15811216b688?w=900&h=520&fit=crop',
    path: '/shop?cat=diving-masks',
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-white">
      <div style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>
        <div className="text-center mb-10">
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">Explore</span>
          <h2 className="text-[30px] font-black text-[#0A2342] mt-2">Our Categories</h2>
        </div>
        <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative overflow-hidden rounded-xl group cursor-pointer"
              style={{ height: 480 }}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  {cat.subtitle}
                </p>
                <h3 className="text-[40px] font-black leading-tight mb-5">
                  {cat.title}
                </h3>
                <Link
                  to={cat.path}
                  className="text-[14px] font-semibold text-white border-b-2 border-white/60 pb-0.5 hover:border-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  View more
                </Link>
              </div>

              {/* Full link overlay */}
              <Link to={cat.path} className="absolute inset-0" aria-label={cat.title} />
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
