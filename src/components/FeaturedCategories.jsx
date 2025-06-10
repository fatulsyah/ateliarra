
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'handcrafted-gift',
    name: 'Handcrafted Gift',
    description: 'Thoughtfully handcrafted gifts for every special moment.',
    image: '/images/products/8.png'
  },
  {
    id: 'hampers',
    name: 'Hampers',
    description: 'Every hamper tells a story, wrapped with love.',
    image: 'images/products/32.png'
  },
  {
    id: 'sweet-little-extras',
    name: 'Sweet Little Extras',
    description: 'Curated gift sets for special moments',
    image: '/images/products/1.png'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <h2 className="section-title">Explore Our Collections</h2>
        <p className="section-subtitle">
          Discover Ateliarra’s thoughtfully curated hampers, crafted with love and attention to detail. Each piece is designed to celebrate life’s special moments — from birthdays and thank-yous to meaningful milestones. Explore our collection and find the perfect gift to share with your loved ones. 
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                   src={category.image} />
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
