
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeroSectionProps {
  onExploreClick: () => void;
}

// Define subject links with their routing IDs
const subjectLinks = [
  { name: "Physics", id: "physics" },
  { name: "Chemistry", id: "chemistry" },
  { name: "Mathematics", id: "mathematics" },
  { name: "Biology", id: "biology" },
  { name: "Computer Science", id: "computer" },
  { name: "English", id: "english" },
  { name: "Nepali", id: "nepali" }
];

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Simulate content loading
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle navigation to PYQ page
  const handleViewPastPapers = () => {
    window.scrollTo(0, 0);
    navigate('/pyq');
  };

  // Function to handle navigation to subject pages with scroll to top
  const handleSubjectClick = (subjectId: string) => {
    window.scrollTo(0, 0);
    navigate(`/subjects/${subjectId}`);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-28 bg-gradient-to-r from-nebGradientStart to-nebGradientEnd text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div 
          className={`flex flex-col items-center text-center space-y-5 md:space-y-7 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-2">
            <span className="block">Grade 11 Science Notes</span>
            <span className="text-nebPalette-beige text-2xl md:text-3xl font-medium mt-2 block">Comprehensive Resources for NEB Students</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 max-w-[700px] leading-relaxed">
            Your one-stop resource for NEB grade 11 science notes, previous year questions, and study materials
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button
              size="lg"
              className="bg-nebPalette-red text-white hover:bg-nebPalette-red/90 border-2 border-nebPalette-red/80 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 font-medium rounded-full px-8 group relative overflow-hidden"
              onClick={onExploreClick}
            >
              <span className="relative z-10 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Explore Subjects</span>
                <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-nebPalette-red/90 to-nebPalette-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10 border-2 border-white/70 hover:border-white transition-all duration-300 rounded-full px-6 hidden sm:flex"
              onClick={handleViewPastPapers}
            >
              View Past Papers
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {subjectLinks.map((subject) => (
              <button 
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className="bg-nebPalette-teal/40 px-3 py-1 rounded-full backdrop-blur-sm hover:bg-nebPalette-teal/60 transition-all duration-200 transform hover:scale-105 text-sm"
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
