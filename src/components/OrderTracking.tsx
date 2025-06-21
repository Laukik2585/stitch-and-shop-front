
import { useState, useEffect } from "react";
import { Package } from "lucide-react";

interface OrderTrackingProps {
  onBackToCatalog: () => void;
}

const OrderTracking = ({ onBackToCatalog }: OrderTrackingProps) => {
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    const orderData = localStorage.getItem("lastOrder");
    if (orderData) {
      setLastOrder(JSON.parse(orderData));
    }
  }, []);

  const trackingSteps = [
    { id: 1, name: "Order Confirmed", completed: true },
    { id: 2, name: "Processing", completed: true },
    { id: 3, name: "Shipped", completed: false },
    { id: 4, name: "Delivered", completed: false }
  ];

  if (!lastOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-light tracking-wide text-stone-800 mb-8">Order Tracking</h1>
          <div className="bg-white rounded-lg p-12 shadow-sm">
            <Package size={48} className="mx-auto text-stone-400 mb-4" />
            <p className="text-stone-600 mb-6">No recent orders found</p>
            <button
              onClick={onBackToCatalog}
              className="px-6 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
            >
              START SHOPPING
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-light tracking-wide text-stone-800 mb-8">Order Tracking</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-light text-stone-800">Order #{lastOrder.orderId}</h2>
            <p className="text-stone-600">Placed on {new Date(lastOrder.date).toLocaleDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-medium text-stone-800">${lastOrder.total.toFixed(2)}</p>
            <p className="text-sm text-green-600 font-medium">{lastOrder.status.toUpperCase()}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-light text-stone-800 mb-4">Tracking Progress</h3>
          <div className="flex items-center justify-between">
            {trackingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.completed 
                    ? "bg-stone-800 border-stone-800 text-white" 
                    : "border-stone-300 text-stone-400"
                }`}>
                  {step.completed ? "✓" : step.id}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    step.completed ? "text-stone-800" : "text-stone-400"
                  }`}>
                    {step.name}
                  </p>
                </div>
                {index < trackingSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.completed ? "bg-stone-800" : "bg-stone-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-light text-stone-800 mb-4">Order Items</h3>
          <div className="space-y-4">
            {lastOrder.items.map((item: any) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center p-4 bg-stone-50 rounded-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-sm"
                />
                <div className="flex-1 ml-4">
                  <h4 className="font-medium text-stone-800">{item.name}</h4>
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
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onBackToCatalog}
          className="px-6 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
