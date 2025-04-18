import { useState, lazy, Suspense, useEffect } from "react";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { FileDown, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subjects } from "@/data/subjects";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookmarkButton } from "@/components/BookmarkButton";

// Lazy load components to improve performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const LoadingFallback = () => <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebBlue"></div>
  </div>;

// Table component instead of lazy loading
const PastPapersTable = ({
  subject,
  examTypeColors,
  subjectColors
}) => {
  return <Table>
      <TableCaption className="mt-6 mb-2 text-base font-medium text-nebText">
        Available past papers for {subject.name}
      </TableCaption>
      <TableHeader>
        <TableRow className="border-b-2 border-nebPalette-beige">
          <TableHead className="font-bold text-base text-nebText py-4">Year</TableHead>
          <TableHead className="font-bold text-base text-nebText py-4">Type</TableHead>
          <TableHead className="font-bold text-base text-nebText py-4">Description</TableHead>
          <TableHead className="text-right font-bold text-base text-nebText py-4">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 2081 */}
        <TableRow className="hover:bg-nebPalette-lightGray transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-nebText">2081</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-nebText">Complete paper with marking scheme</TableCell>
          <TableCell className="text-right py-4 flex items-center justify-end gap-2">
            <BookmarkButton contentType="pyq" contentId={`${subject.id}-2081-final`} title={`${subject.name} - 2081 Final Exam`} size="sm" variant="outline" />
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-nebBlue hover:bg-nebBlueDark'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2080 */}
        <TableRow className="hover:bg-nebPalette-lightGray transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-nebText">2080</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-nebText">Complete paper with marking scheme</TableCell>
          <TableCell className="text-right py-4 flex items-center justify-end gap-2">
            <BookmarkButton contentType="pyq" contentId={`${subject.id}-2080-final`} title={`${subject.name} - 2080 Final Exam`} size="sm" variant="outline" />
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-nebBlue hover:bg-nebBlueDark'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2079 Mid-Term */}
        <TableRow className="hover:bg-nebPalette-lightGray transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-nebText">2079</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-nebText">Model questions for practice</TableCell>
          <TableCell className="text-right py-4 flex items-center justify-end gap-2">
            <BookmarkButton contentType="pyq" contentId={`${subject.id}-2079-final`} title={`${subject.name} - 2079 Final Exam`} size="sm" variant="outline" />
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-nebBlue hover:bg-nebBlueDark'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2078 */}
        <TableRow className="hover:bg-nebPalette-lightGray transition-colors duration-200">
          <TableCell className="font-medium text-base py-4 text-nebText">2078</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-nebText">Complete paper with solutions</TableCell>
          <TableCell className="text-right py-4 flex items-center justify-end gap-2">
            <BookmarkButton contentType="pyq" contentId={`${subject.id}-2078-final`} title={`${subject.name} - 2078 Final Exam`} size="sm" variant="outline" />
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-nebBlue hover:bg-nebBlueDark'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>;
};

// Custom colors for subjects based on requirements - optimized for harmony and accessibility
// Using a balanced color system with consistent saturation and brightness levels
const subjectColors = {
  physics: {
    border: "border-nebAccent",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  chemistry: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  biology: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  math: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  computer: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  botany: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  zoology: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  },
  english: {
    border: "border-nebBlue",
    bg: "bg-nebPalette-lightGray",
    accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
    hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary hover:border-nebBlue",
    gradient: "from-nebPalette-lightGray to-white",
    headingText: "text-nebPrimary",
    lightBg: "bg-nebPalette-lightGray"
  }
};

// Exam type color mappings using the optimized color scheme
const examTypeColors = {
  "Final Exam": "bg-nebPalette-lightGray text-nebPrimary border-nebBlue",
  "Mid-Term Exam": "bg-nebPalette-lightGray text-nebPrimary border-nebBlue",
  "Model Questions": "bg-nebPalette-lightGray text-nebPrimary border-nebBlue",
  "Chapter-wise": "bg-nebPalette-lightGray text-nebPrimary border-nebBlue"
};

