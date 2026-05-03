import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const messages = [
  '🎣 Free shipping on orders over $50 — Shop now!',
  '🤿 New spearfishing gear just arrived — Check it out!',
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((c) => (c + 1) % messages.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="bg-[#0A2342] text-white text-[13px] py-2 px-4 relative min-h-9">
      <p className="absolute left-1/2 top-1/2 w-[calc(100%-96px)] -translate-x-1/2 -translate-y-1/2 text-center font-medium tracking-wide sm:w-auto">
        {messages[current]}
      </p>
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
