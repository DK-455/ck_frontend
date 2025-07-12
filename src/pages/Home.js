import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Clock, Shield } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Handcrafted cakes made with the finest ingredients'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Fresh cakes delivered to your doorstep within hours'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Ordering',
      description: 'Place orders anytime, day or night'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safe & Secure',
      description: 'Secure payment and hygienic packaging'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-br from-primary-50 to-cake-50 rounded-2xl">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Sweet Dreams Come True
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our delicious collection of handcrafted cakes. Perfect for every celebration, 
            made with love and the finest ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cakes"
              className="btn-primary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
            >
              <span>Browse Cakes</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/admin"
              className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg px-8 py-4"
            >
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Sweet Dreams?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16 rounded-2xl">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Order Your Perfect Cake?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Browse our collection and place your order today. 
            We'll make sure your special day is even sweeter!
          </p>
          <Link
            to="/cakes"
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <span>Start Ordering</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 