// Add helper functions for question bank links
const getQuestionBankLink = (subjectId: string): string => {
  const questionBankMap = {
    "physics": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV",
    "chemistry": "1p7nyRVJmuACBEIr42S7qfi_AFeVqXGpx",
    "mathematics": "11b1lRBh_2t-FTyyufY2Lavb4Nx3fc_25",
    "botany": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD",
    "zoology": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD",
    "computer-science": "1RWtwVS1Tir-Yx5EWm1nfLTMiUDKb_uN3",
    "english": "1DqdRpkoLkuJM6D5RIYkU1W43qVG5Ii_M",
    "nepali": "1EH7NKR8BDGLrpukRMhocM3RTlW8cuoPQ",
    // Default fallback
    "default": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV"
  };
  return `https://drive.google.com/file/d/${questionBankMap[subjectId] || questionBankMap.default}/view`;
};
const getModelQuestionsLink = (subjectId: string): string => {
  const modelQuestionsMap = {
    "physics": "1hj1FKNQuFdEwk8Z4EBC4RQoFqxWnF-Y_",
    "chemistry": "1a2NMvKDTcNWiNfVWDgIsAOepEzi1o-zG",
    "mathematics": "1hNXFQkcFyRalxBebdvyLyYXQkmdx_br2",
    "botany": "13lCP0rnhFZprEft8UoCyemprBVPL_fni",
    "zoology": "13lCP0rnhFZprEft8UoCyemprBVPL_fni",
    // Same as biology
    "computer-science": "1fgdVRIh2bYVeDtv9u5cII9egK2STtKCT",
    "english": "1bP1HBzJyAGRtoG_8qPRYGi96CwlATSdC",
    "nepali": "1yz0oUuJHytfBJzwP0ELbEIVIDvUn1RLt",
    // Default fallback - using Physics model questions as default
    "default": "1hj1FKNQuFdEwk8Z4EBC4RQoFqxWnF-Y_"
  };
  return `https://drive.google.com/file/d/${modelQuestionsMap[subjectId] || modelQuestionsMap.default}/view`;
};
const getStudyGuidesLink = (subjectId: string): string => {
  const studyGuidesMap = {
    "physics": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV",
    "chemistry": "1p7nyRVJmuACBEIr42S7qfi_AFeVqXGpx",
    "mathematics": "11b1lRBh_2t-FTyyufY2Lavb4Nx3fc_25",
    "botany": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD",
    "zoology": "1dBXNXOYCedvXNw6445fLmy-qGjWwD9DD",
    "computer-science": "1RWtwVS1Tir-Yx5EWm1nfLTMiUDKb_uN3",
    "english": "1DqdRpkoLkuJM6D5RIYkU1W43qVG5Ii_M",
    "nepali": "1EH7NKR8BDGLrpukRMhocM3RTlW8cuoPQ",
    // Default fallback
    "default": "1gmMIVeymE9CS2fLI-whA5xMFOdnnAtBV"
  };
  return `https://drive.google.com/file/d/${studyGuidesMap[subjectId] || studyGuidesMap.default}/view`;
};
const PYQ = () => {
  const [activeTab, setActiveTab] = useState("physics");
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate content being loaded
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to get the default accent color if subject not found
  const getDefaultAccent = () => {
    return {
      border: "border-nebBlue",
      bg: "bg-nebPalette-lightGray",
      accent: "bg-nebBlue hover:bg-nebBlueDark text-white",
      hover: "hover:bg-nebPalette-lightGray hover:text-nebPrimary",
      gradient: "from-nebPalette-lightGray to-nebBackground",
      headingText: "text-nebPrimary",
      lightBg: "bg-nebPalette-lightGray"
    };
  };

  // Get color scheme for current tab
  const getCurrentColors = () => {
    return subjectColors[activeTab] || getDefaultAccent();
  };
  const colors = getCurrentColors();
  return <div className="min-h-screen flex flex-col font-sans">
      <Suspense fallback={<LoadingFallback />}>
      <Header />
      </Suspense>
      <main className="flex-1">
        {/* Header Banner - Standardized padding */}
        <section className="w-full bg-gradient-to-r from-nebPrimaryDark to-nebPrimary py-16 md:py-20 text-white">
          <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold animate-fade-in tracking-tight leading-tight text-white">
                Past Year Questions
              </h1>
              <p className="text-lg md:text-xl text-white max-w-[700px] leading-relaxed mb-2 font-normal">
                Access previous years' exam papers and questions for effective revision
              </p>
            </div>
          </div>
        </section>

        {/* Content - Consistent spacing throughout */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <div className="bg-nebPalette-beige border border-nebPalette-beige rounded-lg shadow-sm mb-8 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform">
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-nebPrimary animate-pulse" />
                <p className="font-medium text-base md:text-lg text-nebPrimary">
                  Practicing with past papers is one of the most effective ways to prepare for exams!
                </p>
              </div>
            </div>

            <Tabs defaultValue="physics" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <div className="overflow-x-auto pb-4 mb-2">
                <TabsList className="w-full justify-start bg-nebPalette-beige/50 p-1">
                  {subjects.map(subject => <TabsTrigger key={subject.id} value={subject.id} className={`min-w-max hover:scale-105 transition-transform duration-200 text-base font-medium ${activeTab === subject.id ? `${subjectColors[subject.id]?.bg || 'bg-nebPalette-lightGray'} ${subjectColors[subject.id]?.border || 'border-nebBlue'} border-b-2 ${subjectColors[subject.id]?.headingText || 'text-nebPrimary'} shadow-sm` : 'bg-transparent hover:bg-nebPalette-beige text-nebText'}`}>
                      {subject.name}
                    </TabsTrigger>)}
                </TabsList>
              </div>

              {subjects.map(subject => <TabsContent key={subject.id} value={subject.id} className="mt-8">
                  <div className={`bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 ${subjectColors[subject.id]?.border || 'border-nebBlue'} mb-8 hover:-translate-y-1 transform group`}>
                    <h3 className={`px-6 py-4 text-xl font-bold bg-gradient-to-r ${subjectColors[subject.id]?.gradient || 'from-nebPalette-lightGray to-nebBackground'} border-b rounded-t-lg ${subjectColors[subject.id]?.headingText || 'text-nebPrimary'} group-hover:shadow-inner transition-all duration-300`}>
                      {subject.name} Past Year Papers
                      <div className="h-1 w-0 group-hover:w-full bg-current mt-1 transition-all duration-500 rounded"></div>
                    </h3>
                    <div className="p-6">
                      <Suspense fallback={<div className="animate-pulse h-40 bg-nebPalette-lightGray rounded"></div>}>
                        <PastPapersTable subject={subject} examTypeColors={examTypeColors} subjectColors={subjectColors} />
                      </Suspense>
                    </div>
                  </div>

                  <div className={`mt-8 bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 ${subjectColors[subject.id]?.border || 'border-nebBlue'} mb-4 hover:-translate-y-1 transform group`}>
                    <h3 className={`px-6 py-4 text-xl font-bold bg-gradient-to-r ${subjectColors[subject.id]?.gradient || 'from-nebPalette-lightGray to-nebBackground'} border-b rounded-t-lg ${subjectColors[subject.id]?.headingText || 'text-nebPrimary'} group-hover:shadow-inner transition-all duration-300`}>
                      {subject.name} Question Banks
                      <div className="h-1 w-0 group-hover:w-full bg-current mt-1 transition-all duration-500 rounded"></div>
                    </h3>
                    <div className="p-6 grid gap-6 md:grid-cols-2">
                      <div className="border border-nebBlue rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-nebBlue group/card bg-nebPalette-lightGray hover:-translate-y-1 transform">
                        <h4 className="font-medium text-lg mb-3 group-hover/card:text-nebPrimary transition-colors duration-200 text-nebPrimary flex items-center">
                          <span className={`inline-block mr-2 px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Chapter-wise"]} group-hover/card:scale-105 transition-transform duration-200`}>
                            Chapter-wise
                          </span>
                          <span className="group-hover/card:translate-x-1 transition-transform duration-200">Question Collection</span>
                        </h4>
                        <p className="text-base text-nebText mb-5 leading-relaxed">
                          Curated questions from all previous years, organized by chapter for focused practice.
                        </p>
                        <a href={getQuestionBankLink(subject.id)} target="_blank" rel="noopener noreferrer" className="inline-flex">
                          <Button className="bg-nebBlue hover:bg-nebBlueDark text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 group/btn">
                            <FileDown className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            <span>Download Question Bank</span>
                          </Button>
                        </a>
                      </div>
                      
                      <div className="border border-nebBlue rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-nebBlue group/card bg-nebPalette-lightGray hover:-translate-y-1 transform">
                        <h4 className="font-medium text-lg mb-3 group-hover/card:text-nebPrimary transition-colors duration-200 text-nebPrimary flex items-center">
                          <span className={`inline-block mr-2 px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Model Questions"]} group-hover/card:scale-105 transition-transform duration-200`}>
                            Model
                          </span>
                          <span className="group-hover/card:translate-x-1 transition-transform duration-200">Questions</span>
                        </h4>
                        <p className="text-base text-nebText mb-5 leading-relaxed">
                          Expected question patterns for the upcoming exam with solutions.
                        </p>
                        <a href={getModelQuestionsLink(subject.id)} target="_blank" rel="noopener noreferrer" className="inline-flex">
                          <Button className="bg-nebBlue hover:bg-nebBlueDark text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 group/btn">
                            <FileDown className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                            <span>Download Model Questions</span>
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-nebPalette-lightGray border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform">
                    <p className="text-center text-nebText mb-3">Need more resources? Check our collection guides</p>
                    <div className="flex justify-center">
                      <a href={getStudyGuidesLink(subject.id)} target="_blank" rel="noopener noreferrer" className="inline-flex">
                        <Button variant="outline" style={{
                      borderColor: colors.border.includes('#') ? colors.border.replace('border-[', '').replace(']', '') : '#123458',
                      color: colors.headingText.includes('#') ? colors.headingText.replace('text-[', '').replace(']', '') : '#123458'
                    }} className="border-current text-current hover:text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 font-medium group bg-red-600 hover:bg-red-500">
                          <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                          <span>View Study Guides</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                </TabsContent>)}
            </Tabs>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingFallback />}>
      <Footer />
      </Suspense>
    </div>;
};
export default PYQ;