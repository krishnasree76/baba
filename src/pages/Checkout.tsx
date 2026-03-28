// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useShop } from '../context/ShopContext';
// // import { CheckCircle, ShieldCheck, FileText } from 'lucide-react';
// // import { toast } from 'react-toastify';

// // export default function Checkout() {
// //   const { cart, cartTotal, clearCart, user } = useShop();
// //   const navigate = useNavigate();
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [orderPlaced, setOrderPlaced] = useState(false);
// //   // Store the alphanumeric ID from the backend
// //   const [confirmedOrderId, setConfirmedOrderId] = useState('');

// //   if (cart.length === 0 && !orderPlaced) {
// //     navigate('/cart');
// //     return null;
// //   }

// //   const handlePlaceOrder = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsProcessing(true);

// //     // 1. Prepare data for the backend
// //     const orderData = {
// //       // In your models, we set customer_name automatically in the View, 
// //       // but we send items here
// //       items: cart.map(item => ({
// //         variant: item.selectedSize ? item.product.variants.find(v => v.size === item.selectedSize && v.color === item.selectedColor.name)?.id : item.product.variants[0].id,
// //         quantity: item.quantity
// //       }))
// //     };

// //     try {
// //       const token = localStorage.getItem("token");
// //       const res = await fetch("http://127.0.0.1:8000/api/auth/orders/", { // Update with your actual endpoint
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token && { "Authorization": `Bearer ${token}` })
// //         },
// //         body: JSON.stringify(orderData),
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         setConfirmedOrderId(data.order_number); // The alphanumeric ID like #10A5ji0
// //         setIsProcessing(false);
// //         setOrderPlaced(true);
// //         clearCart();
// //         toast.success("Order placed successfully!");
// //       } else {
// //         toast.error(data.error || "Failed to place order. Check stock.");
// //         setIsProcessing(false);
// //       }
// //     } catch (error) {
// //       console.error("Order Error:", error);
// //       toast.error("Server connection lost.");
// //       setIsProcessing(false);
// //     }
// //   };

// //   if (orderPlaced) {
// //     return (
// //       <div className="min-h-[80vh] flex items-center justify-center bg-baba-background px-4">
// //         <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
// //           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //             <CheckCircle className="w-10 h-10 text-green-600" />
// //           </div>
// //           <h1 className="font-serif text-3xl text-baba-primary font-bold mb-4">Your order is confirmed!</h1>
// //           <p className="text-gray-600 mb-8 leading-relaxed">
// //             Thank you for choosing Baba Textiles. Your wholesale order <span className="font-bold text-baba-primary">#{confirmedOrderId}</span> has been placed successfully. An invoice has been sent to your email.
// //           </p>
          
// //           <div className="bg-baba-softbg p-4 rounded-lg mb-8 text-left text-sm border border-baba-accent/20">
// //             <div className="flex items-center gap-2 mb-2 font-semibold text-baba-primary">
// //               <FileText className="w-4 h-4 text-baba-accent" /> Invoice Summary
// //             </div>
// //             <div className="flex justify-between text-gray-600 py-1"><span>Order ID</span><span className="font-mono">{confirmedOrderId}</span></div>
// //             <div className="flex justify-between text-gray-600 py-1"><span>Status</span><span className="text-orange-600 font-medium">Processing</span></div>
// //             <div className="flex justify-between text-gray-600 py-1"><span>Date</span><span>{new Date().toLocaleDateString()}</span></div>
// //           </div>

// //           <button 
// //             onClick={() => navigate('/')}
// //             className="bg-baba-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-baba-accent transition-colors w-full"
// //           >
// //             Return to Home
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //       return (
// //         <div className="bg-baba-softbg min-h-screen py-10">
// //           <div className="container mx-auto px-4 max-w-6xl">
// //             <div className="text-center mb-10">
// //               <h1 className="text-3xl font-serif text-baba-primary font-bold">Secure Checkout</h1>
// //               <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
// //                 <ShieldCheck className="w-4 h-4 text-green-600" /> 256-bit Encrypted Connection
// //               </div>
// //             </div>

// //             <div className="flex flex-col lg:flex-row gap-10">
// //               {/* Form Section */}
// //               <div className="lg:w-2/3">
// //                 <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                  
// //                   {/* Mock Google Login */}
// //                   <div className="mb-8 pb-8 border-b border-gray-100">
// //                     <h2 className="text-xl font-medium text-baba-primary mb-4">Express Checkout</h2>
// //                     <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium">
// //                       <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
// //                         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
// //                         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
// //                         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
// //                       </svg>
// //                       Continue with Google
// //                     </button>
// //                     <div className="relative mt-6 text-center">
// //                       <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
// //                       <span className="relative bg-white px-4 text-sm text-gray-500">Or continue manually</span>
// //                     </div>
// //                   </div>

// //                   <form id="checkout-form" onSubmit={handlePlaceOrder}>
// //                     <h2 className="text-xl font-medium text-baba-primary mb-6">Shipping Information</h2>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div className="sm:col-span-2">
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (Optional)</label>
// //                         <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div className="sm:col-span-2">
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent mb-2" placeholder="Street address" />
// //                         <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" placeholder="Apartment, suite, etc. (optional)" />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">State / Province *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
// //                         <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
// //                         <input required type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
// //                       </div>
// //                     </div>

// //                     <h2 className="text-xl font-medium text-baba-primary mb-6 mt-10">Payment Method</h2>
// //                     <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
// //                       <div className="flex items-center gap-3">
// //                         <input type="radio" checked readOnly className="w-4 h-4 text-baba-accent focus:ring-baba-accent border-gray-300" />
// //                         <span className="font-medium text-gray-900">Invoice on Delivery (Wholesale)</span>
// //                       </div>
// //                       <p className="text-sm text-gray-500 mt-2 ml-7">For wholesale accounts, payment is collected upon delivery or based on agreed credit terms.</p>
// //                     </div>

// //                   </form>
// //                 </div>
// //               </div>

// //               {/* Order Summary Sidebar */}
// //               <div className="lg:w-1/3">
// //                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
// //                   <h2 className="text-xl font-medium text-baba-primary mb-6">In Your Cart</h2>
                  
// //                   <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
// //   {cart.map(item => (
// //     <div key={item.id} className="flex gap-4">

// //       <div className="relative">
// //         <img
// //           src={item.selectedColor.images?.[0]?.image || "/placeholder.png"}
// //           alt=""
// //           className="w-16 h-16 object-cover rounded-md border border-gray-100"
// //         />

// //         <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
// //           {item.quantity}
// //         </span>
// //       </div>

// //       <div className="flex-grow">
// //         <p className="text-sm font-medium text-gray-900 line-clamp-1">
// //           {item.product.name}
// //         </p>

// //         <p className="text-xs text-gray-500">
// //           {item.selectedColor.name}
// //         </p>

// //         <p className="text-sm font-medium text-gray-900 mt-1">
// //           ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
// //         </p>
// //       </div>

// //     </div>
// //   ))}
// // </div>

// //                   <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-sm">
// //                     <div className="flex justify-between text-gray-600">
// //                       <span>Subtotal</span>
// //                       <span>₹{cartTotal.toLocaleString('en-IN')}</span>
// //                     </div>
// //                     <div className="flex justify-between text-gray-600">
// //                       <span>Shipping</span>
// //                       <span>Calculated by weight</span>
// //                     </div>
// //                     <div className="flex justify-between text-lg font-bold text-baba-primary pt-3 border-t border-gray-200">
// //                       <span>Total</span>
// //                       <span>₹{cartTotal.toLocaleString('en-IN')}</span>
// //                     </div>
// //                   </div>

// //                   <button 
// //                     type="submit" 
// //                     form="checkout-form"
// //                     disabled={isProcessing}
// //                     className="w-full bg-baba-primary text-white py-4 rounded-sm font-semibold hover:bg-baba-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
// //                   >
// //                     {isProcessing ? 'Processing...' : 'Place Order'}
// //                   </button>
// //                   <p className="text-xs text-center text-gray-500 mt-4 flex justify-center items-center gap-1">
// //                     <ShieldCheck className="w-3 h-3" /> Safe and secure transaction
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     }
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useShop } from '../context/ShopContext';
// import { CheckCircle, ShieldCheck, FileText } from 'lucide-react';
// import { toast } from 'react-toastify';

// export default function Checkout() {
//   const { cart, cartTotal, shippingTotal, orderTotal, clearCart, user } = useShop();
//   const navigate = useNavigate();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
//   const [saveAddressToProfile, setSaveAddressToProfile] = useState(false);

//   // Removed orderPlaced and confirmedOrderId as they are handled 
//   // by the /order-success route now.

//   if (cart.length === 0) {
//     navigate('/cart');
//     return null;
//   }

// //   
// const handlePlaceOrder = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsProcessing(true);

//   // ✅ Get form values from your input fields (using refs or state)
//   const formData = new FormData(e.currentTarget as HTMLFormElement);
//   const name = `${formData.get('first_name')} ${formData.get('last_name')}`;
//   const address = formData.get('address') as string;
//   const city = formData.get('city') as string;
//   const pincode = formData.get('pincode') as string;

//   try {
//     const token = localStorage.getItem("token");

//     // 1️⃣ Create Razorpay order
//     const paymentRes = await fetch("http://127.0.0.1:8000/api/create-payment/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: orderTotal })
//     });

//     if (!paymentRes.ok) {
//       toast.error("Failed to initiate payment");
//       setIsProcessing(false);
//       return;
//     }

//     const paymentData = await paymentRes.json();

//     const options = {
//       key: paymentData.key,
//       amount: paymentData.amount,
//       currency: "INR",
//       name: "Baba Textiles",
//       description: "Wholesale Order Payment",
//       order_id: paymentData.razorpay_order_id,
//       handler: async function (response: any) {
//         // 2️⃣ Verify payment
//         const verifyRes = await fetch("http://127.0.0.1:8000/api/verify-payment/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(response)
//         });

//         const verifyData = await verifyRes.json();
//         if (verifyData.status !== "success") {
//           toast.error("Payment verification failed");
//           setIsProcessing(false);
//           return;
//         }

//         // 3️⃣ Create Django order (Including Address & Customer Details)
//         const orderData = {
//           items: cart.map(item => ({
//             variant: item.selectedSize
//               ? item.product.variants.find(
//                   v => v.size === item.selectedSize && v.color === item.selectedColor.name
//                 )?.id
//               : item.product.variants[0].id,
//             quantity: item.quantity
//           })),
//           // ✅ Pass the customer details collected from the form
//           name: name,
//           address: address,
//           city: city,
//           pincode: pincode,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_signature: response.razorpay_signature
//         };

//         const orderRes = await fetch("http://127.0.0.1:8000/api/create-order/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` })
//           },
//           body: JSON.stringify(orderData)
//         });

//         const order = await orderRes.json();
//         clearCart();
//         navigate("/order-success", { state: { orderNumber: order.order_number } });
//         toast.success("Payment Successful!");
//         setIsProcessing(false);
//       },
//       prefill: {
//         name: user?.name || "Customer",
//         email: user?.email || ""
//       },
//       theme: { color: "#0f766e" }
//     };

//     const Razorpay = (window as any).Razorpay;
//     if (!Razorpay) {
//       toast.error("Payment gateway failed to load");
//       setIsProcessing(false);
//       return;
//     }
//     const rzp = new Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     console.error(error);
//     toast.error("Payment failed");
//     setIsProcessing(false);
//   }
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     pincode: "",
//     phone: ""
//   });
  
// };

