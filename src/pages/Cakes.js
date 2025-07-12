import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { cakeAPI } from '../services/api';
import { ShoppingCart, Star } from 'lucide-react';

const Cakes = () => {
  const { addToCart } = useCart() || {};
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const response = await cakeAPI.getAll({ available: true });
      setCakes(response.data.data || []);
    } catch (err) {
      setError('Failed to fetch cakes');
      console.error('Error fetching cakes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (cake) => {
    if (addToCart) {
      addToCart(cake, 1);
      setCartError(null);
    } else {
      setCartError('Cart is not available. Please refresh the page.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading cakes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchCakes}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Delicious Cakes</h1>
        <p className="text-lg text-gray-600">Choose from our handcrafted collection</p>
      </div>

      {cartError && (
        <div className="text-center text-red-600 mb-4">{cartError}</div>
      )}

      {cakes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-2xl mb-4">🧁</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No cakes available</h3>
          <p className="text-gray-600">Check back later for fresh cakes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cakes.map((cake) => (
            <div key={cake.id} className="card hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                {cake.image_url ? (
                  <img 
                    src={cake.image_url} 
                    alt={cake.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🧁
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {cake.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {cake.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary-600">
                    ₹{cake.price}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="text-sm ml-1">4.5</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(cake)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cakes; 