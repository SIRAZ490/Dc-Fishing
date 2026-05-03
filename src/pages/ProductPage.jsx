import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Check, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode, Autoplay } from 'swiper/modules';
import { products } from '../data/products';
import { useCartStore } from '../store/cartStore';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [qty, setQty] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
    setTimeout(() => setAdded(false), 2500);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  // Pad images to at least 3 for a nicer slider
  const images = product.images.length >= 3
    ? product.images
    : [...product.images, ...product.images, ...product.images].slice(0, 4);

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <main className="min-h-screen bg-gray-50">
      <div style={{ padding: '40px 48px' }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#0A2342] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#0A2342] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#0A2342] font-semibold truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── IMAGE SLIDER ── */}
            <div className="bg-gray-50 p-6">
              {/* Main slider */}
              <div className="relative rounded-2xl overflow-hidden mb-3">
                {discount && (
                  <div className="absolute top-4 left-4 z-10 bg-[#FF6B35] text-white font-black text-[14px] px-3 py-1 rounded-full">
                    -{discount}%
                  </div>
                )}
                <button className="prod-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                  <ChevronLeft size={18} className="text-[#0A2342]" />
                </button>
                <button className="prod-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                  <ChevronRight size={18} className="text-[#0A2342]" />
                </button>
                <Swiper
                  modules={[Navigation, Thumbs, FreeMode]}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  navigation={{ nextEl: '.prod-next', prevEl: '.prod-prev' }}
                  loop
                  style={{ aspectRatio: '1/1' }}
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <img src={img} alt={product.name} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbnail slider */}
              <Swiper
                modules={[Thumbs, FreeMode]}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                spaceBetween={8}
                freeMode
                watchSlidesProgress
              >
                {images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="rounded-xl overflow-hidden cursor-pointer border-2 border-transparent [&.swiper-slide-thumb-active]:border-[#0A2342] transition-all" style={{ aspectRatio: '1/1' }}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ── PRODUCT INFO ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-8 lg:p-10 flex flex-col"
            >
              <span className="text-[#00B4D8] font-bold text-[11px] uppercase tracking-widest">{product.brand}</span>
              <h1 className="text-[26px] font-black text-[#0A2342] mt-2 mb-3 leading-snug">{product.name}</h1>

              {/* Stars */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <span className="text-gray-400 text-[13px]">({product.reviews} reviews)</span>
                <span className="ml-auto text-green-500 text-[12px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> In Stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-5 pb-5 border-b border-gray-100">
                <span className="text-[38px] font-black text-[#0A2342] leading-none">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[16px] text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                    <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-[12px] font-bold px-2 py-0.5 rounded-full">Save {discount}%</span>
                  </div>
                )}
              </div>

              <p className="text-gray-500 text-[14px] leading-relaxed mb-5">{product.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.features.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 bg-[#0A2342]/5 text-[12px] text-gray-600 px-3 py-1.5 rounded-full font-medium">
                    <Check size={11} className="text-[#00B4D8]" /> {f}
                  </span>
                ))}
              </div>

              {/* Qty + Actions */}
              <div className="flex items-center gap-3 mb-5">
                {/* Qty */}
                <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:text-[#0A2342] font-bold text-lg transition-colors"
                  >−</button>
                  <span className="w-8 text-center font-black text-[15px]">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-10 h-11 flex items-center justify-center text-gray-600 hover:text-[#0A2342] font-bold text-lg transition-colors"
                  >+</button>
                </div>

                {/* Add to Cart */}
                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full font-black text-white text-[14px] transition-all duration-300 shadow-lg ${
                    added
                      ? 'bg-green-500 shadow-green-200'
                      : 'bg-[#FF6B35] hover:bg-[#0A2342] shadow-orange-200'
                  }`}
                >
                  {added
                    ? <><Check size={17} /> Added to Cart!</>
                    : <><ShoppingCart size={17} /> Add to Cart</>}
                </motion.button>

                {/* Wishlist */}
                <button
                  onClick={() => setWished(!wished)}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${
                    wished ? 'border-red-400 bg-red-50 text-red-400' : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400'
                  }`}
                >
                  <Heart size={18} className={wished ? 'fill-red-400' : ''} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-auto">
                {[
                  { icon: Truck,     label: 'Free Shipping', sub: 'Over $50' },
                  { icon: Shield,    label: '1 Year Warranty', sub: 'Full coverage' },
                  { icon: RefreshCw, label: 'Easy Returns',   sub: '30 days' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <Icon size={18} className="text-[#00B4D8] mx-auto mb-1.5" strokeWidth={1.5} />
                    <p className="text-[11px] font-bold text-gray-700">{label}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related products slider */}
        {related.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-black text-[#0A2342]">Related Products</h2>
              <Link to="/shop" className="text-[13px] text-[#FF6B35] font-semibold hover:underline">View all →</Link>
            </div>
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={16}
              breakpoints={{
                0:    { slidesPerView: 2 },
                640:  { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {related.map((p) => (
                <SwiperSlide key={p.id}>
                  <Link
                    to={`/product/${p.id}`}
                    className="block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group"
                  >
                    <div className="overflow-hidden" style={{ aspectRatio: '1/1' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-[11px] text-gray-400 font-medium">{p.brand}</p>
                      <p className="font-semibold text-[13px] text-gray-800 mt-0.5 line-clamp-2 leading-snug">{p.name}</p>
                      <p className="font-black text-[#FF6B35] mt-1.5">${p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </main>
  );
}
