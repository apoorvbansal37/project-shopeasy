import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onCartClick, 
  onAuthClick, 
  searchQuery, 
  onSearchChange 
}) => {
  const { getItemCount } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors">
              ShopHub
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-gray-100">
              <Heart className="h-6 w-6" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
            >
              <ShoppingCart className="h-6 w-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600 text-sm transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <User className="h-6 w-6" />
                <span className="text-sm">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            <button className="flex items-center space-x-3 text-gray-600 hover:text-red-500 transition-colors w-full">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </button>
            
            <button
              onClick={() => {
                onCartClick();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart ({getItemCount()})</span>
            </button>

            {user ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 transition-colors w-full text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onAuthClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors w-full"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;