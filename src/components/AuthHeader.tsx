
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AuthHeader = () => {
  const { state } = useCart();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "Come back soon!"
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/products"
            className="text-2xl font-light tracking-wider text-stone-800 hover:text-stone-600 transition-colors"
          >
            ATELIER
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products"
              className="text-sm tracking-wide text-stone-600 hover:text-stone-800 transition-colors"
            >
              PRODUCTS
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.email}</span>
            </div>
            
            <button className="relative p-2 text-stone-600 hover:text-stone-800 transition-colors">
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
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
