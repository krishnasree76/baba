// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { toast } from 'react-toastify';

// // export type ProductColor = {
// //   name: string;
// //   hex: string;
// //   image: string;
// //   stock: number;
// // };

// // export type Product = {
// //   id: string;
// //   code: string;
// //   name: string;
// //   price: number;
// //   category: string;
// //   size?: string;
// //   description: string;
// //   tag?: 'popular' | 'budget' | 'latest'; // 👈 ADD THIS
// //   colors: ProductColor[];
// // };

// // export type CartItem = {
// //   id: string;
// //   product: Product;
// //   selectedColor: ProductColor;
// //   quantity: number;
// // };

// // type ShopContextType = {
// //   products: Product[];
// //   cart: CartItem[];
// //   addToCart: (product: Product, color: ProductColor, quantity: number) => void;
// //   removeFromCart: (cartItemId: string) => void;
// //   updateCartQuantity: (cartItemId: string, quantity: number) => void;
// //   cartTotal: number;
// //   clearCart: () => void;

// //   // ✅ Wishlist
// //   wishlist: Product[];
// //   addToWishlist: (product: Product) => void;
// //   removeFromWishlist: (productId: string) => void;
// //   isInWishlist: (productId: string) => boolean;
// // };

// // const mockProducts: Product[] = [
// //   {
// //     id: '1',
// //     code: 'BT-S001',
// //     name: 'Elegant Silk Saree',
// //     price: 2499,
// //     category: 'sarees',
// //     size: 'M',
// //     description: 'Premium silk saree perfect for weddings and festive occasions.',
// //     colors: [
// //       { name: 'Navy Blue', hex: '#0B1C2D', image: 'https://i.pinimg.com/1200x/79/c3/18/79c318b77172d6052bc1bb59bbda66d0.jpg', stock: 10 },
// //       { name: 'Maroon', hex: '#800000', image: 'https://i.pinimg.com/1200x/1f/57/63/1f5763a5be9c46ddf46f0e156fb34426.jpg', stock: 8 }
// //     ]
// //   },
// //   {
// //     id: '2',
// //     code: 'BT-3P101',
// //     name: 'Floral 3 Piece Set',
// //     price: 1899,
// //     category: '3 piece sets',
// //     size: 'L',
// //     description: 'Beautiful 3 piece kurta set with dupatta.',
// //     colors: [
// //       { name: 'Mustard', hex: '#E4A010', image: 'https://i.pinimg.com/736x/6b/cf/79/6bcf7975f05482d54b07d9071354a888.jpg', stock: 12 }
// //     ]
// //   },
// //   {
// //     id: '3',
// //     code: 'BT-F201',
// //     name: 'Printed Frock',
// //     price: 999,
// //     category: 'frocks',
// //     size: 'S',
// //     description: 'Comfortable casual frock for daily wear.',
// //     colors: [
// //       { name: 'Peach', hex: '#FFCBA4', image: 'https://i.pinimg.com/1200x/3f/27/ef/3f27efe8cdb17118750695e92b27ebb7.jpg', stock: 15 }
// //     ]
// //   },
// //   {
// //     id: '4',
// //     code: 'BT-D301',
// //     name: 'Designer Dress Material',
// //     price: 1499,
// //     category: 'dress materials',
// //     size: 'XL',
// //     description: 'Premium cotton dress material with dupatta.',
// //     colors: [
// //       { name: 'Green', hex: '#50C878', image: 'https://i.pinimg.com/736x/c1/37/ea/c137eaff88eb32ec37170cb20e3c78af.jpg', stock: 20 }
// //     ]
// //   }
// // ];

// // const ShopContext = createContext<ShopContextType | undefined>(undefined);

// // export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

// //   const [products] = useState<Product[]>(mockProducts);
// //   const [cart, setCart] = useState<CartItem[]>([]);

// //   // ✅ Wishlist with localStorage
// //   const [wishlist, setWishlist] = useState<Product[]>(() => {
// //     const stored = localStorage.getItem("wishlist");
// //     return stored ? JSON.parse(stored) : [];
// //   });

// //   // Persist wishlist
// //   useEffect(() => {
// //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
// //   }, [wishlist]);

// //   // ================= CART =================

