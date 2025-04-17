import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Atom, FlaskConical, Calculator, Leaf, Mouse, BookText, Book, 
  LucideIcon, Laptop, Microscope, Bug
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, memo } from "react";
import { BookmarkButton } from "@/components/BookmarkButton";

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
      laptop: Laptop,
      microscope: Microscope,
      bug: Bug
    };
    return icons[iconName] || Book;
  };

  // Get a specific icon for subjects regardless of the icon prop
  const getSubjectSpecificIcon = (subjectId: string): LucideIcon => {
    const subjectIcons: Record<string, LucideIcon> = {
      physics: Atom,
      chemistry: FlaskConical,
      mathematics: Calculator,
      botany: Leaf,
      zoology: Microscope, // Changed from Mouse to Microscope for zoology
      computer: Laptop,
      english: BookText,
      nepali: Book
    };
    
    return subjectIcons[subjectId] || getIcon(icon);
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

  // Use the subject-specific icon instead of the icon prop
  const IconComponent = getSubjectSpecificIcon(id);
  const theme = getSubjectTheme(id);

  // Animation class that only applies after card is visible
  const animationClass = isVisible 
    ? "transition-all duration-300" 
    : "opacity-0";

  // Create bookmark item
  const bookmarkItem = {
    id: id,
    type: 'subject',
    title: name
  };

  return (
    <Card
      ref={cardRef}
      className={`group transition-all duration-300 relative ${
        theme.bg
      } ${theme.border} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${isHovered ? "shadow-lg transform -translate-y-1" : "shadow-md"} overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{
        boxShadow: isHovered
          ? `0 10px 25px -5px ${theme.glowColor}40, 0 8px 10px -6px ${theme.glowColor}20`
          : "",
      }}
    >
      <div className="flex justify-between items-start absolute top-3 right-3">
        <BookmarkButton 
          item={bookmarkItem}
          variant="icon"
          className="z-10"
        />
      </div>

      {/* CardHeader */}
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-lg ${theme.iconBg} mr-3 transition-colors duration-300`}
          >
            <IconComponent className={`h-6 w-6 ${theme.iconFg}`} />
          </div>
          <CardTitle
            className={`text-lg text-gray-800 font-bold transition-colors duration-300 ${theme.hoverText}`}
          >
            {name}
          </CardTitle>
        </div>
      </CardHeader>

      {/* CardContent */}
      <CardContent className="text-gray-600 pb-4">
        <p>{description}</p>
      </CardContent>

      {/* CardFooter */}
      <CardFooter className="pt-0">
        <Button
          asChild
          variant="outline"
          className={`w-full border ${theme.buttonBorder} ${theme.buttonText} ${theme.buttonHoverBg} ${theme.buttonHoverText} transition-colors duration-300`}
        >
          <Link to={`/subjects/${id}`}>Explore</Link>
        </Button>
      </CardFooter>
    </Card>
  );
});

export default SubjectCard;
