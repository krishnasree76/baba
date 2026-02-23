import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import { useShop } from '../context/ShopContext';
import type { ProductColor } from '../context/ShopContext';
    import { ShoppingBag, ChevronRight, ShieldCheck, Truck } from 'lucide-react';
    import { motion, AnimatePresence } from 'framer-motion';
    // src/components/ProductCard.tsx
import {ChevronDown } from 'lucide-react';

    export default function ProductDetail() {
      const { id } = useParams();
      const navigate = useNavigate();
      const { products, addToCart } = useShop();
      const product = products.find(p => p.id === id);

      const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
      const [quantity, setQuantity] = useState(1);

      useEffect(() => {
        if (product && product.colors.length > 0) {
          setSelectedColor(product.colors[0]);
          setQuantity(1);
        }
      }, [product]);

      if (!product || !selectedColor) {
        return <div className="min-h-[60vh] flex items-center justify-center text-xl">Product not found</div>;
      }

      const isOutOfStock = selectedColor.stock === 0;

      const handleAddToCart = () => {
        if (!isOutOfStock) {
          addToCart(product, selectedColor, quantity);
        }
      };

      return (
        <div className="bg-baba-background min-h-screen py-10">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center text-sm text-baba-textdark/60 mb-8">
              <Link to="/" className="hover:text-baba-accent transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <Link to={`/shop?category=${product.category}`} className="hover:text-baba-accent transition-colors">{product.category}</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-baba-primary font-medium truncate">{product.name}</span>
            </nav>

            <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                
                {/* Image Section */}
                <div className="relative bg-baba-softbg p-8 flex items-center justify-center min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedColor.image}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={selectedColor.image}
                      alt={`${product.name} in ${selectedColor.name}`}
                      className="max-h-[700px] w-full object-contain rounded-xl shadow-2xl"
                    />
                  </AnimatePresence>
                  {isOutOfStock && (
                    <div className="absolute top-8 right-8 bg-red-500 text-white font-bold px-4 py-2 rounded shadow-lg uppercase tracking-widest">
                      Out of Stock
                    </div>
                  )}
                  {/* Internal Code hidden in DOM as requested */}
                  <span className="hidden" data-code={product.code}>{product.code}</span>
                </div>

                {/* Details Section */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium tracking-widest text-baba-accent uppercase">{product.category}</span>
                    <span className="text-xs text-gray-400 font-mono">Ref: {product.code}</span>
                  </div>
                  
                  <h1 className="font-serif text-3xl md:text-5xl text-baba-primary font-bold leading-tight mb-4">
                    {product.name}
                  </h1>
                  
                  <p className="text-2xl text-baba-primary font-medium mb-6">
                    ₹{product.price.toLocaleString('en-IN')}
                    <span className="text-sm text-gray-500 font-normal ml-2">Wholesale Rate</span>
                  </p>
                  
                  <p className="text-baba-textdark/70 leading-relaxed mb-8">
                    {product.description}
                  </p>

                  {/* Colors */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-baba-primary uppercase tracking-wider mb-3 flex items-center justify-between">
                      <span>Color: {selectedColor.name}</span>
                    </h3>
                    <div className="flex gap-3">
                      {product.colors.map(color => (
                        <button
                          key={color.name}
                          onClick={() => {
                            setSelectedColor(color);
                            setQuantity(1); // Reset qty on color change
                          }}
                          className={`relative w-12 h-12 rounded-full border-2 transition-all overflow-hidden ${selectedColor.name === color.name ? 'border-baba-primary shadow-md scale-110' : 'border-gray-200 hover:border-baba-accent'}`}
                          title={color.name}
                        >
                          <span className="absolute inset-1 rounded-full" style={{ backgroundColor: color.hex }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        disabled={isOutOfStock}
                        className="h-14 px-6 border border-gray-300 rounded-sm bg-white text-lg focus:outline-none focus:border-baba-accent disabled:bg-gray-100 disabled:text-gray-400 appearance-none min-w-[100px] cursor-pointer"
                      >
                        {isOutOfStock ? (
                          <option value="0">0</option>
                        ) : (
                          Array.from({ length: selectedColor.stock }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))
                        )}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className="flex-1 h-14 flex items-center justify-center gap-3 bg-baba-primary text-white text-lg font-semibold rounded-sm hover:bg-baba-accent transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed group"
                    >
                      <ShoppingBag className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                      {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                    </button>
                  </div>

                  {/* Stock info */}
                  <p className={`text-sm font-medium mb-8 ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
                    {isOutOfStock ? 'Currently out of stock for this color.' : `${selectedColor.stock} units available in stock.`}
                  </p>

                  <div className="border-t border-gray-100 pt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-baba-textdark/70">
                      <ShieldCheck className="w-5 h-5 text-baba-accent" />
                      <span className="text-sm">Premium Quality Assurance</span>
                    </div>
                    <div className="flex items-center gap-3 text-baba-textdark/70">
                      <Truck className="w-5 h-5 text-baba-accent" />
                      <span className="text-sm">Secure Wholesale Shipping</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }