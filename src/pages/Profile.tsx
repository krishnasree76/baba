// import React, { useEffect, useState } from "react";
// import { useShop } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { Package, MapPin, LogOut, ChevronRight, Clock } from "lucide-react";

// interface OrderItem {
//   variant_name: string;
//   quantity: number;
// }

// interface Order {
//   id: number;
//   order_number: string;
//   created_at: string;
//   items: OrderItem[];
// }

// export default function Profile() {
//   const { user, logout } = useShop();
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/auth/orders/", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setOrders(data);
//       } catch (err) {
//         console.error("Failed to fetch orders", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) fetchOrders();
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center bg-baba-softbg px-4">
//         <p className="text-gray-600 mb-4 font-serif text-xl">Please sign in to view your profile</p>
//         <button
//           onClick={() => navigate("/auth")}
//           className="bg-baba-primary text-white px-8 py-3 rounded-sm hover:bg-baba-accent transition shadow-md"
//         >
//           Login / Register
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-baba-softbg min-h-screen py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-serif font-bold text-baba-primary mb-8 border-b border-gray-200 pb-4">
//           My Account
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Sidebar: User Info */}
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="w-12 h-12 bg-baba-accent/10 rounded-full flex items-center justify-center text-baba-accent font-bold text-xl">
//                   {user.name[0]}
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg text-baba-primary">{user.name}</h2>
//                   {/* <p className="text-xs text-gray-500 uppercase tracking-wider">Wholesale Member</p> */}
//                 </div>
//               </div>
              
//               <div className="space-y-4 text-sm">
//                 <div className="flex justify-between border-b border-gray-50 pb-2">
//                   <span className="text-gray-500">Email</span>
//                   <span className="text-baba-primary font-medium">{user.email}</span>
//                 </div>
//               </div>

//               <div className="mt-8 space-y-3">
//                 <button
//                   onClick={() => navigate("/addresses")}
//                   className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition border border-transparent hover:border-gray-200 group"
//                 >
//                   <div className="flex items-center gap-3 text-gray-700 font-medium">
//                     <MapPin size={18} className="text-baba-accent" /> Addresses
//                   </div>
//                   <ChevronRight size={16} className="text-gray-400 group-hover:text-baba-accent" />
//                 </button>

//                 <button
//                   onClick={() => { logout(); navigate("/"); }}
//                   className="w-full flex items-center gap-3 p-3 text-red-500 font-medium hover:bg-red-50 rounded-lg transition"
//                 >
//                   <LogOut size={18} /> Logout
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main Content: Order History */}
//           <div className="md:col-span-2">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
//               <div className="flex items-center gap-2 mb-6 text-baba-primary font-serif text-xl font-semibold">
//                 <Package className="text-baba-accent" /> Recent Orders
//               </div>

//               {loading ? (
//                 <div className="flex justify-center items-center py-20 text-gray-400">Loading orders...</div>
//               ) : orders.length === 0 ? (
//                 <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-xl">
//                   <Package size={48} className="mx-auto text-gray-200 mb-4" />
//                   <p className="text-gray-500">No orders placed yet.</p>
//                   <button onClick={() => navigate("/shop")} className="text-baba-accent text-sm font-semibold mt-2 hover:underline">
//                     Start Shopping
//                   </button>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {orders.map((order) => (
//                     <div key={order.id} className="border border-gray-100 rounded-lg p-4 hover:border-baba-accent/30 transition">
//                       <div className="flex justify-between items-start mb-3">
//                         <div>
//                           <p className="text-sm font-bold text-baba-primary font-mono">
//                             #{order.order_number}
//                           </p>
//                           <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
//                             <Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}
//                           </div>
//                         </div>
//                         <span className="bg-green-50 text-green-700 text-[10px] uppercase font-bold px-2 py-1 rounded">
//                           Confirmed
//                         </span>
//                       </div>
                      
//                       <div className="border-t border-gray-50 pt-3">
//                         {order.items.map((item, idx) => (
//                           <div key={idx} className="text-sm text-gray-600 flex justify-between">
//                             <span>{item.variant_name}</span>
//                             <span className="font-medium text-gray-400">×{item.quantity}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useShop } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { 
//   Package, MapPin, LogOut, ChevronRight, 
//   Clock, Tag
// } from "lucide-react";
// import { motion } from "framer-motion";

