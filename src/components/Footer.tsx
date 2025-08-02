import { Scissors, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold">Elite Couture</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Crafting exceptional custom costumes with precision, elegance, and attention to detail. 
              Your perfect fit is our passion.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
              <Facebook className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-primary-foreground/60 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Wedding Dresses</li>
              <li>Evening Gowns</li>
              <li>Formal Suits</li>
              <li>Traditional Wear</li>
              <li>Casual Dresses</li>
              <li>Alterations</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span>info@elitecouture.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span>123 Fashion District, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>12:00 PM - 5:00 PM</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary-foreground/10 rounded-lg">
              <p className="text-sm text-primary-foreground/90">
                <strong>Appointments Recommended</strong><br />
                Call or email to schedule your consultation
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Elite Couture. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;