
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  colors?: string[];
  sizes?: string[];
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        category: product.category
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div 
      className="group cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-stone-100 rounded-sm mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`} />
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-light text-stone-800 tracking-wide">
            {product.name}
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            {product.description}
          </p>
          <p className="text-lg font-medium text-stone-800 mt-2">
            ${product.price}
          </p>
        </div>

        {product.colors && (
          <div>
            <p className="text-xs text-stone-600 mb-2 tracking-wide uppercase">Color</p>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs border rounded-sm transition-colors ${
                    selectedColor === color
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-300 text-stone-700 hover:border-stone-500"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.sizes && (
          <div>
            <p className="text-xs text-stone-600 mb-2 tracking-wide uppercase">Size</p>
            <div className="flex space-x-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-xs border rounded-sm transition-colors ${
                    selectedSize === size
                      ? "border-stone-800 bg-stone-800 text-white"
                      : "border-stone-300 text-stone-700 hover:border-stone-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