// /* ✅ Types defined so TS knows what to expect */
// interface OrderItem {
//   variant_name: string;
//   quantity: number;
// }

// interface Order {
//   id: number;
//   order_number: string;
//   created_at: string;
//   items: OrderItem[];
//   status: string; // ✅ ADD THIS
// }

// export default function Profile() {
//   const { user, logout } = useShop();
//   const navigate = useNavigate();
  
//   /* ✅ FIXED: Added <Order[]> type to useState */
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchOrders = async () => {
//     const token = localStorage.getItem("token");

//     console.log("TOKEN:", token); // ✅ DEBUG

//     if (!token) {
//       console.error("No token found");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/auth/orders/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // 🚨 HANDLE 401
//       if (res.status === 401) {
//         console.error("Unauthorized - login again");
//         logout();
//         navigate("/login");
//         return;
//       }

//       if (!res.ok) {
//         console.error("Failed response:", res.status);
//         return;
//       }

//       const data = await res.json();
//       console.log("ORDERS:", data); // ✅ DEBUG

//       setOrders(data);

//     } catch (err) {
//       console.error("Failed to fetch orders", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (user) fetchOrders();
// }, [user]);

//   return (
//     <div className="bg-white min-h-screen">
//       {/* 🔹 Hero Header */}
//       <div className="bg-baba-softbg py-20 border-b border-gray-100">
//         <div className="max-w-4xl mx-auto px-6">
//           <div className="flex items-center gap-6">
//             <div className="w-20 h-20 bg-baba-primary text-white rounded-full flex items-center justify-center text-3xl font-serif shadow-inner">
//               {user.name ? user.name[0] : "U"}
//             </div>
//             <div>
//               <h1 className="text-4xl font-serif font-bold text-baba-primary">{user.name}</h1>
//               <p className="text-gray-500 tracking-widest uppercase text-xs mt-1">{user.email}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-6 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
//           {/* 🔹 Navigation Menu (Left) */}
//           <div className="lg:col-span-4">
//             <nav className="space-y-1">
//               <button 
//                 onClick={() => navigate("/addresses")}
//                 className="w-full flex items-center justify-between py-4 text-gray-600 hover:text-baba-accent transition-colors border-b border-gray-50 group text-left"
//               >
//                 <span className="flex items-center gap-3 font-medium"><MapPin size={18} /> Manage Addresses</span>
//                 <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
//               </button>
              
//               <button 
//                 onClick={() => { logout(); navigate("/"); }}
//                 className="w-full flex items-center gap-3 py-4 text-red-400 hover:text-red-600 font-medium transition-colors"
//               >
//                 <LogOut size={18} /> Sign Out
//               </button>
//             </nav>
//           </div>

//           {/* 🔹 Orders List (Right) */}
//           <div className="lg:col-span-8">
//             <div className="flex items-center gap-2 mb-8">
//               <Package size={20} className="text-baba-accent" />
//               <h2 className="text-2xl font-serif font-bold text-baba-primary">Order History</h2>
//             </div>

//             {loading ? (
//               <div className="flex items-center gap-3 text-gray-400 italic">
//                  <div className="w-4 h-4 border-2 border-baba-accent border-t-transparent rounded-full animate-spin" />
//                  Refreshing your history...
//               </div>
//             ) : orders.length === 0 ? (
//               <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed">
//                 <p className="text-gray-400">No orders found yet.</p>
//                 <button onClick={() => navigate('/shop')} className="text-baba-accent text-sm mt-2 hover:underline">Start Shopping</button>
//               </div>
//             ) : (
//               <div className="divide-y divide-gray-100">
//                 {orders.map((order) => (
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }} 
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     key={order.id} 
//                     className="py-8 first:pt-0 group"
//                   >
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//   <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${
//   order.status === "delivered" ? "text-green-600" :
//   order.status === "shipped" ? "text-blue-600" :
//   order.status === "cancelled" ? "text-red-600" :
//   order.status === "confirmed" ? "text-purple-600" :
//   "text-yellow-600"
// }`}>
//   {(order.status || "processed").charAt(0).toUpperCase() + 
//    (order.status || "processed").slice(1)}
// </span>
//                         <h3 className="text-lg font-mono font-bold text-baba-primary">#{order.order_number}</h3>
//                         <p className="text-sm text-gray-400 flex items-center gap-1">
//                           <Clock size={14} /> {new Date(order.created_at).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                          <p className="text-xs text-gray-400 uppercase tracking-tighter">Items</p>
//                          <p className="text-sm font-bold text-baba-primary">{order.items.length}</p>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mt-4">
//                       {order.items.map((item, idx) => (
//                         <span key={idx} className="bg-baba-softbg text-baba-primary text-[11px] px-3 py-1 rounded-full border border-baba-accent/10 flex items-center gap-1">
//                           <Tag size={10} className="text-baba-accent" /> {item.variant_name} <span className="opacity-50">x{item.quantity}</span>
//                         </span>
//                       ))}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { 
  Package, MapPin, LogOut, ChevronRight, 
  Clock, Tag
} from "lucide-react";
import { motion } from "framer-motion";

