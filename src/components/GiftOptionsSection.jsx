import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Gift, PackagePlus } from 'lucide-react';

const GiftOptionsSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg">The Easiest Way to Gift</h2>
          <p className="section-subtitle mt-6 flex flex-col space-y-4 ">
          Choose from our curated ready-made gifts or create your own personalized hampers. 
          Whether you're celebrating a special moment or simply sending love, Ateliarra offers thoughtful gifting made easy.<br />
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <img 
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Custom a Gift Box"
             src="images/custom-gift.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end p-8 text-center">
              <PackagePlus className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Custom a Gift</h3>
              <p className="text-white/90 mb-6">
                Build your perfect gift box step-by-step. Choose your packaging, items, and card.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/custom-gift">Start Building</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-lg overflow-hidden shadow-lg group"
          >
            <img 
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Shop Ready-Made Gifts"
             src="images/shop-ready-made.png" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end p-8 text-center">
              <Gift className="w-12 h-12 text-white mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Shop Ready-Made</h3>
              <p className="text-white/90 mb-6">
                Explore our curated collection of handcrafted gifts, ready to ship.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/shop">Browse Collection</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftOptionsSection;