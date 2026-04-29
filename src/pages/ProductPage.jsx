import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Check, ArrowLeft, Truck, Shield, RefreshCw, Eye } from 'lucide-react';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600 mb-4">Product not found</p>
          <Link to="/shop" className="text-[#00B4D8] hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#0A2342] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#0A2342] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#0A2342] font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Images */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 mb-4" style={{ aspectRatio: '1/1' }}>
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
                {discount && (
                  <span className="absolute top-4 left-4 bg-[#FF6B35] text-white font-bold px-3 py-1 rounded-full text-sm">-{discount}%</span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[#0A2342]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-[#00B4D8] font-bold text-[12px] uppercase tracking-widest">{product.brand}</span>
              <h1 className="text-[28px] font-black text-[#0A2342] mt-2 mb-3 leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <span className="text-gray-400 text-[13px]">({product.reviews} reviews)</span>
                <span className="text-green-500 text-[13px] font-semibold ml-2">● In Stock</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-[36px] font-black text-[#0A2342]">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <>
                    <span className="text-[18px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                    <span className="bg-[#FF6B35] text-white text-[12px] font-bold px-2 py-0.5 rounded-full">Save {discount}%</span>
                  </>
                )}
              </div>

              <p className="text-gray-500 text-[14px] leading-relaxed mb-6">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-7">
                {product.features.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-[12px] text-gray-600 px-3 py-1.5 rounded-full font-medium">
                    <Check size={12} className="text-[#00B4D8]" /> {f}
                  </span>
                ))}
              </div>

              {/* Qty + Add to cart */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">−</button>
                  <span className="px-5 font-bold text-[16px] min-w-[40px] text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-[14px] transition-all duration-300 ${added ? 'bg-green-500' : 'bg-[#0A2342] hover:bg-[#FF6B35]'}`}
                >
                  {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
                </button>
                <button
                  onClick={() => setWished(!wished)}
                  className={`p-3.5 border-2 rounded-xl transition-colors ${wished ? 'border-red-400 text-red-400 bg-red-50' : 'border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-400'}`}
                >
                  <Heart size={20} className={wished ? 'fill-red-400' : ''} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'Orders over $50' },
                  { icon: Shield, label: '1 Year Warranty', sub: 'Full coverage' },
                  { icon: RefreshCw, label: 'Easy Returns', sub: '30-day policy' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <Icon size={20} className="text-[#00B4D8] mx-auto mb-1.5" />
                    <p className="text-[11px] font-bold text-gray-700">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-[22px] font-black text-[#0A2342] mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
                >
                  <div className="overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3 text-center">
                    <p className="text-[11px] text-gray-400 font-medium">{p.brand}</p>
                    <p className="font-semibold text-[13px] text-gray-800 mt-0.5 line-clamp-2 leading-snug">{p.name}</p>
                    <p className="font-black text-[#0A2342] mt-1.5">${p.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
