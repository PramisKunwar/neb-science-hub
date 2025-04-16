import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
// Lazy load components for better performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import { getSubjectById } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowLeft, Search, ExternalLink, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";

// Color mapping for different subject areas - updated with new color scheme
const areaColors = {
  "Mechanics": { bg: "bg-nebBackground", border: "border-nebBlue", text: "text-nebBlue" },
  "Thermodynamics": { bg: "bg-nebBackground", border: "border-nebAccent", text: "text-nebAccent" },
  "Waves": { bg: "bg-nebBackground", border: "border-nebPalette-beige", text: "text-nebPrimary" },
  "Optics": { bg: "bg-nebBackground", border: "border-nebPrimary", text: "text-nebPrimary" },
  "Electricity": { bg: "bg-nebBackground", border: "border-nebAccent", text: "text-nebAccent" },
  "Magnetism": { bg: "bg-nebBackground", border: "border-nebBlue", text: "text-nebBlue" },
  "Modern Physics": { bg: "bg-nebBackground", border: "border-nebPrimary", text: "text-nebPrimary" },
  // Default fallback
  "default": { bg: "bg-nebBackground", border: "border-nebPalette-beige", text: "text-nebText" }
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-nebBackground">
    <div className="flex flex-col items-center">
      <Loader2 className="h-10 w-10 text-nebBlue animate-spin mb-4" />
      <p className="text-nebText">Loading content...</p>
    </div>
  </div>
);

