import { useState, lazy, Suspense, useEffect } from "react";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { FileDown, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subjects } from "@/data/subjects";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Lazy load components to improve performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebBlue"></div>
  </div>
);

// Table component instead of lazy loading
const PastPapersTable = ({ subject, examTypeColors, subjectColors }) => {
  return (
    <Table>
      <TableCaption className="mt-6 mb-2 text-base font-medium text-gray-800">
        Available past papers for {subject.name}
      </TableCaption>
      <TableHeader>
        <TableRow className="border-b-2 border-gray-300">
          <TableHead className="font-bold text-base text-gray-900 py-4">Year</TableHead>
          <TableHead className="font-bold text-base text-gray-900 py-4">Type</TableHead>
          <TableHead className="font-bold text-base text-gray-900 py-4">Description</TableHead>
          <TableHead className="text-right font-bold text-base text-gray-900 py-4">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* 2081 */}
        <TableRow className="hover:bg-gray-100 transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-gray-900">2081</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-gray-800">Complete paper with marking scheme</TableCell>
          <TableCell className="text-right py-4">
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-[#3498DB] hover:bg-[#2980b9]'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2080 */}
        <TableRow className="hover:bg-gray-100 transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-gray-900">2080</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-gray-800">Complete paper with marking scheme</TableCell>
          <TableCell className="text-right py-4">
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-[#3498DB] hover:bg-[#2980b9]'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2079 Mid-Term */}
        <TableRow className="hover:bg-gray-100 transition-colors duration-200 border-b">
          <TableCell className="font-medium text-base py-4 text-gray-900">2079</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-gray-800">Model questions for practice</TableCell>
          <TableCell className="text-right py-4">
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-[#3498DB] hover:bg-[#2980b9]'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
        {/* 2078 */}
        <TableRow className="hover:bg-gray-100 transition-colors duration-200">
          <TableCell className="font-medium text-base py-4 text-gray-900">2078</TableCell>
          <TableCell className="py-4">
            <span className={`px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Final Exam"]}`}>
              Final Exam
            </span>
          </TableCell>
          <TableCell className="py-4 text-gray-800">Complete paper with solutions</TableCell>
          <TableCell className="text-right py-4">
            <Button className={`${subjectColors[subject.id]?.accent || 'bg-[#3498DB] hover:bg-[#2980b9]'} transition-all duration-200 flex items-center gap-2 hover:gap-3 group`}>
              <FileDown className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Download</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

// Custom colors for subjects based on requirements - optimized for harmony and accessibility
// Using a balanced color system with consistent saturation and brightness levels
const subjectColors = {
  physics: {
    border: "border-[#E74C3C]",
    bg: "bg-red-50", 
    accent: "bg-[#E74C3C] hover:bg-[#C0392B] text-white",
    hover: "hover:bg-red-50 hover:text-[#C0392B] hover:border-[#E74C3C]",
    gradient: "from-red-50 to-white",
    headingText: "text-[#C0392B]",
    lightBg: "bg-[#FADBD8]"
  },
  chemistry: {
    border: "border-[#16A085]",
    bg: "bg-teal-50",
    accent: "bg-[#16A085] hover:bg-[#138a72] text-white",
    hover: "hover:bg-teal-50 hover:text-[#16A085] hover:border-[#16A085]",
    gradient: "from-teal-50 to-white",
    headingText: "text-[#138a72]",
    lightBg: "bg-[#D1F2EB]"
  },
  biology: {
    border: "border-[#8E44AD]",
    bg: "bg-purple-50",
    accent: "bg-[#8E44AD] hover:bg-[#703688] text-white",
    hover: "hover:bg-purple-50 hover:text-[#8E44AD] hover:border-[#8E44AD]",
    gradient: "from-purple-50 to-white",
    headingText: "text-[#703688]",
    lightBg: "bg-[#E8DAEF]"
  },
  math: {
    border: "border-[#D4AC0D]",
    bg: "bg-yellow-50",
    accent: "bg-[#D4AC0D] hover:bg-[#AA8A0A] text-white",
    hover: "hover:bg-yellow-50 hover:text-[#D4AC0D] hover:border-[#D4AC0D]",
    gradient: "from-yellow-50 to-white",
    headingText: "text-[#AA8A0A]",
    lightBg: "bg-[#FCF3CF]"
  },
  computer: {
    border: "border-[#2980B9]",
    bg: "bg-blue-50",
    accent: "bg-[#2980B9] hover:bg-[#1F618D] text-white",
    hover: "hover:bg-blue-50 hover:text-[#2980B9] hover:border-[#2980B9]",
    gradient: "from-blue-50 to-white",
    headingText: "text-[#1F618D]",
    lightBg: "bg-[#D4E6F1]"
  },
  botany: {
    border: "border-[#27AE60]",
    bg: "bg-green-50",
    accent: "bg-[#27AE60] hover:bg-[#1E8449] text-white",
    hover: "hover:bg-green-50 hover:text-[#27AE60] hover:border-[#27AE60]",
    gradient: "from-green-50 to-white",
    headingText: "text-[#1E8449]",
    lightBg: "bg-[#D5F5E3]"
  },
  zoology: {
    border: "border-[#7D3C98]",
    bg: "bg-purple-50",
    accent: "bg-[#7D3C98] hover:bg-[#5B2C6F] text-white",
    hover: "hover:bg-purple-50 hover:text-[#7D3C98] hover:border-[#7D3C98]",
    gradient: "from-purple-50 to-white",
    headingText: "text-[#5B2C6F]",
    lightBg: "bg-[#E8DAEF]"
  },
  english: {
    border: "border-[#8E44AD]",
    bg: "bg-purple-50",
    accent: "bg-[#8E44AD] hover:bg-[#703688] text-white",
    hover: "hover:bg-purple-50 hover:text-[#8E44AD] hover:border-[#8E44AD]",
    gradient: "from-purple-50 to-white",
    headingText: "text-[#703688]",
    lightBg: "bg-[#EBDEF0]"
  }
};

// Exam type color mappings using the optimized color scheme
const examTypeColors = {
  "Final Exam": "bg-blue-50 text-[#2980B9] border-[#2980B9]",
  "Mid-Term Exam": "bg-yellow-50 text-[#AA8A0A] border-[#D4AC0D]",
  "Model Questions": "bg-green-50 text-[#1E8449] border-[#27AE60]",
  "Chapter-wise": "bg-purple-50 text-[#703688] border-[#8E44AD]"
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
      border: "border-[#3498DB]",
      bg: "bg-blue-100",
      accent: "bg-[#3498DB] hover:bg-[#2980b9] text-white",
      hover: "hover:bg-blue-100 hover:text-[#3498DB]",
      gradient: "from-blue-100 to-blue-50",
      headingText: "text-[#2980b9]",
      lightBg: "bg-[#D4E6F1]"
    };
  };

  // Get color scheme for current tab
  const getCurrentColors = () => {
    return subjectColors[activeTab] || getDefaultAccent();
  };

  const colors = getCurrentColors();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Suspense fallback={<LoadingFallback />}>
      <Header />
      </Suspense>
      <main className="flex-1">
        {/* Header Banner - Standardized padding */}
        <section className="w-full bg-gradient-to-r from-blue-800 to-blue-900 py-16 md:py-20 text-white">
          <div className="container px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold animate-fade-in tracking-tight leading-tight">
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
            <div className="bg-amber-100 border border-amber-300 rounded-lg shadow-sm mb-8 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform">
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-amber-700 animate-pulse" />
                <p className="font-medium text-base md:text-lg text-amber-900">
                  Practicing with past papers is one of the most effective ways to prepare for exams!
                </p>
              </div>
            </div>

            <Tabs 
              defaultValue="physics" 
              className="w-full" 
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <div className="overflow-x-auto pb-4 mb-2">
                <TabsList className="w-full justify-start bg-gray-200 p-1">
                  {subjects.map(subject => (
                    <TabsTrigger 
                      key={subject.id} 
                      value={subject.id}
                      className={`min-w-max hover:scale-105 transition-transform duration-200 text-base font-medium ${
                        activeTab === subject.id 
                          ? `${subjectColors[subject.id]?.bg || 'bg-blue-100'} ${subjectColors[subject.id]?.border || 'border-[#3498DB]'} border-b-2 ${subjectColors[subject.id]?.headingText || 'text-[#2980b9]'} shadow-sm` 
                          : 'bg-transparent hover:bg-gray-300 text-gray-700'
                      }`}
                    >
                      {subject.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {subjects.map(subject => (
                <TabsContent key={subject.id} value={subject.id} className="mt-8">
                  <div 
                    className={`bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 ${subjectColors[subject.id]?.border || 'border-[#3498DB]'} mb-8 hover:-translate-y-1 transform group`}
                  >
                    <h3 className={`px-6 py-4 text-xl font-bold bg-gradient-to-r ${subjectColors[subject.id]?.gradient || 'from-blue-100 to-blue-50'} border-b rounded-t-lg ${subjectColors[subject.id]?.headingText || 'text-[#2980b9]'} group-hover:shadow-inner transition-all duration-300`}>
                      {subject.name} Past Year Papers
                      <div className="h-1 w-0 group-hover:w-full bg-current mt-1 transition-all duration-500 rounded"></div>
                    </h3>
                    <div className="p-6">
                      <Suspense fallback={<div className="animate-pulse h-40 bg-gray-100 rounded"></div>}>
                        <PastPapersTable 
                          subject={subject} 
                          examTypeColors={examTypeColors} 
                          subjectColors={subjectColors} 
                        />
                      </Suspense>
                    </div>
                  </div>

                  <div 
                    className={`mt-8 bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border-t-4 ${subjectColors[subject.id]?.border || 'border-[#3498DB]'} mb-4 hover:-translate-y-1 transform group`}
                  >
                    <h3 className={`px-6 py-4 text-xl font-bold bg-gradient-to-r ${subjectColors[subject.id]?.gradient || 'from-blue-100 to-blue-50'} border-b rounded-t-lg ${subjectColors[subject.id]?.headingText || 'text-[#2980b9]'} group-hover:shadow-inner transition-all duration-300`}>
                      {subject.name} Question Banks
                      <div className="h-1 w-0 group-hover:w-full bg-current mt-1 transition-all duration-500 rounded"></div>
                    </h3>
                    <div className="p-6 grid gap-6 md:grid-cols-2">
                      <div className="border border-[#8E44AD] rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#8E44AD] group/card bg-[#E8DAEF] hover:-translate-y-1 transform">
                        <h4 className="font-medium text-lg mb-3 group-hover/card:text-[#8E44AD] transition-colors duration-200 text-[#763c8e] flex items-center">
                          <span className={`inline-block mr-2 px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Chapter-wise"]} group-hover/card:scale-105 transition-transform duration-200`}>
                            Chapter-wise
                          </span>
                          <span className="group-hover/card:translate-x-1 transition-transform duration-200">Question Collection</span>
                        </h4>
                        <p className="text-base text-gray-800 mb-5 leading-relaxed">
                          Curated questions from all previous years, organized by chapter for focused practice.
                        </p>
                        <Button className="bg-[#8E44AD] hover:bg-[#763c8e] text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 group/btn">
                          <FileDown className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                          <span>Download Question Bank</span>
                        </Button>
                      </div>
                      
                      <div className="border border-[#2ECC71] rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-[#2ECC71] group/card bg-[#D5F5E3] hover:-translate-y-1 transform">
                        <h4 className="font-medium text-lg mb-3 group-hover/card:text-[#2ECC71] transition-colors duration-200 text-[#27ae60] flex items-center">
                          <span className={`inline-block mr-2 px-3 py-1.5 rounded text-sm font-medium ${examTypeColors["Model Questions"]} group-hover/card:scale-105 transition-transform duration-200`}>
                            Model
                          </span>
                          <span className="group-hover/card:translate-x-1 transition-transform duration-200">Questions</span>
                        </h4>
                        <p className="text-base text-gray-800 mb-5 leading-relaxed">
                          Expected question patterns for the upcoming exam with solutions.
                        </p>
                        <Button className="bg-[#2ECC71] hover:bg-[#27ae60] text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 group/btn">
                          <FileDown className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                          <span>Download Model Questions</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-gray-100 border rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform">
                    <p className="text-center text-gray-800 mb-3">Need more resources? Check our collection guides</p>
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        className="border-current text-current hover:bg-current hover:text-white transition-all duration-200 flex items-center gap-2 hover:gap-3 font-medium group"
                        style={{
                          borderColor: `${colors.border.includes('#') ? colors.border.replace('border-[', '').replace(']', '') : ''}`,
                          color: `${colors.headingText.includes('#') ? colors.headingText.replace('text-[', '').replace(']', '') : ''}`
                        }}
                      >
                        <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                        <span>View Study Guides</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingFallback />}>
      <Footer />
      </Suspense>
    </div>
  );
};

export default PYQ;
