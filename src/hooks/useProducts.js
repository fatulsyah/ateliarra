
import { useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';

export const useProducts = (categoryFilter = null) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API fetch with setTimeout
    const fetchProducts = () => {
      setLoading(true);
      
      try {
        setTimeout(() => {
          let filteredProducts = [...initialProducts];
          
          // Apply category filter if provided
          if (categoryFilter) {
            filteredProducts = filteredProducts.filter(
              product => product.category === categoryFilter
            );
          }
          
          setProducts(filteredProducts);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [categoryFilter]);
  
  // Get a single product by ID
  const getProductById = (id) => {
    return initialProducts.find(product => product.id === Number(id)) || null;
  };
  
  return {
    products,
    loading,
    error,
    getProductById
  };
};
