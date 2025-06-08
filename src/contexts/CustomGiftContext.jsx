import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomGiftContext = createContext();

export const useCustomGift = () => useContext(CustomGiftContext);

const initialGiftState = {
  base: null,
  items: [],
  card: null,
  message: '',
};

export const CustomGiftProvider = ({ children }) => {
  const [customGift, setCustomGift] = useState(() => {
    const savedGift = localStorage.getItem('ateliarra-custom-gift');
    return savedGift ? JSON.parse(savedGift) : initialGiftState;
  });

  useEffect(() => {
    localStorage.setItem('ateliarra-custom-gift', JSON.stringify(customGift));
  }, [customGift]);

  const setBase = (base) => {
    setCustomGift(prev => ({ ...prev, base }));
  };

  const addItem = (item) => {
    setCustomGift(prev => ({ ...prev, items: [...prev.items, item] }));
  };

  const removeItem = (itemId) => {
    setCustomGift(prev => ({ ...prev, items: prev.items.filter(i => i.id !== itemId) }));
  };
  
  const updateItemQuantity = (itemId, quantity) => {
    setCustomGift(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    }));
  };

  const setCard = (card) => {
    setCustomGift(prev => ({ ...prev, card }));
  };

  const setMessage = (message) => {
    setCustomGift(prev => ({ ...prev, message }));
  };

  const resetCustomGift = () => {
    setCustomGift(initialGiftState);
  };

  const giftTotal = () => {
    let total = 0;
    if (customGift.base) total += customGift.base.price;
    if (customGift.card) total += customGift.card.price;
    customGift.items.forEach(item => total += item.price * (item.quantity || 1));
    return total;
  };

  const value = {
    customGift,
    setBase,
    addItem,
    removeItem,
    updateItemQuantity,
    setCard,
    setMessage,
    resetCustomGift,
    giftTotal,
  };

  return (
    <CustomGiftContext.Provider value={value}>
      {children}
    </CustomGiftContext.Provider>
  );
};