//   // if (orderPlaced) {
//   //   return (
//   //     <div className="min-h-[80vh] flex items-center justify-center bg-baba-softbg px-4">
//   //       <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
//   //         <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//   //           <CheckCircle className="w-10 h-10 text-green-600" />
//   //         </div>
//   //         <h1 className="font-serif text-3xl text-baba-primary font-bold mb-4">Your order is confirmed!</h1>
//   //         <p className="text-gray-600 mb-8 leading-relaxed">
//   //           Thank you for choosing Baba Textiles. Your wholesale order <span className="font-bold text-baba-primary">#{confirmedOrderId}</span> has been placed successfully.
//   //         </p>
          
//   //         <div className="bg-baba-softbg p-4 rounded-lg mb-8 text-left text-sm border border-baba-accent/20">
//   //           <div className="flex items-center gap-2 mb-2 font-semibold text-baba-primary">
//   //             <FileText className="w-4 h-4 text-baba-accent" /> Invoice Summary
//   //           </div>
//   //           <div className="flex justify-between text-gray-600 py-1"><span>Order ID</span><span className="font-mono">{confirmedOrderId}</span></div>
//   //           <div className="flex justify-between text-gray-600 py-1"><span>Status</span><span className="text-orange-600 font-medium">Processing</span></div>
//   //           {/* ✅ Show full orderTotal in success summary */}
//   //           <div className="flex justify-between text-gray-900 py-1 font-bold pt-2 border-t border-gray-200 mt-2">
//   //             <span>Amount Due</span>
//   //             <span>₹{orderTotal.toLocaleString('en-IN')}</span>
//   //           </div>
//   //         </div>

//   //         <button 
//   //           onClick={() => navigate('/')}
//   //           className="bg-baba-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-baba-accent transition-colors w-full"
//   //         >
//   //           Return to Home
//   //         </button>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="bg-baba-softbg min-h-screen py-10">
//       <div className="container mx-auto px-4 max-w-6xl">
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-serif text-baba-primary font-bold">Secure Checkout</h1>
//           <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
//             <ShieldCheck className="w-4 h-4 text-green-600" /> 256-bit Encrypted Connection
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* Form Section */}
//           <div className="lg:w-2/3">
//             <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
//               <form id="checkout-form" onSubmit={handlePlaceOrder}>
//                 <h2 className="text-xl font-medium text-baba-primary mb-6">Shipping Information</h2>
//                 {/* ... (Your form inputs stay the same) ... */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
//                     <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
//                     <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
//                   </div>
//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (Optional)</label>
//                     <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
//                   </div>
//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
//                     <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent mb-2" placeholder="Street address" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
//                     <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
//                     <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
//                   </div>
//                 </div>

//                 <h2 className="text-xl font-medium text-baba-primary mb-6 mt-10">Payment Method</h2>
//                 <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
//                   <div className="flex items-center gap-3">
//                     <input type="radio" checked readOnly className="w-4 h-4 text-baba-accent focus:ring-baba-accent border-gray-300" />
//                     <span className="font-medium text-gray-900">Invoice on Delivery (Wholesale)</span>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2 ml-7">For wholesale accounts, payment is collected upon delivery or based on agreed credit terms.</p>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:w-1/3">
//             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
//               <h2 className="text-xl font-medium text-baba-primary mb-6 border-b pb-4">Order Summary</h2>
              
//               <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
//                 {cart.map(item => (
//                   <div key={item.id} className="flex gap-4">
//                     <img
//                       src={item.selectedColor.images?.[0]?.image || "/placeholder.png"}
//                       alt=""
//                       className="w-16 h-16 object-cover rounded-md border border-gray-100"
//                     />
//                     <div className="flex-grow">
//                       <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
//                       <p className="text-xs text-gray-500">{item.selectedColor.name} | Qty: {item.quantity}</p>
//                       <p className="text-sm font-semibold text-baba-primary mt-1">
//                         ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ✅ CALCULATED SHIPPING & TOTALS REVEALED HERE */}
//               <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-sm">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Items Subtotal</span>
//                   <span>₹{cartTotal.toLocaleString('en-IN')}</span>
//                 </div>
                
//                 <div className="flex justify-between text-gray-600">
//                   <span className="flex items-center gap-1">Wholesale Shipping</span>
//                   <span>₹{shippingTotal.toLocaleString('en-IN')}</span>
//                 </div>

