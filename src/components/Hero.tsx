import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ruler, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToMeasurements = () => {
    const element = document.getElementById('measurements');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Elite Couture Workshop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Tailored to 
              <span className="text-accent"> Perfection</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              Experience the finest in custom dress design. From measurements to delivery, 
              we craft your perfect costume with precision and elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={scrollToMeasurements}
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
              >
                <Ruler className="mr-2 h-5 w-5" />
                Start Measurements
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white hover:bg-white hover:text-primary text-lg px-8 py-6"
              >
                View Portfolio
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-accent mr-1" />
                  <span className="text-2xl font-bold">5.0</span>
                </div>
                <p className="text-sm text-white/80">Customer Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-accent mr-1" />
                  <span className="text-2xl font-bold">1000+</span>
                </div>
                <p className="text-sm text-white/80">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-accent mr-1" />
                  <span className="text-2xl font-bold">15+</span>
                </div>
                <p className="text-sm text-white/80">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="bg-card/95 backdrop-blur-sm p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold mb-6 text-center text-primary">
                Quick Consultation
              </h3>
              <div className="space-y-4">
                <div className="border border-border rounded-lg p-4 bg-background">
                  <h4 className="font-semibold text-foreground mb-2">Free Measurement Guide</h4>
                  <p className="text-sm text-muted-foreground">
                    Get our professional measurement guide delivered to your email.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background">
                  <h4 className="font-semibold text-foreground mb-2">Virtual Consultation</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule a free 15-minute consultation with our design experts.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-background">
                  <h4 className="font-semibold text-foreground mb-2">Express Service</h4>
                  <p className="text-sm text-muted-foreground">
                    Rush orders available with 7-day delivery guarantee.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;