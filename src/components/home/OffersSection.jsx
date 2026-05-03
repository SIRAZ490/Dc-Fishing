import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Zap } from "lucide-react";
import { products } from "../../data/products";
import { useCartStore } from "../../store/cartStore";

const deals = products
  .filter((p) => p.oldPrice)
  .sort(
    (a, b) =>
      (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice,
  )
  .slice(0, 3);

export default function OffersSection() {
  const addItem = useCartStore((st) => st.addItem);

  return (
    <section className="py-20 bg-gray-50">
      <div className="w-full" style={{ padding: "0 clamp(16px, 5vw, 80px)" }}>
        {/* Header */}
        <div
          className="text-center"
          style={{ marginBottom: "40px", paddingTop: "20px" }}
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">
            Hot Deals
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-black text-[#FF6B35] mt-2">
            Best Offers
          </h2>
        </div>

        {/* Countdown — centered */}

        {/* Deal cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          style={{ marginBottom: "40px" }}
        >
          {deals.map((product, i) => {
            const discount = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100,
            );
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
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
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
                  <p className="text-[11px] text-gray-400 font-medium mb-1">
                    {product.brand}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-[#0A2342] text-[15px] leading-snug mb-3 hover:text-[#FF6B35] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Progress bar (fake stock urgency) */}
                  <div className="mb-3">
                    <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                      <span>
                        Available:{" "}
                        <strong className="text-[#0A2342]">
                          {product.stock} left
                        </strong>
                      </span>
                      <span>
                        {Math.round((1 - product.stock / 30) * 100)}% sold
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FF6B35] rounded-full"
                        style={{
                          width: `${Math.round((1 - product.stock / 30) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[20px] font-black text-[#0A2342]">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-[13px] text-gray-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
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
        <div
          className="text-center"
          style={{ marginTop: "40px", paddingBottom: "40px" }}
        >
          <Link
            to="/sale"
            className="inline-flex items-center gap-2 bg-[#0A2342] text-white rounded-full font-bold hover:bg-[#FF6B35] transition-colors"
            style={{ padding: "16px 48px", fontSize: "16px" }}
          >
            <Zap size={16} className="fill-white" /> View All Offers
          </Link>
        </div>
      </div>
    </section>
  );
}
