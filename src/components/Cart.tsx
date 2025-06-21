
import { useCart } from "@/contexts/CartContext";

interface CartProps {
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart = ({ onContinueShopping, onCheckout }: CartProps) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-wide text-stone-800 mb-8">Your Cart</h1>
          <div className="bg-white rounded-lg p-12 shadow-sm">
            <p className="text-stone-600 mb-6">Your cart is empty</p>
            <button
              onClick={onContinueShopping}
              className="px-6 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light tracking-wide text-stone-800 mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          {state.items.map((item) => (
            <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center py-6 border-b border-stone-200 last:border-b-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-sm bg-stone-100"
              />
              
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-light text-stone-800">{item.name}</h3>
                <div className="text-sm text-stone-600 mt-1">
                  {item.color && <span>Color: {item.color}</span>}
                  {item.color && item.size && <span className="mx-2">•</span>}
                  {item.size && <span>Size: {item.size}</span>}
                </div>
                <p className="text-lg text-stone-800 mt-2">${item.price}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded-sm text-stone-600 hover:border-stone-500"
                >
                  −
                </button>
                <span className="w-8 text-center text-stone-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded-sm text-stone-600 hover:border-stone-500"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.id)}
                className="ml-6 text-stone-400 hover:text-stone-600 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-stone-50 px-6 py-4 rounded-b-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-light text-stone-800">Total</span>
            <span className="text-xl font-medium text-stone-800">${state.total.toFixed(2)}</span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={onContinueShopping}
              className="flex-1 py-3 border border-stone-300 text-stone-700 text-sm tracking-wide transition-colors hover:border-stone-500 rounded-sm"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