//                 <div className="flex justify-between text-xl font-bold text-baba-primary pt-3 border-t border-gray-200 mt-2">
//                   <span>Grand Total</span>
//                   <span className="text-baba-accent">₹{orderTotal.toLocaleString('en-IN')}</span>
//                 </div>
//               </div>

//               <button 
//                 type="submit" 
//                 form="checkout-form"
//                 disabled={isProcessing}
//                 className="w-full bg-baba-primary text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-baba-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
//               >
//                 {isProcessing ? 'Processing...' : 'Place Wholesale Order'}
//               </button>
              
//               <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-tighter">
//                 By placing order you agree to wholesale terms
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckCircle, ShieldCheck, FileText, MapPin } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Checkout() {
  const { cart, cartTotal, shippingTotal, orderTotal, clearCart, user } = useShop();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [saveAddressToProfile, setSaveAddressToProfile] = useState(false);

  // ✅ State-based form control to allow "Quick Select" to fill inputs
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    phone: ""
  });

  // ✅ Fetch saved addresses on component load
  useEffect(() => {
    const fetchAddresses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/addresses/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSavedAddresses(data);
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };
    fetchAddresses();
  }, []);
  useEffect(() => {
  if (cart.length === 0) {
    navigate('/cart');
  }
}, [cart, navigate]);

  // ✅ Helper to fill form when a saved address is clicked
  const handleSelectAddress = (addr: any) => {
    // const nameParts = addr.name.split(" ");
    const nameParts = addr.name?.split(" ") || [""];
    const first = nameParts[0];
    const last = nameParts.slice(1).join(" ");
    
    setForm({
      firstName: first,
      lastName: last,
      address: addr.street,
      city: addr.city,
      state: addr.state || "",
      pincode: addr.pincode,
      phone: addr.phone
    });
    toast.info("Address selected!");
  };

  // if (cart.length === 0) {
  //   navigate('/cart');
  //   return null;
  // }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create Razorpay order
      const safeAmount = Number(orderTotal);

if (!safeAmount || isNaN(safeAmount)) {
  toast.error("Invalid order amount");
  setIsProcessing(false);
  return;
}

