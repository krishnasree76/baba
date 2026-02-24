import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Heart
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, wishlist } = useShop();

  const cartItemCount = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const categoryLinks = [
  { name: "Sarees", link: "/shop?category=sarees" },
  { name: "3 Piece Sets", link: "/shop?category=3%20piece%20sets" },
  { name: "Frocks", link: "/shop?category=frocks" },
  { name: "Dress Materials", link: "/shop?category=dress%20materials" },
];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">

      {/* 🔹 Top Bar */}
      <div className="bg-baba-primary text-white py-3 px-4">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm tracking-wide gap-2">

    {/* Left */}
    <div>
      Free Shipping All Over India
    </div>

    {/* Right */}
    <div className="flex items-center gap-6">

      {/* WhatsApp */}
      <a
        href="https://wa.me/918328030460"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-baba-accent transition-colors duration-300"
      >
        WhatsApp: 8328030460
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/srikakulam_wholesale_babatex?igsh=MW83cWp6cmZrcGlmcA=="
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-baba-accent transition-colors duration-300"
      >
        Instagram
      </a>

    </div>
  </div>
</div>

      {/* 🔹 Main Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          {/* LEFT LOGO */}
          <Link to="/" className="flex items-center">
  <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-wide text-baba-primary hover:text-baba-accent transition">
    Baba Textiles
  </h1>
</Link>

          {/* CENTER MENU (Desktop) */}
          <nav className="hidden md:flex items-center gap-10 uppercase text-sm font-medium tracking-wide text-baba-primary">

            <Link to="/" className="hover:text-baba-accent transition">
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-baba-accent transition">
                Categories <ChevronDown size={16} />
              </button>

              <div className="absolute left-0 mt-6 w-72 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 z-50">
                <div className="py-4">
                  {categoryLinks.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.link}
                      className="block px-6 py-3 text-sm text-baba-primary hover:bg-baba-softbg hover:text-baba-accent transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/shop" className="hover:text-baba-accent transition">
              Popular Collection
            </Link>

            <Link to="/shop" className="hover:text-baba-accent transition">
              Budget Friendly
            </Link>

            <Link to="/contact" className="hover:text-baba-accent transition">
              Contact Us
            </Link>

          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">

            <Search
              size={22}
              className="cursor-pointer text-baba-primary hover:text-baba-accent transition"
            />

            <Link
  to="/wishlist"
  className="relative text-baba-primary hover:text-baba-accent transition"
>
  <Heart
    size={22}
    className={`transition ${
      wishlist.length > 0
        ? "fill-red-500 text-red-500"
        : "text-baba-primary"
    }`}
  />

  {wishlist.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-baba-accent text-white text-[10px] px-1.5 py-0.5 rounded-full">
      {wishlist.length}
    </span>
  )}
</Link>

            <Link
              to="/cart"
              className="relative text-baba-primary hover:text-baba-accent transition"
            >
              <ShoppingBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-baba-accent text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden text-baba-primary"
            >
              <Menu size={26} />
            </button>

          </div>
        </div>
      </div>

      {/* 🔹 Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 p-6"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="mb-8 text-baba-primary"
              >
                <X size={24} />
              </button>

              <nav className="flex flex-col uppercase text-baba-primary font-medium">

  {/* Home */}
  <Link 
    to="/" 
    onClick={() => setIsOpen(false)}
    className="py-3 border-b"
  >
    Home
  </Link>

  {/* Categories */}
  <div className="py-3 border-b">
    <p className="mb-3">Categories</p>

    <div className="flex flex-col gap-3 pl-3 text-sm">
      {categoryLinks.map((cat) => (
        <Link
          key={cat.name}
          to={cat.link}
          onClick={() => setIsOpen(false)}
          className="hover:text-baba-accent transition"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  </div>

  {/* Popular Collection */}
  <Link 
    to="/shop" 
    onClick={() => setIsOpen(false)}
    className="py-3 border-b"
  >
    Popular Collection
  </Link>

  {/* Budget Friendly */}
  <Link 
    to="/shop" 
    onClick={() => setIsOpen(false)}
    className="py-3 border-b"
  >
    Budget Friendly
  </Link>

  {/* Contact */}
  <Link 
    to="/contact" 
    onClick={() => setIsOpen(false)}
    className="py-3"
  >
    Contact Us
  </Link>



                {/* <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>

                <Link to="/shop" onClick={() => setIsOpen(false)}>
                  Shop
                </Link>

                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link> */}

              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;