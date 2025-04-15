import { lazy, Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { BookOpen, Award, Users, Target, Mail, ExternalLink, MapPin, Briefcase, Facebook, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

// Lazy load components to improve performance
const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nebBlue"></div>
  </div>
);

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingFallback />}>
        <Header />
      </Suspense>
      <main className="flex-1">
        {/* Header Banner with improved contrast */}
        <section className="w-full bg-gradient-to-r from-nebBlue to-blue-800 py-16 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter animate-fade-in">About Us</h1>
              <p className="text-lg md:text-xl text-white max-w-[700px] leading-relaxed">
                Learn more about our mission to support Grade 11 science students in Nepal
              </p>
              {/* Clear CTA for navigation */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 animate-fade-in">
                <Button asChild size="lg" className="bg-white text-nebBlue hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                  <a href="#mission">Our Mission</a>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 hover:scale-105 transition-transform duration-200">
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
                <Card className="hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 border-l-4 border-l-nebBlue animate-fade-in group">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full group-hover:bg-opacity-20 transition-all duration-300">
                        <BookOpen className="h-6 w-6 text-nebBlue group-hover:scale-110 transition-transform duration-300" />
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

                <Card className="hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 border-l-4 border-l-purple-500 animate-fade-in group">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-500 bg-opacity-10 p-3 rounded-full group-hover:bg-opacity-20 transition-all duration-300">
                        <Target className="h-6 w-6 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
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
              Our team is a dedicated collective of educators, subject matter experts, and cutting-edge educational technology specialists united by a passion for transforming and enhancing the learning journey for students across Nepal.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    name: "Aarab Bashyal",
                    role: "Youtube Content Creator",
                    bio: "Youtube Content Creator with experience creating content for NEB Science Hub.",
                    social: { facebook: "https://www.facebook.com/profile.php?id=100071328417151", youtube: "https://www.youtube.com/@AP2DShiksha", instagram: "https://www.instagram.com/ap2dshiksha/" },
                    color: "bg-blue-50 border-t-2 border-blue-400"
                  },
                  {
                    name: "Pranish Khanal",
                    role: "Copywriter",
                    bio: "Copywriter with experience writing content for NEB Science Hub.",
                    social: { facebook: "https://www.facebook.com/Pranish.Khanal.03", youtube: "https://www.youtube.com/@AP2DShiksha", instagram: "https://www.instagram.com/ap2dshiksha/" },
                    color: "bg-green-50 border-t-2 border-green-400"
                  },
                  {
                    name: "Pramis Kunwar",
                    role: "Website Developer",
                    bio: "Website Developer with experience developing website for NEB Science Hub.",
                    social: { facebook: "https://www.facebook.com/PramisKunwar123/", youtube: "https://www.youtube.com/@AP2DShiksha", instagram: "https://www.instagram.com/ap2dshiksha/" },
                    color: "bg-purple-50 border-t-2 border-purple-400"
                  },
                  {
                    name: "Deepak Puri",
                    role: "Copywriter",
                    bio: "Copywriter with experience writing content for NEB Science Hub.",
                    social: { facebook: "https://www.facebook.com/profile.php?id=100056435271979", youtube: "https://www.youtube.com/@AP2DShiksha", instagram: "https://www.instagram.com/ap2dshiksha/" },
                    color: "bg-amber-50 border-t-2 border-amber-400"
                  }
                ].map((member, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <Card className={`hover:shadow-lg hover:translate-y-[-4px] transition-all duration-300 cursor-pointer ${member.color}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-nebBlue bg-opacity-10 p-3 rounded-full group-hover:bg-opacity-20 transition-all duration-300">
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
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-blue-50 hover:scale-110 transition-all duration-200" aria-label={`${member.name}'s Facebook`} asChild>
                            <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                              <Facebook className="h-4 w-4 text-blue-600" />
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-red-50 hover:scale-110 transition-all duration-200" aria-label={`${member.name}'s YouTube`} asChild>
                            <a href={member.social.youtube} target="_blank" rel="noopener noreferrer">
                              <Youtube className="h-4 w-4 text-red-600" />
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-pink-50 hover:scale-110 transition-all duration-200" aria-label={`${member.name}'s Instagram`} asChild>
                            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                              <Instagram className="h-4 w-4 text-pink-600" />
                            </a>
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
              <Button asChild size="lg" className="bg-white text-nebBlue hover:bg-gray-100 hover:scale-105 transition-transform duration-200">
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>Explore Subjects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600 hover:scale-105 transition-all duration-200">
                <Link to="/pyq" onClick={() => window.scrollTo(0, 0)}>View Past Papers</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default About;
