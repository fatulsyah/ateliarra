
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    text: 'The handcrafted jewelry I received was absolutely stunning. The attention to detail is remarkable, and it came in such beautiful packaging. Will definitely order again!',
    rating: 5,
    image: 'portrait of a smiling woman with long brown hair'
  },
  {
    id: 2,
    name: 'Michael Chen',
    text: 'I ordered a custom gift set for my wife\'s birthday, and she loved it! The quality of each item was exceptional, and the personalized touch made it extra special.',
    rating: 5,
    image: 'portrait of a young asian man with glasses'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    text: 'The home decor pieces I purchased have transformed my living room. They\'re not just beautiful but also made with such care and quality materials. Highly recommend!',
    rating: 4,
    image: 'portrait of a woman with curly hair smiling at camera'
  }
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-accent">
      <div className="container-custom">
        {/* <h2 className="section-title">What Our Customers Say</h2> */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4 rounded-full overflow-hidden w-12 h-12">
                  <img  
                    className="w-full h-full object-cover" 
                    alt={`${testimonial.name} portrait`}
                   src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                </div>
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4"
                        fill={i < testimonial.rating ? "currentColor" : "none"}
                      />
                    ))} */}
                  {/* </div>
                </div> */}
              {/* </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </motion.div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
