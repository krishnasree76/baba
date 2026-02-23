import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';
    import { useShop } from '../context/ShopContext';
    import { motion, AnimatePresence } from 'framer-motion';

    const Navbar = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const { cart } = useShop();
      const navigate = useNavigate();

      const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

      const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
          navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
          setIsOpen(false);
        }
      };

      const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Admin', path: '/admin' }
      ];

      return (
        <header className="sticky top-0 z-50 w-full bg-baba-background/90 backdrop-blur-md border-b border-baba-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <div className="w-10 h-10 bg-baba-primary rounded-sm flex items-center justify-center text-baba-accent font-serif text-xl font-bold group-hover:bg-baba-accent group-hover:text-baba-primary transition-colors duration-300">
                  B
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl tracking-wider text-baba-primary uppercase leading-tight">Baba</span>
                  <span className="text-xs tracking-[0.2em] text-baba-primary/70 uppercase leading-tight">Textiles</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-medium text-baba-primary/80 hover:text-baba-accent transition-colors tracking-wide uppercase"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* Icons */}
              <div className="hidden md:flex items-center space-x-6">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-baba-primary/50 group-hover:text-baba-accent transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search product code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-baba-primary/20 rounded-full leading-5 bg-transparent placeholder-baba-primary/50 focus:outline-none focus:ring-1 focus:ring-baba-accent focus:border-baba-accent sm:text-sm transition-all focus:w-64 w-48"
                  />
                </form>

                <button className="text-baba-primary/80 hover:text-baba-accent flex items-center gap-2 text-sm font-medium transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden lg:block">Sign In</span>
                </button>

                <Link to="/cart" className="text-baba-primary/80 hover:text-baba-accent relative transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-baba-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex md:hidden items-center space-x-4">
                <Link to="/cart" className="text-baba-primary relative">
                  <ShoppingBag className="h-6 w-6" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-baba-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-baba-primary hover:text-baba-accent focus:outline-none"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-baba-background border-t border-baba-accent/20 overflow-hidden"
              >
                <div className="px-4 pt-2 pb-6 space-y-4">
                  <form onSubmit={handleSearch} className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-baba-primary/50" />
                    <input
                      type="text"
                      placeholder="Search items or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-baba-primary/20 rounded-md bg-white focus:outline-none focus:border-baba-accent"
                    />
                  </form>
                  <nav className="flex flex-col space-y-4 mt-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-base font-medium text-baba-primary hover:text-baba-accent uppercase tracking-wide"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <button className="flex items-center gap-2 text-base font-medium text-baba-primary hover:text-baba-accent uppercase tracking-wide">
                      <User className="h-5 w-5" /> Sign In / Register
                    </button>
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      );
    };

    export default Navbar;