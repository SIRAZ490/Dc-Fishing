import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, ShoppingBag, Globe, Truck, Award, Heart } from 'lucide-react';

const stats = [
  { icon: Users,       value: '10,000+', label: 'Happy Customers' },
  { icon: ShoppingBag, value: '500+',    label: 'Products' },
  { icon: Globe,       value: '15+',     label: 'Brands Carried' },
  { icon: Truck,       value: '48h',     label: 'Fast Delivery' },
];

const values = [
  { icon: Award, title: 'Premium Quality',  desc: "We only carry products from the world's most trusted brands — Shimano, Cressi, Mares, Penn and more." },
  { icon: Heart, title: 'Passion First',    desc: 'Our team are active fishermen and divers. We test every product we sell, so you get honest recommendations.' },
  { icon: Users, title: 'Expert Support',   desc: 'Have a question? Our team is available 7 days a week to help you choose the right gear for your adventure.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative h-[420px] sm:h-120 overflow-hidden">
        <img
          src="/src/assets/images/about_us.avif"
          alt="DC Fishing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A2342]/75" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase mb-5 tracking-tight"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/80 text-[15px] sm:text-[17px] max-w-xl leading-relaxed"
          >
            Born from a passion for the sea — DC Fishing is your trusted partner for fishing, spearfishing and diving gear.
          </motion.p>
        </div>
      </div>

      {/* Who We Are */}
      <section style={{ padding: '80px 96px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-[12px]">Who We Are</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2342] mt-4 mb-8">
            Built by Fishermen, for Fishermen
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px] mb-6">
            DC Fishing was founded in 2018 by a group of passionate anglers and divers who were frustrated with the lack of quality fishing and diving gear in the region. We set out to build a store that offers the world's best brands with honest expert advice.
          </p>
          <p className="text-gray-500 leading-relaxed text-[15px]">
            Today we serve thousands of customers across Lebanon and the Middle East, offering everything from professional fishing rods and reels to freediving masks, wetsuits, and spearguns. Every product in our store has been tested by our team on the water.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="bg-[#0A2342]" style={{ padding: '64px 96px' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center" style={{ paddingBottom: '16px' }}
            >
              <Icon size={32} className="text-white mx-auto" strokeWidth={1.5} style={{ display: 'block', marginBottom: '12px' }} />
              <p className="text-3xl sm:text-4xl font-black text-white">{value}</p>
              <p className="text-gray-400 text-[11px] uppercase tracking-widest mt-2 font-semibold">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 96px' }}>
        <div className="text-center" style={{ marginBottom: '56px' }}>
          <span className="text-[#00B4D8] font-bold uppercase tracking-widest text-[12px]">Why Choose Us</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2342] mt-4">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white"
              style={{ padding: '36px' }}
            >
              <div className="w-12 h-12 bg-[#0A2342] rounded-xl flex items-center justify-center mb-6">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-[#0A2342] text-[17px] mb-3">{title}</h3>
              <p className="text-gray-400 text-[14px] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 text-center" style={{ padding: '80px 96px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2342] mb-4">Ready to Gear Up?</h2>
          <p className="text-gray-400 text-[15px] max-w-md mx-auto" style={{ marginBottom: '40px' }}>
            Explore our full range of fishing and diving equipment from the world's top brands.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/shop"
              className="bg-[#0A2342] text-white rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#FF6B35] transition-colors"
              style={{ padding: '14px 40px' }}
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-[#0A2342] text-[#0A2342] rounded-full font-black text-[13px] uppercase tracking-widest hover:bg-[#0A2342] hover:text-white transition-colors"
              style={{ padding: '14px 40px' }}
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
