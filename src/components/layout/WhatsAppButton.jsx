import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const phone = '15551234567';
  const message = encodeURIComponent('Hi! I found you on DC Fishing and I have a question about your products.');

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FaWhatsapp size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">DC Fishing Support</p>
                <p className="text-white/80 text-xs">Typically replies in minutes</p>
              </div>
              <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-[#e5ddd5]">
              <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-sm max-w-[85%]">
                <p className="text-[13px] text-gray-700 leading-relaxed">
                  👋 Hi there! Welcome to <strong>DC Fishing</strong>. How can we help you today?
                </p>
                <p className="text-[10px] text-gray-400 mt-1 text-right">DC Fishing</p>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 text-[14px] hover:bg-[#20c05a] transition-colors"
            >
              <FaWhatsapp size={18} /> Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FaWhatsapp size={28} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