// //   const addToCart = (product: Product, color: ProductColor, quantity: number) => {
// //     setCart((prev) => {
// //       const existingIndex = prev.findIndex(
// //         (item) =>
// //           item.product.id === product.id &&
// //           item.selectedColor.name === color.name
// //       );

// //       if (existingIndex >= 0) {
// //         const updatedCart = [...prev];
// //         const newQuantity = Math.min(
// //           updatedCart[existingIndex].quantity + quantity,
// //           color.stock
// //         );
// //         updatedCart[existingIndex].quantity = newQuantity;
// //         toast.success(`Updated quantity for ${product.name}`);
// //         return updatedCart;
// //       }

// //       toast.success(`Added ${product.name} to cart`);
// //       return [
// //         ...prev,
// //         {
// //           id: Math.random().toString(36).substring(2, 9),
// //           product,
// //           selectedColor: color,
// //           quantity
// //         }
// //       ];
// //     });
// //   };

// //   const removeFromCart = (cartItemId: string) => {
// //     setCart((prev) => prev.filter((item) => item.id !== cartItemId));
// //     toast.info('Item removed from cart');
// //   };

// //   const updateCartQuantity = (cartItemId: string, quantity: number) => {
// //     setCart((prev) =>
// //       prev.map((item) =>
// //         item.id === cartItemId
// //           ? {
// //               ...item,
// //               quantity: Math.min(quantity, item.selectedColor.stock)
// //             }
// //           : item
// //       )
// //     );
// //   };

// //   const clearCart = () => setCart([]);

// //   const cartTotal = cart.reduce(
// //     (total, item) => total + item.product.price * item.quantity,
// //     0
// //   );

// //   // ================= WISHLIST =================

// //   const addToWishlist = (product: Product) => {
// //     setWishlist((prev) => {
// //       if (prev.find((item) => item.id === product.id)) return prev;
// //       toast.success(`${product.name} added to wishlist`);
// //       return [...prev, product];
// //     });
// //   };

// //   const removeFromWishlist = (productId: string) => {
// //     setWishlist((prev) => {
// //       toast.info("Removed from wishlist");
// //       return prev.filter((item) => item.id !== productId);
// //     });
// //   };

// //   const isInWishlist = (productId: string) => {
// //     return wishlist.some((item) => item.id === productId);
// //   };

// //   return (
// //     <ShopContext.Provider
// //       value={{
// //         products,
// //         cart,
// //         addToCart,
// //         removeFromCart,
// //         updateCartQuantity,
// //         cartTotal,
// //         clearCart,

// //         wishlist,
// //         addToWishlist,
// //         removeFromWishlist,
// //         isInWishlist
// //       }}
// //     >
// //       {children}
// //     </ShopContext.Provider>
// //   );
// // };

// // export const useShop = () => {
// //   const context = useContext(ShopContext);
// //   if (!context) {
// //     throw new Error('useShop must be used within a ShopProvider');
// //   }
// //   return context;
// // };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const API_BASE = "http://127.0.0.1:8000/api/products";

// export type ProductColor = {
//   name: string;
//   hex: string;
//   image: string;
//   stock: number;
// };

// export type Product = {
//   id: string;
//   code: string;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
//   colors: ProductColor[];
// };

// export type CartItem = {
//   id: string;
//   product: Product;
//   selectedColor: ProductColor;
//   quantity: number;
// };

// type ShopContextType = {
//   latestProducts: Product[];
//   popularProducts: Product[];
//   cart: CartItem[];
//   addToCart: (product: Product, color: ProductColor, quantity: number) => void;
//   removeFromCart: (cartItemId: string) => void;
//   updateCartQuantity: (cartItemId: string, quantity: number) => void;
//   cartTotal: number;
//   clearCart: () => void;
//   wishlist: Product[];
//   addToWishlist: (product: Product) => void;
//   removeFromWishlist: (productId: string) => void;
//   isInWishlist: (productId: string) => boolean;
// };

// const ShopContext = createContext<ShopContextType | undefined>(undefined);

// export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

//   const [latestProducts, setLatestProducts] = useState<Product[]>([]);
//   const [popularProducts, setPopularProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const [wishlist, setWishlist] = useState<Product[]>(() => {
//     const stored = localStorage.getItem("wishlist");
//     return stored ? JSON.parse(stored) : [];
//   });

