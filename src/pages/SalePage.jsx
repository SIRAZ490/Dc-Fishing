import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Zap, Tag } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

const SALE_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

function useCountdown() {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, SALE_END - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const saleProducts = products
  .filter((p) => p.oldPrice)
  .sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice);

const discountFilters = [
  { label: 'All Deals', min: 0 },
  { label: '10%+ Off',  min: 10 },
  { label: '20%+ Off',  min: 20 },
  { label: '30%+ Off',  min: 30 },
];

export default function SalePage() {
  const { d, h, m, s } = useCountdown();
  const [minDiscount, setMinDiscount] = useState(0);
  const addItem = useCartStore((st) => st.addItem);

  const filtered = saleProducts.filter((p) => {
    const disc = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
    return disc >= minDiscount;
  });

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero banner */}
      <div className="relative bg-[#0A2342] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap size={20} className="text-[#FF6B35] fill-[#FF6B35]" />
            <span className="text-[#FF6B35] font-bold uppercase tracking-widest text-sm">Limited Time</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-2">Flash Sale</h1>
          <p className="text-gray-400 text-[15px] mb-10">Up to 50% off on top fishing & diving gear — while stocks last!</p>

          {/* Big countdown */}
          <div className="flex items-center justify-center gap-4">
            {[{ v: d, l: 'Days' }, { v: h, l: 'Hours' }, { v: m, l: 'Mins' }, { v: s, l: 'Secs' }].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div className="bg-white/10 backdrop-blur text-white font-black text-[32px] sm:text-[40px] w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-2xl border border-white/20">
                  {String(v).padStart(2, '0')}
                </div>
                <p className="text-gray-400 text-[11px] font-medium mt-1.5 uppercase tracking-wider">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {discountFilters.map(({ label, min }) => (
              <button
                key={label}
                onClick={() => setMinDiscount(min)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
                  minDiscount === min
                    ? 'bg-[#FF6B35] text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35]'
                }`}
              >
                <Tag size={13} /> {label}
              </button>
            ))}
          </div>
          <span className="text-gray-500 text-sm">{filtered.length} deals found</span>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product, i) => {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            const saved = (product.oldPrice - product.price).toFixed(2);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group flex flex-col"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                  <div className="absolute top-3 left-3 bg-[#FF6B35] text-white font-black text-[13px] px-2.5 py-1 rounded-full">
                    -{discount}%
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                    Save ${saved}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="absolute bottom-3 right-3 bg-white text-[#0A2342] p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#0A2342] hover:text-white"
                  >
                    <Eye size={14} />
                  </Link>
                </div>

                <div className="p-4 flex flex-col flex-1 text-center">
                  <p className="text-[11px] text-gray-400 font-medium mb-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`} className="flex-1">
                    <h3 className="text-[13px] font-medium text-gray-800 hover:text-[#0A2342] transition-colors line-clamp-2 mb-3 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Stock bar */}
                  <div className="mb-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#FF6B35] rounded-full" style={{ width: `${Math.round((1 - product.stock / 30) * 100)}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">Only {product.stock} left</p>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[17px] font-black text-[#0A2342]">${product.price.toFixed(2)}</span>
                    <span className="text-[12px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-[#0A2342] text-white text-[12px] font-bold py-2.5 rounded-full hover:bg-[#FF6B35] transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={13} /> Add to cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Tag size={50} strokeWidth={1} className="mx-auto mb-4 opacity-30" />
            <p className="text-xl font-semibold">No deals at this discount level</p>
          </div>
        )}
      </div>
    </main>
  );
}
