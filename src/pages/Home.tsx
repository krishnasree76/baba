import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
    import { useShop } from '../context/ShopContext';
    import ProductCard from '../components/ProductCard';
    import womenImage from '../assets/navysaree.png';
    import heroImage from '../assets/image.png';


    export default function Home() {
      const { products } = useShop();
      const featuredProducts = products.slice(0, 4);

      const categories = [
  { 
    name: 'sarees', 
    image: womenImage, 
    link: '/shop?category=sarees' 
  },
  { 
    name: '3 piece sets', 
    image: 'https://i.pinimg.com/736x/54/c2/98/54c298bf3a4ceb06e8a9b485b4b0fc71.jpg', 
    link: '/shop?category=3%20piece%20sets' 
  },
  { 
    name: 'frocks', 
    image: 'https://i.pinimg.com/736x/8d/e6/6b/8de66b42cdb88eb24e478ea4b2aed7dd.jpg', 
    link: '/shop?category=frocks' 
  },
  { 
    name: 'dress materials', 
    image: 'https://i.pinimg.com/736x/32/e9/90/32e990019081da31ad9b01067fa80934.jpg', 
    link: '/shop?category=dress%20materials' 
  },
];

      return (
        <div className="w-full">
          {/* Hero Section */}
          <section className="bg-[#0B1C2D] text-white md:hidden overflow-hidden relative border-b-2 border-[#C6A75E]">
  {/* Background Pattern Hint */}
  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C6A75E 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>

  <div className="relative flex items-center px-6 py-10 min-h-[240px] z-10">
    
    {/* LEFT TEXT CONTENT */}
    <div className="w-3/5 pr-2">
      <h1 className="font-serif text-2xl font-bold leading-tight tracking-wide text-[#C6A75E]">
        Baba Textiles
      </h1>
      
      <div className="w-8 h-[2px] bg-[#C6A75E] mt-2 mb-3"></div>

      <p className="text-[#F8F6F1] text-[12px] leading-relaxed font-medium">
        "Best rates and best quality is our motto."
      </p>
      
      <p className="text-[#EFE8DC]/70 text-[11px] mt-1 italic">
        Trusted Wholesale Partner in Srikakulam
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-6">
        <a href="tel:8328030460" className="bg-[#C6A75E] text-[#0B1C2D] px-4 py-2 rounded-sm text-[11px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform">
          <i className="fas fa-phone-alt"></i> CALL NOW
        </a>
        <div className="flex items-center gap-2 text-[10px] text-[#F8F6F1]/60 px-1">
          <span>8328030460</span>
          <span className="text-[#C6A75E]">|</span>
          <span>WhatsApp</span>
        </div>
      </div>
    </div>

    {/* RIGHT IMAGES (Staggered Layout) */}
    <div className="w-2/5 relative flex justify-end items-center h-[160px]">
      {/* Back Image (Soft Background) */}
      <img
        src="https://i.pinimg.com/736x/ac/01/f0/ac01f018c68baad485921f3be55ff704.jpg"
        className="absolute right-10 top-0 h-[100px] w-[75px] object-cover rounded shadow-lg rotate-[-8deg] opacity-40 border border-[#E5E7EB]/20"
        alt="textile back"
      />
      {/* Middle Image (Accent border) */}
      <img
        src="https://i.pinimg.com/736x/43/a0/06/43a00620483bf24332775c4cac882b0c.jpg"
        className="absolute right-5 top-4 h-[115px] w-[85px] object-cover rounded shadow-xl rotate-[2deg] z-[1] border border-[#C6A75E]/50"
        alt="textile mid"
      />
      {/* Front Image (Primary Focus) */}
      <img
        src="https://i.pinimg.com/1200x/06/01/e8/0601e8c940d1f807d87012d928014afc.jpg"
        className="absolute right-0 top-10 h-[130px] w-[95px] object-cover rounded shadow-2xl z-[2] border-2 border-[#C6A75E]"
        alt="textile front"
      />
    </div>

  </div>
</section>
<section className="bg-baba-primary text-white py-20 hidden md:block">
  <div className="container mx-auto px-4 flex flex-row items-center justify-between gap-12">

    {/* LEFT SIDE */}
    <div className="flex-1 text-left max-w-2xl">

      <span className="text-baba-accent tracking-[0.3em] uppercase text-sm font-medium block mb-4">
        Premium Wholesale Collections
      </span>

      <h1 className="font-serif text-6xl font-bold mb-6 leading-tight">
        Baba Textiles
      </h1>

      <p className="text-white/80 text-lg leading-relaxed mb-8">
        Best rates and best quality is our motto.
        Your trusted wholesale partner in Srikakulam.
      </p>

      <div className="flex items-center gap-6 text-base tracking-widest">
        <span>8328030460</span>
        <span className="text-white/40">|</span>
        <span>WhatsApp</span>
      </div>

    </div>

    {/* RIGHT SIDE IMAGES */}
    <div className="flex-1 flex justify-center gap-5">

      <div className="bg-white p-2 rounded-lg shadow-xl">
        <div className="w-44 rounded-md overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/ac/01/f0/ac01f018c68baad485921f3be55ff704.jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-xl">
        <div className="w-44 rounded-md overflow-hidden">
          <img
            src="https://i.pinimg.com/736x/43/a0/06/43a00620483bf24332775c4cac882b0c.jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-xl">
        <div className="w-44 rounded-md overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/06/01/e8/0601e8c940d1f807d87012d928014afc.jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  </div>
</section>

          {/* Features Strip */}
          {/* <section className="bg-baba-softbg py-10 border-b border-black/5">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-baba-primary/10">
                <div className="flex flex-col items-center text-center px-4">
                  <Star className="w-8 h-8 text-baba-accent mb-3" />
                  <h3 className="font-serif font-medium text-baba-primary text-lg mb-1">Premium Quality</h3>
                  <p className="text-sm text-baba-textdark/70">Handpicked finest materials</p>
                </div>
                <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                  <Shield className="w-8 h-8 text-baba-accent mb-3" />
                  <h3 className="font-serif font-medium text-baba-primary text-lg mb-1">Wholesale Rates</h3>
                  <p className="text-sm text-baba-textdark/70">Unbeatable prices guaranteed</p>
                </div>
                <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                  <Truck className="w-8 h-8 text-baba-accent mb-3" />
                  <h3 className="font-serif font-medium text-baba-primary text-lg mb-1">Reliable Supply</h3>
                  <p className="text-sm text-baba-textdark/70">Consistent stock & delivery</p>
                </div>
              </div>
            </div>
          </section> */}

          {/* Categories Section */}
          <section className="py-16 bg-baba-background">
  <div className="container mx-auto px-4">

    {/* Heading */}
    <div className="flex items-center justify-center gap-6 mb-12">
      <div className="h-[1px] bg-baba-border w-20 md:w-40"></div>
      <h2 className="font-serif text-2xl md:text-3xl text-baba-primary font-semibold tracking-wide">
        Shop By Category
      </h2>
      <div className="h-[1px] bg-baba-border w-20 md:w-40"></div>
    </div>

    {/* Horizontal Scroll */}
    <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4">

      {categories.map((category, idx) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
          className="flex-shrink-0 text-center group"
        >
          <Link to={category.link}>

            {/* Round Image Container */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden bg-baba-softbg shadow-md border border-baba-border transition-all duration-500 group-hover:shadow-xl group-hover:border-baba-accent">
              
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Category Name */}
            <p className="mt-4 text-baba-textdark font-medium text-sm md:text-base">
              {category.name}
            </p>

          </Link>
        </motion.div>
      ))}

    </div>
  </div>
</section>

          {/* Banner Offer Section */}
          <section className="py-20 bg-baba-primary relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-baba-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="container mx-auto px-4 relative z-10">
               <div className="max-w-3xl mx-auto text-center">
                 <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">Exclusive Festive Offers</h2>
                 <p className="text-baba-softbg/80 text-lg mb-8 leading-relaxed">
                   Use code <span className="bg-baba-accent/20 text-baba-accent px-3 py-1 rounded-sm font-mono font-bold mx-1">FESTIVE20</span> at checkout to get 20% off on all wholesale orders above ₹50,000. Limited time offer!
                 </p>
                 <Link to="/shop" className="inline-block bg-white text-baba-primary px-8 py-4 rounded-sm font-semibold tracking-wide hover:bg-baba-accent hover:text-white transition-colors duration-300">
                   Explore Collection
                 </Link>
               </div>
             </div>
          </section>

          {/* Featured Products */}
          <section className="py-20 bg-baba-background">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-baba-primary font-bold mb-4">Latest Arrivals</h2>
                  <div className="w-16 h-1 bg-baba-accent"></div>
                </div>
                <Link to="/shop" className="hidden md:flex items-center gap-2 text-baba-primary hover:text-baba-accent font-medium transition-colors">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="mt-10 text-center md:hidden">
                <Link to="/shop" className="inline-flex items-center gap-2 text-baba-primary border border-baba-primary px-6 py-3 rounded-sm hover:bg-baba-primary hover:text-white transition-colors">
                  View All Products
                </Link>
              </div>
            </div>
          </section>

          <section className="py-20 bg-baba-background">
  <div className="container mx-auto px-4">

    {/* Section Header */}
    <div className="flex justify-between items-end mb-12">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl text-baba-primary font-bold mb-4">
          Fast Selling Products
        </h2>
        <div className="w-16 h-1 bg-baba-accent"></div>
      </div>

      <Link
        to="/shop"
        className="hidden md:flex items-center gap-2 text-baba-primary hover:text-baba-accent font-medium transition-colors"
      >
        View All <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredProducts.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    {/* Mobile View All Button */}
    <div className="mt-10 text-center md:hidden">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-baba-primary border border-baba-primary px-6 py-3 rounded-sm hover:bg-baba-primary hover:text-white transition-colors"
      >
        View All Products
      </Link>
    </div>

  </div>
</section>
        </div>
      );
    }