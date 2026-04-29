import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/images/logo4.jpg';

const navItems = [
  { label: 'Home',         path: '/' },
  { label: 'Fishing',      path: '/shop?cat=fishing-rods' },
  { label: 'Spearfishing', path: '/shop?cat=spearfishing' },
  { label: 'Diving',       path: '/shop?cat=diving-masks' },
  { label: 'Contact Us',   path: '/contact' },
  { label: 'About Us',     path: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { items, toggleCart } = useCartStore();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className={`z-50 bg-white ${scrolled ? 'sticky top-0 shadow-sm' : ''}`}>

      {/* ── TOP BAR: logo | search | icons ── */}
      <div className="border-b border-gray-100">
        <div className="w-full h-[84px] grid grid-cols-[1fr_auto_1fr] items-center px-6">

          {/* LEFT: logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
              <span className={`block h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
            </button>

            <Link to="/" className="flex items-center gap-2 shrink-0" style={{ paddingLeft: 'clamp(0px, 4vw, 60px)' }}>
              <img src={logoImg} alt="DC Fishing" className="h-14 w-auto object-contain" />
              <span className="text-[#0A2342] text-[26px] font-black leading-tight tracking-tight hidden sm:block" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                DC <span className="text-[#FF6B35]">Fishing</span>
              </span>
            </Link>
          </div>

          {/* CENTER: search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center relative bg-gray-100 rounded-full overflow-hidden hover:bg-gray-200 transition-colors"
            style={{ height: 44, width: 'clamp(260px, 38vw, 620px)' }}
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full h-full px-5 text-[13px] outline-none text-gray-700 placeholder-gray-400 bg-transparent text-center"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0A2342] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" viewBox="0 0 24 24" fill="none">
                <path d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.4434 16.4453L20.9997 21.0016" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* RIGHT: login + cart */}
          <div className="flex items-center gap-5 justify-end" style={{ paddingRight: 'clamp(0px, 4vw, 60px)' }}>
            <Link to="/account" className="flex items-center gap-2 text-[#1a1a1a] hover:text-[#00B4D8] transition-colors">
              <User size={22} strokeWidth={1.5} />
              <span className="hidden xl:block text-[14px] font-medium whitespace-nowrap">Login / Register</span>
            </Link>

            <button onClick={toggleCart} className="relative text-[#1a1a1a] hover:text-[#00B4D8] transition-colors" aria-label="Cart">
              <ShoppingCart size={22} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── NAV BAR ── */}
      <nav className="hidden lg:block bg-[#f7f7f7] border-b border-gray-200">
        <div className="w-full px-6" style={{ paddingLeft: 'clamp(24px, 6vw, 120px)' }}>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center h-14 px-4 text-[15px] font-bold uppercase tracking-wider text-[#1a1a1a] hover:text-[#FF6B35] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <form onSubmit={handleSearch} className="flex mx-4 my-3 bg-gray-100 rounded-full overflow-hidden">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 px-5 py-3 text-[14px] outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <button type="submit" className="px-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M10.875 18.75C15.2242 18.75 18.75 15.2242 18.75 10.875C18.75 6.52576 15.2242 3 10.875 3C6.52576 3 3 6.52576 3 10.875C3 15.2242 6.52576 18.75 10.875 18.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.4434 16.4453L20.9997 21.0016" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
            <nav className="px-4 pb-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center py-3.5 text-[15px] font-semibold border-b border-gray-100 last:border-0 text-[#1a1a1a]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
