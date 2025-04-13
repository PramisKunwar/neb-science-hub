import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// Define the badge variant type based on available options
type BadgeVariant = "default" | "outline" | "secondary" | "destructive";

// Define a type for update categories
type UpdateCategory = "new" | "update" | "tip";

export default function UserEngagement() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Detect when the component is in viewport
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Function to get color classes based on update category
  const getCategoryColors = (category: UpdateCategory) => {
    const colors = {
      new: {
        bg: "bg-blue-50",
        border: "border-t-4 border-t-blue-400",
        highlight: "bg-blue-500",
        icon: "text-blue-600",
        hover: "group-hover:text-blue-700",
        glow: "bg-blue-400/5"
      },
      update: {
        bg: "bg-emerald-50",
        border: "border-t-4 border-t-emerald-400",
        highlight: "bg-emerald-500",
        icon: "text-emerald-600",
        hover: "group-hover:text-emerald-700",
        glow: "bg-emerald-400/5"
      },
      tip: {
        bg: "bg-amber-50",
        border: "border-t-4 border-t-amber-400",
        highlight: "bg-amber-500",
        icon: "text-amber-600",
        hover: "group-hover:text-amber-700",
        glow: "bg-amber-400/5"
      }
    };
    
    return colors[category];
  };

  // Card data for better maintenance
  const updateCards = [
    {
      id: 1,
      icon: Bell,
      badgeText: "New",
      badgeVariant: "default" as BadgeVariant,
      category: "new" as UpdateCategory,
      title: "Physics Revision Notes Added",
      content: "Complete set of revision notes for Mechanics and Optics chapters now available for download!",
      date: "April 5, 2081"
    },
    {
      id: 2,
      icon: FileText,
      badgeText: "Update",
      badgeVariant: "outline" as BadgeVariant,
      category: "update" as UpdateCategory,
      title: "2080 Past Papers Uploaded",
      content: "Past year question papers for all subjects from 2080 examinations are now available.",
      date: "March 28, 2081"
    },
    {
      id: 3,
      icon: Clock,
      badgeText: "Tip",
      badgeVariant: "secondary" as BadgeVariant,
      category: "tip" as UpdateCategory,
      title: "Top 5 Exam Preparation Tips",
      content: "Expert tips on how to effectively prepare for your Grade 11 science exams from top educators.",
      date: "March 15, 2081"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`w-full py-12 md:py-16 bg-gray-50 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="container max-w-7xl px-4 md:px-6">
        <h2 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${isVisible ? 'animate-fade-in' : ''}`}>
          Latest Updates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updateCards.map((card, index) => {
            const colors = getCategoryColors(card.category);
            
            return (
              <div 
                key={card.id}
                className={`transform transition-all duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-8'}`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  opacity: isVisible ? 1 : 0
                }}
              >
                <Card 
                  className={`h-full group border overflow-hidden transition-all duration-300 hover:shadow-md focus-within:shadow-lg ${colors.bg} ${colors.border} ${hoveredCard === card.id ? 'scale-[1.02]' : 'scale-100'}`}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onFocus={() => setHoveredCard(card.id)}
                  onBlur={() => setHoveredCard(null)}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full ${colors.highlight} transition-all duration-300 ${hoveredCard === card.id ? 'h-full' : 'h-0'}`}></div>
                  <CardHeader className="pb-2 relative overflow-hidden">
                    <div className="flex items-center space-x-2">
                      <card.icon className={`h-5 w-5 ${colors.icon} transition-all duration-300 ${hoveredCard === card.id ? 'scale-125' : 'scale-100'}`} />
                      <Badge variant={card.badgeVariant}>{card.badgeText}</Badge>
                    </div>
                    <CardTitle className={`text-xl mt-2 transition-colors duration-300 ${colors.hover}`}>
                      {card.title}
                    </CardTitle>
                    <div 
                      className={`absolute -right-12 -top-12 w-24 h-24 rounded-full ${colors.glow} transition-all duration-500 ${hoveredCard === card.id ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`}
                      aria-hidden="true"
                    ></div>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-gray-600">
                      {card.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Added on: {card.date}</p>
                    
                    <div className={`flex justify-end mt-4 transition-all duration-300 ${hoveredCard === card.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <Button variant="ghost" size="sm" className={`p-0 h-auto ${colors.icon} hover:bg-transparent`}>
                        <span className="text-xs">Read more</span>
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
