import React, { createContext, useContext, useState, useEffect } from 'react';
    import { toast } from 'react-toastify';
    import silkNavy from '../assets/navysaree.png';
import silkRed from '../assets/red.png';

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
    };

    const mockProducts: Product[] = [
      {
        id: '1',
        code: 'BT-S001',
        name: 'Royal Heritage Silk Saree',
        price: 15500,
        category: 'Women',
        description: 'A masterpiece of traditional craftsmanship, this pure silk saree features intricate zari work perfect for weddings and grand occasions. Handwoven by master artisans, it exudes elegance and grace.',
        colors: [
          { name: 'Navy Blue', hex: '#0B1C2D', image: silkNavy, stock: 15 },
{ name: 'Bridal Red', hex: '#8B0000', image: silkRed, stock: 5 },
          { name: 'Gold', hex: '#C6A75E', image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&q=80&w=800', stock: 0 }
        ]
      },
      {
        id: '2',
        code: 'BT-M102',
        name: 'Premium Velvet Sherwani',
        price: 22000,
        category: 'Men',
        description: 'Exude royal charm with this tailored velvet sherwani. Features delicate embroidery along the collar and cuffs, paired with matching churidar. The ultimate choice for the modern groom.',
        colors: [
          { name: 'Midnight Black', hex: '#1C1C1C', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800', stock: 8 },
          { name: 'Royal Ivory', hex: '#F8F6F1', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', stock: 12 }
        ]
      },
      {
        id: '3',
        code: 'BT-K050',
        name: 'Festive Kurta Set for Kids',
        price: 3500,
        category: 'Kids',
        description: 'Comfortable yet festive, this soft cotton-silk blend kurta set is perfect for your little ones during celebrations. Easy to wear and beautifully detailed.',
        colors: [
          { name: 'Mustard Yellow', hex: '#E4A010', image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800', stock: 20 },
          { name: 'Emerald Green', hex: '#50C878', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=800', stock: 15 }
        ]
      },
      {
        id: '4',
        code: 'BT-A201',
        name: 'Handcrafted Pashmina Shawl',
        price: 8500,
        category: 'Accessories',
        description: 'Authentic handcrafted Pashmina shawl. Incredibly lightweight yet exceptionally warm, featuring subtle woven patterns that denote true luxury.',
        colors: [
          { name: 'Beige', hex: '#EFE8DC', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=800', stock: 30 },
          { name: 'Charcoal', hex: '#36454F', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800', stock: 25 }
        ]
      },
      {
        id: '5',
        code: 'BT-W010',
        name: 'Designer Georgette Lehenga',
        price: 28000,
        category: 'Women',
        description: 'A stunning contemporary lehenga crafted from flowing georgette with scattered sequin work. Comes with a stylized blouse and sheer dupatta.',
        colors: [
          { name: 'Rose Dust', hex: '#9E5B6E', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', stock: 4 },
          { name: 'Navy Blue', hex: '#0B1C2D', image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&q=80&w=800', stock: 0 }
        ]
      },
      {
        id: '6',
        code: 'BT-M205',
        name: 'Classic Linen Tailored Suit',
        price: 18000,
        category: 'Men',
        description: 'Breathable, sharp, and effortlessly stylish. This 2-piece linen suit is perfect for summer weddings or high-end corporate events.',
        colors: [
          { name: 'Sand', hex: '#C2B280', image: 'https://placehold.co/800x400', stock: 10 },
          { name: 'Navy', hex: '#0B1C2D', image: 'https://images.unsplash.com/photo-1555069519-127aadedf1ee?auto=format&fit=crop&q=80&w=800', stock: 15 }
        ]
      }
    ];

    const ShopContext = createContext<ShopContextType | undefined>(undefined);

    export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [products] = useState<Product[]>(mockProducts);
      const [cart, setCart] = useState<CartItem[]>([]);

      const addToCart = (product: Product, color: ProductColor, quantity: number) => {
        setCart((prev) => {
          const existingItemIndex = prev.findIndex(
            (item) => item.product.id === product.id && item.selectedColor.name === color.name
          );

          if (existingItemIndex >= 0) {
            const newCart = [...prev];
            const newQuantity = Math.min(newCart[existingItemIndex].quantity + quantity, color.stock);
            newCart[existingItemIndex].quantity = newQuantity;
            toast.success(`Updated quantity for ${product.name}`);
            return newCart;
          }

          toast.success(`Added ${product.name} to cart`);
          return [...prev, { id: Math.random().toString(36).substr(2, 9), product, selectedColor: color, quantity }];
        });
      };

      const removeFromCart = (cartItemId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== cartItemId));
        toast.info('Item removed from cart');
      };

      const updateCartQuantity = (cartItemId: string, quantity: number) => {
        setCart((prev) =>
          prev.map((item) => {
            if (item.id === cartItemId) {
              return { ...item, quantity: Math.min(quantity, item.selectedColor.stock) };
            }
            return item;
          })
        );
      };

      const clearCart = () => setCart([]);

      const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

      return (
        <ShopContext.Provider value={{ products, cart, addToCart, removeFromCart, updateCartQuantity, cartTotal, clearCart }}>
          {children}
        </ShopContext.Provider>
      );
    };

    export const useShop = () => {
      const context = useContext(ShopContext);
      if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
      }
      return context;
    };