
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    
    if (newQuantity < 1) {
      return;
    }
    
    updateQuantity(productId, newQuantity);
  };
  
  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page or process
    toast({
      title: "Checkout initiated",
      description: "This would proceed to payment in a real store.",
    });
    
    // For demo purposes, clear the cart after "checkout"
    setTimeout(() => {
      clearCart();
      navigate('/');
      
      toast({
        title: "Order placed!",
        description: "Thank you for your purchase.",
      });
    }, 1500);
  };
  
  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="heading-lg mb-8 text-center">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="mb-6">
              <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            </div>
            <h2 className="heading-md mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="heading-sm">Cart Items ({cartItems.length})</h2>
                </div>
                
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        {/* Product Image */}
                        <div className="w-24 h-24 rounded-md overflow-hidden mr-6 mb-4 sm:mb-0">
                          <img  
                            className="w-full h-full object-cover" 
                            alt={item.name}
                           src="https://images.unsplash.com/photo-1691437908387-f92c11a9af56" />
                        </div>
                        
                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">
                            <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex items-center border rounded-md mr-4">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-card rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="heading-sm">Order Summary</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