//   const mapProducts = (data: any[]) =>
//     data.map((item: any) => ({
//       id: String(item.id),
//       code: item.code,
//       name: item.name,
//       price: Number(item.price),
//       category: item.category_name,
//       description: item.description,
//       colors: item.colors.map((color: any) => ({
//         name: color.name,
//         hex: color.hex_code,
//         image: color.images?.[0]?.image || "",
//         stock: 50
//       }))
//     }));

//   useEffect(() => {
//     // Fetch Latest
//     fetch(`${API_BASE}/tag/latest/`)
//       .then(res => res.json())
//       .then(data => setLatestProducts(mapProducts(data)))
//       .catch(err => console.error("Latest fetch error:", err));

//     // Fetch Popular
//     fetch(`${API_BASE}/tag/popular/`)
//       .then(res => res.json())
//       .then(data => setPopularProducts(mapProducts(data)))
//       .catch(err => console.error("Popular fetch error:", err));
//   }, []);

//   // ================= CART =================

//   const addToCart = (product: Product, color: ProductColor, quantity: number) => {
//     setCart(prev => {
//       const existing = prev.find(
//         item =>
//           item.product.id === product.id &&
//           item.selectedColor.name === color.name
//       );

//       if (existing) {
//         toast.success("Updated quantity");
//         return prev.map(item =>
//           item.id === existing.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       toast.success("Added to cart");
//       return [
//         ...prev,
//         {
//           id: Math.random().toString(36).substring(2, 9),
//           product,
//           selectedColor: color,
//           quantity
//         }
//       ];
//     });
//   };

//   const removeFromCart = (cartItemId: string) => {
//     setCart(prev => prev.filter(item => item.id !== cartItemId));
//   };

//   const updateCartQuantity = (cartItemId: string, quantity: number) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.id === cartItemId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => setCart([]);

