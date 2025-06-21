
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface CheckoutProps {
  onBack: () => void;
  onOrderComplete: () => void;
}

const Checkout = ({ onBack, onOrderComplete }: CheckoutProps) => {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" });
      localStorage.setItem("lastOrder", JSON.stringify({
        orderId: `AT${Date.now()}`,
        items: state.items,
        total: state.total,
        date: new Date().toISOString(),
        status: "confirmed"
      }));
      
      toast({
        title: "Order confirmed!",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      });
      
      onOrderComplete();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light tracking-wide text-stone-800 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-light text-stone-800 mb-4">Contact Information</h2>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
              />
            </div>

            <div>
              <h2 className="text-xl font-light text-stone-800 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none mb-4"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP code"
                  required
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-light text-stone-800 mb-4">Payment</h2>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm mb-4">
                <p className="text-sm text-amber-800">
                  🔒 Stripe integration will be added here. For now, this is a demo checkout.
                </p>
              </div>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card number"
                required
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  required
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  required
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-stone-300 rounded-sm focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-3 border border-stone-300 text-stone-700 text-sm tracking-wide transition-colors hover:border-stone-500 rounded-sm"
              >
                BACK TO CART
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
              >
                COMPLETE ORDER
              </button>
            </div>
          </form>
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-light text-stone-800 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                  <div className="flex-1">
                    <p className="text-stone-800">{item.name}</p>
                    <p className="text-sm text-stone-600">
                      {item.color && `${item.color}`}
                      {item.color && item.size && " • "}
                      {item.size && item.size}
                      {" • "}Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-stone-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-4">
              <div className="flex justify-between text-lg font-medium text-stone-800">
                <span>Total</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
