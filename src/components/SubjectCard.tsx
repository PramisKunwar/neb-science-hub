import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Atom, FlaskConical, Calculator, Leaf, Mouse, BookText, Book, 
  LucideIcon, Laptop 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";

type SubjectCardProps = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

// Color theme interface for subjects
interface SubjectTheme {
  bg: string;
  border: string;
  highlight: string;
  iconBg: string;
  iconFg: string;
  hoverText: string;
  buttonBorder: string;
  buttonText: string;
  buttonHoverBg: string;
  buttonHoverText: string;
  glowColor: string;
}

// Using memo to prevent unnecessary re-renders
const SubjectCard = memo(function SubjectCard({ id, name, icon, description }: SubjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to detect when card becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Map icon string to Lucide component
  const getIcon = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      atom: Atom,
      "flask-conical": FlaskConical,
      calculator: Calculator,
      leaf: Leaf,
      mouse: Mouse,
      "book-text": BookText,
      book: Book,
      laptop: Laptop
    };
    return icons[iconName] || Book;
  };

  // Color mapping for subject cards with comprehensive theming
  const getSubjectTheme = (subjectId: string): SubjectTheme => {
    const themes: Record<string, SubjectTheme> = {
      physics: {
        bg: "bg-blue-50",
        border: "border-t-4 border-t-blue-400",
        highlight: "bg-blue-500",
        iconBg: "bg-blue-100",
        iconFg: "text-blue-600",
        hoverText: "group-hover:text-blue-700",
        buttonBorder: "border-blue-500",
        buttonText: "text-blue-600",
        buttonHoverBg: "hover:bg-blue-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#3b82f6" // blue
      },
      chemistry: {
        bg: "bg-green-50",
        border: "border-t-4 border-t-green-400",
        highlight: "bg-green-500",
        iconBg: "bg-green-100",
        iconFg: "text-green-600",
        hoverText: "group-hover:text-green-700",
        buttonBorder: "border-green-500",
        buttonText: "text-green-600",
        buttonHoverBg: "hover:bg-green-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#10b981" // green
      },
      mathematics: {
        bg: "bg-purple-50",
        border: "border-t-4 border-t-purple-400",
        highlight: "bg-purple-500",
        iconBg: "bg-purple-100",
        iconFg: "text-purple-600",
        hoverText: "group-hover:text-purple-700",
        buttonBorder: "border-purple-500",
        buttonText: "text-purple-600",
        buttonHoverBg: "hover:bg-purple-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#8b5cf6" // purple
      },
      botany: {
        bg: "bg-emerald-50",
        border: "border-t-4 border-t-emerald-400",
        highlight: "bg-emerald-500",
        iconBg: "bg-emerald-100",
        iconFg: "text-emerald-600",
        hoverText: "group-hover:text-emerald-700",
        buttonBorder: "border-emerald-500",
        buttonText: "text-emerald-600",
        buttonHoverBg: "hover:bg-emerald-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#059669" // emerald
      },
      zoology: {
        bg: "bg-orange-50",
        border: "border-t-4 border-t-orange-400",
        highlight: "bg-orange-500",
        iconBg: "bg-orange-100",
        iconFg: "text-orange-600",
        hoverText: "group-hover:text-orange-700",
        buttonBorder: "border-orange-500",
        buttonText: "text-orange-600",
        buttonHoverBg: "hover:bg-orange-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#f97316" // orange
      },
      computer: {
        bg: "bg-sky-50",
        border: "border-t-4 border-t-sky-400",
        highlight: "bg-sky-500",
        iconBg: "bg-sky-100",
        iconFg: "text-sky-600",
        hoverText: "group-hover:text-sky-700",
        buttonBorder: "border-sky-500",
        buttonText: "text-sky-600",
        buttonHoverBg: "hover:bg-sky-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#0ea5e9" // sky
      },
      english: {
        bg: "bg-rose-50",
        border: "border-t-4 border-t-rose-400",
        highlight: "bg-rose-500",
        iconBg: "bg-rose-100",
        iconFg: "text-rose-600",
        hoverText: "group-hover:text-rose-700",
        buttonBorder: "border-rose-500",
        buttonText: "text-rose-600",
        buttonHoverBg: "hover:bg-rose-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#f43f5e" // rose
      },
      nepali: {
        bg: "bg-amber-50",
        border: "border-t-4 border-t-amber-400",
        highlight: "bg-amber-500",
        iconBg: "bg-amber-100",
        iconFg: "text-amber-600",
        hoverText: "group-hover:text-amber-700",
        buttonBorder: "border-amber-500",
        buttonText: "text-amber-600",
        buttonHoverBg: "hover:bg-amber-600",
        buttonHoverText: "hover:text-white",
        glowColor: "#f59e0b" // amber
      }
    };
    
    // Default theme if subject not found
    const defaultTheme: SubjectTheme = {
      bg: "bg-gray-50",
      border: "border-t-4 border-t-gray-400",
      highlight: "bg-gray-500",
      iconBg: "bg-gray-100",
      iconFg: "text-gray-600",
      hoverText: "group-hover:text-gray-700",
      buttonBorder: "border-gray-500",
      buttonText: "text-gray-600",
      buttonHoverBg: "hover:bg-gray-600",
      buttonHoverText: "hover:text-white",
      glowColor: "#6b7280" // gray
    };
    
    return themes[subjectId] || defaultTheme;
  };

  const IconComponent = getIcon(icon);
  const theme = getSubjectTheme(id);

  // Animation class that only applies after card is visible
  const animationClass = isVisible 
    ? "transition-all duration-300" 
    : "opacity-0";

  return (
    <Card 
      ref={cardRef}
      className={`h-full ${animationClass} ${theme.bg} ${theme.border} hover:shadow-lg focus-within:shadow-lg group ${isVisible ? "animate-fade-in" : ""} ${isFocused ? "animate-border-highlight" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => {
        setIsHovered(true);
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsHovered(false);
        setIsFocused(false);
      }}
      style={{
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div className={`absolute top-0 left-0 w-1 h-0 ${theme.highlight} transition-all duration-300 ${isHovered ? 'h-full' : ''}`}></div>
      <CardHeader className="pb-2 pt-5 px-6 relative">
        <div 
          className={`w-14 h-14 rounded-full ${theme.iconBg} shadow-sm flex items-center justify-center mb-4 border border-gray-100 transition-all duration-300 group-hover:shadow-md`} 
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <IconComponent 
            className={`h-7 w-7 ${theme.iconFg} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} 
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
        <CardTitle className={`text-xl font-bold text-gray-800 transition-colors duration-300 ${theme.hoverText}`}>
          {name}
        </CardTitle>
        
        <div 
          className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] border-t-transparent border-r-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ 
            borderRightColor: theme.glowColor,
          }}
          aria-hidden="true"
        ></div>
      </CardHeader>
      <CardContent className="px-6">
        <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{description}</p>
      </CardContent>
      <CardFooter className="px-6 pb-5 pt-2">
        <Link to={`/subjects/${id}`} className="w-full focus:outline-none">
          <Button 
            variant="outline" 
            className={`w-full ${theme.buttonBorder} ${theme.buttonText} ${theme.buttonHoverBg} ${theme.buttonHoverText} transition-all duration-300 font-medium relative overflow-hidden focus:ring-2 focus:ring-opacity-30`}
            style={{ 
              "--ring-color": theme.glowColor 
            } as React.CSSProperties}
          >
            <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              View Notes
              {isHovered && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>
              )}
            </span>
            <span 
              className={`absolute inset-0 ${theme.highlight} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              style={{
                transformOrigin: 'left',
                transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 300ms ease-out',
              }}
              aria-hidden="true"
            ></span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

export default SubjectCard;
