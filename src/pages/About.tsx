
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Award, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header Banner */}
        <section className="w-full bg-gradient-to-r from-nebBlue to-blue-700 py-12 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">About Us</h1>
              <p className="text-lg md:text-xl text-gray-100 max-w-[700px]">
                Learn more about our mission to support Grade 11 science students in Nepal
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
              <p className="lead text-xl text-gray-600">
                NEB Science Hub is dedicated to providing high-quality, accessible study materials for Grade 11 science students following the National Examinations Board (NEB) curriculum in Nepal.
              </p>

              <Separator className="my-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-nebBlue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                        <p className="text-gray-600 text-sm">
                          To empower students with comprehensive, easy-to-understand educational resources that enhance their learning experience and academic performance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full">
                        <Target className="h-6 w-6 text-nebBlue" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Our Vision</h3>
                        <p className="text-gray-600 text-sm">
                          To be the leading educational resource platform for science students in Nepal, bridging gaps in educational access across all regions of the country.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Who We Are</h2>
              <p>
                Founded by a team of experienced educators and former NEB students, NEB Science Hub understands the challenges faced by Grade 11 science students. Our team includes subject matter experts in Physics, Chemistry, Biology, Mathematics, and Computer Science who work diligently to create accurate, curriculum-aligned study materials.
              </p>

              <div className="my-8 bg-gray-50 border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose NEB Science Hub?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="bg-nebBlue bg-opacity-10 p-1 rounded-full mt-1">
                      <Award className="h-4 w-4 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-medium">Curriculum-Aligned Content:</span>{" "}
                      <span className="text-gray-600">
                        All our materials strictly follow the latest NEB curriculum guidelines.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-nebBlue bg-opacity-10 p-1 rounded-full mt-1">
                      <Award className="h-4 w-4 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-medium">Expert-Created Resources:</span>{" "}
                      <span className="text-gray-600">
                        Notes and materials developed by experienced educators with deep subject knowledge.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-nebBlue bg-opacity-10 p-1 rounded-full mt-1">
                      <Award className="h-4 w-4 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-medium">Comprehensive Coverage:</span>{" "}
                      <span className="text-gray-600">
                        From notes to past papers, we cover all aspects of your educational needs.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="bg-nebBlue bg-opacity-10 p-1 rounded-full mt-1">
                      <Award className="h-4 w-4 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-medium">Accessibility:</span>{" "}
                      <span className="text-gray-600">
                        Our responsive website ensures students can access materials on any device, anywhere.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
              <p>
                Our team consists of educators, subject matter experts, and educational technology specialists committed to improving the learning experience for students across Nepal.
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <Users className="h-5 w-5 text-nebBlue" />
                <span className="font-medium">Join our team of contributors!</span>
              </div>
              <p className="mt-2 text-gray-600">
               1. <b>A</b> arab Bashyal <br />
               2. <b>P</b> ranish Khanal <br />
               3. <b>P</b> ramis Kunwar <br />
               4. <b>D</b> eepak Puri <br />
              Please get in touch through our <a href="/contact" className="text-nebBlue hover:underline">Contact page</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
