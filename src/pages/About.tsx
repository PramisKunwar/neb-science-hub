
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { BookOpen, Award, Users, Target, Mail, ExternalLink, MapPin, Briefcase, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Header Banner with improved contrast */}
        <section className="w-full bg-gradient-to-r from-nebBlue to-blue-800 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">About Us</h1>
              <p className="text-lg md:text-xl text-white max-w-[700px] leading-relaxed">
                Learn more about our mission to support Grade 11 science students in Nepal
              </p>
              {/* Clear CTA for navigation */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 animate-fade-in">
                <Button asChild size="lg" className="bg-white text-nebBlue hover:bg-gray-100">
                  <a href="#mission">Our Mission</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                  <a href="#team">Our Team</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Summary Section - Highlighting core offerings */}
        <section className="w-full py-12 bg-white">
          <div className="container px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">At a Glance</h2>
            <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="text-xl text-gray-800 mb-6 leading-relaxed">
                NEB Science Hub is dedicated to providing high-quality, accessible study materials for Grade 11 science students following the National Examinations Board (NEB) curriculum in Nepal.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="bg-nebBlue bg-opacity-10 p-1.5 rounded-full mt-0.5">
                    <Award className="h-5 w-5 text-nebBlue" />
                  </div>
                  <span className="text-lg">Subject-specific notes aligned with the latest NEB curriculum</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-nebBlue bg-opacity-10 p-1.5 rounded-full mt-0.5">
                    <Award className="h-5 w-5 text-nebBlue" />
                  </div>
                  <span className="text-lg">Previous year question papers with detailed solutions</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="bg-nebBlue bg-opacity-10 p-1.5 rounded-full mt-0.5">
                    <Award className="h-5 w-5 text-nebBlue" />
                  </div>
                  <span className="text-lg">Resources created by experienced educators and subject specialists</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Content with consistent spacing */}
        <section className="w-full py-12 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="prose prose-lg mx-auto">
              <Separator className="my-8" />

              {/* Mission & Vision Cards with hover effects */}
              <div id="mission" className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
                <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-nebBlue animate-fade-in">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full">
                        <BookOpen className="h-6 w-6 text-nebBlue" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Our Mission</h3>
                        <p className="text-gray-700 leading-relaxed">
                          To empower students with comprehensive, easy-to-understand educational resources that enhance their learning experience and academic performance.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-all duration-300 border-l-4 border-l-purple-500 animate-fade-in">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500 bg-opacity-10 p-3 rounded-full">
                        <Target className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Our Vision</h3>
                        <p className="text-gray-700 leading-relaxed">
                          To be the leading educational resource platform for science students in Nepal, bridging gaps in educational access across all regions of the country.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h2 id="who-we-are" className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900">Who We Are</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Founded by a team of experienced educators and former NEB students, NEB Science Hub understands the challenges faced by Grade 11 science students. Our team includes subject matter experts in Physics, Chemistry, Biology, Mathematics, and Computer Science who work diligently to create accurate, curriculum-aligned study materials.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We believe that quality education should be accessible to all students regardless of their geographic location or economic background. That's why we've created this platform to provide free, high-quality study resources that can help students excel in their academic journey.
                </p>
              </div>

              <div className="my-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-100 shadow-sm">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Why Choose NEB Science Hub?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-4">
                    <div className="bg-nebBlue bg-opacity-10 p-2 rounded-full mt-1 flex-shrink-0">
                      <Award className="h-5 w-5 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Curriculum-Aligned Content</span>
                      <p className="text-gray-700 mt-1">
                        All our materials strictly follow the latest NEB curriculum guidelines, ensuring you learn exactly what you need for your exams.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-nebBlue bg-opacity-10 p-2 rounded-full mt-1 flex-shrink-0">
                      <Award className="h-5 w-5 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Expert-Created Resources</span>
                      <p className="text-gray-700 mt-1">
                        Notes and materials developed by experienced educators with deep subject knowledge and teaching experience in Nepal's education system.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-nebBlue bg-opacity-10 p-2 rounded-full mt-1 flex-shrink-0">
                      <Award className="h-5 w-5 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Comprehensive Coverage</span>
                      <p className="text-gray-700 mt-1">
                        From detailed chapter notes to past papers, we cover all aspects of your educational needs to ensure complete preparation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="bg-nebBlue bg-opacity-10 p-2 rounded-full mt-1 flex-shrink-0">
                      <Award className="h-5 w-5 text-nebBlue" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Accessibility</span>
                      <p className="text-gray-700 mt-1">
                        Our responsive website ensures students can access materials on any device, anywhere, making learning possible even in remote areas of Nepal.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Team section with detailed information and hover cards */}
              <h2 id="team" className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-gray-900">Our Team</h2>
              <p className="text-gray-700 mb-6">
                Our team consists of educators, subject matter experts, and educational technology specialists committed to improving the learning experience for students across Nepal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    name: "Aarab Bashyal",
                    role: "Founder & Physics Expert",
                    bio: "Former NEB instructor with 6+ years of teaching experience specialized in simplifying complex physics concepts.",
                    social: { twitter: "#", linkedin: "#", github: "#" }
                  },
                  {
                    name: "Pranish Khanal",
                    role: "Chemistry Specialist",
                    bio: "MSc in Chemistry with research focus on educational methodologies for secondary education in Nepal.",
                    social: { twitter: "#", linkedin: "#", github: "#" }
                  },
                  {
                    name: "Pramis Kunwar",
                    role: "Mathematics Lead",
                    bio: "Mathematics educator with experience developing curriculum materials for NEB students.",
                    social: { twitter: "#", linkedin: "#", github: "#" }
                  },
                  {
                    name: "Deepak Puri",
                    role: "Biology & Content Lead",
                    bio: "Biology specialist with expertise in creating accessible scientific content for diverse student populations.",
                    social: { twitter: "#", linkedin: "#", github: "#" }
                  }
                ].map((member, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full">
                              <Users className="h-6 w-6 text-nebBlue" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                              <div className="flex items-center text-gray-600 mt-1 space-x-1">
                                <Briefcase className="h-4 w-4" />
                                <span className="text-sm">{member.role}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.bio}</p>
                        <div className="flex pt-2 gap-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" aria-label={`${member.name}'s Twitter`}>
                            <Twitter className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" aria-label={`${member.name}'s LinkedIn`}>
                            <Linkedin className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0" aria-label={`${member.name}'s GitHub`}>
                            <Github className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>

              <div className="flex items-center justify-center mt-8 border-t pt-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Team</h3>
                  <p className="text-gray-700 mb-4">
                    Passionate about education? We're always looking for talented educators and contributors to join our mission.
                  </p>
                  <Button asChild>
                    <Link to="/contact" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Contact Us to Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clear CTA Section */}
        <section className="w-full py-12 bg-nebBlue text-white">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to enhance your NEB Science studies?</h2>
            <p className="text-lg mb-6 max-w-2xl mx-auto">
              Explore our comprehensive resources designed specifically for Grade 11 science students in Nepal.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-nebBlue hover:bg-gray-100">
                <Link to="/">Explore Subjects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/pyq">View Past Papers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
