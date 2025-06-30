
import { useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/ProductFilters";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const { user, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState("catalog");

  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-lg text-stone-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-lg text-stone-600">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-lg text-red-600">Error loading products. Please try again.</div>
          </div>
        </div>
      </div>
    );
  }

  // Build categories for filter including "All Products"
  const allCategories = [
    { id: "all", name: "All Products", slug: "all" },
    ...categories
  ];

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== "all") {
        const category = categories.find(cat => cat.id === product.category_id);
        if (category?.slug !== selectedCategory) return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) && 
            !product.description?.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasMatchingColor = selectedColors.some(color => 
          product.colors?.includes(color)
        );
        if (!hasMatchingColor) return false;
      }

      // Size filter
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some(size => 
          product.sizes?.includes(size)
        );
        if (!hasMatchingSize) return false;
      }

      return true;
    });
  }, [products, categories, selectedCategory, searchQuery, priceRange, selectedColors, selectedSizes]);

  const handleOrderComplete = () => {
    toast({
      title: "Order completed!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    setCurrentView("catalog");
  };

  // Render different views based on currentView state
  if (currentView === "cart") {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        <div className="pt-20">
          <Cart 
            onContinueShopping={() => setCurrentView("catalog")}
            onCheckout={() => setCurrentView("checkout")}
          />
        </div>
      </div>
    );
  }

  if (currentView === "checkout") {
    return (
      <div className="min-h-screen bg-stone-50">
        <Header currentView={currentView} onViewChange={setCurrentView} />
        <div className="pt-20">
          <Checkout 
            onBack={() => setCurrentView("cart")}
            onOrderComplete={handleOrderComplete}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-4">
              Curated Collection
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Thoughtfully designed pieces for the modern wardrobe
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96">
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <ProductFilters
                categories={allCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedColors={selectedColors}
                onColorChange={setSelectedColors}
                selectedSizes={selectedSizes}
                onSizeChange={setSelectedSizes}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex justify-center">
              <div className="flex space-x-8 border-b border-stone-200">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`pb-2 text-sm tracking-wide transition-colors ${
                      selectedCategory === category.slug
                        ? "text-stone-800 border-b-2 border-stone-800"
                        : "text-stone-600 hover:text-stone-800"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-stone-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  category: categories.find(cat => cat.id === product.category_id)?.slug || 'unknown',
                  image: product.images[0] || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop',
                  colors: product.colors || [],
                  sizes: product.sizes || [],
                  description: product.description || ''
                }}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-600">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setPriceRange([0, 1000]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                }}
                className="mt-4 px-6 py-2 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;
