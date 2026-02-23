import React, { useState, useMemo } from 'react';
    import { useLocation } from 'react-router-dom';
    import { useShop } from '../context/ShopContext';
    import ProductCard from '../components/ProductCard';
    import { Filter, ChevronDown } from 'lucide-react';
    import { motion } from 'framer-motion';

    export default function Shop() {
      const { products } = useShop();
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const initialCategory = searchParams.get('category') || 'All';
      const searchQuery = searchParams.get('q') || '';

      const [selectedCategory, setSelectedCategory] = useState(initialCategory);
      const [sortBy, setSortBy] = useState('featured');

      const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories'];

      const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by Category
        if (selectedCategory !== 'All') {
          result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Search Query (Name or Hidden Code)
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          result = result.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.code.toLowerCase().includes(query)
          );
        }

        // Sorting
        if (sortBy === 'price-low') {
          result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          result.sort((a, b) => b.price - a.price);
        }

        return result;
      }, [products, selectedCategory, searchQuery, sortBy]);

      return (
        <div className="bg-baba-softbg min-h-screen pb-20">
          {/* Shop Header */}
          <div className="bg-baba-primary text-white py-16 px-4">
            <div className="container mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Our Collection'}
              </h1>
              <p className="text-baba-accent max-w-2xl mx-auto text-lg">
                Discover our meticulously curated wholesale textiles.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 mt-8">
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Sidebar Filters */}
              <aside className="w-full md:w-64 shrink-0">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 sticky top-28">
                  <div className="flex items-center gap-2 mb-6 text-baba-primary font-serif text-xl border-b pb-4">
                    <Filter className="w-5 h-5" />
                    <h2>Filters</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-baba-textdark mb-3 uppercase text-sm tracking-wider">Categories</h3>
                      <div className="space-y-2">
                        {categories.map(cat => (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                              type="radio" 
                              name="category" 
                              checked={selectedCategory === cat}
                              onChange={() => setSelectedCategory(cat)}
                              className="w-4 h-4 text-baba-accent focus:ring-baba-accent border-gray-300 rounded-sm"
                            />
                            <span className={`text-sm transition-colors ${selectedCategory === cat ? 'text-baba-accent font-medium' : 'text-baba-textdark/70 group-hover:text-baba-primary'}`}>
                              {cat}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <main className="flex-grow">
                {/* Top Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-black/5 mb-6 flex flex-wrap justify-between items-center gap-4">
                  <p className="text-sm text-baba-textdark/60">
                    Showing <span className="font-semibold text-baba-primary">{filteredProducts.length}</span> products
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-baba-textdark/60">Sort by:</span>
                    <div className="relative">
                      <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-baba-softbg border border-transparent text-sm pl-4 pr-10 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-baba-accent focus:border-baba-accent cursor-pointer text-baba-primary font-medium"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-baba-primary/50 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-black/5">
                    <h3 className="text-xl font-serif text-baba-primary mb-2">No products found</h3>
                    <p className="text-baba-textdark/60">Try adjusting your search or filters.</p>
                    <button 
                      onClick={() => { setSelectedCategory('All'); window.history.replaceState({}, '', '/shop'); }}
                      className="mt-6 text-baba-accent hover:underline font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </main>

            </div>
          </div>
        </div>
      );
    }