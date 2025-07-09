import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

// Format currency to "Rp 56.000,-"
const formatRupiah = (amount) => {
  return 'Rp ' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',-';
};

const showStartFromIds = [37, 39, 54, 55]; //condition ID to show "Start from" text

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal: cartTotalContext } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notes, setNotes] = useState({});

  // Tambahkan mapping harga khusus
  const specialPriceMap = {
    37: { // Wishful Pack
      "Oval Small": 70000,
      "Oval Medium": 85000,
      "Oval Large": 100000,
      "Circle Small": 80000,
      "Circle Medium": 95000,
      "Circle Large": 110000,
    },
    39: { // Vista Pick & Pack
      "Small": 40000,
      "Medium": 45000,
      "Large": 50000,
    },
    54: { // Luce Pack
      "Small": 30000,
      "Medium": 40000,
      "Large": 50000,
    },
    55: { // Custom Sticker
      "Hello Small": 10000,
      "Hello Medium": 10000,
      "Hello Large": 15000,
      "Welcome Small": 12000,
      "Welcome Medium": 12000,
      "Welcome Large": 15000,
      "Custom Size": 20000,
    },
  };

  // Fungsi untuk mengambil harga spesial berdasarkan notes
  const getSpecialPrice = (item) => {
    if (![37, 39, 54, 55].includes(item.id)) return item.price;
    const note = (notes[item.id] || "").trim();

    // Untuk id 55, cek kata kunci di notes
    if (item.id === 55) {
      if (/custom/i.test(note)) return specialPriceMap[55]["Custom Size"];
      if (/hello/i.test(note) && /small/i.test(note)) return specialPriceMap[55]["Hello Small"];
      if (/hello/i.test(note) && /medium/i.test(note)) return specialPriceMap[55]["Hello Medium"];
      if (/hello/i.test(note) && /large/i.test(note)) return specialPriceMap[55]["Hello Large"];
      if (/welcome|graduation|wedding|birthday/i.test(note) && /small/i.test(note)) return specialPriceMap[55]["Welcome Small"];
      if (/welcome|graduation|wedding|birthday/i.test(note) && /medium/i.test(note)) return specialPriceMap[55]["Welcome Medium"];
      if (/welcome|graduation|wedding|birthday/i.test(note) && /large/i.test(note)) return specialPriceMap[55]["Welcome Large"];
      return item.price;
    }

    // Untuk id 37, cek oval/circle dan size
    if (item.id === 37) {
      if (/oval/i.test(note) && /small/i.test(note)) return specialPriceMap[37]["Oval Small"];
      if (/oval/i.test(note) && /medium/i.test(note)) return specialPriceMap[37]["Oval Medium"];
      if (/oval/i.test(note) && /large/i.test(note)) return specialPriceMap[37]["Oval Large"];
      if (/circle/i.test(note) && /small/i.test(note)) return specialPriceMap[37]["Circle Small"];
      if (/circle/i.test(note) && /medium/i.test(note)) return specialPriceMap[37]["Circle Medium"];
      if (/circle/i.test(note) && /large/i.test(note)) return specialPriceMap[37]["Circle Large"];
      return item.price;
    }

    // Untuk id 39 & 54, cek size
    if ((item.id === 39 || item.id === 54)) {
      if (/small/i.test(note)) return specialPriceMap[item.id]["Small"];
      if (/medium/i.test(note)) return specialPriceMap[item.id]["Medium"];
      if (/large/i.test(note)) return specialPriceMap[item.id]["Large"];
      return item.price;
    }

    return item.price;
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
      duration: 5000,
      dismissible: true
    });
  };

  const handleQuantityChange = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleNoteChange = (productId, value) => {
    setNotes((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleCheckout = () => {
    // Prevent checkout if required notes are missing
    const missingNote = cartItems.some(
      (item) => [37, 39, 54, 55].includes(item.id) && !notes[item.id]
    );
    if (missingNote) {
      toast({
        title: "Missing Note",
        description: "Please fill in your preferred size/option in the notes for all relevant products before checkout.",
        duration: 5000,
        dismissible: true
      });
      return;
    }

    if (cartItems.length === 0) return;

    let message = `Hi Ateliarra, I’d like to order:\n\n`;
    let total = 0;

    cartItems.forEach((item) => {
      // Pakai harga spesial jika ada
      const price = getSpecialPrice(item);
      const subtotal = item.quantity * price;
      total += subtotal;
      message += `- ${item.name} × ${item.quantity} (Rp${subtotal.toLocaleString()})`;
      if (notes[item.id]) {
        message += ` [Note: ${notes[item.id]}]`;
      }
      message += `\n`;
    });

    message += `\nTotal: Rp${total.toLocaleString()}\n\nThank you!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '6285773153313'; 
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

    setTimeout(() => {
      clearCart();
      navigate('/');

      toast({
        title: "Order placed!",
        description: "Thank you for your purchase.",
        duration: 6000,
        dismissible: true
      });
    }, 1500);
  };

  // Untuk tampilan subtotal dan total di Order Summary, gunakan juga getSpecialPrice
  const cartTotal = cartItems.reduce(
    (total, item) => total + getSpecialPrice(item) * item.quantity,
    0
  );

  return (
    <div className="section-padding">
      <div className="container-custom">
        <h1 className="heading-lg mb-8 text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="heading-sm">Cart Items ({cartItems.length})</h2>
                </div>
                <ul className="divide-y">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="w-24 h-24 rounded-md overflow-hidden mr-6 mb-4 sm:mb-0">
                          <img
                            className="w-full h-full object-cover"
                            alt={item.name}
                            src={
                              item.images.startsWith('http')
                                ? item.images
                                : '/' + item.images.replace(/^\/+/, '')
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">
                            <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                              {item.name}
                            </Link>
                          </h3>
                           <p className="product-price text-lg text-muted-foreground mb-4">
                              {showStartFromIds.includes(item.id) && !notes[item.id]
                                ? `Start From ${formatRupiah(item.price)}`
                                : formatRupiah(getSpecialPrice(item))}
                          </p>
                          {/* Notes Form */}
                          <div className="mt-2 max-w-xs">
                            {[37, 39, 54, 55].includes(item.id) ? (
                              <>
                                <label htmlFor={`note-${item.id}`} className="block text-xs text-muted-foreground mb-1">
                                  Pilih Opsi <span className="text-primary">*</span>
                                </label>
                                {item.id === 37 && (
                                  <select
                                    id={`note-${item.id}`}
                                    className={`w-full border rounded px-2 py-1 text-xs ${!notes[item.id] ? 'border-red-500' : ''}`}
                                    value={notes[item.id] || ''}
                                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                    required
                                  >
                                    <option value="">Pilih ukuran & tipe keranjang</option>
                                    <option value="Oval Small">Oval Small - Rp 70.000</option>
                                    <option value="Oval Medium">Oval Medium - Rp 85.000</option>
                                    <option value="Oval Large">Oval Large - Rp 100.000</option>
                                    <option value="Circle Small">Circle Small - Rp 80.000</option>
                                    <option value="Circle Medium">Circle Medium - Rp 95.000</option>
                                    <option value="Circle Large">Circle Large - Rp 110.000</option>
                                  </select>
                                )}
                                {item.id === 39 && (
                                  <select
                                    id={`note-${item.id}`}
                                    className={`w-full border rounded px-2 py-1 text-xs ${!notes[item.id] ? 'border-red-500' : ''}`}
                                    value={notes[item.id] || ''}
                                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                    required
                                  >
                                    <option value="">Pilih ukuran</option>
                                    <option value="Small">Small - Rp 40.000</option>
                                    <option value="Medium">Medium - Rp 45.000</option>
                                    <option value="Large">Large - Rp 50.000</option>
                                  </select>
                                )}
                                {item.id === 54 && (
                                  <select
                                    id={`note-${item.id}`}
                                    className={`w-full border rounded px-2 py-1 text-xs ${!notes[item.id] ? 'border-red-500' : ''}`}
                                    value={notes[item.id] || ''}
                                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                    required
                                  >
                                    <option value="">Pilih ukuran</option>
                                    <option value="Small">Small - Rp 30.000</option>
                                    <option value="Medium">Medium - Rp 40.000</option>
                                    <option value="Large">Large - Rp 50.000</option>
                                  </select>
                                )}
                                {item.id === 55 && (
                                  <select
                                    id={`note-${item.id}`}
                                    className={`w-full border rounded px-2 py-1 text-xs ${!notes[item.id] ? 'border-red-500' : ''}`}
                                    value={notes[item.id] || ''}
                                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                    required
                                  >
                                    <option value="">Pilih jenis & ukuran stiker</option>
                                    <option value="Hello Small">Hello Small - Rp 10.000</option>
                                    <option value="Hello Medium">Hello Medium - Rp 10.000</option>
                                    <option value="Hello Large">Hello Large - Rp 15.000</option>
                                    <option value="Welcome Small">Welcome/Graduation/Wedding/Birthday Small - Rp 12.000</option>
                                    <option value="Welcome Medium">Welcome/Graduation/Wedding/Birthday Medium - Rp 12.000</option>
                                    <option value="Welcome Large">Welcome/Graduation/Wedding/Birthday Large - Rp 15.000</option>
                                    <option value="Custom Size">Custom Size - Rp 20.000</option>
                                  </select>
                                )}
                                <p className="text-xs text-primary font-medium mt-1">
                                  Reminder: Please select an option according to your product needs.
                                  {!notes[item.id] && (
                                    <span className="block text-red-500">You must select one option.</span>
                                  )}
                                </p>
                              </>
                            ) : (
                              <>
                                <label htmlFor={`note-${item.id}`} className="block text-xs text-muted-foreground mb-1">
                                  Notes (optional)
                                </label>
                                <textarea
                                  id={`note-${item.id}`}
                                  className="w-full border rounded px-2 py-1 text-xs resize-none"
                                  rows={2}
                                  maxLength={200}
                                  placeholder="Add a note..."
                                  value={notes[item.id] || ''}
                                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                                />
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center mt-4 sm:mt-0">
                          <div className="flex items-center border rounded-md mr-4">
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={item.quantity <= 1} className="h-8 w-8">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity, 1)} className="h-8 w-8">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-muted-foreground hover:text-destructive">
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
              <div className="bg-card rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <h2 className="heading-sm">Order Summary</h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatRupiah(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <i>shipping cost adjusted</i>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>{formatRupiah(cartTotal)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                    Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/shop')}>
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
