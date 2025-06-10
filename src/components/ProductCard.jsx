
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image-container">
          <img  
            className="product-image" 
            alt={product.name}
            src={product.images}
          />
          
          {product.isNew && (
            <span className="product-badge">New</span>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 left-2 bg-background/80 hover:bg-background"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">Rp {product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          
          <Button 
            className="btn-add-to-cart"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
