
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
              Ateliarra was born from a passion for craftsmanship and a desire to create meaningful gifts that tell a story. 
              Our journey began in a small workshop, where each piece was carefully handcrafted with love and attention to detail.
            </p>
            <p className="text-muted-foreground mb-6">
              Today, we continue to honor traditional techniques while embracing innovation, 
              creating unique pieces that bring joy and beauty to everyday life. 
              Each Ateliarra creation is a testament to the power of handmade and the beauty of imperfection.
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
                 src="https://images.unsplash.com/photo-1698256179114-30758b66f70d" />
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
