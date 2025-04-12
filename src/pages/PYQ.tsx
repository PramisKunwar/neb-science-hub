
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { FileDown, Clock } from "lucide-react";
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

const PYQ = () => {
  const [activeTab, setActiveTab] = useState("physics");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header Banner */}
        <section className="w-full bg-gradient-to-r from-nebBlue to-blue-700 py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">Past Year Questions</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-[700px]">
                Access previous years' exam papers and questions for effective revision
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="w-full py-8">
          <div className="container px-4 md:px-6">
            <div className="bg-white border rounded-lg shadow-sm mb-6 p-4">
              <div className="flex items-center space-x-3 text-amber-600">
                <Clock className="h-5 w-5" />
                <p className="font-medium">
                  Practice with past papers is one of the most effective ways to prepare for exams!
                </p>
              </div>
            </div>

            <Tabs 
              defaultValue="physics" 
              className="w-full" 
              onValueChange={setActiveTab}
              value={activeTab}
            >
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full justify-start">
                  {subjects.map(subject => (
                    <TabsTrigger 
                      key={subject.id} 
                      value={subject.id}
                      className="min-w-max"
                    >
                      {subject.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {subjects.map(subject => (
                <TabsContent key={subject.id} value={subject.id} className="mt-6">
                  <div className="bg-white border rounded-lg shadow-sm">
                    <h3 className="px-4 py-3 text-lg font-medium bg-gray-50 border-b rounded-t-lg">
                      {subject.name} Past Year Papers
                    </h3>
                    <div className="p-4">
                      <Table>
                        <TableCaption>Available past papers for {subject.name}</TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* 2080 */}
                          <TableRow>
                            <TableCell className="font-medium">2080</TableCell>
                            <TableCell>Final Exam</TableCell>
                            <TableCell>Complete paper with marking scheme</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                          {/* 2079 */}
                          <TableRow>
                            <TableCell className="font-medium">2079</TableCell>
                            <TableCell>Final Exam</TableCell>
                            <TableCell>Complete paper with marking scheme</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                          {/* 2079 Mid-Term */}
                          <TableRow>
                            <TableCell className="font-medium">2079</TableCell>
                            <TableCell>Mid-Term Exam</TableCell>
                            <TableCell>Model questions for practice</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                          {/* 2078 */}
                          <TableRow>
                            <TableCell className="font-medium">2078</TableCell>
                            <TableCell>Final Exam</TableCell>
                            <TableCell>Complete paper with solutions</TableCell>
                            <TableCell className="text-right">
                              <Button size="sm" variant="outline">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="mt-6 bg-white border rounded-lg shadow-sm">
                    <h3 className="px-4 py-3 text-lg font-medium bg-gray-50 border-b rounded-t-lg">
                      {subject.name} Question Banks
                    </h3>
                    <div className="p-4 space-y-4">
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Chapter-wise Question Collection</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Curated questions from all previous years, organized by chapter for focused practice.
                        </p>
                        <Button size="sm" variant="outline">
                          <FileDown className="mr-2 h-4 w-4" />
                          Download Question Bank
                        </Button>
                      </div>
                      
                      <div className="border rounded p-4">
                        <h4 className="font-medium mb-2">Model Questions</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Expected question patterns for the upcoming exam with solutions.
                        </p>
                        <Button size="sm" variant="outline">
                          <FileDown className="mr-2 h-4 w-4" />
                          Download Model Questions
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PYQ;