/* ✅ Types */
interface OrderItem {
  variant_name: string;
  quantity: number;
}

interface Order {
  id: number;
  order_number: string;
  created_at: string;
  items: OrderItem[];
  status?: string; // ✅ optional for safety
}

export default function Profile() {
  const { user, logout } = useShop();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
       // ✅ CORRECT

      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/orders/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // 🚨 Handle unauthorized
        if (res.status === 401) {
          console.error("Unauthorized - login again");
          logout();
          navigate("/login");
          return;
        }

        if (!res.ok) {
          console.error("Failed response:", res.status);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("ORDERS:", data); // DEBUG

        setOrders(data);

      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user, navigate, logout]);

  if (!user) return null;

  return (
    <div className="bg-white min-h-screen">

      {/* 🔹 Header */}
      <div className="bg-baba-softbg py-20 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-baba-primary text-white rounded-full flex items-center justify-center text-3xl font-serif shadow-inner">
              {user.name ? user.name[0] : "U"}
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-baba-primary">{user.name}</h1>
              <p className="text-gray-500 tracking-widest uppercase text-xs mt-1">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* 🔹 Left Menu */}
          <div className="lg:col-span-4">
            <nav className="space-y-1">
              <button 
                onClick={() => navigate("/addresses")}
                className="w-full flex items-center justify-between py-4 text-gray-600 hover:text-baba-accent transition border-b"
              >
                <span className="flex items-center gap-3 font-medium">
                  <MapPin size={18} /> Manage Addresses
                </span>
                <ChevronRight size={14} />
              </button>

              <button 
                onClick={() => { logout(); navigate("/"); }}
                className="w-full flex items-center gap-3 py-4 text-red-400 hover:text-red-600 font-medium"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </nav>
          </div>

          {/* 🔹 Orders */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-8">
              <Package size={20} className="text-baba-accent" />
              <h2 className="text-2xl font-serif font-bold text-baba-primary">
                Order History
              </h2>
            </div>

            {loading ? (
              <div className="flex items-center gap-3 text-gray-400 italic">
                <div className="w-4 h-4 border-2 border-baba-accent border-t-transparent rounded-full animate-spin" />
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center bg-gray-50 rounded-xl border border-dashed">
                <p className="text-gray-400">No orders found yet.</p>
                <button 
                  onClick={() => navigate('/shop')} 
                  className="text-baba-accent mt-2 hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y">

                {orders.map((order) => {
                  const status = order.status || "processed";

                  return (
                    <motion.div 
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }} 
                      whileInView={{ opacity: 1, y: 0 }}
                      className="py-8"
                    >
                      <div className="flex justify-between mb-4">

                        <div>
                          {/* ✅ STATUS */}
                          <span className={`text-[10px] font-black uppercase tracking-widest mb-1 block ${
                            status === "delivered" ? "text-green-600" :
                            status === "shipped" ? "text-blue-600" :
                            status === "cancelled" ? "text-red-600" :
                            status === "confirmed" ? "text-purple-600" :
                            "text-yellow-600"
                          }`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>

                          <h3 className="text-lg font-mono font-bold text-baba-primary">
                            #{order.order_number}
                          </h3>

                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400">ITEMS</p>
                          <p className="font-bold">{order.items.length}</p>
                        </div>

                      </div>

                      {/* 🔹 Items */}
                      <div className="flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="bg-baba-softbg text-baba-primary text-xs px-3 py-1 rounded-full border flex items-center gap-1">
                            <Tag size={10} />
                            {item.variant_name} x{item.quantity}
                          </span>
                        ))}
                      </div>

                    </motion.div>
                  );
                })}

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}