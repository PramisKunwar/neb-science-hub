import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, FileText, Book, History, X, ArrowRight, Sparkles } from "lucide-react";
import { searchAll } from "@/utils/search";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// Common search terms that can be suggested - moved outside component to prevent recreation
const popularSearchTerms = ["Physics", "Chemistry", "Biology", "Mathematics", "Mechanics", "Thermodynamics", "Optics", "Calculus", "Organic Chemistry", "Algebra", "Waves"];
export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchAll> | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("recentSearches");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading recent searches:", error);
      return [];
    }
  });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save recent searches to localStorage - optimized with useCallback
  const saveRecentSearches = useCallback((searches: string[]) => {
    try {
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error("Error saving recent searches:", error);
    }
  }, []);

  // Update localStorage when recentSearches changes
  useEffect(() => {
    saveRecentSearches(recentSearches);
  }, [recentSearches, saveRecentSearches]);

  // Handle autocomplete suggestions whenever query changes - optimized with useCallback
  const updateSuggestions = useCallback((searchQuery: string, searches: string[]) => {
    if (searchQuery.trim().length > 1) {
      // Find matching popular terms
      const matchedTerms = popularSearchTerms.filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()) && term.toLowerCase() !== searchQuery.toLowerCase());

      // Find matching recent searches
      const matchedRecent = searches.filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()) && term.toLowerCase() !== searchQuery.toLowerCase() && !matchedTerms.some(popularTerm => popularTerm.toLowerCase() === term.toLowerCase()));
      setSuggestions([...matchedRecent, ...matchedTerms].slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, []);

  // Update suggestions when query or recentSearches change
  useEffect(() => {
    updateSuggestions(query, recentSearches);
  }, [query, recentSearches, updateSuggestions]);

  // Memoize popular search terms to avoid recalculating on render
  const displayedPopularTerms = useMemo(() => popularSearchTerms.slice(0, 6), []);

  // Optimize search handler with useCallback
  const handleSearch = useCallback((e: React.FormEvent, searchTerm = query) => {
    e.preventDefault();
    const termToSearch = searchTerm.trim();
    if (termToSearch) {
      const searchResults = searchAll(termToSearch);
      setResults(searchResults);
      setShowResults(true);
      setQuery(termToSearch);

      // Add to recent searches if not already there
      if (!recentSearches.includes(termToSearch)) {
        const newRecentSearches = [termToSearch, ...recentSearches].slice(0, 5);
        setRecentSearches(newRecentSearches);
      }
    }
  }, [query, recentSearches]);
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults(null);
    setShowResults(false);
    setHoveredSuggestion(null);
    inputRef.current?.focus();
  }, []);
  const handleSuggestionClick = useCallback((suggestion: string, e: React.MouseEvent) => {
    e.preventDefault();
    setQuery(suggestion);
    handleSearch(e as unknown as React.FormEvent, suggestion);
  }, [handleSearch]);
  const handleRecentSearchClick = useCallback((term: string, e: React.MouseEvent) => {
    e.preventDefault();
    setQuery(term);
    handleSearch(e as unknown as React.FormEvent, term);
  }, [handleSearch]);

  // Handle click outside - optimized with useCallback
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowResults(false);
      setIsInputFocused(false);
      setHoveredSuggestion(null);
    }
  }, []);

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHoveredSuggestion(prev => {
          if (prev === null || prev >= suggestions.length - 1) return 0;
          return prev + 1;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHoveredSuggestion(prev => {
          if (prev === null || prev <= 0) return suggestions.length - 1;
          return prev - 1;
        });
      } else if (e.key === 'Enter' && hoveredSuggestion !== null) {
        e.preventDefault();
        setQuery(suggestions[hoveredSuggestion]);
        handleSearch(e as unknown as React.FormEvent, suggestions[hoveredSuggestion]);
      } else if (e.key === 'Escape') {
        setHoveredSuggestion(null);
        setShowResults(false);
        inputRef.current?.blur();
      }
    }
  }, [suggestions, hoveredSuggestion, handleSearch]);
  return <div className="w-full max-w-3xl mx-auto px-4 py-8 relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <SearchIcon className="h-5 w-5" />
        </div>
        
      <form onSubmit={handleSearch} className="flex space-x-2">
          <div className="relative flex-1 group">
        <Input ref={inputRef} type="text" placeholder="Search for notes, subjects, chapters..." value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setIsInputFocused(true)} onKeyDown={handleKeyDown} className="pl-10 pr-10 bg-white border-2 border-gray-300 focus:border-nebBlue focus:ring-2 focus:ring-blue-100 h-12 text-base group-hover:border-gray-400 transition-all duration-200" aria-label="Search content" />
            {query && <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200" aria-label="Clear search">
                <X className="h-5 w-5" />
              </button>}
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-b"></div>
          </div>
          <Button type="submit" className="text-white transition-all duration-200 h-12 px-6 shadow-sm hover:shadow transform hover:-translate-y-1 hover:scale-105 font-medium bg-[#bf3952]">
          <SearchIcon className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      </div>

      {/* Empty state feedback */}
      {isInputFocused && !query && !showResults && <Card className="mt-2 absolute w-full z-10 border-2 border-gray-200 shadow-md animate-fadeIn">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <History className="h-4 w-4 mr-2 text-nebBlue" />
                RECENT SEARCHES
              </h3>
              {recentSearches.length > 0 ? <ul className="space-y-1">
                  {recentSearches.map((term, index) => <li key={index}>
                      <button onClick={e => handleRecentSearchClick(term, e)} className="flex items-center w-full p-2 hover:bg-blue-50 rounded-md text-left group transition-all duration-200 hover:pl-3">
                        <History className="h-4 w-4 mr-2 text-gray-500 group-hover:text-nebBlue transition-colors" />
                        <span className="flex-1 group-hover:font-medium transition-all">{term}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-nebBlue transition-all transform group-hover:translate-x-1" />
                      </button>
                    </li>)}
                </ul> : <p className="text-gray-500 text-sm">No recent searches</p>}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700 mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                POPULAR SEARCHES
              </h3>
              <div className="flex flex-wrap gap-2">
                {displayedPopularTerms.map((term, index) => <Badge key={index} className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-nebBlue border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-sm" onClick={e => handleSuggestionClick(term, e as React.MouseEvent)}>
                    {term}
                  </Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>}

      {/* Autocomplete suggestions */}
      {isInputFocused && query && suggestions.length > 0 && !showResults && <Card className="mt-2 absolute w-full z-10 border-2 border-gray-200 shadow-md animate-fadeIn">
          <CardContent className="p-0">
            <ul>
              {suggestions.map((suggestion, index) => <li key={index}>
                  <button onClick={e => handleSuggestionClick(suggestion, e)} onMouseEnter={() => setHoveredSuggestion(index)} className={`flex items-center w-full p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 text-left transition-all duration-200 group ${hoveredSuggestion === index ? 'bg-blue-50' : ''}`}>
                    <SearchIcon className={`h-4 w-4 mr-2 ${hoveredSuggestion === index ? 'text-nebBlue' : 'text-gray-500'} group-hover:text-nebBlue transition-colors`} />
                    <span className={`${hoveredSuggestion === index ? 'font-medium' : ''} group-hover:font-medium transition-all`}>{suggestion}</span>
                    <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 text-nebBlue transition-all transform group-hover:translate-x-1" />
                  </button>
                </li>)}
            </ul>
          </CardContent>
        </Card>}

      {/* Search Results */}
      {showResults && results && <Card className="mt-2 absolute w-full z-10 max-h-[60vh] overflow-y-auto border-2 border-gray-200 shadow-md animate-fadeIn">
          <CardContent className="p-4">
            {results.subjects.length === 0 && results.notes.length === 0 ? <div className="text-center py-6">
                <p className="text-gray-700 mb-2 font-medium">No results found for "{query}"</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search terms or browse our popular topics</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {displayedPopularTerms.map((term, index) => <Badge key={index} className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-nebBlue border border-gray-200 cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-sm" onClick={e => handleSuggestionClick(term, e as React.MouseEvent)}>
                      {term}
                    </Badge>)}
                </div>
              </div> : <>
                {results.subjects.length > 0 && <div className="mb-4">
                    <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                      <Book className="h-4 w-4 mr-2 text-nebBlue" />
                      SUBJECTS ({results.subjects.length})
                    </h3>
                    <ul className="space-y-1">
                      {results.subjects.map(subject => <li key={subject.id}>
                          <Link to={`/subjects/${subject.id}`} className="flex items-center p-2 hover:bg-blue-50 rounded-md transition-all duration-200 group hover:pl-3" onClick={() => setShowResults(false)}>
                            <Book className="h-4 w-4 mr-2 text-nebBlue" />
                            <span className="font-medium group-hover:text-nebBlue transition-colors">{subject.name}</span>
                            <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 text-nebBlue transition-all transform group-hover:translate-x-1" />
                          </Link>
                        </li>)}
                    </ul>
                  </div>}

                {results.notes.length > 0 && <div>
                    <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-nebBlue" />
                      NOTES & MATERIALS ({results.notes.length})
                    </h3>
                    <ul className="space-y-1">
                      {results.notes.map(note => <li key={note.id}>
                          <a href={note.path} className="flex items-center p-2 hover:bg-blue-50 rounded-md transition-all duration-200 group hover:pl-3" target="_blank" rel="noopener noreferrer" onClick={() => setShowResults(false)}>
                            <FileText className="h-4 w-4 mr-2 text-nebBlue" />
                            <div className="flex-1">
                              <span className="block font-medium group-hover:text-nebBlue transition-colors">{note.title}</span>
                              <span className="text-xs text-gray-600 capitalize">{note.type} • {note.subject.replace('-', ' ')}</span>
                            </div>
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-nebBlue transition-all transform group-hover:translate-x-1" />
                          </a>
                        </li>)}
                    </ul>
                  </div>}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Found {results.subjects.length + results.notes.length} results for "{query}"</p>
                </div>
              </>}
          </CardContent>
        </Card>}
    </div>;
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;
document.head.appendChild(style);