const paymentRes = await fetch("http://127.0.0.1:8000/api/create-payment/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: safeAmount })
});

      if (!paymentRes.ok) {
        toast.error("Failed to initiate payment");
        setIsProcessing(false);
        return;
      }

      const paymentData = await paymentRes.json();

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: "INR",
        name: "Baba Textiles",
        description: "Wholesale Order Payment",
        order_id: paymentData.razorpay_order_id,
        handler: async function (response: any) {
          // 2️⃣ Verify payment
          const verifyRes = await fetch("http://127.0.0.1:8000/api/verify-payment/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response)
          });

          const verifyData = await verifyRes.json();
          if (verifyData.status !== "success") {
            toast.error("Payment verification failed");
            setIsProcessing(false);
            return;
          }

          // ✅ OPTIONAL: Save address to profile if checkbox is checked
          if (saveAddressToProfile && token) {
            await fetch("http://127.0.0.1:8000/api/auth/addresses/", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
              },
              body: JSON.stringify({
                name: `${form.firstName} ${form.lastName}`,
                phone: form.phone,
                street: form.address,
                city: form.city,
                state: form.state, // You can update this to a state field if needed
                pincode: form.pincode
              })
            });
          }

          // 3️⃣ Create Django order
          const orderData = {
  items: cart
    ?.map((item) => {
      if (!item || !item.product || !item.product.variants?.length) {
        console.error("Invalid cart item:", item);
        return null;
      }

      let variant;

      if (item.selectedSize) {
        variant = item.product.variants.find(
          (v) =>
            v.size === item.selectedSize &&
            v.color === item.selectedColor?.name
        );
      } else {
        variant = item.product.variants[0];
      }

      if (!variant) {
        console.error("Variant not found:", item);
        return null;
      }

      return {
        variant: variant.id,
        quantity: item.quantity,
      };
    })
    .filter(Boolean),

  name: `${form.firstName} ${form.lastName}`,
  address: form.address,
  city: form.city,
  state: form.state,
  pincode: form.pincode,
  phone: form.phone,
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,
};

          const orderRes = await fetch("http://127.0.0.1:8000/api/create-order/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` })
            },
            body: JSON.stringify(orderData)
          });

          const order = await orderRes.json();
          clearCart();
          navigate("/order-success", { state: { orderNumber: order.order_number } });
          toast.success("Payment Successful!");
          setIsProcessing(false);
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || ""
        },
        theme: { color: "#0f766e" }
      };

      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) {
        toast.error("Payment gateway failed to load");
        setIsProcessing(false);
        return;
      }
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-baba-softbg min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-baba-primary font-bold">Secure Checkout</h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-600" /> 256-bit Encrypted Connection
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            
            {/* ✅ QUICK SELECT SAVED ADDRESSES */}
            {savedAddresses.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <MapPin size={14} className="text-baba-accent" /> Use a Saved Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map(addr => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => handleSelectAddress(addr)}
                      className="text-left p-4 border border-gray-100 rounded-lg hover:border-baba-accent hover:bg-baba-softbg transition group"
                    >
                      <p className="font-bold text-baba-primary text-sm">{addr.name}</p>
                      <p className="text-xs text-gray-500 truncate">{addr.street}, {addr.city}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
              <form id="checkout-form" onSubmit={handlePlaceOrder}>
                <h2 className="text-xl font-medium text-baba-primary mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.firstName}
                      onChange={(e) => setForm({...form, firstName: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.lastName}
                      onChange={(e) => setForm({...form, lastName: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.phone}
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.address}
                      onChange={(e) => setForm({...form, address: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                      placeholder="Street address" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.city}
                      onChange={(e) => setForm({...form, city: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                    <input 
                      required 
                      type="text" 
                      value={form.pincode}
                      onChange={(e) => setForm({...form, pincode: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
                    />
                  </div>
                  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
    <input 
      required 
      type="text" 
      value={form.state}
      onChange={(e) => setForm({...form, state: e.target.value})}
      className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" 
      placeholder="e.g. Andhra Pradesh"
    />
  </div>

  

                </div>

                {/* ✅ SAVE ADDRESS OPTION */}
                <div className="flex items-center gap-2 mb-8 bg-gray-50 p-3 rounded-md border border-gray-100">
                  <input 
                    type="checkbox" 
                    id="save-to-profile"
                    checked={saveAddressToProfile}
                    onChange={(e) => setSaveAddressToProfile(e.target.checked)}
                    className="w-4 h-4 accent-baba-primary"
                  />
                  <label htmlFor="save-to-profile" className="text-sm text-gray-600 cursor-pointer">
                    Save this address to my profile for future orders
                  </label>
                </div>

                <h2 className="text-xl font-medium text-baba-primary mb-6">Payment Method</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <input type="radio" checked readOnly className="w-4 h-4 text-baba-accent focus:ring-baba-accent border-gray-300" />
                    <span className="font-medium text-gray-900">Online Payment (Razorpay)</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-7">Secure payment via Cards, UPI, Netbanking, or Wallets.</p>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
              <h2 className="text-xl font-medium text-baba-primary mb-6 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.selectedColor.images?.[0]?.image || "/placeholder.png"}
                      alt=""
                      className="w-16 h-16 object-cover rounded-md border border-gray-100"
                    />
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.selectedColor.name} | Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-baba-primary mt-1">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">Wholesale Shipping</span>
                  <span>₹{shippingTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-xl font-bold text-baba-primary pt-3 border-t border-gray-200 mt-2">
                  <span>Grand Total</span>
                  <span className="text-baba-accent">₹{orderTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-baba-primary text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-baba-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isProcessing ? 'Processing...' : 'Pay & Place Order'}
              </button>
              
              <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-tighter">
                By placing order you agree to wholesale terms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}