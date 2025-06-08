import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

const logoUrl = "/images/muted_coral_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary mt-16">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logoUrl} alt="Ateliarra Logo" className="h-16" />
            </Link>
            <p className="text-muted-foreground mb-6">
              Handcrafted gifts made with love and attention to detail. Each piece tells a unique story.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="social-icon" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="social-icon" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Quick Links</p>
            <ul className="space-y-2">
              <li><Link to="/shop" className="footer-link">Shop All</Link></li>
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
              <li><Link to="#" className="footer-link">FAQs</Link></li>
              <li><Link to="#" className="footer-link">Shipping & Returns</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Categories</p>
            <ul className="space-y-2">
              <li><Link to="/shop?category=home-decor" className="footer-link">Home Decor</Link></li>
              <li><Link to="/shop?category=jewelry" className="footer-link">Jewelry</Link></li>
              <li><Link to="/shop?category=accessories" className="footer-link">Accessories</Link></li>
              <li><Link to="/shop?category=stationery" className="footer-link">Stationery</Link></li>
              <li><Link to="/shop?category=gift-sets" className="footer-link">Gift Sets</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">123 Artisan Street, Craftville, CV 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+1 (234) 567-8901</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">hello@ateliarra.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Ateliarra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;