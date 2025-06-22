
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();
  const { dispatch } = useCart();
  
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-lg text-stone-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-stone-600 mb-4">Product not found</div>
          <button
            onClick={() => navigate("/")}
            className="text-stone-800 hover:underline"
          >
            Return to catalog
          </button>
        </div>
      </div>
    );
  }

  // Set default selections
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop',
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
        category: product.category_id || 'unknown'
      }
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-stone-100 rounded-sm overflow-hidden">
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="aspect-square bg-stone-100 rounded-sm overflow-hidden">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light text-stone-800 tracking-wide mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-stone-800">
                ${product.price}
              </p>
            </div>

            {product.description && (
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-2 tracking-wide uppercase">
                  Description
                </h3>
                <p className="text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3 tracking-wide uppercase">
                  Color
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
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

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-stone-800 mb-3 tracking-wide uppercase">
                  Size
                </h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
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

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-3 tracking-wide uppercase">
                Quantity
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-stone-300 rounded-sm flex items-center justify-center hover:border-stone-500 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium text-stone-800 min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-stone-300 rounded-sm flex items-center justify-center hover:border-stone-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>ADD TO CART</span>
              </button>
              
              <button className="w-full py-4 border border-stone-300 text-stone-800 text-sm tracking-wide transition-colors hover:border-stone-500 rounded-sm flex items-center justify-center space-x-2">
                <Heart size={20} />
                <span>ADD TO WISHLIST</span>
              </button>
            </div>

            {/* Stock Info */}
            {product.stock !== undefined && (
              <div className="text-sm text-stone-600">
                {product.stock > 0 ? (
                  <span className="text-green-600">In stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
