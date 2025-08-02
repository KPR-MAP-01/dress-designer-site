import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MeasurementForm from "@/components/MeasurementForm";
import OrderTracking from "@/components/OrderTracking";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <MeasurementForm />
      <OrderTracking />
      <Footer />
    </div>
  );
};

export default Index;
