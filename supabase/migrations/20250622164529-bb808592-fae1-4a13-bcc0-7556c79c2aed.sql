
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  images TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Bags', 'bags', 'Stylish bags and accessories'),
('T-Shirts', 'tshirts', 'Premium cotton t-shirts'),
('Pants', 'pants', 'Comfortable and stylish pants');

-- Insert sample products
INSERT INTO public.products (name, description, price, category_id, images, colors, sizes, stock) VALUES
('Canvas Tote Bag', 'Minimalist canvas tote perfect for everyday use', 85.00, 
 (SELECT id FROM public.categories WHERE slug = 'bags'), 
 ARRAY['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop'], 
 ARRAY['Natural', 'Black', 'Navy'], 
 ARRAY[]::TEXT[], 50),

('Custom Print Tee', 'Premium cotton tee with custom prints', 45.00, 
 (SELECT id FROM public.categories WHERE slug = 'tshirts'), 
 ARRAY['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop'], 
 ARRAY['White', 'Black', 'Gray'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], 75),

('Leather Crossbody', 'Handcrafted leather crossbody bag', 165.00, 
 (SELECT id FROM public.categories WHERE slug = 'bags'), 
 ARRAY['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=800&fit=crop'], 
 ARRAY['Tan', 'Black', 'Brown'], 
 ARRAY[]::TEXT[], 30),

('Wide Leg Pants', 'Comfortable wide leg pants in premium fabric', 95.00, 
 (SELECT id FROM public.categories WHERE slug = 'pants'), 
 ARRAY['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=800&fit=crop'], 
 ARRAY['Black', 'Navy', 'Khaki'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], 60),

('Structured Handbag', 'Elegant structured handbag for professional settings', 195.00, 
 (SELECT id FROM public.categories WHERE slug = 'bags'), 
 ARRAY['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop'], 
 ARRAY['Black', 'Cognac', 'Gray'], 
 ARRAY[]::TEXT[], 25),

('Graphic Print Tee', 'Artistic graphic print on premium cotton', 55.00, 
 (SELECT id FROM public.categories WHERE slug = 'tshirts'), 
 ARRAY['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop'], 
 ARRAY['White', 'Black', 'Navy'], 
 ARRAY['XS', 'S', 'M', 'L', 'XL'], 40);

-- Enable Row Level Security (RLS) - products are public for now
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
