import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/banner-1.png',
    title: 'Craft Your Perfect Gift',
    subtitle: 'Personalized hampers for every occasion, made with love.',
    // ctaText: 'Create a Custom Gift',
    ctaText: 'Shop Ready-Handcrafted',
    // ctaLink: '/custom-gift',
    ctaLink: '/shop',

  },
  {
    id: 2,
    image: '/images/banner-2.png',
    title: 'Ready-to-Ship Handcrafted Gifts',
    subtitle: 'Discover unique, artisanal presents ready to delight.',
    ctaText: 'Shop Ready-Handcrafted',
    ctaLink: '/shop',
  },
  {
    id: 3,
    image: '/images/banner-3.png',
    title: 'Gifts That Tell a Story',
    subtitle: 'Each Ateliarra piece is crafted with passion and care.',
    ctaText: 'Explore Our Collections',
    ctaLink: '/shop',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setTimeout(nextSlide, 7000); // Auto-slide every 7 seconds
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img 
            className="w-full h-full object-cover"
            alt={slides[currentSlide].title}
            src={slides[currentSlide].image}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      <div className="container-custom relative z-10 h-full flex flex-col justify-center items-start text-white">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-xl md:max-w-2xl"
        >
          <h1 className="heading-xl mb-4 text-left">{slides[currentSlide].title}</h1>
          <p className="body-lg mb-8 text-left">{slides[currentSlide].subtitle}</p>
          <Button asChild size="lg" className="text-base bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to={slides[currentSlide].ctaLink}>{slides[currentSlide].ctaText}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;