//   const cartTotal = cart.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   // ================= WISHLIST =================

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product: Product) => {
//     if (!wishlist.find(p => p.id === product.id)) {
//       toast.success("Added to wishlist");
//       setWishlist([...wishlist, product]);
//     }
//   };

//   const removeFromWishlist = (productId: string) => {
//     setWishlist(wishlist.filter(item => item.id !== productId));
//   };

//   const isInWishlist = (productId: string) =>
//     wishlist.some(item => item.id === productId);

//   return (
//     <ShopContext.Provider
//       value={{
//         latestProducts,
//         popularProducts,
//         cart,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         cartTotal,
//         clearCart,
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export const useShop = () => {
//   const context = useContext(ShopContext);
//   if (!context) {
//     throw new Error("useShop must be used within a ShopProvider");
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const API_BASE = "http://127.0.0.1:8000/api/products";

// export type ProductColorImage = {
//   id: number;
//   image: string;
// };

// export type ProductColor = {
//   id: number;
//   name: string;
//   hex: string;
//   images: ProductColorImage[];  // ✅ FIXED
// };
// export type ProductVariant = {
//   id: number;
//   size: string;
//   stock: number;
//   color: number; // ✅ color ID from backend
// };

// export type Product = {
//   id: string;
//   code: string;
//   name: string;
//   price: number;
//   category: string;
//   description: string;
//   tags?: string[];
//   sizes?: string[];   // ✅ ADD THIS
//   colors: ProductColor[];
//   variants?: ProductVariant[];
// };
// // export type ProductColorImage = {
// //   id: number;
// //   image: string;
// // };



// export type CartItem = {
//   id: string;
//   product: Product;
//   selectedColor: ProductColor;
//   quantity: number;
// };

// type ShopContextType = {
//   products: Product[];              // ✅ All combined products
//   latestProducts: Product[];
//   popularProducts: Product[];
//   budgetProducts: Product[];
//   cart: CartItem[];
//   addToCart: (product: Product, color: ProductColor, quantity: number) => void;
//   removeFromCart: (cartItemId: string) => void;
//   updateCartQuantity: (cartItemId: string, quantity: number) => void;
//   cartTotal: number;
//   clearCart: () => void;
//   wishlist: Product[];
//   addToWishlist: (product: Product) => void;
//   removeFromWishlist: (productId: string) => void;
//   isInWishlist: (productId: string) => boolean;
// };

// const ShopContext = createContext<ShopContextType | undefined>(undefined);

// export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

//   const [latestProducts, setLatestProducts] = useState<Product[]>([]);
//   const [popularProducts, setPopularProducts] = useState<Product[]>([]);
//   const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const [wishlist, setWishlist] = useState<Product[]>(() => {
//     const stored = localStorage.getItem("wishlist");
//     return stored ? JSON.parse(stored) : [];
//   });

//   // ✅ Map backend response
//   const mapProducts = (data: any[], tag: string): Product[] =>
//   data.map((item: any) => ({
//     id: String(item.id),
//     code: item.code,
//     name: item.name,
//     price: Number(item.price),
//     category: item.category_name,
//     description: item.description,
//     tag: tag,

//     variants: item.variants || [],   // ✅ important

//     colors: item.colors.map((color: any) => ({
//       id: color.id,
//       name: color.name,
//       hex: color.hex_code,
//       images: color.images || []   // ✅ now correct
//     }))
//   }));

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const [latestRes, popularRes, budgetRes] = await Promise.all([
//           fetch(`${API_BASE}/tag/latest/`),
//           fetch(`${API_BASE}/tag/popular/`),
//           fetch(`${API_BASE}/tag/budget/`)
//         ]);

//         const latestData = await latestRes.json();
//         const popularData = await popularRes.json();
//         const budgetData = await budgetRes.json();

//         const latestMapped = mapProducts(latestData, "latest");
//         const popularMapped = mapProducts(popularData, "popular");
//         const budgetMapped = mapProducts(budgetData, "budget");

//         setLatestProducts(latestMapped);
//         setPopularProducts(popularMapped);
//         setBudgetProducts(budgetMapped);

//         // ✅ Combine all unique products
//         // ✅ Combine and merge tags correctly
// const combinedMap = new Map<string, Product>();

// [...latestMapped, ...popularMapped, ...budgetMapped].forEach(product => {
//   if (combinedMap.has(product.id)) {
//     const existing = combinedMap.get(product.id)!;

//     existing.tags = Array.from(
//       new Set([...(existing.tags || []), ...(product.tags || [])])
//     );
//   } else {
//     combinedMap.set(product.id, product);
//   }
// });

// setProducts(Array.from(combinedMap.values()));

//       } catch (error) {
//         console.error("Product fetch error:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // ================= CART =================

//   const addToCart = (product: Product, color: ProductColor, quantity: number) => {
//     setCart(prev => {
//       const existing = prev.find(
//         item =>
//           item.product.id === product.id &&
//           item.selectedColor.name === color.name
//       );

//       if (existing) {
//         toast.success("Updated quantity");
//         return prev.map(item =>
//           item.id === existing.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       toast.success("Added to cart");
//       return [
//         ...prev,
//         {
//           id: Math.random().toString(36).substring(2, 9),
//           product,
//           selectedColor: color,
//           quantity
//         }
//       ];
//     });
//   };

//   const removeFromCart = (cartItemId: string) => {
//     setCart(prev => prev.filter(item => item.id !== cartItemId));
//   };

//   const updateCartQuantity = (cartItemId: string, quantity: number) => {
//     setCart(prev =>
//       prev.map(item =>
//         item.id === cartItemId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => setCart([]);

//   const cartTotal = cart.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   // ================= WISHLIST =================

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product: Product) => {
//     if (!wishlist.find(p => p.id === product.id)) {
//       toast.success("Added to wishlist");
//       setWishlist([...wishlist, product]);
//     }
//   };

//   const removeFromWishlist = (productId: string) => {
//     setWishlist(wishlist.filter(item => item.id !== productId));
//   };

//   const isInWishlist = (productId: string) =>
//     wishlist.some(item => item.id === productId);

//   return (
//     <ShopContext.Provider
//       value={{
//         products,
//         latestProducts,
//         popularProducts,
//         budgetProducts,
//         cart,
//         addToCart,
//         removeFromCart,
//         updateCartQuantity,
//         cartTotal,
//         clearCart,
//         wishlist,
//         addToWishlist,
//         removeFromWishlist,
//         isInWishlist
//       }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export const useShop = () => {
//   const context = useContext(ShopContext);
//   if (!context) {
//     throw new Error("useShop must be used within a ShopProvider");
//   }
//   return context;
// };

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { toast } from "react-toastify";

// const API_BASE = "http://127.0.0.1:8000/api/products";

// /* ================= TYPES ================= */

// export type ProductColorImage = {
//   id: number;
//   image: string;
// };

// export type ProductColor = {
//   id: number;
//   name: string;
//   color: string;
//   images: ProductColorImage[];
// };

// export type ProductVariant = {
//   id: number;
//   size: string;
//   stock: number;
//   color: string; // ✅ backend now sends color.name
// };

// export type Product = {
//   id: string;
//   code: string;
//   name: string;

//   price: number;
//   original_price: number;
//   discount_percentage: number;

//   has_sizes: boolean;   // ✅ ADD THIS

//   category: string;
//   description: string;
//   tags: string[];

//   colors: ProductColor[];
//   variants: ProductVariant[];
// };

// export type CartItem = {
//   id: string;
//   product: Product;
//   selectedColor: ProductColor;
//   selectedSize: string;   // ✅ REQUIRED
//   quantity: number;
// };
// export type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// type ShopContextType = {
//   products: Product[];
//   latestProducts: Product[];
//   popularProducts: Product[];
//   budgetProducts: Product[];
//   cart: CartItem[];
//   user: User | null;
// logout: () => void;

//   addToCart: (
//     product: Product,
//     color: ProductColor,
//     size: string,      // ✅ REQUIRED
//     quantity: number
//   ) => void;

//   removeFromCart: (cartItemId: string) => void;
//   updateCartQuantity: (cartItemId: string, quantity: number) => void;
//   cartTotal: number;
//   clearCart: () => void;

//   wishlist: Product[];
//   addToWishlist: (product: Product) => void;
//   removeFromWishlist: (productId: string) => void;
//   isInWishlist: (productId: string) => boolean;
// };
// // type ShopContextType = {
// //   products: Product[];
// //   latestProducts: Product[];
// //   popularProducts: Product[];
// //   budgetProducts: Product[];
// //   cart: CartItem[];
// //   addToCart: (product: Product, color: ProductColor, quantity: number) => void;
// //   removeFromCart: (cartItemId: string) => void;
// //   updateCartQuantity: (cartItemId: string, quantity: number) => void;
// //   cartTotal: number;
// //   clearCart: () => void;
// //   wishlist: Product[];
// //   addToWishlist: (product: Product) => void;
// //   removeFromWishlist: (productId: string) => void;
// //   isInWishlist: (productId: string) => boolean;
// // };

// const ShopContext = createContext<ShopContextType | undefined>(undefined);

// /* ================= PROVIDER ================= */

// export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [latestProducts, setLatestProducts] = useState<Product[]>([]);
//   const [popularProducts, setPopularProducts] = useState<Product[]>([]);
//   const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [user, setUser] = useState<User | null>(null);
//   const logout = () => {
//   localStorage.removeItem("token");
//   setUser(null);
// };

//   const [wishlist, setWishlist] = useState<Product[]>(() => {
//     const stored = localStorage.getItem("wishlist");
//     return stored ? JSON.parse(stored) : [];
//   });

//   /* ================= MAP BACKEND DATA ================= */

//   const mapProducts = (data: any[]): Product[] =>
//     data.map((item: any) => ({
//       id: String(item.id),
//       code: item.code,
//       name: item.name,
//       price: Number(item.price),
// original_price: Number(item.original_price),
// discount_percentage: Number(item.discount_percentage),
// has_sizes: item.has_sizes,

// category: item.category_name,
// description: item.description,
// tags: item.tag_names || [],

//       colors: item.colors.map((color: any) => ({
//   id: color.id,
//   name: color.name,
//   color: color.color,
//   images: color.images || []
// })),

//       variants: item.variants || []
//     }));

//   /* ================= FETCH PRODUCTS ================= */

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const [latestRes, popularRes, budgetRes] = await Promise.all([
//           fetch(`${API_BASE}/tag/latest/`),
//           fetch(`${API_BASE}/tag/popular/`),
//           fetch(`${API_BASE}/tag/budget/`)
//         ]);

//         const latestMapped = mapProducts(await latestRes.json());
//         const popularMapped = mapProducts(await popularRes.json());
//         const budgetMapped = mapProducts(await budgetRes.json());

//         setLatestProducts(latestMapped);
//         setPopularProducts(popularMapped);
//         setBudgetProducts(budgetMapped);

//         /* ===== Merge Products Without Losing Tags ===== */

//         const combinedMap = new Map<string, Product>();

//         [...latestMapped, ...popularMapped, ...budgetMapped].forEach(product => {
//           if (combinedMap.has(product.id)) {
//             const existing = combinedMap.get(product.id)!;

//             existing.tags = Array.from(
//               new Set([...existing.tags, ...product.tags])
//             );
//           } else {
//             combinedMap.set(product.id, product);
//           }
//         });

//         setProducts(Array.from(combinedMap.values()));

//       } catch (error) {
//         console.error("Product fetch error:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//   const fetchUser = async () => {

//     const token = localStorage.getItem("token");

//     if (!token) return;

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/auth/me/", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       if (!res.ok) {
//         localStorage.removeItem("token");
//         return;
//       }

//       const data = await res.json();
//       setUser(data);

//     } catch (err) {
//       console.error("User fetch error:", err);
//     }
//   };

//   fetchUser();
// }, []);

//   /* ================= CART ================= */

//   const addToCart = (
//   product: Product,
//   color: ProductColor,
//   size: string,
//   quantity: number
// ) => {
//   setCart(prev => {
//     const existing = prev.find(
//       item =>
//         item.product.id === product.id &&
//         item.selectedColor.id === color.id &&
//         item.selectedSize === size
//     );

//     if (existing) {
//       return prev.map(item =>
//         item.id === existing.id
//           ? { ...item, quantity: item.quantity + quantity }
//           : item
//       );
//     }

//     return [
//       ...prev,
//       {
//         id: Math.random().toString(36).substring(2, 9),
//         product,
//         selectedColor: color,
//         selectedSize: size,
//         quantity
//       }
//     ];
//   });
// };

//   const removeFromCart = (cartItemId: string) =>
//     setCart(prev => prev.filter(item => item.id !== cartItemId));

//   const updateCartQuantity = (cartItemId: string, quantity: number) =>
//     setCart(prev =>
//       prev.map(item =>
//         item.id === cartItemId ? { ...item, quantity } : item
//       )
//     );

//   const clearCart = () => setCart([]);

//   const cartTotal = cart.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0
//   );

//   /* ================= WISHLIST ================= */

//   useEffect(() => {
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   }, [wishlist]);

//   const addToWishlist = (product: Product) => {
//     if (!wishlist.find(p => p.id === product.id)) {
//       toast.success("Added to wishlist");
//       setWishlist([...wishlist, product]);
//     }
//   };

//   const removeFromWishlist = (productId: string) =>
//     setWishlist(wishlist.filter(item => item.id !== productId));

//   const isInWishlist = (productId: string) =>
//     wishlist.some(item => item.id === productId);

//   return (
//     <ShopContext.Provider
//       value={{
//   products,
//   latestProducts,
//   popularProducts,
//   budgetProducts,

//   user,
//   logout,

//   cart,
//   addToCart,
//   removeFromCart,
//   updateCartQuantity,
//   cartTotal,
//   clearCart,

//   wishlist,
//   addToWishlist,
//   removeFromWishlist,
//   isInWishlist
// }}
//     >
//       {children}
//     </ShopContext.Provider>
//   );
// };

// export const useShop = () => {
//   const context = useContext(ShopContext);
//   if (!context) {
//     throw new Error("useShop must be used within a ShopProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const API_BASE = "http://127.0.0.1:8000/api/products";
const AUTH_BASE = "http://127.0.0.1:8000/api/auth";

/* ================= TYPES ================= */

export type ProductColorImage = {
  id: number;
  image: string;
};

export type ProductColor = {
  id: number;
  name: string;
  color: string;
  images: ProductColorImage[];
};

export type ProductVariant = {
  id: number;
  size: string;
  stock: number;
  color: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  price: number;
  original_price: number;
  discount_percentage: number;
  shipping_charge: number; // ✅ Add this line
  has_sizes: boolean;
  category: string;
  description: string;
  tags: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
};

export type CartItem = {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

type ShopContextType = {
  products: Product[];
  latestProducts: Product[];
  popularProducts: Product[];
  budgetProducts: Product[];

  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Add this line
  logout: () => void;

  cart: CartItem[];
  addToCart: (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  cartTotal: number;
  shippingTotal: number; // ✅ Add this
  orderTotal: number;    // ✅ Add this
  clearCart: () => void;

  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [budgetProducts, setBudgetProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  /* ================= MAP PRODUCTS ================= */

  const mapProducts = (data: any[]): Product[] =>
  data.map((item: any) => ({
    id: String(item.id),
    code: item.code,
    name: item.name,
    price: Number(item.price),
    original_price: Number(item.original_price),
    discount_percentage: Number(item.discount_percentage),
    shipping_charge: Number(item.shipping_charge) || 0, // ✅ Add this line
    has_sizes: item.has_sizes,
    category: item.category_name,
    description: item.description,
    tags: item.tag_names || [],
    colors: item.colors.map((color: any) => ({
      id: color.id,
      name: color.name,
      color: color.color,
      images: color.images || [],
    })),
    // variants: item.variants || [],
    variants: Array.isArray(item.variants) ? item.variants : [],
  }));

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [latestRes, popularRes, budgetRes] = await Promise.all([
          fetch(`${API_BASE}/tag/latest/`),
          fetch(`${API_BASE}/tag/popular/`),
          fetch(`${API_BASE}/tag/budget/`),
        ]);

        const latestMapped = mapProducts(await latestRes.json());
        const popularMapped = mapProducts(await popularRes.json());
        const budgetMapped = mapProducts(await budgetRes.json());

        setLatestProducts(latestMapped);
        setPopularProducts(popularMapped);
        setBudgetProducts(budgetMapped);

        const combinedMap = new Map<string, Product>();

        [...latestMapped, ...popularMapped, ...budgetMapped].forEach(
          (product) => {
            if (combinedMap.has(product.id)) {
              const existing = combinedMap.get(product.id)!;

              existing.tags = Array.from(
                new Set([...existing.tags, ...product.tags])
              );
            } else {
              combinedMap.set(product.id, product);
            }
          }
        );

        setProducts(Array.from(combinedMap.values()));
      } catch (error) {
        console.error("Product fetch error:", error);
      }
    };

    fetchProducts();
  }, []);

  /* ================= FETCH USER ================= */

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await fetch(`${AUTH_BASE}/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  /* ================= CART ================= */

  const addToCart = (
    product: Product,
    color: ProductColor,
    size: string,
    quantity: number
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.id === color.id &&
          item.selectedSize === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          // id: Math.random().toString(36).substring(2, 9),
          id: crypto.randomUUID(),
          product,
          // selectedColor: color,
          // selectedSize: size,
          selectedColor: color || null,
selectedSize: size || "",
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) =>
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));

  const updateCartQuantity = (cartItemId: string, quantity: number) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce(
  (total, item) => total + item.product.price * item.quantity,
  0
);

// ✅ Add this calculation for cumulative shipping
// const shippingTotal = cart.reduce(
//   (total, item) => total + (item.product.shipping_charge * item.quantity),
//   0
// );
const shippingTotal = cart.reduce(
  (total, item) =>
    total + (Number(item.product.shipping_charge || 0) * item.quantity),
  0
);

// ✅ Add this for the Grand Total
// const orderTotal = cartTotal + shippingTotal;
const orderTotal = Number(cartTotal) + Number(shippingTotal);

  /* ================= WISHLIST ================= */

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      toast.success("Added to wishlist");
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (productId: string) =>
    setWishlist(wishlist.filter((item) => item.id !== productId));

  const isInWishlist = (productId: string) =>
    wishlist.some((item) => item.id === productId);

  return (
    <ShopContext.Provider
      value={{
        products,
        latestProducts,
        popularProducts,
        budgetProducts,

        user,
        setUser,
        logout,
        shippingTotal, // ✅ Add this
      orderTotal,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartTotal,
        clearCart,

        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
};