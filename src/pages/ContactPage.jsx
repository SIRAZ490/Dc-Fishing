import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #e5e2e1 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >

      {/* Hero */}
      <section className="bg-[#0A2342] px-4 sm:px-6 relative overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="w-full relative z-10 flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 w-full text-center"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-[#a4caf7] text-sm sm:text-base lg:text-lg w-full max-w-2xl mx-auto leading-relaxed text-center pb-6 sm:pb-10"
          >
            We're here to help you get back on the water. Whether you have questions about gear or need expert fishing advice, our team is ready to assist.
          </motion.p>
        </div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/src/assets/images/pull.avif"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full relative z-20" style={{ padding: '48px 48px 80px 48px', marginTop: '-24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-gray-200" style={{ padding: '48px' }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0A2342] mb-6 sm:mb-10">Send us a Message</h2>

            {sent ? (
              <div className="text-center py-12 sm:py-16">
                <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                <p className="text-xl sm:text-2xl font-bold text-gray-700">Message Sent!</p>
                <p className="text-gray-400 mt-2 text-sm">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-[#00B4D8] hover:underline text-sm font-semibold"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" style={{ paddingTop: '24px' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider" style={{ paddingLeft: '10px' }}>Full Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., John Doe"
                      className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10 transition-all text-[14px] text-gray-700" style={{ paddingLeft: '10px' }}
                    />
                  </div>
                  <div className="space-y-1.5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider" style={{ paddingLeft: '10px' }}>Email Address</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10 transition-all text-[14px] text-gray-700" style={{ paddingLeft: '10px' }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider" style={{ paddingLeft: '10px' }}>Subject</label>
                  <input
                    type="text" required value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full h-11 sm:h-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10 transition-all text-[14px] text-gray-700" style={{ paddingLeft: '10px' }}
                  />
                </div>
                <div className="space-y-1.5" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                  <label className="block text-[12px] font-bold text-gray-500 uppercase tracking-wider" style={{ paddingLeft: '10px' }}>Message</label>
                  <textarea
                    required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#0A2342] focus:ring-2 focus:ring-[#0A2342]/10 transition-all text-[14px] text-gray-700 resize-none" style={{ paddingLeft: '10px' }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#FF6B35] text-white font-black text-[13px] uppercase tracking-widest rounded-xl hover:bg-[#e55a25] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2" style={{ padding: '16px 40px', marginTop: '16px' }}
                >
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Contact Cards + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                { icon: Phone,  label: 'Call Us',       value: '+961 1 234 567',     sub: 'Mon–Fri, 9am–7pm',       href: 'tel:+9611234567' },
                { icon: Mail,   label: 'Email Us',      value: 'info@dcfishing.com', sub: 'Response within 24 hours', href: 'mailto:info@dcfishing.com' },
                { icon: MapPin, label: 'Visit Us',      value: 'Dbayeh, Lebanon',    sub: 'Flagship Experience Center', href: 'https://maps.app.goo.gl/LKgqyAvjhiSeA4ep8' },
                { icon: Clock,  label: 'Working Hours', value: 'Mon–Sat: 9am–7pm',   sub: 'Sunday: 10am–2pm',       href: null },
              ].map(({ icon: Icon, label, value, sub, href }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-200 rounded-xl flex items-start gap-4 hover:shadow-md transition-all"
                  style={{ paddingTop: '16px', paddingBottom: '16px', paddingLeft: '16px' }}
                >
                  <div className="w-11 h-11 bg-[#d0e4ff] rounded-xl flex items-center justify-center text-[#0A2342] shrink-0">
                    <Icon size={19} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[15px] text-[#0A2342] uppercase tracking-wide mb-0.5">{label}</h3>
                    {href ? (
                      <a href={href} className="text-gray-700 text-[14px] font-semibold truncate cursor-pointer hover:text-[#FF6B35] transition-colors block">{value}</a>
                    ) : (
                      <p className="text-gray-700 text-[14px] font-semibold truncate">{value}</p>
                    )}
                    <p className="text-gray-400 text-[12px] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-[#0A2342] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden group">
              <div className="relative z-10" style={{ paddingTop: '12px', paddingBottom: '12px', paddingLeft: '12px' }}>
                <h3 className="font-black text-lg sm:text-xl mb-2">Need Instant Help?</h3>
                <p className="text-[#a4caf7] text-[13px] sm:text-[14px] leading-relaxed mb-5 sm:mb-6">
                  Connect with our pro guides instantly on WhatsApp for gear recommendations and support.
                </p>
                <a
                  href="https://wa.me/96170123456"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white py-3 rounded-full font-bold text-[13px] sm:text-[14px] hover:scale-105 transition-transform" style={{ paddingLeft: '24px', paddingRight: '24px' }}
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-10 text-white transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <MessageCircle size={140} />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Social Media Section */}
      <section className="w-full border-t border-gray-200" style={{ padding: '48px 48px 80px' }}>
        <div className="text-center mb-8 sm:mb-10" style={{ paddingBottom: '20px' }}>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A2342]">Join Our Community</h2>
          <p className="text-gray-500 text-[14px] sm:text-[15px] mt-2">Follow our adventures and share your latest catches.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { Icon: FaFacebook,  label: 'Facebook',  handle: '@dcfishing'      },
            { Icon: FaInstagram, label: 'Instagram', handle: '@dc_fishing_pro' },
            { Icon: FaYoutube,   label: 'YouTube',   handle: 'DC Fishing TV'   },
            { Icon: FaTiktok,    label: 'TikTok',    handle: '@dcfishing_tips' },
          ].map(({ Icon, label, handle }) => (
            <a
              key={label}
              href="#"
              className="flex flex-col items-center bg-white rounded-2xl hover:shadow-md transition-all group border border-gray-200 shadow-sm"
              style={{ paddingTop: '20px', paddingBottom: '20px' }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: '#d0e4ff', color: '#0A2342', marginBottom: '10px' }}>
                <Icon size={20} />
              </div>
              <span className="font-bold text-[12px] sm:text-[13px] text-[#0A2342] text-center">{handle}</span>
              <span className="text-gray-400 text-[11px] sm:text-[12px] mt-0.5">{label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-64 sm:h-80 lg:h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.5!2d35.6!3d33.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17b3b3b3b3b3%3A0x0!2zRGJheWVo!5e0!3m2!1sen!2slb!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 w-full h-full"
          title="DC Fishing Store Location"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xs sm:max-w-sm text-center flex flex-col items-center" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FF6B35] rounded-xl flex items-center justify-center mb-3">
              <MapPin size={20} className="text-white" />
            </div>
            <h3 className="font-black text-[#0A2342] text-base sm:text-lg mb-1">Flagship Store</h3>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed px-4">Located in Dbayeh, Lebanon. Come visit the experts.</p>
            <a
              href="https://maps.app.goo.gl/LKgqyAvjhiSeA4ep8"
              target="_blank"
              rel="noreferrer"
              className="mt-3 text-[#FF6B35] text-[13px] font-bold hover:underline pointer-events-auto"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