const Subject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [activeTab, setActiveTab] = useState("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  const subject = subjectId ? getSubjectById(subjectId) : undefined;

  // Simulate content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Function to filter chapters based on search query
  const filterChapters = (chapters) => {
    if (!searchQuery.trim()) return chapters;
    
    return chapters.filter(chapter => 
      chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chapter.preview && chapter.preview.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Function to get color scheme for an area
  const getAreaColors = (areaName) => {
    const normalizedName = areaName.trim();
    for (const [key, value] of Object.entries(areaColors)) {
      if (normalizedName.includes(key)) {
        return value;
      }
    }
    return areaColors.default;
  };

  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col bg-nebBackground">
        <Suspense fallback={<LoadingFallback />}>
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-nebText">Subject Not Found</h1>
            <p className="text-nebText mb-6">The subject you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="bg-nebBlue hover:bg-nebPrimary text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-nebBackground">
      <Suspense fallback={<LoadingFallback />}>
      <Header />
      <main className="flex-1">
        {/* Header Banner */}
        <section className="w-full bg-gradient-to-r from-nebPrimaryDark to-nebPrimary py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white">{subject.name}</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-[700px]">
                {subject.description}
              </p>
              <Link to="/">
                  <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-nebPrimary transition-all duration-200">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Subjects
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="notes" className="w-full" onValueChange={setActiveTab} value={activeTab}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <TabsList className="w-full max-w-md grid grid-cols-2 bg-nebPalette-beige">
                    <TabsTrigger 
                      value="notes" 
                      className="data-[state=active]:bg-nebBlue data-[state=active]:text-white transition-all duration-200 hover:bg-nebBackground text-nebText"
                    >
                      Notes & Chapters
                    </TabsTrigger>
                    <TabsTrigger 
                      value="resources"
                      className="data-[state=active]:bg-nebBlue data-[state=active]:text-white transition-all duration-200 hover:bg-nebBackground text-nebText"
                    >
                      Resources
                    </TabsTrigger>
              </TabsList>
                  
                  {activeTab === "notes" && (
                    <div className="relative w-full md:w-72">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-nebText" />
                      <Input
                        type="search"
                        placeholder="Search chapters..."
                        className="pl-9 bg-white text-nebText border-nebPalette-beige"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              
              {/* Notes & Chapters Tab */}
              <TabsContent value="notes" className="mt-6">
                  {!isLoaded ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 text-nebBlue animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-6 animate-fadeIn">
                      {subject.areas.map((area, index) => {
                        const filteredChapters = filterChapters(area.chapters);
                        if (searchQuery && filteredChapters.length === 0) return null;
                        
                        const areaColor = getAreaColors(area.name);
                        
                        return (
                          <div key={index} 
                            className={`bg-white border rounded-lg shadow-sm transition-all duration-300 
                                      hover:shadow-md overflow-hidden ${areaColor.border}`}
                            style={{ borderTopWidth: '4px' }}>
                            <h3 className={`px-4 py-3 text-lg font-medium bg-nebBackground border-b border-nebPalette-beige rounded-t-lg ${areaColor.text}`}>
                        {area.name}
                      </h3>
                      <div className="p-4">
                        <Accordion type="multiple" className="w-full">
                                {filteredChapters.map((chapter) => (
                                  <AccordionItem 
                                    key={chapter.id} 
                                    value={`chapter-${chapter.id}`}
                                    className={`border border-nebPalette-beige rounded-md mb-2 overflow-hidden 
                                               hover:border-nebBlue hover:shadow-sm transition-all duration-200 
                                               transform hover:-translate-y-1 hover:scale-[1.01] 
                                               ${areaColor.bg} bg-opacity-30`}
                                  >
                                    <AccordionTrigger className="text-left px-3 py-2 hover:bg-nebBackground focus:bg-nebBackground data-[state=open]:bg-nebBackground transition-colors">
                                <div className="flex items-center">
                                  <HoverCard>
                                    <HoverCardTrigger asChild>
                                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-nebBlue text-white text-xs font-medium mr-2 cursor-pointer hover:bg-nebPrimary transition-colors shadow-sm hover:shadow">
                                        {chapter.id}
                                      </span>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-80 bg-white border-nebPalette-beige">
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-nebBlue text-white text-xs font-medium">
                                            {chapter.id}
                                          </span>
                                          <h4 className="text-sm font-semibold text-nebText">{chapter.title}</h4>
                                        </div>
                                        
                                        {chapter.preview && (
                                          <div className="bg-nebBackground p-2 rounded border border-nebPalette-beige">
                                            <p className="text-sm text-nebText">
                                              {chapter.preview}
                                            </p>
                                          </div>
                                        )}
                                        
                                        {!chapter.preview && (
                                          <p className="text-sm text-nebText">
                                            {chapter.notesPath 
                                              ? "Click to view comprehensive notes covering all key concepts for this chapter."
                                              : "Notes for this chapter are coming soon."}
                                          </p>
                                        )}
                                        
                                        {chapter.notesPath && (
                                          <a 
                                            href={chapter.notesPath} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs text-nebBlue hover:underline"
                                          >
                                            <FileDown className="mr-1 h-3 w-3" />
                                            View Notes
                                          </a>
                                        )}
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                  <span className="font-medium text-nebText">{chapter.title}</span>
                                </div>
                              </AccordionTrigger>
                                    <AccordionContent className="px-3 py-2">
                                <div className="pt-2 space-y-4">
                                  <p className="text-sm text-nebText">
                                    Comprehensive notes covering all the key concepts for this chapter.
                                  </p>
                                  {chapter.notesPath && (
                                    <a 
                                      href={chapter.notesPath} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="inline-flex"
                                    >
                                            <Button size="sm" variant="outline" className="hover:bg-nebBlue hover:text-white transition-all duration-200 border-nebBlue text-nebBlue shadow-sm hover:shadow">
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Download Notes
                                      </Button>
                                    </a>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                              {searchQuery && filteredChapters.length === 0 && (
                                <p className="text-nebText text-center py-4">No chapters found matching your search.</p>
                              )}
                            </div>
                      </div>
                        );
                      })}
                    </div>
                  )}
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="mt-6">
                  {!isLoaded ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 text-nebBlue animate-spin" />
                    </div>
                  ) : (
                    <div className="bg-white border border-nebPalette-beige rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fadeIn">
                      <h3 className="px-4 py-3 text-lg font-medium bg-nebBackground border-b border-nebPalette-beige rounded-t-lg text-nebBlue">
                    Additional Resources
                  </h3>
                      <div className="p-4 grid md:grid-cols-2 gap-4">
                        <div className="border border-nebPalette-beige rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-nebBlue bg-gradient-to-br from-white to-nebBackground transform hover:-translate-y-1 hover:scale-[1.01]">
                          <h4 className="font-medium mb-2 text-nebBlue flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                            Syllabus
                          </h4>
                      <p className="text-sm text-nebText mb-3">
                        Quick reference of the syllabus of {subject.name}.
                      </p>
                          <Button size="sm" variant="outline" className="hover:bg-nebBlue hover:text-white transition-all duration-200 border-nebBlue text-nebBlue shadow-sm hover:shadow">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Syllabus
                      </Button>
                    </div>
                    
                        <div className="border border-nebPalette-beige rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-nebPrimary bg-gradient-to-br from-white to-nebBackground transform hover:-translate-y-1 hover:scale-[1.01]">
                          <h4 className="font-medium mb-2 text-nebPrimary flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                           Additional files
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-nebText mb-3">
                        <li>Presentation Slides</li>
                        <li>Cheat Sheet</li>
                        <li>Question Bank</li>
                      </ul>
                          <Button size="sm" variant="outline" className="hover:bg-nebPrimary hover:text-white transition-all duration-200 border-nebPrimary text-nebPrimary shadow-sm hover:shadow">
                            <FileDown className="mr-2 h-4 w-4" />
                            Download List
                          </Button>
                    </div>
                    
                        <div className="border border-nebPalette-beige rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-nebAccent bg-gradient-to-br from-white to-nebBackground md:col-span-2 transform hover:-translate-y-1 hover:scale-[1.01]">
                          <h4 className="font-medium mb-2 text-nebAccent flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                            Video Tutorials
                          </h4>
                          <p className="text-sm text-nebText mb-3">
                        Video explanations of complex topics are available on our YouTube channel.
                      </p>
                      <a 
                        href="https://www.youtube.com/@AP2DShiksha" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                            className="inline-flex"
                      >
                            <Button className="bg-nebAccent hover:bg-nebAccent/90 text-white transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow">
                              <ExternalLink className="h-4 w-4" />
                        Visit YouTube Channel
                            </Button>
                      </a>
                    </div>
                  </div>
                </div>
                  )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
      </Suspense>
    </div>
  );
};

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

export default Subject;
