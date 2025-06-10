
import React from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { products } = useProducts();
  
  // Get featured products (limited to 4)
  const featuredProducts = products
    .filter(product => product.featured)
    .slice(0, 4);
  
  return (
    <section className="section-padding">
      <div className="container-custom">
        <h2 className="section-title">Featured Products</h2>
        <p className="section-subtitle">
         Our featured products represent the heart of our collection — beautifully made by hand to enrich your most treasured moments. Whether for a special event or just because, these gifts are made to be cherished.
        </p>
        
        <ProductGrid products={featuredProducts} />
        
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
