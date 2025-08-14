import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const eventDetails = {
  title: "Special Event: 17-an Kumpul Bocah",
  subtitle: "Main, Tawa, Ceria Keluarga Alphabeta",
  date: "Saturday, August 16, 2025",
  location: "WuffySpace Raya Bintaro",
  description: (
    <>
      Come and join with your family and friends — <br />
      let’s celebrate independence with laughter, joy, and unforgettable memories!
    </>
  ),
  poster: "/images/event-poster.jpeg",
  hampers: [
    { name: <>Hampers for<br />#1st Winner</>, image: "/images/hampers1.jpeg" },
    { name: <>Hampers for<br />#2nd Winner</>, image: "/images/hampers2.jpeg" },
    { name: <>Hampers for<br />#3rd Winner</>, image: "/images/hampers3.jpeg" },
    { name: <> Gift for<br />Participants</>, image: "/images/little-gift.jpeg" },
  ],
};

const posterImages = [
  "/images/event-poster.jpeg",
  "/images/poster-lomba.jpeg",
];

const EventsPage = () => {
  const [posterIdx, setPosterIdx] = useState(0);

  // Slideshow otomatis setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setPosterIdx((prev) => (prev + 1) % posterImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextPoster = () => setPosterIdx((prev) => (prev + 1) % posterImages.length);
  const prevPoster = () => setPosterIdx((prev) => (prev - 1 + posterImages.length) % posterImages.length);

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img  
            className="w-full h-full object-cover" 
            alt="Artisan workshop with natural materials"
            src="/images/event-banner.png" />
        </div>
        
        <div className="container-custom relative z-10 min-h-[50vh] flex flex-col justify-center items-center text-center text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
          </motion.div>
        </div>
      </div>
      
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto"
          >
            <h2 className="section-title" style={{ paddingTop: 50, paddingBottom: 20 }}>Our Journey of Events & Partnerships</h2>
            <p className="text-muted-foreground mb-6">
            At Ateliarra, <b>every event is a story we craft with our partners and participants</b> — from intimate workshops to grand celebrations, each moment is designed with care, creativity, and a shared vision. Over the years, we’ve worked with inspiring brands and communities to create unique experiences that leave a lasting impression.
            </p>
            <p className="text-muted-foreground mb-6" style={{paddingBottom: 50}}>
            We prepare little gifts for every participant and special hampers for our winners as a token of appreciation. For us, it’s not just about hosting events, but building meaningful connections, celebrating creativity, and creating moments to cherish for years to come.
            </p>
          </motion.div>
        </div>
      <section className="section-padding section-padding bg-secondary/50">
      <div className="container-custom max-w-6xl mx-auto py-1">
        <h1 className="section-title" style={{paddingTop: 0}}>{eventDetails.title}</h1>
        <div className="flex flex-col lg:flex-row gap-6  mb-8">
          <div className="flex-grow">
            <h2 className="font-semibold text-2xl mb-2">{eventDetails.subtitle}</h2>
            <p className="text-muted-foreground mb-2">
              Let’s make Indonesia’s Independence Day extra fun <br />with <b>Alphabeta x Ateliarra!</b>
            </p>
            <p className="text-muted-foreground mb-4">
              Bring your energy and smiles, because we’ve prepared <br />exciting games for the little ones:
              <ul className="list-none mt-2 mb-4 space-y-2">
                <li>🍼 Diaper Changing Contest <span className="text-xs text-muted-foreground">(Ages 0 – 1.5 years)</span></li>
                <li>🚩 Flag Moving Contest <span className="text-xs text-muted-foreground">(Ages 1 – 3 years)</span></li>
                <li>🍪 Snack Eating Contest <span className="text-xs text-muted-foreground">(Ages 1 – 3 years)</span></li>
                <li>🎯 Target Throw Contest <span className="text-xs text-muted-foreground">(Ages &gt; 3 years)</span></li>
                <li>🐟 Fish Catching Contest <span className="text-xs text-muted-foreground">(Ages &gt; 3 years)</span></li>
                <li>🎈 Family Balloon Coordination Contest <span className="text-xs text-muted-foreground">(Family Category)</span></li>
                <li>📸 Independence Day Family Photo Contest <span className="text-xs text-muted-foreground">(Family Category)</span></li>
              </ul> 
              Win special prizes for the champions and <br />don’t miss out on exciting door prizes for lucky participants.
            </p>
            <div className="mb-4">
              <h2 className="font-semibold text-xl mb-2">Event Details</h2>
              <p className="mb-1"><strong>Date:</strong> {eventDetails.date}</p>
              <p className="mb-1"><strong>Location:</strong> {eventDetails.location}</p>
              <p className="mb-2">{eventDetails.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full lg:w-96 flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center">
              {/* Prev Button - kiri poster */}
              <button
                className="absolute left-[-32px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-2 py-1 shadow transition-all border border-gray-200"
                onClick={prevPoster}
                aria-label="Previous"
                style={{ zIndex: 2 }}
              >
                <span className="text-2xl font-bold text-gray-500">&lsaquo;</span>
              </button>
              {/* Poster Image */}
              <img
                src={posterImages[posterIdx]}
                alt="Event Poster"
                className="rounded-lg w-full object-cover"
                style={{ minHeight: 400, maxHeight: 800, objectFit: 'cover' }}
              />
              {/* Next Button - kanan poster */}
              <button
                className="absolute right-[-32px] top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full px-2 py-1 shadow transition-all border border-gray-200"
                onClick={nextPoster}
                aria-label="Next"
                style={{ zIndex: 2 }}
              >
                <span className="text-2xl font-bold text-gray-500">&rsaquo;</span>
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              {posterImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === posterIdx ? "bg-primary" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
    </div>
    </section>
      <h2 className="section-title" style={{paddingTop: 50}}> Hampers for the Winners & Little Gifts</h2>
      <p className="text-muted-foreground text-center mb-6" style={{paddingBottom: 70}}> Turning moments into memories, and winners into stars.
      <br />We create each gift with the hope that it becomes a little bridge — connecting people through warmth, gratitude, and love.
      <br />With Ateliarra, joy, presence, and care are wrapped in something beautiful. Because every moment matters, and every heart deserves to feel remembered.
      <br />
      <br />🌟 This exclusive hampers is specially prepared for the 1st, 2nd, and 3rd <br /><b>place winners of the Family Balloon Relay Competition.</b> 
      <br />Ateliarra is more than just a gift — it’s love, crafted with heart. ❤️</p>
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventDetails.hampers.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center rounded-lg shadow hover:shadow-lg transition-shadow">
              <img
                src={item.image}
                alt="Hampers"
                className="rounded-md w-full h-70 object-cover mb-2"
              />
              <div className="text-center p-4">{item.name}</div>
            </div>
          ))}
        </div>
      
        <div className="container-custom max-w-4xl mx-auto py-16">
          <h2 className="section-title text-center mb-8">Join Us for More Events!</h2>
          <p className="text-muted-foreground text-center mb-6">
            Stay tuned for more exciting events and collaborations. Follow us on our social media channels to be the first to know about upcoming events, special offers, and more!
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:justify-center md:gap-12 gap-6 items-center">
          <h2 className="heading-md text-center mb-2 mt-8">
          Together with Our Partners
        </h2>
        <div className="rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
          <img  
            className="max-w-[250px] w-auto h-auto object-contain"
            alt="Ateliarra Logo"
            src="/images/atr-new.png"
          />
        </div>
        <div className="rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
          <img  
            className="max-w-[250px] w-auto h-auto object-contain"
            alt="Alphabeta Logo"
            src="/images/alphabeta-logo.png"
          />
        </div>
      </div>
    </>
  );
};

export default EventsPage;
