import { Button } from "@/components/ui/button";
import { Scissors, Phone, Mail } from "lucide-react";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Scissors className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-primary">Elite Couture</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('measurements')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Measurements
            </button>
            <button 
              onClick={() => scrollToSection('tracking')}
              className="text-foreground hover:text-accent transition-colors"
            >
              Track Order
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@elitecouture.com</span>
              </div>
            </div>
            <Button 
              onClick={() => scrollToSection('measurements')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;