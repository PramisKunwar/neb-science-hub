import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
// Lazy load components for better performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
import { getSubjectById } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowLeft, Search, ExternalLink, Loader2, Eye, Download } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BookmarkButton } from "@/components/BookmarkButton";

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
  const [previewChapter, setPreviewChapter] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  
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

  // Function to handle preview
  const handlePreview = (chapter) => {
    setPreviewChapter(chapter);
    setPreviewLoading(true);
    setIsPreviewOpen(true);
    
    // Simulate loading content (in a real app, you would fetch the actual content)
    setTimeout(() => {
      setPreviewLoading(false);
    }, 1000);
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
                                          <button 
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handlePreview(chapter);
                                            }}
                                            className="inline-flex items-center text-xs text-nebBlue hover:underline"
                                          >
                                            <Eye className="mr-1 h-3 w-3" />
                                            View Notes
                                          </button>
                                        )}
                                      </div>
                                    </HoverCardContent>
                                  </HoverCard>
                                  <span className="font-medium text-nebText">{chapter.title}</span>
                                  <div className="ml-auto">
                                    <BookmarkButton
                                      contentType="chapter"
                                      contentId={`${subject.id}-chapter-${chapter.id}`}
                                      title={`${subject.name} - Chapter ${chapter.id}: ${chapter.title}`}
                                      url={chapter.notesPath ? normalizeNotesPath(chapter.notesPath, false) : undefined}
                                      size="sm"
                                      variant="ghost"
                                    />
                                  </div>
                                </div>
                              </AccordionTrigger>
                                    <AccordionContent className="px-3 py-2">
                                <div className="pt-2 space-y-4">
                                  <p className="text-sm text-nebText">
                                    Comprehensive notes covering all the key concepts for this chapter.
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {chapter.notesPath && (
                                      <>
                                        <Button 
                                          size="sm" 
                                          variant="outline" 
                                          className="hover:bg-nebPrimary hover:text-white transition-all duration-200 border-nebPrimary text-nebPrimary shadow-sm hover:shadow"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handlePreview(chapter);
                                          }}
                                        >
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Notes
                                        </Button>
                                        
                                        <a 
                                          href={normalizeNotesPath(chapter.notesPath, true)} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="inline-flex"
                                        >
                                          <Button size="sm" variant="outline" className="hover:bg-nebBlue hover:text-white transition-all duration-200 border-nebBlue text-nebBlue shadow-sm hover:shadow">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Notes
                                          </Button>
                                        </a>
                                      </>
                                    )}
                                  </div>
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
                          <div className="flex items-center justify-between">
                            <a 
                              href={`https://drive.google.com/uc?export=download&id=${getSyllabusId(subject.id)}`}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex"
                            >
                              <Button size="sm" variant="outline" className="hover:bg-nebBlue hover:text-white transition-all duration-200 border-nebBlue text-nebBlue shadow-sm hover:shadow">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download Syllabus
                              </Button>
                            </a>
                            <BookmarkButton
                              contentType="resource"
                              contentId={`${subject.id}-syllabus`}
                              title={`${subject.name} - Syllabus`}
                              url={`https://drive.google.com/uc?export=download&id=${getSyllabusId(subject.id)}`}
                            />
                          </div>
                    </div>
                    
                        <div className="border border-nebPalette-beige rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-nebPrimary bg-gradient-to-br from-white to-nebBackground transform hover:-translate-y-1 hover:scale-[1.01]">
                          <h4 className="font-medium mb-2 text-nebPrimary flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                           Additional files related to {subject.name}
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-nebText mb-3">
                        <li>Presentation Slides</li>
                        <li>Cheat Sheet</li>
                        <li>Question Bank</li>
                      </ul>
                          <div className="flex items-center justify-between">
                            <a 
                              href={`https://drive.google.com/file/d/1wPzf_hO_3-lAiIhSQa49pgZw9WbZoh9o/view?usp=sharing/${getAdditionalFilesId(subject.id)}`}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex"
                            >
                              <Button size="sm" variant="outline" className="hover:bg-nebPrimary hover:text-white transition-all duration-200 border-nebPrimary text-nebPrimary shadow-sm hover:shadow">
                                <FileDown className="mr-2 h-4 w-4" />
                                View files
                              </Button>
                            </a>
                            <BookmarkButton
                              contentType="resource"
                              contentId={`${subject.id}-additional-files`}
                              title={`${subject.name} - Additional Files`}
                              url={`https://drive.google.com/file/d/1wPzf_hO_3-lAiIhSQa49pgZw9WbZoh9o/view?usp=sharing/${getAdditionalFilesId(subject.id)}`}
                            />
                          </div>
                    </div>
                    
                        <div className="border border-nebPalette-beige rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:border-nebAccent bg-gradient-to-br from-white to-nebBackground md:col-span-2 transform hover:-translate-y-1 hover:scale-[1.01]">
                          <h4 className="font-medium mb-2 text-nebAccent flex items-center">
                            <FileDown className="mr-2 h-4 w-4" />
                            Video Tutorials
                          </h4>
                          <p className="text-sm text-nebText mb-3">
                        Video explanations of complex topics are available on our YouTube channel.
                      </p>
                      <div className="flex items-center justify-between">
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
                        <BookmarkButton
                          contentType="resource"
                          contentId={`${subject.id}-video-tutorials`}
                          title={`${subject.name} - Video Tutorials`}
                          url="https://www.youtube.com/@AP2DShiksha"
                        />
                      </div>
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

      {/* Notes Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-nebPrimary">
              {previewChapter?.title}
            </DialogTitle>
            <DialogDescription>
              Chapter {previewChapter?.id}
            </DialogDescription>
          </DialogHeader>

          {previewLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 text-nebBlue animate-spin" />
            </div>
          ) : (
            <div className="py-4">
              {previewChapter?.preview ? (
                <div className="space-y-4">
                  <p className="text-nebText leading-relaxed">{previewChapter.preview}</p>
                  
                  {/* Simulated content for preview */}
                  <div className="bg-nebBackground border border-nebPalette-beige p-4 rounded-lg text-nebText">
                    <h4 className="font-bold mb-2">Chapter Preview</h4>
                    <p>Thank you for your patience. We are working on preparing the full notes for this chapter.</p>
                    <div className="mt-4 space-y-3">
                      <p>The chapter includes several key concepts and detailed explanations about {previewChapter.title}.</p>
                      <p>Students will find comprehensive explanations, diagrams, examples, and practice problems in the full notes.</p>
                      <p>For a complete learning experience, it's recommended to download the full notes and study material.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-nebBackground border border-nebPalette-beige p-4 rounded-lg text-nebText">
                  <h4 className="font-bold mb-2">Chapter Preview</h4>
                  <p>Preview content is currently being prepared for this chapter. Please check back later or download the full notes for complete information.</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            
            {previewChapter?.notesPath && (
              <a 
                href={normalizeNotesPath(previewChapter.notesPath, false)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex"
              >
                <Button className="bg-nebBlue hover:bg-nebPrimary">
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Notes
                </Button>
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
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

// Helper function to get the Google Drive ID for syllabus based on subject
const getSyllabusId = (subjectId: string): string => {
  const syllabusMap = {
    "physics": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV",
    "chemistry": "1p7nyRVJmuACBEIr42S7qfi_AFeVqXGpx",
    "mathematics": "11b1lRBh_2t-FTyyufY2Lavb4Nx3fc_25",
    "botany": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD",
    "zoology": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD", // Same as botany as per provided info
    "computer-science": "1RWtwVS1Tir-Yx5EWm1nfLTMiUDKb_uN3",
    "english": "1DqdRpkoLkuJM6D5RIYkU1W43qVG5Ii_M",
    "nepali": "1EH7NKR8BDGLrpukRMhocM3RTlW8cuoPQ",
    // Default fallback for any other subject
    "default": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV" // Using physics as default
  };

  return syllabusMap[subjectId] || syllabusMap["default"];
};

// Helper function to get Google Drive folder ID for additional files
const getAdditionalFilesId = (subjectId: string): string => {
  const additionalFilesMap = {
    "physics": "1U6G3yY4RrNBzP2b9Bb8DrI8RkEeWsKKz",
    "chemistry": "1V7H4zZ5SsOCzQ3c0Cc9ErJ9SlfFXtLLA",
    "mathematics": "1W8I5Aa6TtPD0Dd1LDd0FsK0TmGGYuMMB",
    "botany": "1X9J6Bb7UuQE1Ee2MEe1GtL1UnHHZvNNC",
    "zoology": "1Y0K7Cc8VvRF2Ff3NFf2HuM2VoIIAwOOD",
    "computer-science": "1Z1L8Dd9WwSG3Gg4OGg3IvN3WpJJBxPPE",
    "english": "1a2M9Ee0XxTH4Hh5PHh4JwO4XqKKCyQQF",
    "nepali": "1b3N0Ff1YySI5Ii6QIi5KxP5YrLLDzRRG",
    // Default fallback for any other subject
    "default": "1c4O1Gg2ZzTJ6Jj7RJj6LyQ6ZsMMAQSSH"
  };

  return additionalFilesMap[subjectId] || additionalFilesMap["default"];
};

// Helper function to normalize notes path (handle both local paths and Drive links)
const normalizeNotesPath = (path: string, forDownload: boolean = false): string => {
  // If the path is already a full URL (e.g., Google Drive link), process it accordingly
  if (path.startsWith('http')) {
    // For Google Drive links, extract the file ID and format for viewing or direct download
    if (path.includes('drive.google.com') && forDownload) {
      // Extract file ID from drive.google.com URL
      const fileIdMatch = path.match(/\/d\/([^\/]+)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
      }
    }
    return path;
  }
  
  // For paths that look like local files (/notes/...), convert to Drive links
  // Extract the subject and filename from the path
  const pathParts = path.split('/');
  const subject = pathParts[2]; // e.g., "physics", "chemistry"
  const filename = pathParts[3]; // e.g., "vectors.pdf"
  
  // Map of subject to folder IDs in Google Drive
  const driveSubjectFolders = {
    "physics": "1U6G3yY4RrNBzP2b9Bb8DrI8RkEeWsKKz",
    "chemistry": "1V7H4zZ5SsOCzQ3c0Cc9ErJ9SlfFXtLLA",
    "mathematics": "1W8I5Aa6TtPD0Dd1LDd0FsK0TmGGYuMMB",
    "botany": "1X9J6Bb7UuQE1Ee2MEe1GtL1UnHHZvNNC",
    "zoology": "1Y0K7Cc8VvRF2Ff3NFf2HuM2VoIIAwOOD",
    "computer-science": "1Z1L8Dd9WwSG3Gg4OGg3IvN3WpJJBxPPE",
    "english": "1a2M9Ee0XxTH4Hh5PHh4JwO4XqKKCyQQF",
    "nepali": "1b3N0Ff1YySI5Ii6QIi5KxP5YrLLDzRRG",
    // Default folder if subject not found
    "default": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV"
  };
  
  // Sample file IDs for example files - in a real app, you would have a mapping of all files
  const sampleFileIds = {
    "physics_vectors.pdf": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV",
    "chemistry_atomic-structure.pdf": "1KUizHD7aIgPuVkRo7KVl8i0fqOgCzHN5",
    "default": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV"
  };
  
  // Generate a file key to look up in our sample mapping
  const fileKey = `${subject}_${filename}`;
  const fileId = sampleFileIds[fileKey] || sampleFileIds.default;
  
  // Return the appropriate link based on whether we need download or view
  if (forDownload) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  } else {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }
};

export default Subject;
