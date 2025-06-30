
import { ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}

const Header = ({ currentView, onViewChange }: HeaderProps) => {
  const { state } = useCart();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleCartClick = () => {
    if (onViewChange) {
      onViewChange("cart");
    } else {
      // If no onViewChange prop, navigate to products page and let cart be handled there
      navigate("/products");
    }
  };

  const handleLogoClick = () => {
    if (onViewChange) {
      onViewChange("catalog");
    } else {
      navigate("/products");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-light tracking-wider text-stone-800 hover:text-stone-600 transition-colors"
          >
            ATELIER
          </button>
          
          {onViewChange ? (
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => onViewChange("catalog")}
                className={`text-sm tracking-wide transition-colors ${
                  currentView === "catalog" ? "text-stone-800 border-b border-stone-800" : "text-stone-600 hover:text-stone-800"
                }`}
              >
                CATALOG
              </button>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => navigate("/products")}
                className="text-sm tracking-wide transition-colors text-stone-600 hover:text-stone-800"
              >
                PRODUCTS
              </button>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCartClick}
              className="relative p-2 text-stone-600 hover:text-stone-800 transition-colors"
            >
              <ShoppingCart size={20} />
              {state.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-800 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            
            <button
              onClick={handleSignOut}
              className="p-2 text-stone-600 hover:text-stone-800 transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
