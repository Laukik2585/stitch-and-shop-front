
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const { state } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => onViewChange("catalog")}
            className="text-2xl font-light tracking-wider text-stone-800 hover:text-stone-600 transition-colors"
          >
            ATELIER
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onViewChange("catalog")}
              className={`text-sm tracking-wide transition-colors ${
                currentView === "catalog" ? "text-stone-800 border-b border-stone-800" : "text-stone-600 hover:text-stone-800"
              }`}
            >
              CATALOG
            </button>
            <button 
              onClick={() => onViewChange("tracking")}
              className={`text-sm tracking-wide transition-colors ${
                currentView === "tracking" ? "text-stone-800 border-b border-stone-800" : "text-stone-600 hover:text-stone-800"
              }`}
            >
              TRACK ORDER
            </button>
          </nav>

          <button 
            onClick={() => onViewChange("cart")}
            className="relative p-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <ShoppingCart size={20} />
            {state.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
