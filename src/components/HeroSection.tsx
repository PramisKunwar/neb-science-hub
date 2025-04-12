
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-nebBlue to-blue-700 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Grade 11 Science Notes
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-[700px]">
            Your one-stop resource for NEB grade 11 science notes
          </p>
          <Button
            size="lg"
            className="bg-white text-nebBlue hover:bg-gray-100 border-2 border-white"
            onClick={onExploreClick}
          >
            Explore Subjects
          </Button>
        </div>
      </div>
    </section>
  );
}
