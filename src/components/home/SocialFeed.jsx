import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

const socialLinks = [
  {
    platform: 'Instagram',
    handle: '@dcfishing_store',
    icon: FaInstagram,
    color: '#E1306C',
    bg: 'from-purple-500 via-pink-500 to-orange-400',
    url: 'https://instagram.com',
    followers: '12.4K',
    posts: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300',
    ],
  },
  {
    platform: 'Facebook',
    handle: 'DC Fishing Store',
    icon: FaFacebook,
    color: '#1877F2',
    bg: 'from-blue-600 to-blue-800',
    url: 'https://facebook.com',
    followers: '8.2K',
    posts: [
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300',
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300',
    ],
  },
  {
    platform: 'YouTube',
    handle: 'DC Fishing TV',
    icon: FaYoutube,
    color: '#FF0000',
    bg: 'from-red-500 to-red-700',
    url: 'https://youtube.com',
    followers: '5.6K',
    posts: [
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300',
    ],
  },
  {
    platform: 'TikTok',
    handle: '@dcfishing',
    icon: FaTiktok,
    color: '#000000',
    bg: 'from-gray-800 to-black',
    url: 'https://tiktok.com',
    followers: '22.1K',
    posts: [
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300',
      'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=300',
    ],
  },
];

const whatsappUrl = 'https://wa.me/15551234567?text=Hi!%20I%20am%20interested%20in%20your%20products.';

export default function SocialFeed() {
  return (
    <section className="py-20 bg-[#F8F5F0]">
      <div style={{ padding: '0 clamp(24px, 6vw, 96px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#FF6B35] font-bold uppercase tracking-widest text-sm">Follow Our Journey</span>
          <h2 className="text-4xl font-black text-[#0A2342] mt-2">Connect With Us</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Follow DC Fishing on social media for tips, catches, gear reviews, and exclusive deals!
          </p>
        </motion.div>

        {/* Social cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg group block"
              >
                {/* Header */}
                <div className={`bg-gradient-to-br ${social.bg} p-5 flex items-center justify-between`}>
                  <div>
                    <Icon size={30} className="text-white mb-1" />
                    <p className="text-white font-bold">{social.platform}</p>
                    <p className="text-white/70 text-xs">{social.handle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-black text-xl">{social.followers}</p>
                    <p className="text-white/70 text-xs">Followers</p>
                  </div>
                </div>

                {/* Post grid */}
                <div className="grid grid-cols-3 gap-0.5">
                  {social.posts.map((img, i) => (
                    <div key={i} className="aspect-square overflow-hidden">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>

                {/* Follow button */}
                <div className="p-4">
                  <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-600 group-hover:text-[#0A2342] transition-colors">
                    Follow <ExternalLink size={14} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white text-center shadow-xl"
        >
          <FaWhatsapp size={48} className="mx-auto mb-4" />
          <h3 className="text-2xl font-black mb-2">Chat With Us on WhatsApp</h3>
          <p className="text-green-100 mb-6 max-w-md mx-auto">
            Need help choosing gear? Our experts are available 7 days a week on WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-600 font-black px-8 py-3 rounded-full hover:bg-green-50 transition-all duration-300 hover:scale-105 text-lg"
          >
            <FaWhatsapp size={22} /> Chat Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
