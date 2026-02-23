import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useShop } from '../context/ShopContext';
    import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';

    export default function Cart() {
      const { cart, removeFromCart, updateCartQuantity, cartTotal } = useShop();
      const [promoCode, setPromoCode] = useState('');
      const [discount, setDiscount] = useState(0);
      const navigate = useNavigate();

      const handleApplyPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (promoCode.toUpperCase() === 'FESTIVE20' && cartTotal >= 50000) {
          setDiscount(cartTotal * 0.20);
        } else if (promoCode.toUpperCase() === 'FESTIVE20') {
          alert('Minimum order value of ₹50,000 required for this promo code.');
          setDiscount(0);
        } else {
          alert('Invalid promo code.');
          setDiscount(0);
        }
      };

      const finalTotal = cartTotal - discount;

      if (cart.length === 0) {
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center bg-baba-background px-4">
            <div className="w-24 h-24 bg-baba-softbg rounded-full flex items-center justify-center mb-6">
              <span className="text-baba-accent text-4xl">🛒</span>
            </div>
            <h2 className="text-3xl font-serif text-baba-primary mb-4">Your cart is empty</h2>
            <p className="text-baba-textdark/60 mb-8 text-center max-w-md">Looks like you haven't added any premium wholesale textiles to your cart yet.</p>
            <Link to="/shop" className="bg-baba-primary text-white px-8 py-3 rounded-sm hover:bg-baba-accent transition-colors font-medium">
              Start Shopping
            </Link>
          </div>
        );
      }

      return (
        <div className="bg-baba-softbg min-h-screen py-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-serif text-baba-primary font-bold mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-black/5 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative">
                    <img 
                      src={item.selectedColor.image} 
                      alt={item.product.name} 
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-100"
                    />
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500 font-mono mb-1">Ref: {item.product.code}</p>
                          <Link to={`/product/${item.product.id}`} className="font-serif text-lg text-baba-primary font-semibold hover:text-baba-accent transition-colors">
                            {item.product.name}
                          </Link>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                        Color: <span className="w-3 h-3 rounded-full inline-block border border-gray-300" style={{ backgroundColor: item.selectedColor.hex }}></span> {item.selectedColor.name}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-gray-200 rounded-sm bg-gray-50">
                          <button 
                            onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-200 transition-colors text-gray-600"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.selectedColor.stock}
                            className="p-2 hover:bg-gray-200 transition-colors text-gray-600 disabled:opacity-50 disabled:hover:bg-transparent"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-baba-primary text-lg">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-black/5 sticky top-28">
                  <h2 className="text-xl font-serif text-baba-primary font-bold mb-6 border-b pb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cart.reduce((a,c) => a+c.quantity, 0)} items)</span>
                      <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount applied</span>
                        <span>-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>

                  <form onSubmit={handleApplyPromo} className="mb-6 pb-6 border-b border-gray-100">
                    <label className="block text-sm text-gray-600 mb-2">Have a promo code?</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="e.g. FESTIVE20"
                        className="flex-grow border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-baba-accent uppercase"
                      />
                      <button type="submit" className="bg-gray-100 text-baba-primary px-4 py-2 rounded-sm text-sm font-medium hover:bg-gray-200 transition-colors">
                        Apply
                      </button>
                    </div>
                  </form>

                  <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-semibold text-baba-primary">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-baba-primary">₹{finalTotal.toLocaleString('en-IN')}</span>
                      <p className="text-xs text-gray-500 mt-1">Includes all applicable taxes</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-baba-primary text-white py-4 rounded-sm font-semibold hover:bg-baba-accent transition-colors flex items-center justify-center gap-2 group text-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }