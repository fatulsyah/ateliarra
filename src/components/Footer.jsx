import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';
import { scrollToTop } from '@/utils/scrollToTop';

const logoUrl = "/images/muted_coral_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary mt-16">
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <img src={logoUrl} alt="Ateliarra Logo" className="h-16" />
            </Link>
            <p className="text-muted-foreground mb-6">
                Handcrafted with love — Ateliarra celebrates thoughtful gifting for every moment.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/ateliarra/"
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@ateliarra" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon"
                aria-label="Tiktok"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Quick Links</p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Contact Us
                </Link>
              </li>
              {/* <li><Link to="#" className="footer-link">FAQs</Link></li>
              <li><Link to="#" className="footer-link">Shipping & Returns</Link></li> */}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Categories</p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop?category=handcrafted-gift"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Handcrafted Gift
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=hampers"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Hampers
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=sweet-little-extras"
                  className="footer-link"
                  onClick={scrollToTop}
                >
                  Sweet Little Extras
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <p className="font-medium text-lg mb-4 text-foreground">Contact Us</p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">Gardens at Candi Sawangan, Depok, Indonesia</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+62 857-7315-3313</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">ateliarra@gmail.com</span>
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