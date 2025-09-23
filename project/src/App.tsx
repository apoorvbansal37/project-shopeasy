import React, { useState } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            onCartClick={handleCartClick}
            onAuthClick={handleAuthClick}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <main>
            <ProductGrid
              products={products}
              searchQuery={searchQuery}
              onProductSelect={handleProductSelect}
            />
          </main>

          {/* Modals */}
          {selectedProduct && (
            <ProductDetail
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}

          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={handleCheckout}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <Checkout
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;