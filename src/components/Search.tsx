
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, FileText, Book } from "lucide-react";
import { searchAll } from "@/utils/search";
import { Link } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchAll> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const searchResults = searchAll(query);
      setResults(searchResults);
      setShowResults(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative" ref={searchRef}>
      <form onSubmit={handleSearch} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search for notes, subjects, chapters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" className="bg-nebBlue text-white hover:bg-blue-700">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {showResults && results && (
        <Card className="mt-2 absolute w-full z-10 max-h-[60vh] overflow-y-auto">
          <CardContent className="p-4">
            {results.subjects.length === 0 && results.notes.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No results found</p>
            ) : (
              <>
                {results.subjects.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">SUBJECTS</h3>
                    <ul className="space-y-2">
                      {results.subjects.map((subject) => (
                        <li key={subject.id}>
                          <Link 
                            to={`/subjects/${subject.id}`} 
                            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                            onClick={() => setShowResults(false)}
                          >
                            <Book className="h-4 w-4 mr-2 text-nebBlue" />
                            <span>{subject.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {results.notes.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">NOTES & MATERIALS</h3>
                    <ul className="space-y-2">
                      {results.notes.map((note) => (
                        <li key={note.id}>
                          <a 
                            href={note.path} 
                            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowResults(false)}
                          >
                            <FileText className="h-4 w-4 mr-2 text-nebBlue" />
                            <div>
                              <span className="block">{note.title}</span>
                              <span className="text-xs text-muted-foreground capitalize">{note.type} • {note.subject.replace('-', ' ')}</span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
