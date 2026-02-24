import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export type ProductColor = {
  name: string;
  hex: string;
  image: string;
  stock: number;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  size?: string;
  description: string;
  colors: ProductColor[];
};

export type CartItem = {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
};

type ShopContextType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  cartTotal: number;
  clearCart: () => void;

  // ✅ Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const mockProducts: Product[] = [
  {
    id: '1',
    code: 'BT-S001',
    name: 'Elegant Silk Saree',
    price: 2499,
    category: 'sarees',
    size: 'M',
    description: 'Premium silk saree perfect for weddings and festive occasions.',
    colors: [
      { name: 'Navy Blue', hex: '#0B1C2D', image: 'https://i.pinimg.com/1200x/79/c3/18/79c318b77172d6052bc1bb59bbda66d0.jpg', stock: 10 },
      { name: 'Maroon', hex: '#800000', image: 'https://i.pinimg.com/1200x/1f/57/63/1f5763a5be9c46ddf46f0e156fb34426.jpg', stock: 8 }
    ]
  },
  {
    id: '2',
    code: 'BT-3P101',
    name: 'Floral 3 Piece Set',
    price: 1899,
    category: '3 piece sets',
    size: 'L',
    description: 'Beautiful 3 piece kurta set with dupatta.',
    colors: [
      { name: 'Mustard', hex: '#E4A010', image: 'https://i.pinimg.com/736x/6b/cf/79/6bcf7975f05482d54b07d9071354a888.jpg', stock: 12 }
    ]
  },
  {
    id: '3',
    code: 'BT-F201',
    name: 'Printed Frock',
    price: 999,
    category: 'frocks',
    size: 'S',
    description: 'Comfortable casual frock for daily wear.',
    colors: [
      { name: 'Peach', hex: '#FFCBA4', image: 'https://i.pinimg.com/1200x/3f/27/ef/3f27efe8cdb17118750695e92b27ebb7.jpg', stock: 15 }
    ]
  },
  {
    id: '4',
    code: 'BT-D301',
    name: 'Designer Dress Material',
    price: 1499,
    category: 'dress materials',
    size: 'XL',
    description: 'Premium cotton dress material with dupatta.',
    colors: [
      { name: 'Green', hex: '#50C878', image: 'https://i.pinimg.com/736x/c1/37/ea/c137eaff88eb32ec37170cb20e3c78af.jpg', stock: 20 }
    ]
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [products] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Wishlist with localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ================= CART =================

  const addToCart = (product: Product, color: ProductColor, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === color.name
      );

      if (existingIndex >= 0) {
        const updatedCart = [...prev];
        const newQuantity = Math.min(
          updatedCart[existingIndex].quantity + quantity,
          color.stock
        );
        updatedCart[existingIndex].quantity = newQuantity;
        toast.success(`Updated quantity for ${product.name}`);
        return updatedCart;
      }

      toast.success(`Added ${product.name} to cart`);
      return [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          product,
          selectedColor: color,
          quantity
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    toast.info('Item removed from cart');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: Math.min(quantity, item.selectedColor.stock)
            }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // ================= WISHLIST =================

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      toast.success(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      toast.info("Removed from wishlist");
      return prev.filter((item) => item.id !== productId);
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartTotal,
        clearCart,

        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};