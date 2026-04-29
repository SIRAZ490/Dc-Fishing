import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { products } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import 'swiper/css';
import 'swiper/css/pagination';

const tabs = [
  { label: 'All',          filter: () => true },
  { label: 'Fishing',      filter: (p) => ['fishing-rods', 'fishing-reels'].includes(p.category) },
  { label: 'Spearfishing', filter: (p) => p.category === 'spearfishing' },
  { label: 'Diving',       filter: (p) => ['diving-masks', 'wetsuits', 'fins'].includes(p.category) },
];

function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col h-full group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: '1/1' }}>
        <Link to={`/product/${product.id}`} tabIndex={-1}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {discount && (
          <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {!discount && product.badge && (
          <span className="absolute top-3 left-3 bg-[#0A2342] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        )}

        <Link
          to={`/product/${product.id}`}
          className="absolute top-3 right-3 bg-white text-[#0A2342] p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0A2342] hover:text-white"
        >
          <Eye size={14} />
        </Link>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 text-center">
        <p className="text-[11px] text-gray-400 font-medium mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`} className="flex-1">
          <h3 className="text-[13px] font-medium text-gray-800 leading-snug hover:text-[#0A2342] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={10} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[15px] font-bold text-[#0A2342]">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-[12px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-[#0A2342] text-white text-[12px] font-bold py-2.5 rounded-full hover:bg-[#FF6B35] transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart size={13} /> Add to cart
        </button>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const displayed = products.filter(tabs[activeTab].filter);

  return (
    <section className="py-20 pb-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>

        {/* Header */}
        <div className="text-center mb-3">
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">Hand-Picked</span>
          <h2 className="text-[30px] font-black text-[#0A2342] mt-2">Bestseller Products</h2>
          <p className="text-gray-400 mt-2 text-[14px]">Top-rated gear chosen by our fishing and diving experts</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center flex-wrap gap-1 mb-8 border-b border-gray-200">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 text-[14px] font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === i ? 'text-[#0A2342]' : 'text-gray-400 hover:text-[#0A2342]'
              }`}
            >
              {tab.label}
              {activeTab === i && (
                <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A2342]" />
              )}
            </button>
          ))}
        </div>

        {/* Swiper */}
        <Swiper
          key={activeTab}
          modules={[Pagination]}
          pagination={{ type: 'progressbar' }}
          spaceBetween={16}
          breakpoints={{
            0:    { slidesPerView: 2 },
            640:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-8"
        >
          {displayed.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex items-center justify-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#0A2342] text-white px-12 py-4 rounded-full text-[15px] font-bold hover:bg-[#FF6B35] transition-colors shadow-lg hover:shadow-xl"
          >
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
