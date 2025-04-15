import { useRef, lazy, Suspense, useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Search from "@/components/Search";
import { subjects } from "@/data/subjects";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load heavy components
const SubjectCard = lazy(() => 
  import("@/components/SubjectCard").then(module => ({
    default: module.default
  }))
);
const UserEngagement = lazy(() => 
  import("@/components/UserEngagement").then(module => ({
    default: module.default
  }))
);

// SubjectCard loading skeleton component
const SubjectCardSkeleton = () => (
  <div className="h-[320px] rounded-lg border border-gray-200 bg-white/50 shadow-sm overflow-hidden flex flex-col animate-pulse">
    <div className="p-6 pb-2 flex flex-col">
      <Skeleton className="w-14 h-14 rounded-full mb-4" />
      <Skeleton className="h-7 w-3/4 mb-2" />
    </div>
    <div className="px-6 flex-grow">
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </div>
    <div className="p-6 pt-2">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  </div>
);

// UserEngagement loading skeleton component
const UserEngagementSkeleton = () => (
  <section className="w-full py-12 md:py-16 bg-gray-50">
    <div className="container max-w-7xl px-4 md:px-6">
      <Skeleton className="h-10 w-56 mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-white overflow-hidden p-4 animate-pulse">
            <div className="flex items-center space-x-2 mb-3">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-8 w-4/5 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/3 mt-4" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Add global styles for animations
const addGlobalStyles = () => {
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.7;
        }
      }
      
      .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
      }
    `;
    document.head.appendChild(styleEl);
  }
};

const Index = () => {
  const subjectsRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);
  const [visibleSubjects, setVisibleSubjects] = useState<typeof subjects>([]);
  const [subjectsLoaded, setSubjectsLoaded] = useState(false);
  const [updatesLoaded, setUpdatesLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll to top button visibility
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 500);
    };

    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  // Handle intersection observer for lazy loading subjects
  useEffect(() => {
    const handleSubjectsIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !subjectsLoaded) {
        // Delay loading subjects slightly to prioritize above-the-fold content
        setTimeout(() => {
          // Load subjects in chunks to improve perceived performance
          const loadSubjectsInChunks = () => {
            const chunk1 = subjects.slice(0, 3);
            setVisibleSubjects(chunk1);
            
            // Load the rest after a small delay
            setTimeout(() => {
              setVisibleSubjects(subjects);
              setSubjectsLoaded(true);
            }, 300);
          };
          
          loadSubjectsInChunks();
        }, 200);
      }
    };

    const handleUpdatesIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !updatesLoaded) {
        setUpdatesLoaded(true);
      }
    };

    const subjectsObserver = new IntersectionObserver(handleSubjectsIntersection, { 
      threshold: 0.1,
      rootMargin: '200px' 
    });
    
    const updatesObserver = new IntersectionObserver(handleUpdatesIntersection, { 
      threshold: 0.1,
      rootMargin: '200px' 
    });
    
    if (subjectsRef.current) {
      subjectsObserver.observe(subjectsRef.current);
    }
    
    if (updatesRef.current) {
      updatesObserver.observe(updatesRef.current);
    }

    return () => {
      if (subjectsRef.current) {
        subjectsObserver.unobserve(subjectsRef.current);
      }
      if (updatesRef.current) {
        updatesObserver.unobserve(updatesRef.current);
      }
    };
  }, [subjectsLoaded, updatesLoaded]);

  const scrollToSubjects = () => {
    subjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Optimize hydration by using client-side only interactive elements
  useEffect(() => {
    // Add global styles for animations
    addGlobalStyles();
    
    // Preload images to prevent layout shifts
    const preloadImages = () => {
      const images = ['atom', 'flask-conical', 'calculator', 'leaf', 'microscope', 'laptop', 'book', 'book-text']
        .map(icon => new Image());
    };
    
    preloadImages();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection onExploreClick={scrollToSubjects} />
        <Search />
        
        <section ref={subjectsRef} className="w-full py-12 md:py-24 bg-gray-50" id="subjects">
          <div className="container max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Subject Overview</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore comprehensive notes, chapter materials, and resources for all Grade 11 science subjects
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {subjectsLoaded ? (
                visibleSubjects.map((subject, index) => (
                  <div 
                    key={subject.id}
                    className="transition-all duration-300"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both',
                      animation: 'fadeInUp 0.5s ease-out'
                    }}
                  >
                    <Suspense fallback={<SubjectCardSkeleton />}>
                      <SubjectCard
                        id={subject.id}
                        name={subject.name}
                        icon={subject.icon}
                        description={subject.description}
                      />
                    </Suspense>
                  </div>
                ))
              ) : (
                // Show skeletons before loading
                Array(6).fill(0).map((_, index) => (
                  <SubjectCardSkeleton key={`skeleton-${index}`} />
                ))
              )}
            </div>
          </div>
        </section>

        <div ref={updatesRef}>
          {updatesLoaded ? (
            <Suspense fallback={<UserEngagementSkeleton />}>
              <UserEngagement />
            </Suspense>
          ) : (
            <UserEngagementSkeleton />
          )}
        </div>
        
        {/* Scroll to top button */}
        <Button
          aria-label="Scroll to top"
          variant="outline"
          size="icon"
          className={`fixed bottom-6 right-6 z-40 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 transform ${
            showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
          onClick={scrollToTop}
        >
          <ArrowUpCircle className="h-6 w-6 text-nebBlue" />
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
