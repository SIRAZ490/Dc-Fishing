import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const brandData = [
  { name: 'Shimano',    country: 'Japan',   category: 'Fishing Rods & Reels',      color: '#1a1a2e', image: '/src/assets/images/cat-fishing.jpg' },
  { name: 'Penn',       country: 'USA',     category: 'Fishing Reels',             color: '#1b3a4b', image: '/src/assets/images/hero-fishing.jpg' },
  { name: 'Cressi',     country: 'Italy',   category: 'Diving & Freediving',       color: '#0a3d62', image: '/src/assets/images/cat-diving.jpg' },
  { name: 'Mares',      country: 'Italy',   category: 'Diving & Spearfishing',     color: '#1a3c5a', image: '/src/assets/images/cat-spearfishing.jpg' },
  { name: 'Daiwa',      country: 'Japan',   category: 'Fishing Rods & Reels',      color: '#2c3e50', image: '/src/assets/images/hero-fishing.jpg' },
  { name: 'Scubapro',   country: 'Germany', category: 'Scuba Diving',              color: '#1a2740', image: '/src/assets/images/hero-freediving.jpg' },
  { name: 'Beuchat',    country: 'France',  category: 'Spearfishing',              color: '#1e3a4f', image: '/src/assets/images/hero-spearfishing.jpg' },
  { name: 'Abu Garcia', country: 'Sweden',  category: 'Fishing Reels',             color: '#2d3436', image: '/src/assets/images/cat-fishing.jpg' },
  { name: 'Salvimar',   country: 'Italy',   category: 'Spearfishing',              color: '#1a3050', image: '/src/assets/images/cat-spearfishing.jpg' },
  { name: 'Okuma',      country: 'Taiwan',  category: 'Fishing Gear',              color: '#2c3a4a', image: '/src/assets/images/hero-fishing.jpg' },
  { name: 'Omer',       country: 'Italy',   category: 'Freediving & Spearfishing', color: '#1a2a3a', image: '/src/assets/images/hero-freediving.jpg' },
  { name: 'Aqua Lung',  country: 'France',  category: 'Scuba & Freediving',        color: '#003566', image: '/src/assets/images/cat-diving.jpg' },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#0A2342] text-center" style={{ padding: '64px 48px' }}>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-white mb-3"
        >
          Our Brands
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[#00B4D8] text-[15px] sm:text-[17px]"
        >
          We carry the world's most trusted fishing & diving brands
        </motion.p>
      </div>

      {/* Main */}
      <div style={{ padding: '56px 48px' }}>

        {/* Intro */}
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto">
            At DC Fishing we only partner with brands that meet our high standards for quality, performance and durability. Every brand in our store has been tested by our team on the water.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brandData.map((brand, i) => {
            const count = products.filter((p) => p.brand === brand.name).length;
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '180px' }}>
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: `${brand.color}cc` }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                      <h3 className="text-[26px] sm:text-[30px] font-black tracking-tight">{brand.name}</h3>
                      <p className="text-white/70 text-[12px] font-medium mt-1 uppercase tracking-widest">{brand.country}</p>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="bg-white flex items-center justify-between" style={{ padding: '14px 20px' }}>
                    <div>
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">{brand.category}</p>
                      <p className="text-[13px] font-bold text-[#0A2342] mt-0.5">
                        {count > 0 ? `${count} product${count !== 1 ? 's' : ''} available` : 'Coming soon'}
                      </p>
                    </div>
                    <span className="text-[13px] font-black text-[#FF6B35] group-hover:underline">
                      Shop →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: '64px' }}>
          <p className="text-gray-400 text-[15px] mb-5">Can't find your brand? Contact us — we may be able to order it for you.</p>
          <Link
            to="/contact"
            className="inline-block bg-[#0A2342] text-white rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#FF6B35] transition-colors"
            style={{ padding: '14px 40px' }}
          >
            Contact Us
          </Link>
        </div>

      </div>
    </main>
  );
}
