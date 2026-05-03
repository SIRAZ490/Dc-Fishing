import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQty, clearCart } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 h-full w-full max-w-100 z-60 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={20} className="text-[#0A2342]" />
                <span className="font-black text-[#0A2342] text-[16px]">
                  Cart <span className="text-[#FF6B35]">({count})</span>
                </span>
              </div>
              <button
                onClick={toggleCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                  <ShoppingBag size={52} strokeWidth={1} className="opacity-30" />
                  <p className="font-semibold text-gray-500">Your cart is empty</p>
                  <button
                    onClick={toggleCart}
                    className="bg-[#0A2342] text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-[#FF6B35] transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 bg-gray-50 rounded-xl p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">{item.name}</p>
                          <p className="text-[#FF6B35] font-black text-[14px] mt-0.5">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#0A2342] transition-colors"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="font-bold w-6 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[#0A2342] transition-colors"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between shrink-0">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                          <span className="font-black text-[#0A2342] text-sm">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 bg-white">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-[14px]">Subtotal</span>
                  <span className="text-[22px] font-black text-[#0A2342]">${total.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={toggleCart}
                  className="w-full bg-[#FF6B35] text-white py-3.5 rounded-full font-bold text-center block hover:bg-[#0A2342] transition-colors text-[14px] mb-3"
                >
                  Proceed to Checkout →
                </Link>
                <div className="flex items-center justify-between">
                  <Link
                    to="/shop"
                    onClick={toggleCart}
                    className="text-[12px] text-[#0A2342] font-semibold hover:text-[#FF6B35] transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-[12px] text-gray-400 hover:text-red-400 transition-colors"
                  >
                    Clear cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
