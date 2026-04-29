import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const contactCards = [
  { icon: Phone,  label: 'Call Us',      value: '+961 1 234 567',      sub: 'Mon–Fri, 9am–7pm',     href: 'tel:+9611234567',          color: 'bg-[#0A2342]' },
  { icon: Mail,   label: 'Email Us',     value: 'info@dcfishing.com',  sub: 'Reply within 24 hours', href: 'mailto:info@dcfishing.com', color: 'bg-[#00B4D8]' },
  { icon: MapPin, label: 'Visit Us',     value: 'Dbayeh, Lebanon',     sub: 'Open 7 days a week',    href: '/visit',                   color: 'bg-[#FF6B35]' },
  { icon: Clock,  label: 'Working Hours',value: 'Mon–Sat: 9am–7pm',    sub: 'Sun: 10am–3pm',         href: '#',                        color: 'bg-[#0a3d62]' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-[#0A2342] py-14 text-center">
        <h1 className="text-4xl font-black text-white mb-2">Contact Us</h1>
        <p className="text-[#00B4D8] text-[15px]">We're here to help — reach out any time</p>
      </div>

      {/* Contact cards */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactCards.map(({ icon: Icon, label, value, sub, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`${color} text-white rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:opacity-90 transition-opacity shadow-lg`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wide">{label}</p>
                <p className="text-white font-bold text-[13px] mt-0.5 leading-snug">{value}</p>
                <p className="text-white/60 text-[11px] mt-0.5">{sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Form — wider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <h2 className="text-[22px] font-black text-[#0A2342] mb-1">Send a Message</h2>
            <p className="text-gray-400 text-[13px] mb-6">Fill out the form and we'll get back to you as soon as possible.</p>

            {sent ? (
              <div className="text-center py-14">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <p className="text-xl font-bold text-gray-700">Message Sent!</p>
                <p className="text-gray-400 mt-2 text-[14px]">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="mt-5 text-[#00B4D8] hover:underline text-sm">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Full Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0A2342] transition-colors text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Email</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0A2342] transition-colors text-[13px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Subject</label>
                  <input
                    type="text" required value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0A2342] transition-colors text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea
                    required rows={6} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#0A2342] transition-colors text-[13px] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0A2342] text-white py-3.5 rounded-xl font-bold hover:bg-[#FF6B35] transition-colors flex items-center justify-center gap-2 text-[14px]"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/96170123456"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white rounded-2xl p-6 flex items-center gap-4 hover:opacity-90 transition-opacity shadow-sm"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <FaWhatsapp size={26} className="text-white" />
              </div>
              <div>
                <p className="font-black text-[16px]">Chat on WhatsApp</p>
                <p className="text-white/80 text-[13px] mt-0.5">Quick answers in minutes</p>
              </div>
            </a>

            {/* Social media */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex-1">
              <h3 className="font-black text-[#0A2342] text-[16px] mb-4">Follow Us</h3>
              <div className="space-y-3">
                {[
                  { Icon: FaFacebook,  label: 'Facebook',  handle: '@DCFishingStore',  color: 'bg-blue-600',  url: 'https://facebook.com' },
                  { Icon: FaInstagram, label: 'Instagram', handle: '@dcfishing_store', color: 'bg-pink-500',  url: 'https://instagram.com' },
                  { Icon: FaYoutube,   label: 'YouTube',   handle: 'DC Fishing TV',    color: 'bg-red-600',   url: 'https://youtube.com' },
                  { Icon: FaTiktok,    label: 'TikTok',    handle: '@dcfishing',       color: 'bg-gray-900',  url: 'https://tiktok.com' },
                ].map(({ Icon, label, handle, color, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-9 h-9 ${color} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-gray-800 group-hover:text-[#0A2342]">{label}</p>
                      <p className="text-gray-400 text-[12px]">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
