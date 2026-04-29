import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#0A2342] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[120px] sm:text-[160px] font-black text-white/10 leading-none select-none">404</p>
          <div className="-mt-8">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Page Not Found</h1>
            <p className="text-gray-400 text-[15px] mb-8 max-w-sm mx-auto">
              Looks like this page drifted out to sea. Let's get you back on course.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/"
                className="flex items-center gap-2 bg-[#FF6B35] text-white px-7 py-3 rounded-full font-bold hover:bg-[#e55a25] transition-colors"
              >
                <Home size={17} /> Go Home
              </Link>
              <Link
                to="/shop"
                className="flex items-center gap-2 border-2 border-white/30 text-white px-7 py-3 rounded-full font-bold hover:border-white transition-colors"
              >
                <ShoppingBag size={17} /> Shop Products
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
