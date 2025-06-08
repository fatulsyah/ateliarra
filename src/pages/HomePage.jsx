import React from 'react';
import Hero from '@/components/Hero';
import GiftOptionsSection from '@/components/GiftOptionsSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturedProducts from '@/components/FeaturedProducts';
import StorySection from '@/components/StorySection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';

const HomePage = () => {
  return (
    <>
      <Hero />
      <GiftOptionsSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <StorySection />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;