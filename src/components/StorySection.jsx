
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StorySection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="heading-lg mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Ateliarra began with a simple wish — to create gifts that carry more than just objects, but also stories, warmth, and love.
              Founded on May 20th, 2025, the name Ateliarra combines two worlds:
              “Atelier”, meaning art studio, and “Arra”, short for Arifatul Raden, the heart behind it all.
              Every piece is carefully handcrafted — not just made, but felt.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe that a gift is a reflection of care, and that even the smallest token can hold deep meaning when it’s crafted with joy and intention.
              In a world that moves fast, we slow down.
              We wrap your moments in beautiful details, thoughtful textures, and quiet elegance — so you can share something real.
              With Ateliarra, giving becomes more than a gesture.
              It becomes a memory.
            </p>
            <Button asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img  
                  className="w-full h-auto" 
                  alt="Artisan crafting handmade products"
                 src="images/atr-product.png" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary rounded-lg -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
