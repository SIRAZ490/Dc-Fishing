import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Zap } from 'lucide-react';
import { products } from '../../data/products';
import { useCartStore } from '../../store/cartStore';

// Sale ends in 2 days from now
const SALE_END = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

function useCountdown() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, SALE_END - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function Digit({ val }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#0A2342] text-white font-black text-[22px] w-12 h-12 flex items-center justify-center rounded-lg">
        {String(val).padStart(2, '0')}
      </div>
    </div>
  );
}

const deals = products
  .filter((p) => p.oldPrice)
  .sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice)
  .slice(0, 3);

export default function OffersSection() {
  const { h, m, s } = useCountdown();
  const addItem = useCartStore((st) => st.addItem);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto" style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={20} className="text-[#FF6B35] fill-[#FF6B35]" />
              <span className="text-[#FF6B35] font-bold uppercase tracking-widest text-sm">Flash Sale</span>
            </div>
            <h2 className="text-[28px] font-black text-[#0A2342] mt-1">Today's Best Deals</h2>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm font-medium mr-1">Ends in:</span>
            <Digit val={h} />
            <span className="text-[#0A2342] font-black text-xl">:</span>
            <Digit val={m} />
            <span className="text-[#0A2342] font-black text-xl">:</span>
            <Digit val={s} />
            <div className="flex flex-col ml-1 text-[9px] text-gray-400 font-medium gap-[14px]">
              <span>HRS</span><span>MIN</span><span>SEC</span>
            </div>
          </div>
        </div>

        {/* Deal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {deals.map((product, i) => {
            const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="absolute top-3 left-3 bg-[#FF6B35] text-white font-black text-[15px] px-3 py-1 rounded-full">
                    -{discount}%
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="text-[11px] text-gray-400 font-medium mb-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#0A2342] text-[15px] leading-snug mb-3 hover:text-[#FF6B35] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Progress bar (fake stock urgency) */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>Available: <strong className="text-[#0A2342]">{product.stock} left</strong></span>
                      <span>{Math.round((1 - product.stock / 30) * 100)}% sold</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B35] rounded-full"
                        style={{ width: `${Math.round((1 - product.stock / 30) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[20px] font-black text-[#0A2342]">${product.price.toFixed(2)}</span>
                    <span className="text-[13px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A2342] text-white py-2.5 rounded-full text-[12px] font-bold hover:bg-[#FF6B35] transition-colors"
                  >
                    <ShoppingCart size={13} /> Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View all */}
        <div className="text-center">
          <Link
            to="/sale"
            className="inline-flex items-center gap-2 bg-[#FF6B35] text-white px-10 py-3.5 rounded-full font-bold hover:bg-[#e55a25] transition-colors"
          >
            <Zap size={16} className="fill-white" /> View All Offers
          </Link>
        </div>
      </div>
    </section>
  );
}
