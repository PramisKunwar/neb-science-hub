import { useState, lazy, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Lazy-loaded components
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-20">
    <div className="w-8 h-8 border-4 border-nebBlue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Contact = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    // In a real app, we would send this data to a server
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prev => ({ ...prev, subject: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingFallback />}>
        <Header />
      </Suspense>
      <main className="flex-1">
        {/* Header Banner */}
        <section className="w-full bg-gradient-to-r from-nebPrimaryDark to-nebPrimary py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-[700px]">
                Have questions or suggestions? Reach out to our team!
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 bg-nebBackground">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8 max-w-5xl mx-auto md:relative">
              {/* Contact Information */}
              <div className="space-y-6 md:pr-8">
                <h2 className="text-2xl font-bold text-nebText">Get in Touch</h2>
                <p className="text-nebText/80">
                  We value your feedback and inquiries. Use the form or contact details below to reach us.
                </p>

                <div className="space-y-6 mt-8">
                  <Card className="border-t-4 border-t-nebBlue transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-nebPalette-lightGray p-3 rounded-full transition-transform duration-300 hover:scale-110">
                          <Mail className="h-5 w-5 text-nebBlue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-nebText">Email</h3>
                          <a 
                            href="mailto:aarabbashyal64@gmail.com" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Send email to Aarab Bashyal"
                          >
                            <span>aarabbashyal64@gmail.com</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                          </a>
                          <a 
                            href="mailto:pramiskunwar123@gmail.com" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Send email to Pramis Kunwar"
                          >
                            <span>pramiskunwar123@gmail.com</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                          </a>
                          <a 
                            href="mailto:pranishkhanal2@gmail.com" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Send email to Pranish Khanal"
                          >
                            <span>pranishkhanal2@gmail.com</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                          </a>
                          <a 
                            href="mailto:deepakpuri931@gmail.com" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Send email to Deepak Puri"
                          >
                            <span>deepakpuri931@gmail.com</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-t-4 border-t-nebBlue transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-nebPalette-lightGray p-3 rounded-full transition-transform duration-300 hover:scale-110">
                          <Phone className="h-5 w-5 text-nebBlue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-nebText">Phone</h3>
                          <a 
                            href="tel:9847008892" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Call this number"
                          >
                            <span>9847008892</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">📞</span>
                          </a>
                          <a 
                            href="tel:9866615675" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Call this number"
                          >
                            <span>9866615675</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">📞</span>
                          </a>
                          <a 
                            href="tel:9805427945" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Call this number"
                          >
                            <span>9805427945</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">📞</span>
                          </a>
                          <a 
                            href="tel:9767622650" 
                            className="text-sm text-nebText/70 hover:text-nebBlue transition-colors duration-300 block flex items-center group"
                            aria-label="Call this number"
                          >
                            <span>9767622650</span>
                            <span className="ml-2 text-nebBlue opacity-0 group-hover:opacity-100 transition-opacity duration-300">📞</span>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-t-4 border-t-nebBlue transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-nebPalette-lightGray p-3 rounded-full transition-transform duration-300 hover:scale-110">
                          <MapPin className="h-5 w-5 text-nebBlue" />
                        </div>
                        <div>
                          <h3 className="font-medium text-nebText">Address</h3>
                          <p className="text-sm text-nebText/70">
                            Manigram, Rupandehi<br />
                            Nepal
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Divider visible only on desktop */}
              <div className="hidden md:block absolute h-full w-px bg-nebPalette-beige left-1/2 top-0 transform -translate-x-1/2 shadow-sm"></div>

              {/* Contact Form */}
              <div className="md:pl-8">
                <Card className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-nebBlue">
                  <CardHeader>
                    <CardTitle className="text-nebText">Send a Message</CardTitle>
                    <CardDescription className="text-nebText/70">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-nebText">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-nebBlue focus:border-transparent bg-nebBackground border-nebPalette-beige"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-nebText">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-nebBlue focus:border-transparent bg-nebBackground border-nebPalette-beige"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-nebText">
                          Subject
                        </label>
                        <Select
                          value={formState.subject}
                          onValueChange={handleSelectChange}
                        >
                          <SelectTrigger className="transition-all duration-300 hover:border-nebBlue bg-nebBackground border-nebPalette-beige">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="content">Content Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-nebText">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message..."
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="transition-all duration-300 focus:ring-2 focus:ring-nebBlue focus:border-transparent bg-nebBackground border-nebPalette-beige"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-nebBlue text-white hover:bg-nebBlueDark transition-all duration-300 hover:shadow-md transform hover:-translate-y-1"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Contact;
