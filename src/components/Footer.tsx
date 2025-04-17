import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Mail, Send, Youtube } from "lucide-react";
import TikTokIcon from "@/components/ui/icons/TikTokIcon";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useState, useRef, useEffect, lazy, Suspense } from "react";

// Lazy-load heavy components if needed in the future
// const SomeHeavyComponent = lazy(() => import("@/components/SomeHeavyComponent"));

// Define color categories for different sections
const colors = {
  social: {
    hover: "hover:text-blue-500 hover:scale-110",
    icon: "transition-all duration-300 ease-in-out",
    bg: "bg-blue-50"
  },
  navigation: {
    hover: "hover:text-green-600 hover:translate-x-1",
    link: "transition-all duration-200 ease-in-out",
    bg: "bg-green-50"
  },
  newsletter: {
    hover: "hover:bg-amber-600",
    button: "transition-all duration-200 ease-in-out",
    bg: "bg-amber-50"
  }
};

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Detect when footer comes into view for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitSuccess(true);
      setEmailInput(""); // Clear input on success
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation classes based on visibility
  const fadeInClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8";
  const animationDelayStyle = (index: number) => ({
    transitionDelay: `${index * 100}ms`,
    transitionProperty: 'all',
    transitionDuration: '500ms',
    transitionTimingFunction: 'ease-out'
  });

  return (
    <footer ref={footerRef} className="bg-gray-100 border-t border-gray-200 py-12 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div 
            className={`space-y-4 transition-all duration-500 ${fadeInClass}`} 
            style={animationDelayStyle(0)}
          >
            <h3 className="text-lg font-bold text-nebPrimary relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-nebPrimary after:transition-all after:duration-300 group-hover:after:w-full">
              NEB Science Hub
            </h3>
            <p className="text-sm text-gray-600">
              Your one-stop resource for Grade 11 science notes, past papers, and revision materials
              following the NEB curriculum in Nepal.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61569376490315", id: "facebook" },
                { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@AP2DShiksha", id: "youtube" },
                { icon: TikTokIcon, label: "TikTok", href: "https://www.tiktok.com/@ap2dshiksha", id: "tiktok" },
                { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/pramiskunwar/?hl=en", id: "instagram" }
              ].map((social, index) => (
                <a 
                  key={social.id}
                  href={social.href} 
                  aria-label={social.label} 
                  className={`text-gray-500 ${colors.social.hover}`}
                  onMouseEnter={() => setIsHovered(social.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  style={{ transform: isHovered === social.id ? 'scale(1.1)' : 'scale(1)' }}
                >
                  <social.icon className={`h-5 w-5 ${colors.social.icon}`} />
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div 
            className={`space-y-4 transition-all duration-500 ${fadeInClass}`} 
            style={animationDelayStyle(1)}
          >
            <h3 className="text-lg font-bold text-nebPrimary relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-nebPrimary after:transition-all after:duration-300 hover:after:w-full">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/pyq", label: "Previous Year Questions" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact Us" }
              ].map((link, index) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-gray-600 ${colors.navigation.hover} text-sm flex items-center ${colors.navigation.link}`}
                  onMouseEnter={() => setIsHovered(`link-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 transition-all duration-300 ease-in-out" 
                    style={{ 
                      backgroundColor: isHovered === `link-${index}` ? '#3b82f6' : '#d1d5db',
                      transform: isHovered === `link-${index}` ? 'scale(1.5)' : 'scale(1)'
                    }} 
                  />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div 
            className={`space-y-4 transition-all duration-500 ${fadeInClass}`} 
            style={animationDelayStyle(2)}
          >
            <h3 className="text-lg font-bold text-nebPrimary relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-nebPrimary after:transition-all after:duration-300 hover:after:w-full">
              Get Updates & Insights
            </h3>
            <p className="text-sm text-gray-600">
              Stay updated with our latest notes and exam tips!
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2 relative">
              <Input
                type="email"
                placeholder="Your email address"
                className={`flex-1 focus:ring-2 focus:ring-nebBlue focus:border-transparent transition-all duration-300 ${submitSuccess ? 'border-green-500' : ''}`}
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={isSubmitting || submitSuccess}
              />
              <Button 
                type="submit" 
                size="sm" 
                className={`bg-nebBlue text-white ${colors.newsletter.hover} ${colors.newsletter.button} relative overflow-hidden`}
                disabled={isSubmitting || submitSuccess}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : submitSuccess ? (
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
              {submitSuccess && (
                <div className="absolute -bottom-6 left-0 text-xs text-green-600 font-medium">
                  Successfully subscribed!
                </div>
              )}
            </form>
            <div 
              className="flex items-center space-x-2 text-sm text-gray-600 group"
              onMouseEnter={() => setIsHovered('email')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Mail className={`h-4 w-4 ${colors.social.icon}`} 
                style={{ 
                  transform: isHovered === 'email' ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0deg)'
                }}
              />
              <span className="transition-colors duration-300 group-hover:text-nebBlue">ap2dshiksha@gmail.com</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-gray-600 transition-opacity duration-500" style={{ opacity: isVisible ? 1 : 0 }}>
          <p>© 2081/82 NEB Science Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
