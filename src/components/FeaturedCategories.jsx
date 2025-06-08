
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    description: 'Beautiful pieces to elevate your living space',
    image: 'elegant home decor items handcrafted with natural materials'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    description: 'Unique handcrafted jewelry for every occasion',
    image: 'handcrafted jewelry pieces with natural elements and elegant design'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Stylish accessories to complement your look',
    image: 'handmade accessories including bags, scarves and other fashion items'
  },
  {
    id: 'gift-sets',
    name: 'Gift Sets',
    description: 'Curated gift sets for special moments',
    image: 'beautifully packaged gift sets with multiple handcrafted items'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <h2 className="section-title">Explore Our Collections</h2>
        <p className="section-subtitle">
          Discover our carefully curated categories of handcrafted items, each made with love and attention to detail.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-lg group"
            >
              <Link to={`/shop?category=${category.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img  
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={category.name}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
