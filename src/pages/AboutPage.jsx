import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, Heart, ShoppingBag, Truck } from 'lucide-react';

const stats = [
  { icon: Users,       value: '10,000+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: '500+',    label: 'Products' },
  { icon: Globe,       value: '15+',     label: 'Brands Carried' },
  { icon: Truck,       value: '48h',     label: 'Fast Delivery' },
];

const values = [
  { icon: Award,  title: 'Premium Quality',  desc: 'We only carry products from the world\'s most trusted brands — Shimano, Cressi, Mares, Penn and more.' },
  { icon: Heart,  title: 'Passion First',    desc: 'Our team are active fishermen and divers. We test every product we sell, so you get honest recommendations.' },
  { icon: Users,  title: 'Expert Support',   desc: 'Have a question? Our team is available 7 days a week to help you choose the right gear for your adventure.' },
];

const team = [
  { name: 'David Choueri',   role: 'Founder & Fishing Expert',     img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face' },
  { name: 'Maya Khoury',     role: 'Diving & Freediving Specialist', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face' },
  { name: 'Karim Nassar',    role: 'Spearfishing Champion',         img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607524191306-7fec3d6b44b6?w=1400&h=420&fit=crop"
          alt="DC Fishing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A2342]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-white mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/80 text-[16px] max-w-xl"
          >
            Born from a passion for the sea — DC Fishing is your trusted partner for fishing, spearfishing and diving gear.
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">Who We Are</span>
          <h2 className="text-3xl font-black text-[#0A2342] mt-3 mb-6">Built by Fishermen, for Fishermen</h2>
          <p className="text-gray-500 leading-relaxed text-[15px] mb-4">
            DC Fishing was founded in 2018 by a group of passionate anglers and divers who were frustrated with the lack of quality fishing and diving gear in the region. We set out to build a store that offers the world's best brands with honest expert advice.
          </p>
          <p className="text-gray-500 leading-relaxed text-[15px]">
            Today we serve thousands of customers across Lebanon and the Middle East, offering everything from professional fishing rods and reels to freediving masks, wetsuits, and spearguns. Every product in our store has been tested by our team on the water.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[#0A2342] py-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Icon size={28} className="text-[#00B4D8] mx-auto mb-3" />
              <p className="text-3xl font-black text-white">{value}</p>
              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">Why Choose Us</span>
          <h2 className="text-3xl font-black text-[#0A2342] mt-3">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-[#0A2342] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon size={24} className="text-[#00B4D8]" />
              </div>
              <h3 className="font-bold text-[#0A2342] text-[17px] mb-2">{title}</h3>
              <p className="text-gray-400 text-[14px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-sm">The People Behind DC Fishing</span>
            <h2 className="text-3xl font-black text-[#0A2342] mt-3">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map(({ name, role, img }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                  <img src={img} alt={name} className="w-full h-full object-cover" />
                </div>
                <p className="font-bold text-[#0A2342] text-[16px]">{name}</p>
                <p className="text-gray-400 text-[13px] mt-1">{role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="text-3xl font-black text-[#0A2342] mb-4">Ready to Gear Up?</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Explore our full range of fishing and diving equipment from the world's top brands.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/shop" className="bg-[#0A2342] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#FF6B35] transition-colors">
            Shop Now
          </Link>
          <Link to="/contact" className="border-2 border-[#0A2342] text-[#0A2342] px-8 py-3.5 rounded-full font-bold hover:bg-[#0A2342] hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
