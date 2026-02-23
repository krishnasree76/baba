import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useShop } from '../context/ShopContext';
    import { CheckCircle, ShieldCheck, FileText } from 'lucide-react';
    import { toast } from 'react-toastify';

    export default function Checkout() {
      const { cart, cartTotal, clearCart } = useShop();
      const navigate = useNavigate();
      const [isProcessing, setIsProcessing] = useState(false);
      const [orderPlaced, setOrderPlaced] = useState(false);

      if (cart.length === 0 && !orderPlaced) {
        navigate('/cart');
        return null;
      }

      const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
          setIsProcessing(false);
          setOrderPlaced(true);
          clearCart();
          toast.success("Order placed successfully!");
        }, 1500);
      };

      if (orderPlaced) {
        return (
          <div className="min-h-[80vh] flex items-center justify-center bg-baba-background px-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="font-serif text-3xl text-baba-primary font-bold mb-4">Your order is confirmed!</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Thank you for choosing Baba Textiles. Your wholesale order #ORD-{Math.floor(Math.random() * 100000)} has been placed successfully. An invoice has been sent to your email.
              </p>
              
              <div className="bg-baba-softbg p-4 rounded-lg mb-8 text-left text-sm border border-baba-accent/20">
                <div className="flex items-center gap-2 mb-2 font-semibold text-baba-primary">
                  <FileText className="w-4 h-4 text-baba-accent" /> Invoice Preview
                </div>
                <div className="flex justify-between text-gray-600 py-1"><span>Status</span><span className="text-green-600 font-medium">Paid</span></div>
                <div className="flex justify-between text-gray-600 py-1"><span>Date</span><span>{new Date().toLocaleDateString()}</span></div>
              </div>

              <button 
                onClick={() => navigate('/')}
                className="bg-baba-primary text-white px-8 py-3 rounded-sm font-medium hover:bg-baba-accent transition-colors w-full"
              >
                Return to Home
              </button>
            </div>
          </div>
        );
      }

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
              {/* Form Section */}
              <div className="lg:w-2/3">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100">
                  
                  {/* Mock Google Login */}
                  <div className="mb-8 pb-8 border-b border-gray-100">
                    <h2 className="text-xl font-medium text-baba-primary mb-4">Express Checkout</h2>
                    <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>
                    <div className="relative mt-6 text-center">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                      <span className="relative bg-white px-4 text-sm text-gray-500">Or continue manually</span>
                    </div>
                  </div>

                  <form id="checkout-form" onSubmit={handlePlaceOrder}>
                    <h2 className="text-xl font-medium text-baba-primary mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Name (Optional)</label>
                        <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent mb-2" placeholder="Street address" />
                        <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" placeholder="Apartment, suite, etc. (optional)" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / Province *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code *</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input required type="tel" className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-baba-accent focus:border-baba-accent" />
                      </div>
                    </div>

                    <h2 className="text-xl font-medium text-baba-primary mb-6 mt-10">Payment Method</h2>
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
                      <div className="flex items-center gap-3">
                        <input type="radio" checked readOnly className="w-4 h-4 text-baba-accent focus:ring-baba-accent border-gray-300" />
                        <span className="font-medium text-gray-900">Invoice on Delivery (Wholesale)</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 ml-7">For wholesale accounts, payment is collected upon delivery or based on agreed credit terms.</p>
                    </div>

                  </form>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-28">
                  <h2 className="text-xl font-medium text-baba-primary mb-6">In Your Cart</h2>
                  
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative">
                          <img src={item.selectedColor.image} alt="" className="w-16 h-16 object-cover rounded-md border border-gray-100" />
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-gray-500">{item.selectedColor.name}</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated by weight</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-baba-primary pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    form="checkout-form"
                    disabled={isProcessing}
                    className="w-full bg-baba-primary text-white py-4 rounded-sm font-semibold hover:bg-baba-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Place Order'}
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-4 flex justify-center items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Safe and secure transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }