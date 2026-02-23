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
  name: 'Women', 
  image: womenImage, 
  link: '/shop?category=Women' 
},
        { name: 'Men', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600', link: '/shop?category=Men' },
        { name: 'Kids', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=600', link: '/shop?category=Kids' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600', link: '/shop?category=Accessories' },
      ];

      return (
        <div className="w-full">
          {/* Hero Section */}
          <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-baba-primary">
            <div className="absolute inset-0 w-full h-full">
              <img 
          src={heroImage} 
          alt="Luxury Textiles" 
          className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
              <div className="absolute inset-0 bg-gradient-to-r from-baba-primary/90 via-baba-primary/60 to-transparent" />
            </div>
            
            <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex flex-col items-start text-white max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <span className="text-baba-accent font-medium tracking-[0.2em] uppercase text-sm mb-4 block">Premium Wholesale Collections</span>
                <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
                  Elegance Woven <br/> Into Every Thread
                </h1>
                <p className="text-lg text-white/80 mb-8 max-w-xl font-light leading-relaxed">
                  Discover the finest quality textiles. Best rates and best quality is our motto. Your trusted wholesale partner in Srikakulam.
                </p>
                <div className="flex gap-4">
                  <Link 
                    to="/shop" 
                    className="bg-baba-accent text-baba-primary px-8 py-4 rounded-sm font-semibold tracking-wide hover:bg-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="border border-white/30 text-white px-8 py-4 rounded-sm font-medium hover:bg-white/10 transition-colors duration-300"
                  >
                    Our Story
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Strip */}
          <section className="bg-baba-softbg py-10 border-b border-black/5">
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
          </section>

          {/* Categories Section */}
          <section className="py-20 bg-baba-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-baba-primary font-bold mb-4">Shop by Category</h2>
                <div className="w-16 h-1 bg-baba-accent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, idx) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link to={category.link} className="group relative block h-[400px] rounded-xl overflow-hidden cursor-pointer">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90"></div>
                      <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                        <h3 className="text-2xl font-serif text-white mb-2">{category.name}</h3>
                        <span className="text-baba-accent text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                          Explore <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
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
                  <h2 className="font-serif text-3xl md:text-4xl text-baba-primary font-bold mb-4">Featured Arrivals</h2>
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
        </div>
      );
    }