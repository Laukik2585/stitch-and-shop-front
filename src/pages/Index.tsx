
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import OrderTracking from "@/components/OrderTracking";

const Index = () => {
  const [currentView, setCurrentView] = useState("catalog");

  const renderView = () => {
    switch (currentView) {
      case "cart":
        return <Cart onContinueShopping={() => setCurrentView("catalog")} onCheckout={() => setCurrentView("checkout")} />;
      case "checkout":
        return <Checkout onBack={() => setCurrentView("cart")} onOrderComplete={() => setCurrentView("tracking")} />;
      case "tracking":
        return <OrderTracking onBackToCatalog={() => setCurrentView("catalog")} />;
      default:
        return <ProductGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-20">
        {renderView()}
      </main>
    </div>
  );
};

export default Index;
