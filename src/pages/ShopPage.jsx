
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'handcrafted-gift', name: 'Handcrafted Gift' },
    { id: 'hampers', name: 'Hampers' },
    { id: 'sweet-little-extras', name: 'Sweet Little Extras' },
    // { id: 'accessories', name: 'Accessories' },
    // { id: 'gift-sets', name: 'Gift Sets' }
  ];
  
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);
  
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeCategory));
    }
  }, [activeCategory, products]);
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="heading-lg mb-8 text-center">Our Collection</h1>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => handleCategoryChange(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Products */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProductGrid products={filteredProducts} />
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
