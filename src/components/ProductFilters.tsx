
import { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

interface FilterProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedColors: string[];
  onColorChange: (colors: string[]) => void;
  selectedSizes: string[];
  onSizeChange: (sizes: string[]) => void;
}

const ProductFilters = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedColors,
  onColorChange,
  selectedSizes,
  onSizeChange
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const colors = ['Black', 'White', 'Gray', 'Navy', 'Brown', 'Beige', 'Red', 'Blue', 'Green'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleColorToggle = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    onColorChange(updatedColors);
  };

  const handleSizeToggle = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    onSizeChange(updatedSizes);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-stone-300 rounded-sm hover:border-stone-500 transition-colors"
      >
        <Filter className="h-4 w-4" />
        <span className="text-sm">Filters</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-stone-200 rounded-sm shadow-lg z-50">
          <div className="p-6 space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.slug}
                      checked={selectedCategory === category.slug}
                      onChange={(e) => onCategoryChange(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm text-stone-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-3">Price Range</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-20 px-2 py-1 border border-stone-300 rounded text-sm"
                  />
                  <span className="text-stone-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
                    className="w-20 px-2 py-1 border border-stone-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-3">Colors</h3>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <label key={color} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorToggle(color)}
                      className="mr-2"
                    />
                    <span className="text-sm text-stone-700">{color}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <h3 className="text-sm font-medium text-stone-800 mb-3">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeToggle(size)}
                      className="mr-2"
                    />
                    <span className="text-sm text-stone-700">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                onCategoryChange('all');
                onPriceRangeChange([0, 1000]);
                onColorChange([]);
                onSizeChange([]);
              }}
              className="w-full py-2 text-sm text-stone-600 hover:text-stone-800 border border-stone-300 rounded-sm hover:border-stone-500 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
