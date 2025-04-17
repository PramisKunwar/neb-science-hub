
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Atom, FlaskConical, Calculator, Leaf, Mouse, BookText, Book, 
  LucideIcon, Laptop 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookmarkButton } from "@/components/BookmarkButton";

type SubjectCardProps = {
  id: string;
  name: string;
  icon: string;
  description: string;
};

export default function SubjectCard({ id, name, icon, description }: SubjectCardProps) {
  // Map icon string to Lucide component
  const getIcon = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      atom: Atom,
      "flask-conical": FlaskConical,
      calculator: Calculator,
      leaf: Leaf,
      mouse: Mouse,
      "book-text": BookText,
      book: Book,
      laptop: Laptop
    };
    return icons[iconName] || Book;
  };

  const IconComponent = getIcon(icon);

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="w-12 h-12 rounded-full bg-nebBlue bg-opacity-10 flex items-center justify-center mb-3">
            <IconComponent className="h-6 w-6 text-nebBlue" />
          </div>
          <BookmarkButton 
            contentType="subject"
            contentId={id}
            title={name}
            description={description}
            variant="icon"
          />
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </CardContent>
      <CardFooter>
        <Link to={`/subjects/${id}`} className="w-full">
          <Button variant="outline" className="w-full border-nebBlue text-nebBlue hover:bg-nebBlue hover:text-white">
            View Notes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
