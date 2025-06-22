
import { useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  console.log('ProductGrid render - products:', products, 'categories:', categories);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-lg text-stone-600">Loading products...</div>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-lg text-red-600">Error loading products. Please try again.</div>
        </div>
      </div>
    );
  }

  // Build categories for filter including "All Products"
  const allCategories = [
    { id: "all", name: "All Products", slug: "all" },
    ...categories
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => {
        const category = categories.find(cat => cat.id === product.category_id);
        return category?.slug === selectedCategory;
      });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-light tracking-wide text-stone-800 mb-4">
          Curated Collection
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Thoughtfully designed pieces for the modern wardrobe
        </p>
      </div>

      <div className="flex justify-center mb-12">
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
              colors: product.colors,
              sizes: product.sizes,
              description: product.description
            }}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-600">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
