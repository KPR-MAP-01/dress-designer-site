import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CustomerData {
  // Customer Info
  fullName: string;
  email: string;
  phone: string;
  address: string;
  
  // Costume Details
  costumeType: string;
  
  // Measurements
  chest: string;
  waist: string;
  hips: string;
  shoulderWidth: string;
  sleeveLength: string;
  length: string;
  neckline: string;
  inseam: string;
  
  // Additional Info
  specialRequests: string;
  deliveryDate: string;
  sampleImage: File | null;
}

const MeasurementForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CustomerData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    costumeType: '',
    chest: '',
    waist: '',
    hips: '',
    shoulderWidth: '',
    sleeveLength: '',
    length: '',
    neckline: '',
    inseam: '',
    specialRequests: '',
    deliveryDate: '',
    sampleImage: null,
  });

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, sampleImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate order ID
    const orderId = 'EC' + Date.now().toString().slice(-6);
    
    // Store order data (in real app, this would go to a backend)
    const orderData = {
      ...formData,
      orderId,
      status: 'received',
      createdAt: new Date().toISOString(),
    };
    
    // Store in localStorage for demo purposes
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    toast({
      title: "Order Submitted Successfully!",
      description: `Your order ID is: ${orderId}. We'll contact you within 24 hours.`,
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      costumeType: '',
      chest: '',
      waist: '',
      hips: '',
      shoulderWidth: '',
      sleeveLength: '',
      length: '',
      neckline: '',
      inseam: '',
      specialRequests: '',
      deliveryDate: '',
      sampleImage: null,
    });
  };

  const getMeasurementFields = () => {
    const commonFields = [
      { key: 'chest', label: 'Chest/Bust (inches)', required: true },
      { key: 'waist', label: 'Waist (inches)', required: true },
      { key: 'hips', label: 'Hips (inches)', required: true },
      { key: 'shoulderWidth', label: 'Shoulder Width (inches)', required: true },
      { key: 'length', label: 'Total Length (inches)', required: true },
    ];

    const additionalFields: { [key: string]: any[] } = {
      'wedding-dress': [
        { key: 'neckline', label: 'Neckline to Waist (inches)', required: true },
        { key: 'sleeveLength', label: 'Sleeve Length (inches)', required: false },
      ],
      'suit': [
        { key: 'inseam', label: 'Inseam (inches)', required: true },
        { key: 'sleeveLength', label: 'Sleeve Length (inches)', required: true },
      ],
      'evening-gown': [
        { key: 'neckline', label: 'Neckline to Waist (inches)', required: true },
      ],
      'casual-dress': [
        { key: 'sleeveLength', label: 'Sleeve Length (inches)', required: false },
      ],
      'traditional-wear': [
        { key: 'sleeveLength', label: 'Sleeve Length (inches)', required: false },
        { key: 'neckline', label: 'Neckline to Waist (inches)', required: false },
      ],
    };

    return [...commonFields, ...(additionalFields[formData.costumeType] || [])];
  };

  return (
    <section id="measurements" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Custom Measurement Form
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Provide your measurements and preferences for a perfectly tailored costume
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-accent" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Costume Type & Sample Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-accent" />
                  Costume Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="costumeType">Costume Type *</Label>
                  <Select 
                    value={formData.costumeType} 
                    onValueChange={(value) => handleInputChange('costumeType', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select costume type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding-dress">Wedding Dress</SelectItem>
                      <SelectItem value="evening-gown">Evening Gown</SelectItem>
                      <SelectItem value="suit">Formal Suit</SelectItem>
                      <SelectItem value="casual-dress">Casual Dress</SelectItem>
                      <SelectItem value="traditional-wear">Traditional Wear</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={formData.deliveryDate}
                    onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                    className="mt-1"
                    min={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <Label htmlFor="sampleImage">Upload Sample Image</Label>
                  <Input
                    id="sampleImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a reference image of your desired costume
                  </p>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="mt-1"
                    rows={3}
                    placeholder="Any specific requirements, fabric preferences, or special instructions..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Measurements Section */}
          {formData.costumeType && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" />
                  Measurements for {formData.costumeType.replace('-', ' ').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getMeasurementFields().map((field) => (
                    <div key={field.key}>
                      <Label htmlFor={field.key}>
                        {field.label} {field.required && '*'}
                      </Label>
                      <Input
                        id={field.key}
                        value={formData[field.key as keyof CustomerData] as string}
                        onChange={(e) => handleInputChange(field.key as keyof CustomerData, e.target.value)}
                        required={field.required}
                        className="mt-1"
                        placeholder="0.0"
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Measurement Tips:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Measure over undergarments you plan to wear</li>
                    <li>• Keep the measuring tape snug but not tight</li>
                    <li>• Stand straight with arms at your sides</li>
                    <li>• Have someone help you for accurate measurements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 text-center">
            <Button 
              type="submit" 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-12 py-6 text-lg"
              disabled={!formData.costumeType || !formData.fullName || !formData.email}
            >
              Submit Order
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MeasurementForm;