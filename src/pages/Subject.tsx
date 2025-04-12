
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSubjectById } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Subject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [activeTab, setActiveTab] = useState("notes");
  
  const subject = subjectId ? getSubjectById(subjectId) : undefined;

  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Subject Not Found</h1>
            <p className="text-gray-600 mb-6">The subject you're looking for doesn't exist.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header Banner */}
        <section className="w-full bg-gradient-to-r from-nebBlue to-blue-700 py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{subject.name}</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-[700px]">
                {subject.description}
              </p>
              <Link to="/">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-nebBlue">
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
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
                <TabsTrigger value="notes">Notes & Chapters</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              
              {/* Notes & Chapters Tab */}
              <TabsContent value="notes" className="mt-6">
                <div className="space-y-6">
                  {subject.areas.map((area, index) => (
                    <div key={index} className="bg-white border rounded-lg shadow-sm">
                      <h3 className="px-4 py-3 text-lg font-medium bg-gray-50 border-b rounded-t-lg">
                        {area.name}
                      </h3>
                      <div className="p-4">
                        <Accordion type="multiple" className="w-full">
                          {area.chapters.map((chapter) => (
                            <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`}>
                              <AccordionTrigger className="text-left">
                                <span className="font-medium">{chapter.title}</span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="pt-2 space-y-4">
                                  <p className="text-sm text-gray-600">
                                    Comprehensive notes covering all the key concepts for this chapter.
                                  </p>
                                  {chapter.notesPath && (
                                    <a 
                                      href={chapter.notesPath} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="inline-flex"
                                    >
                                      <Button size="sm" variant="outline">
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
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Resources Tab */}
              <TabsContent value="resources" className="mt-6">
                <div className="bg-white border rounded-lg shadow-sm">
                  <h3 className="px-4 py-3 text-lg font-medium bg-gray-50 border-b rounded-t-lg">
                    Additional Resources
                  </h3>
                  <div className="p-4 space-y-4">
                    <div className="border rounded p-4">
                      <h4 className="font-medium mb-2">Formula Sheet</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Quick reference of all important formulas for {subject.name}.
                      </p>
                      <Button size="sm" variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download Formula Sheet
                      </Button>
                    </div>
                    
                    <div className="border rounded p-4">
                      <h4 className="font-medium mb-2">Reference Textbooks</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>NEB Recommended Textbook</li>
                        <li>Comprehensive Guide to {subject.name}</li>
                        <li>Practice Problems Collection</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded p-4">
                      <h4 className="font-medium mb-2">Video Tutorials</h4>
                      <p className="text-sm text-gray-600">
                        Video explanations of complex topics are available on our YouTube channel.
                      </p>
                      <a 
                        href="https://youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block mt-2 text-nebBlue hover:underline"
                      >
                        Visit YouTube Channel
                      </a>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Subject;
