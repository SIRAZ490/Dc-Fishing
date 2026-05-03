import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Car, Navigation } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const MAPS_URL = 'https://maps.app.goo.gl/LKgqyAvjhiSeA4ep8';

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM', open: [9, 19] },
  { day: 'Saturday',        time: '9:00 AM – 5:00 PM', open: [9, 17] },
  { day: 'Sunday',          time: '10:00 AM – 3:00 PM', open: [10, 15] },
];

const info = [
  { icon: MapPin,      label: 'Address',   value: 'Dbayeh Highway, Marina Tower, Ground Floor, Lebanon', href: MAPS_URL },
  { icon: Phone,       label: 'Phone',     value: '+961 1 234 567',   href: 'tel:+9611234567' },
  { icon: FaWhatsapp,  label: 'WhatsApp',  value: '+961 70 123 456',  href: 'https://wa.me/96170123456' },
  { icon: Mail,        label: 'Email',     value: 'info@dcfishing.com', href: 'mailto:info@dcfishing.com' },
];

function isOpenNow() {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hour = now.getHours() + now.getMinutes() / 60;
  if (day >= 1 && day <= 5) return hour >= 9 && hour < 19;
  if (day === 6) return hour >= 9 && hour < 17;
  if (day === 0) return hour >= 10 && hour < 15;
  return false;
}

export default function VisitUsPage() {
  const open = isOpenNow();

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#0A2342] text-center" style={{ padding: '64px 48px' }}>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-black text-white mb-3"
        >
          Visit Our Store
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-[#00B4D8] text-[15px] sm:text-[17px]"
        >
          Come see us in person — we'd love to help you gear up
        </motion.p>
      </div>

      {/* Main content */}
      <div style={{ padding: '56px 48px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: info */}
          <div className="space-y-6">

            {/* Store info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
              style={{ padding: '32px' }}
            >
              <h2 className="text-xl font-black text-[#0A2342] mb-6">Store Information</h2>
              <div className="space-y-5">
                {info.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-[#0A2342] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FF6B35] transition-colors">
                      <Icon size={17} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                      <p className="text-[#0A2342] font-semibold text-[14px] group-hover:text-[#FF6B35] transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100"
              style={{ padding: '32px' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock size={20} className="text-[#00B4D8]" />
                <h2 className="text-xl font-black text-[#0A2342]">Opening Hours</h2>
              </div>
              <div className="space-y-3">
                {hours.map(({ day, time }) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600 text-[14px] font-medium">{day}</span>
                    <span className="text-[#0A2342] font-bold text-[14px]">{time}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-5 p-3 rounded-xl border ${open ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                <p className={`text-[13px] font-semibold ${open ? 'text-green-700' : 'text-red-600'}`}>
                  {open ? '🟢 We\'re open now!' : '🔴 We\'re currently closed'}
                </p>
              </div>
            </motion.div>

            {/* Directions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0A2342] rounded-2xl text-white"
              style={{ padding: '32px' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Car size={20} className="text-[#00B4D8]" />
                <h2 className="text-xl font-black">How to Find Us</h2>
              </div>
              <ul className="space-y-2 text-gray-300 text-[14px]">
                <li>🚗 5 minutes from Dbayeh highway exit</li>
                <li>🅿️ Free parking available in front of the store</li>
                <li>🚌 Bus line 4 stops at Marina Tower</li>
                <li>📍 Next to Marina Sport Center</li>
              </ul>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-2 bg-[#FF6B35] text-white rounded-xl font-bold text-[14px] hover:bg-[#e55a25] transition-colors w-fit"
                style={{ padding: '12px 24px' }}
              >
                <Navigation size={16} /> Get Directions
              </a>
            </motion.div>
          </div>

          {/* Right: map + image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-1" style={{ minHeight: '420px' }}>
              <iframe
                title="DC Fishing Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.8!2d35.6!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzAwLjAiTiAzNcKwMzYnMDAuMCJF!5e0!3m2!1sen!2slb!4v1620000000000!5m2!1sen!2slb"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Store image */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-gray-100" style={{ height: '200px' }}>
              <img
                src="/src/assets/images/cat-fishing.jpg"
                alt="DC Fishing Store"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0A2342]/50 flex items-center justify-center">
                <p className="text-white font-black text-xl">DC Fishing Store</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
