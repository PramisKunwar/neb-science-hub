
import { useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Search from "@/components/Search";
import { subjects } from "@/data/subjects";
import SubjectCard from "@/components/SubjectCard";
import UserEngagement from "@/components/UserEngagement";
import Footer from "@/components/Footer";

const Index = () => {
  const subjectsRef = useRef<HTMLDivElement>(null);

  const scrollToSubjects = () => {
    subjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection onExploreClick={scrollToSubjects} />
        <Search />
        
        <section ref={subjectsRef} className="w-full py-12 md:py-24" id="subjects">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Subject Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  name={subject.name}
                  icon={subject.icon}
                  description={subject.description}
                />
              ))}
            </div>
          </div>
        </section>

        <UserEngagement />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
