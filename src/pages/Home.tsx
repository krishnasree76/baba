// import React from 'react';
import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import womenImage from '../assets/navysaree.png';
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const { products } = useShop();
  const featuredProducts = products.slice(0, 4);
  const navigate = useNavigate();

  const categories = [
    { name: 'sarees', image: womenImage, link: '/shop?category=sarees' },
    { name: '3 piece sets', image: 'https://i.pinimg.com/736x/54/c2/98/54c298bf3a4ceb06e8a9b485b4b0fc71.jpg', link: '/shop?category=3%20piece%20sets' },
    { name: 'frocks', image: 'https://i.pinimg.com/736x/8d/e6/6b/8de66b42cdb88eb24e478ea4b2aed7dd.jpg', link: '/shop?category=frocks' },
    { name: 'dress materials', image: 'https://i.pinimg.com/736x/32/e9/90/32e990019081da31ad9b01067fa80934.jpg', link: '/shop?category=dress%20materials' },
  ];
  const images = [
  "https://i.pinimg.com/736x/ac/01/f0/ac01f018c68baad485921f3be55ff704.jpg",
  "https://i.pinimg.com/736x/43/a0/06/43a00620483bf24332775c4cac882b0c.jpg",
  "https://i.pinimg.com/1200x/06/01/e8/0601e8c940d1f807d87012d928014afc.jpg",
];

const [current, setCurrent] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(interval);
}, [images.length]);

  return (
    <div className="w-full bg-[#F8F6F1]">
      {/* 1. MOBILE HERO SECTION */}
      <section className="bg-[#0B1C2D] text-white md:hidden overflow-hidden relative border-b-2 border-[#C6A75E]">
  <div
    className="absolute inset-0 opacity-10 pointer-events-none"
    style={{
      backgroundImage:
        'radial-gradient(#C6A75E 0.5px, transparent 0.5px)',
      backgroundSize: '20px 20px'
    }}
  ></div>

  <div className="relative flex items-center px-6 py-10 min-h-[240px] z-10">

    <div className="w-3/5 pr-2">
      <h1 className="font-serif text-2xl font-bold leading-tight tracking-wide text-[#C6A75E]">
        Baba Textiles
      </h1>

      <div className="w-8 h-[2px] bg-[#C6A75E] mt-2 mb-3"></div>

      <p className="text-[#F8F6F1] text-[12px] leading-relaxed font-medium italic">
        "Best rates and best quality is our motto."
      </p>

      <div className="flex flex-col gap-2 mt-6">
        <a
          href="tel:8328030460"
          className="bg-[#C6A75E] text-[#0B1C2D] px-4 py-2 rounded-sm text-[11px] font-bold text-center shadow-md"
        >
          CALL NOW
        </a>
      </div>
    </div>

    <div className="w-2/5 flex justify-end items-center h-[160px] relative">

      {/* LEFT ARROW */}
      <button
        onClick={() =>
          setCurrent((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        className="absolute left-0 z-20 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md"
      >
        <ChevronLeft size={14} className="text-black" />
      </button>

      {/* IMAGE SLIDER */}
      <div className="overflow-hidden relative w-[100px] h-[140px] flex justify-center items-center">
        <AnimatePresence mode="wait">
          <Link to="/shop">
            <motion.img
  key={current}
  src={images[current]}
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, info) => {
    if (info.offset.x < -50) {
      setCurrent((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > 50) {
      setCurrent((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      // If drag was small → treat as tap
      navigate("/shop");
    }
  }}
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -80 }}
  transition={{ duration: 0.4 }}
  className="absolute w-full h-full object-cover rounded shadow-xl border-4 border-white cursor-pointer"
/>
          </Link>
        </AnimatePresence>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % images.length)
        }
        className="absolute right-0 z-20 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md"
      >
        <ChevronRight size={14} className="text-black" />
      </button>

    </div>
  </div>
</section>

      {/* 2. DESKTOP HERO SECTION */}
     <section className="bg-[#0B1C2D] text-white py-20 hidden md:block">
  <div className="container mx-auto px-4 flex flex-row items-center justify-between gap-12">

    {/* LEFT SIDE */}
    <div className="flex-1 text-left max-w-2xl">
      <span className="text-[#C6A75E] tracking-[0.3em] uppercase text-sm font-medium block mb-4">
        Wholesale Excellence
      </span>

      <h1 className="font-serif text-6xl font-bold mb-6">
        Baba Textiles
      </h1>

      <p className="text-[#F8F6F1]/80 text-lg mb-8 italic leading-relaxed">
        "Best rates and best quality is our motto."
      </p>

      <div className="flex items-center gap-6 text-base tracking-widest text-[#C6A75E]">
        <span>8328030460</span>
        <span className="text-white/20">|</span>
        <span className="text-white">WhatsApp</span>
      </div>
    </div>

    {/* RIGHT SIDE – CLICKABLE IMAGES */}
    <div className="flex-1 flex justify-center gap-5">
      {[1, 2, 3].map((_, i) => (
        <Link
          key={i}
          to="/shop"
          className="group bg-white p-1 rounded shadow-xl hover:scale-105 transition duration-300"
        >
          <div className="w-40 h-60 overflow-hidden rounded">
            <img
              src={
                i === 0
                  ? "https://i.pinimg.com/736x/ac/01/f0/ac01f018c68baad485921f3be55ff704.jpg"
                  : i === 1
                  ? "https://i.pinimg.com/736x/43/a0/06/43a00620483bf24332775c4cac882b0c.jpg"
                  : "https://i.pinimg.com/1200x/06/01/e8/0601e8c940d1f807d87012d928014afc.jpg"
              }
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              alt="textile"
            />
          </div>
        </Link>
      ))}
    </div>

  </div>
</section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-16 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12 flex-nowrap">
            <div className="h-[1px] bg-[#E5E7EB] flex-grow"></div>
            <h2 className="font-serif text-xl md:text-3xl text-[#0B1C2D] font-semibold whitespace-nowrap px-2">Shop By Category</h2>
            <div className="h-[1px] bg-[#E5E7EB] flex-grow"></div>
          </div>
          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-4 px-2">
            {categories.map((category, idx) => (
              <motion.div key={category.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20px" }} className="flex-shrink-0 text-center group">
                <Link to={category.link}>
                  <div className="w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden bg-[#EFE8DC] border border-[#E5E7EB] group-hover:border-[#C6A75E] transition-all shadow-md">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <p className="mt-4 text-[#1C1C1C] font-semibold text-[10px] md:text-sm uppercase tracking-widest">{category.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LATEST ARRIVALS (2 PER ROW ON MOBILE) */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-2xl md:text-4xl text-[#0B1C2D] font-bold">Latest Arrivals</h2>
            <Link to="/shop" className="text-[#C6A75E] font-medium flex items-center gap-1 text-sm">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* 5. FAST SELLING (2 PER ROW ON MOBILE) */}
      <section className="py-12 md:py-20 bg-[#EFE8DC]/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-serif text-2xl md:text-4xl text-[#0B1C2D] font-bold">Popular Collection</h2>
            <Link to="/shop" className="text-[#C6A75E] font-medium flex items-center gap-1 text-sm">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}