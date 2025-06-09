
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover" 
            alt="Artisan workshop with natural materials"
           src="images/banner-story.png" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container-custom relative z-10 min-h-[50vh] flex flex-col justify-center items-center text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="heading-xl mb-4">Our Story</h1>
            <p className="body-lg max-w-2xl mx-auto">
              The heart behind every handcrafted gift.
            </p>
          </motion.div>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto"
          >
            <h2 className="heading-lg text-center mb-8">The Beginning of Ateliarra</h2>
            <p className="text-muted-foreground mb-6">
            Ateliarra was born on May 20th, 2025, out of a deep love for heartfelt giving and the joy of crafting meaningful gifts.
            The name Ateliarra is a blend of two elements:            
            </p>
            <p className="text-muted-foreground mb-6">
            <b>“Atelier”</b> a French word meaning art studio,
            and <b>“Arra”</b> short for the owner's name, the soul behind this brand.
            Together, they form Ateliarra — a creative space where every gift is crafted with care, love, and a personal touch.
            </p>
            
            <div className="my-12 rounded-lg overflow-hidden">
              <img  
                className="w-full h-auto" 
                alt="Founder working in studio"
                src="images/atr-product.png" />
            </div>
            
            <h2 className="heading-lg text-center mb-8">Our Philosophy</h2>
            <p className="text-muted-foreground mb-6">
            At Ateliarra, we believe in the beauty of the handcrafted — gifts made not by machines, but by hands that pour in joy, time, and attention to detail.
            A handcrafted gift is more than an object. It's a reflection of love, intention, and story.
            </p>
            <p className="text-muted-foreground mb-6">
            In a world full of instant things, we choose slow, thoughtful creation — so every piece feels personal, unique, and special.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="rounded-lg overflow-hidden">
                <img  
                  className="w-full h-auto aspect-square object-cover" 
                  alt="Artisan working with clay"
                 src="images/products/31.png" />
              </div>
              <div className="rounded-lg overflow-hidden">
                <img  
                  className="w-full h-auto aspect-square object-cover" 
                  alt="Artisan weaving textile"
                 src="images/products/3.png" />
              </div>
            </div>
            
            {/* <h2 className="heading-lg text-center mb-8">Our Artisans</h2>
            <p className="text-muted-foreground mb-6">
              Behind every Ateliarra creation is a skilled artisan with years of experience and a deep love for their craft. Our team includes potters, weavers, woodworkers, and jewelry makers, each bringing their unique perspective and expertise to our collection.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe in fair compensation and creating a supportive environment where creativity can flourish. Many of our artisans have been with us since the beginning, growing alongside Ateliarra and contributing to our evolving story.
            </p>
            
            <div className="my-12 rounded-lg overflow-hidden">
              <img  
                className="w-full h-auto" 
                alt="Team of artisans"
               src="https://images.unsplash.com/photo-1697321150897-b5323e6bed79" />
            </div> */}
            
            <h2 className="heading-lg text-center mb-8">Our Commitment</h2>
            <p className="text-muted-foreground mb-6">
              We create each gift with the hope that it becomes a little bridge — connecting people through warmth, gratitude, and love.
              With Ateliarra, you're not just sending a present.
              You're sharing joy, presence, and care — all wrapped in something beautiful.
              Because every moment matters, and every heart deserves to feel remembered.
              Ateliarra is more than gifts — it’s love, crafted ❤️
            </p>
            <p className="text-muted-foreground">
              Thank you for supporting handmade and for being part of the Ateliarra story. We hope our creations bring joy, beauty, and meaning to your life and to the special moments you share with others.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
