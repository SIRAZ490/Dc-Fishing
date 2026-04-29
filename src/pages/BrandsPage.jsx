import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const brandData = [
  { name: 'Shimano',    country: 'Japan',   category: 'Fishing Rods & Reels', color: '#1a1a2e', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop' },
  { name: 'Penn',       country: 'USA',     category: 'Fishing Reels',        color: '#1b3a4b', image: 'https://images.unsplash.com/photo-1607524191306-7fec3d6b44b6?w=400&h=250&fit=crop' },
  { name: 'Cressi',     country: 'Italy',   category: 'Diving & Freediving',  color: '#0a3d62', image: 'https://images.unsplash.com/photo-1462947760324-15811216b688?w=400&h=250&fit=crop' },
  { name: 'Mares',      country: 'Italy',   category: 'Diving & Spearfishing',color: '#1a3c5a', image: 'https://images.unsplash.com/photo-1674419365574-70eaaed5d4e1?w=400&h=250&fit=crop' },
  { name: 'Daiwa',      country: 'Japan',   category: 'Fishing Rods & Reels', color: '#2c3e50', image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&h=250&fit=crop' },
  { name: 'Scubapro',   country: 'Germany', category: 'Scuba Diving',         color: '#1a2740', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop' },
  { name: 'Beuchat',    country: 'France',  category: 'Spearfishing',         color: '#1e3a4f', image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop' },
  { name: 'Abu Garcia', country: 'Sweden',  category: 'Fishing Reels',        color: '#2d3436', image: 'https://images.unsplash.com/photo-1508175800969-525c72a047dd?w=400&h=250&fit=crop' },
  { name: 'Salvimar',   country: 'Italy',   category: 'Spearfishing',         color: '#1a3050', image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=250&fit=crop' },
  { name: 'Okuma',      country: 'Taiwan',  category: 'Fishing Gear',         color: '#2c3a4a', image: 'https://images.unsplash.com/photo-1463944889088-5c4c0d19f27f?w=400&h=250&fit=crop' },
  { name: 'Omer',       country: 'Italy',   category: 'Freediving & Spearfishing', color: '#1a2a3a', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop' },
  { name: 'Aqua Lung',  country: 'France',  category: 'Scuba & Freediving',   color: '#003566', image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=400&h=250&fit=crop' },
];

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#0A2342] py-14 text-center">
        <h1 className="text-4xl font-black text-white mb-2">Our Brands</h1>
        <p className="text-[#00B4D8] text-[15px]">We carry the world's most trusted fishing & diving brands</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        {/* Intro */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-gray-500 text-[15px] leading-relaxed">
            At DC Fishing we only partner with brands that meet our high standards for quality, performance and durability. Every brand in our store has been tested by our team on the water.
          </p>
        </div>

        {/* Brand grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: `${brand.color}cc` }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                      <h3 className="text-[28px] font-black tracking-tight">{brand.name}</h3>
                      <p className="text-white/70 text-[12px] font-medium mt-1">{brand.country}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-white px-5 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-[12px] text-gray-400">{brand.category}</p>
                      <p className="text-[13px] font-bold text-[#0A2342] mt-0.5">{count} product{count !== 1 ? 's' : ''} available</p>
                    </div>
                    <span className="text-[12px] font-bold text-[#FF6B35] group-hover:underline">
                      Shop →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-gray-400 mb-4">Can't find your brand? Contact us — we may be able to order it for you.</p>
          <Link
            to="/contact"
            className="inline-block border-2 border-[#0A2342] text-[#0A2342] px-8 py-3 rounded-full font-bold hover:bg-[#0A2342] hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
