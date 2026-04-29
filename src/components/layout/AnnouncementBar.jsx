import { useState } from 'react';
import { X } from 'lucide-react';

const messages = [
  '🎣 Free shipping on orders over $50 — Shop now!',
  '🤿 New spearfishing gear just arrived — Check it out!',
  '💥 Use code DIVE10 for 10% off your first order!',
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#0A2342] text-white text-[13px] py-2 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <button
          onClick={() => setCurrent((c) => (c - 1 + messages.length) % messages.length)}
          className="text-white/50 hover:text-white transition-colors hidden sm:block"
        >
          ‹
        </button>
        <p className="text-center font-medium tracking-wide">{messages[current]}</p>
        <button
          onClick={() => setCurrent((c) => (c + 1) % messages.length)}
          className="text-white/50 hover:text-white transition-colors hidden sm:block"
        >
          ›
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        aria-label="Close"
      >
        <X size={15} />
      </button>
    </div>
  );
}
