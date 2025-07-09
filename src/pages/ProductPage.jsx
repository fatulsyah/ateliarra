import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, Heart, ArrowLeft, Minus, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// Format currency to "Rp 56.000,-"
const formatRupiah = (amount) => {
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',-';
};

const showStartFromIds = [37, 39, 54, 55]; //condition ID to show "Start from" text

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/not-found');
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [id, getProductById, navigate]);
  
  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart.`,
      duration: 3000,
    });
  };
  
  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <p>Product not found.</p>
        <Button onClick={() => navigate('/shop')} className="mt-4">
          Back to Shop
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-12">
      <Button 
        variant="ghost" 
        className="mb-8 pl-0" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative rounded-lg overflow-hidden">
            <img  
              className="w-full h-auto aspect-square object-cover" 
              alt={product.name}
             src={product.images} />
            
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full">
                New
              </span>
            )}
          </div>
        </motion.div>
        
        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading-lg mb-2">{product.name}</h1>
          {/* <p className="text-2xl font-medium text-primary mb-4">Rp {product.price.toFixed(2)}</p> */}
           <p className="product-price text-lg text-muted-foreground mb-4">
            {product.id === 37 ? (
              <>
                Start From {formatRupiah(product.price)}
                <br />
                <span className="block mt-2 font-semibold">Oval Basket Prices:</span>
                <span className="block text-sm">• Small : Rp 70.000</span>
                <span className="block text-sm">• Medium : Rp 85.000</span>
                <span className="block text-sm">• Large : Rp 100.000</span>
                <span className="block mt-2 font-semibold">Circle Basket Prices:</span>
                <span className="block text-sm">• Small : Rp 80.000</span>
                <span className="block text-sm">• Medium : Rp 95.000</span>
                <span className="block text-sm">• Large : Rp 110.000</span>
              </>
            ) : product.id === 39 ? (
              <>
                Start From {formatRupiah(product.price)}
                <br />
                <span className="block mt-2 font-semibold">Size:</span>
                <span className="block text-sm">• Small : Rp 40.000</span>
                <span className="block text-sm">• Medium : Rp 45.000</span>
                <span className="block text-sm">• Large : Rp 50.000</span>
              </>
            ) : product.id === 54 ? (
              <>
                Start From {formatRupiah(product.price)}
                <br />
                <span className="block mt-2 font-semibold">Size:</span>
                <span className="block text-sm">• Small : Rp 30.000</span>
                <span className="block text-sm">• Medium : Rp 40.000</span>
                <span className="block text-sm">• Large : Rp 50.000</span>
              </>
            ) : product.id === 55 ? (
              <>
                Start From {formatRupiah(product.price)}
                <br />
                <span className="block mt-2 font-semibold">Sticker Available "Hello":</span>
                <span className="block text-sm">• Small : Rp 10.000</span>
                <span className="block text-sm">• Medium : Rp 10.000</span>
                <span className="block text-sm">• Large : Rp 15.000</span>
                <span className="block mt-2 font-semibold">Sticker Available "Welcome to the world little one / Happy Graduation / Happy Wedding / Happy Birthday":</span>
                <span className="block text-sm">• Small : Rp 12.000</span>
                <span className="block text-sm">• Medium : Rp 12.000</span>
                <span className="block text-sm">• Large : Rp 15.000</span>
                <span className="block mt-2 font-semibold">Customize Your Stickers:</span>
                <span className="block text-sm">• Custom Size : Rp 20.000</span>
              </>
            ) : showStartFromIds.includes(product.id) ? (
              <>
                Start From {formatRupiah(product.price)}
              </>
            ) : (
              formatRupiah(product.price)
            )}
          </p>
          {/* Add this block below the price for IDs 37, 39, 54, 55 */}
          {[37, 39, 54, 55].includes(product.id) && (
            <p className="text-xs text-primary font-medium mb-2">
              Psst... let us know your preferred size in the notes when you check out this product! :)
            </p>
          )}
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="mb-8">
            <h3 className="font-medium mb-2">Details</h3>
            <p className="text-muted-foreground">{product.details}</p>
          </div>
          
          {/* <div className="mb-8">
            <h3 className="font-medium mb-2">Dimensions</h3>
            <p className="text-muted-foreground">{product.dimensions}</p>
          </div> */}
          
          <div className="mb-8">
            <h3 className="font-medium mb-2">What’s included</h3>
            <ul className="list-disc list-inside text-muted-foreground">
              {product.included.map((material, index) => (
                <li key={index}>{material}</li>
              ))}
            </ul>
          </div>
          
          {/* <div className="mb-8">
            <h3 className="font-medium mb-2">Care Instructions</h3>
            <p className="text-muted-foreground">{product.care}</p>
          </div>
           */}
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleQuantityChange(1)}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            {/* <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button> */}
          </div>
          
          {/* In Stock Indicator */}
          <div className="flex items-center mt-6 text-green-600">
            <Check className="h-5 w-5 mr-2" />
            <span>In Stock & Ready to Ship</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
