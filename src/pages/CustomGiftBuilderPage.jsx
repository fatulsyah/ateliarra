import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Gift, Edit3, Eye, Plus, Minus } from 'lucide-react';
import { useCustomGift } from '@/contexts/CustomGiftContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

// Dummy data - replace with actual data source or API calls
const baseOptions = [
  { id: 'box-sm', name: 'Small Elegant Box', price: 10.00, image: 'small elegant gift box with ribbon', description: 'A chic small box, perfect for delicate gifts.' },
  { id: 'box-md', name: 'Medium Craft Box', price: 15.00, image: 'medium craft paper gift box', description: 'Versatile medium-sized box with a natural look.' },
  { id: 'basket-lg', name: 'Large Wicker Basket', price: 25.00, image: 'large wicker gift basket with handle', description: 'A charming large basket for generous hampers.' },
];

const itemOptions = [
  { id: 'candle-lav', name: 'Lavender Soy Candle', price: 12.00, image: 'lavender scented soy candle in a jar', category: 'Relaxation' },
  { id: 'choc-dark', name: 'Artisan Dark Chocolate', price: 8.00, image: 'bar of artisan dark chocolate with nuts', category: 'Gourmet' },
  { id: 'tea-herb', name: 'Herbal Tea Selection', price: 10.00, image: 'selection of herbal tea bags in a box', category: 'Gourmet' },
  { id: 'mug-ceram', name: 'Handmade Ceramic Mug', price: 18.00, image: 'handmade ceramic coffee mug', category: 'Homeware' },
  { id: 'soap-oat', name: 'Oatmeal & Honey Soap', price: 7.00, image: 'bar of oatmeal and honey handmade soap', category: 'Bath & Body' },
  { id: 'jam-str', name: 'Strawberry Preserve Jar', price: 9.00, image: 'jar of homemade strawberry preserve', category: 'Gourmet' },
];

const cardOptions = [
  { id: 'card-bday', name: 'Happy Birthday Card', price: 3.00, image: 'elegant happy birthday greeting card' },
  { id: 'card-thank', name: 'Thank You Card', price: 3.00, image: 'stylish thank you greeting card' },
  { id: 'card-congrats', name: 'Congratulations Card', price: 3.00, image: 'celebratory congratulations greeting card' },
];

const steps = [
  { id: 1, name: 'Choose Your Base', icon: <Gift className="h-5 w-5" /> },
  { id: 2, name: 'Choose Your Items', icon: <ShoppingCart className="h-5 w-5" /> },
  { id: 3, name: 'Choose Your Card', icon: <Edit3 className="h-5 w-5" /> },
  { id: 4, name: 'Preview & Confirm', icon: <Eye className="h-5 w-5" /> },
];

const CustomGiftBuilderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { customGift, setBase, addItem, removeItem, updateItemQuantity, setCard, setMessage, giftTotal, resetCustomGift } = useCustomGift();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const progressPercentage = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      if (currentStep === 1 && !customGift.base) {
        toast({ title: "Selection Required", description: "Please choose a base for your gift.", variant: "destructive" });
        return;
      }
      if (currentStep === 2 && customGift.items.length === 0) {
        toast({ title: "Selection Required", description: "Please add at least one item to your gift.", variant: "destructive" });
        return;
      }
      setCurrentStep(prev => prev + 1);
    }
  };
  const prevStep = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const handleBaseSelect = (base) => setBase(base);
  
  const handleItemToggle = (item) => {
    const existingItem = customGift.items.find(i => i.id === item.id);
    if (existingItem) {
      removeItem(item.id);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  const handleItemQuantityChange = (itemId, change) => {
    const item = customGift.items.find(i => i.id === itemId);
    if (item) {
      updateItemQuantity(itemId, item.quantity + change);
    }
  };

  const handleCardSelect = (card) => setCard(card);

  const handleFinalizeGift = () => {
    const finalGift = {
      id: `custom-${Date.now()}`,
      name: `Custom Gift - ${customGift.base.name}`,
      price: giftTotal(),
      description: `Custom gift with ${customGift.base.name}, ${customGift.items.length} items, and ${customGift.card ? customGift.card.name : 'no card'}.`,
      isCustom: true,
      base: customGift.base,
      items: customGift.items,
      card: customGift.card,
      message: customGift.message,
    };
    addToCart(finalGift, 1);
    toast({
      title: "Custom Gift Added to Cart!",
      description: "Your personalized gift has been successfully added.",
    });
    resetCustomGift();
    navigate('/cart');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Choose Base
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="heading-md mb-6">Step 1: Choose Your Base Packaging</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {baseOptions.map(base => (
                <motion.div
                  key={base.id}
                  whileHover={{ y: -5 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${customGift.base?.id === base.id ? 'border-primary ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}
                  onClick={() => handleBaseSelect(base)}
                >
                  <img  alt={base.name} className="w-full h-48 object-cover rounded-md mb-4" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <h3 className="font-semibold text-lg">{base.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{base.description}</p>
                  <p className="font-medium text-primary">${base.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      case 2: // Choose Items
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="heading-md mb-6">Step 2: Choose Your Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {itemOptions.map(item => {
                const selectedItem = customGift.items.find(i => i.id === item.id);
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className={`p-4 border rounded-lg transition-all ${selectedItem ? 'border-primary ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}
                  >
                    <img  alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{item.category}</p>
                    <p className="font-medium text-primary mb-2">${item.price.toFixed(2)}</p>
                    {selectedItem ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="icon" onClick={() => handleItemQuantityChange(item.id, -1)} disabled={selectedItem.quantity <= 1} className="h-8 w-8"><Minus className="h-3 w-3"/></Button>
                          <span className="w-8 text-center text-sm">{selectedItem.quantity}</span>
                          <Button variant="ghost" size="icon" onClick={() => handleItemQuantityChange(item.id, 1)} className="h-8 w-8"><Plus className="h-3 w-3"/></Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleItemToggle(item)} className="text-destructive border-destructive hover:bg-destructive/10">Remove</Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleItemToggle(item)} className="w-full">Add to Gift</Button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      case 3: // Choose Card
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="heading-md mb-6">Step 3: Choose Your Card & Write a Message</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cardOptions.map(card => (
                <motion.div
                  key={card.id}
                  whileHover={{ y: -5 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${customGift.card?.id === card.id ? 'border-primary ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}`}
                  onClick={() => handleCardSelect(card)}
                >
                  <img  alt={card.name} className="w-full h-48 object-cover rounded-md mb-4" src="https://images.unsplash.com/photo-1694878981873-42a9d5538b52" />
                  <h3 className="font-semibold text-lg">{card.name}</h3>
                  <p className="font-medium text-primary">${card.price.toFixed(2)}</p>
                </motion.div>
              ))}
            </div>
            {customGift.card && (
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message (optional)</label>
                <textarea
                  id="message"
                  rows="4"
                  value={customGift.message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your heartfelt message here..."
                  className="w-full p-2 border rounded-md focus:ring-primary focus:border-primary"
                ></textarea>
              </div>
            )}
          </motion.div>
        );
      case 4: // Preview
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <h2 className="heading-md mb-6">Step 4: Preview Your Custom Gift</h2>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              {customGift.base && (
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-lg mb-2">Base Packaging:</h3>
                  <div className="flex items-center">
                    <img  alt={customGift.base.name} className="w-20 h-20 object-cover rounded-md mr-4" src="https://images.unsplash.com/photo-1672011301958-6118fd8019f8" />
                    <div>
                      <p>{customGift.base.name}</p>
                      <p className="text-sm text-primary">${customGift.base.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}
              {customGift.items.length > 0 && (
                <div className="mb-4 pb-4 border-b">
                  <h3 className="font-semibold text-lg mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {customGift.items.map(item => (
                      <li key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img  alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                          <span>{item.name} (x{item.quantity})</span>
                        </div>
                        <span className="text-sm text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {customGift.card && (
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Greeting Card:</h3>
                   <div className="flex items-center">
                    <img  alt={customGift.card.name} className="w-20 h-20 object-cover rounded-md mr-4" src="https://images.unsplash.com/photo-1607077459378-143233b8b3b6" />
                    <div>
                      <p>{customGift.card.name}</p>
                      <p className="text-sm text-primary">${customGift.card.price.toFixed(2)}</p>
                    </div>
                  </div>
                  {customGift.message && <p className="mt-2 text-sm text-muted-foreground italic">Message: "{customGift.message}"</p>}
                </div>
              )}
              <div className="mt-6 pt-4 border-t">
                <p className="text-xl font-bold text-right">Total: <span className="text-primary">${giftTotal().toFixed(2)}</span></p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-custom section-padding">
      <h1 className="heading-xl text-center mb-4">Create Your Custom Gift</h1>
      <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
        Follow these simple steps to build a unique and thoughtful gift & hampers.
      </p>

      {/* Progress Bar and Step Indicators */}
      <div className="mb-10">
        <Progress value={progressPercentage} className="w-full mb-2 h-3" />
        <div className="flex justify-between">
          {steps.map(step => (
            <div key={step.id} className={`flex items-center space-x-2 ${currentStep >= step.id ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              {currentStep > step.id ? <Check className="h-5 w-5 text-green-500" /> : step.icon}
              <span>{step.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-12 flex justify-between items-center">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="text-lg font-semibold">
          Current Total: <span className="text-primary">${giftTotal().toFixed(2)}</span>
        </div>
        {currentStep < steps.length ? (
          <Button onClick={nextStep}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleFinalizeGift} size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart & Finalize
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomGiftBuilderPage;