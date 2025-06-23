
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Users, Shield, ArrowRight } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-stone-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-stone-800 mr-2" />
              <span className="text-xl font-light tracking-wider text-stone-800">ATELIER</span>
            </div>
            <Link
              to="/auth"
              className="px-6 py-2 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-light tracking-wide text-stone-800 mb-6">
                Curated Fashion
                <span className="block text-stone-600">For The Modern</span>
                <span className="block">Wardrobe</span>
              </h1>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                Discover handpicked pieces from emerging designers and established brands. 
                Every item tells a story, every collection inspires confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center px-8 py-3 bg-stone-800 text-white text-sm tracking-wide transition-colors hover:bg-stone-700 rounded-sm group"
                >
                  START SHOPPING
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-8 py-3 border border-stone-300 text-stone-700 text-sm tracking-wide transition-colors hover:border-stone-500 rounded-sm">
                  EXPLORE COLLECTION
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop"
                  alt="Fashion collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border border-stone-200">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-stone-800">4.9/5 Rating</span>
                </div>
                <p className="text-xs text-stone-600 mt-1">From 10k+ happy customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light tracking-wide text-stone-800 mb-4">
              Why Choose Atelier
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We believe fashion should be accessible, sustainable, and inspiring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-stone-800 mb-2">Curated Quality</h3>
              <p className="text-stone-600">
                Every piece is carefully selected for its quality, design, and craftsmanship
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-stone-800 mb-2">Community Driven</h3>
              <p className="text-stone-600">
                Join a community of fashion enthusiasts who value authenticity and style
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-light text-stone-800 mb-2">Secure Shopping</h3>
              <p className="text-stone-600">
                Shop with confidence using our secure payment system and buyer protection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-stone-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light tracking-wide text-white mb-4">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-lg text-stone-300 mb-8">
            Join thousands who have discovered their perfect style with Atelier
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 bg-white text-stone-800 text-sm font-medium tracking-wide transition-colors hover:bg-stone-100 rounded-sm group"
          >
            CREATE YOUR ACCOUNT
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-stone-600 mr-2" />
            <span className="text-stone-600 text-sm tracking-wide">© 2024 Atelier. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
