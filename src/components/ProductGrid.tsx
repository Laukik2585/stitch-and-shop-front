
import { useState } from "react";
import ProductCard from "./ProductCard";

const products = [
  {
    id: "1",
    name: "Canvas Tote Bag",
    price: 85,
    category: "bags",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
    colors: ["Natural", "Black", "Navy"],
    description: "Minimalist canvas tote perfect for everyday use"
  },
  {
    id: "2",
    name: "Custom Print Tee",
    price: 45,
    category: "tshirts",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
    description: "Premium cotton tee with custom prints"
  },
  {
    id: "3",
    name: "Leather Crossbody",
    price: 165,
    category: "bags",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=800&fit=crop",
    colors: ["Tan", "Black", "Brown"],
    description: "Handcrafted leather crossbody bag"
  },
  {
    id: "4",
    name: "Wide Leg Pants",
    price: 95,
    category: "pants",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=800&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Khaki"],
    description: "Comfortable wide leg pants in premium fabric"
  },
  {
    id: "5",
    name: "Structured Handbag",
    price: 195,
    category: "bags",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
    colors: ["Black", "Cognac", "Gray"],
    description: "Elegant structured handbag for professional settings"
  },
  {
    id: "6",
    name: "Graphic Print Tee",
    price: 55,
    category: "tshirts",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    description: "Artistic graphic print on premium cotton"
  }
];

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "bags", name: "Bags" },
    { id: "tshirts", name: "T-Shirts" },
    { id: "pants", name: "Pants" }
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`pb-2 text-sm tracking-wide transition-colors ${
                selectedCategory === category.id
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
