
import { useState, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X, Bookmark, Sparkles } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

// Lazy load heavy components
const LazyContent = lazy(() => Promise.resolve({ default: NavigationMenuContent }));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Function to check if a route is active
  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Group subjects into columns for more compact display
  const leftColumnSubjects = subjects.slice(0, Math.ceil(subjects.length / 2));
  const rightColumnSubjects = subjects.slice(Math.ceil(subjects.length / 2));

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105" aria-label="NEB Science Hub Home">
          <div className="bg-blue-600 mr-2 p-1 rounded text-white">
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-blue-600 tracking-tight">
              NEB 
              <span className="relative">
                Science
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
              </span>
              <span className="text-gray-700 font-bold"> Hub</span>
            </span>
            {location.pathname === '/' && (
              <span className="text-xs text-gray-500 -mt-1 font-medium tracking-wide">Your Science Resource Center</span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({ className: "px-3 py-1.5" }),
                    isActiveRoute('/') && "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "px-3 py-1.5",
                isActiveRoute('/subjects') && "text-blue-600 font-medium"
              )}>
                Subjects
              </NavigationMenuTrigger>
              <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                <NavigationMenuContent>
                  <div className="w-[480px] p-4 grid grid-cols-2 gap-x-4">
                    <div>
                      {leftColumnSubjects.map((subject) => (
                        <Link
                          key={subject.id}
                          to={`/subjects/${subject.id}`}
                          onClick={() => window.scrollTo(0, 0)}
                          className={cn(
                            "flex items-start py-2 group border-b border-gray-100 hover:bg-gray-50 rounded-md px-2",
                            isActiveRoute(`/subjects/${subject.id}`) && "bg-blue-50"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-sm font-medium group-hover:text-blue-600 transition-colors",
                              isActiveRoute(`/subjects/${subject.id}`) ? "text-blue-600" : "text-gray-800"
                            )}>
                              {subject.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5 pr-4">
                              {subject.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div>
                      {rightColumnSubjects.map((subject) => (
                        <Link
                          key={subject.id}
                          to={`/subjects/${subject.id}`}
                          onClick={() => window.scrollTo(0, 0)}
                          className={cn(
                            "flex items-start py-2 group border-b border-gray-100 hover:bg-gray-50 rounded-md px-2",
                            isActiveRoute(`/subjects/${subject.id}`) && "bg-blue-50"
                          )}
                        >
                          <div className="flex-1 min-w-0">
                            <p className={cn(
                              "text-sm font-medium group-hover:text-blue-600 transition-colors",
                              isActiveRoute(`/subjects/${subject.id}`) ? "text-blue-600" : "text-gray-800"
                            )}>
                              {subject.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5 pr-4">
                              {subject.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </Suspense>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pyq" onClick={() => window.scrollTo(0, 0)}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({ className: "px-3 py-1.5" }),
                    isActiveRoute('/pyq') && "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                  )}
                >
                  PYQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({ className: "px-3 py-1.5" }),
                    isActiveRoute('/about') && "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                  )}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle({ className: "px-3 py-1.5" }),
                    isActiveRoute('/contact') && "text-blue-600 font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                  )}
                >
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white pt-16 px-4">
            <nav className="space-y-3">
              <Link
                to="/"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-blue-600 transition-colors flex items-center",
                  isActiveRoute('/') ? "text-blue-600" : "text-gray-600"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                <span className="bg-blue-50 p-1 rounded mr-2 text-blue-600">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                Home
              </Link>
              <div className="py-1">
                <h3 className="text-lg font-medium mb-1 text-gray-800">Subjects</h3>
                <div className="ml-3 grid grid-cols-2 gap-x-2 gap-y-1 max-h-60 overflow-y-auto">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className={cn(
                        "block py-1 hover:text-blue-600 transition-colors",
                        isActiveRoute(`/subjects/${subject.id}`) ? "text-blue-600 font-medium" : "text-gray-600"
                      )}
                      onClick={() => {
                        toggleMobileMenu();
                        window.scrollTo(0, 0);
                      }}
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/pyq"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-blue-600 transition-colors",
                  isActiveRoute('/pyq') ? "text-blue-600" : "text-gray-600"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                PYQ
              </Link>
              <Link
                to="/about"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-blue-600 transition-colors",
                  isActiveRoute('/about') ? "text-blue-600" : "text-gray-600"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-blue-600 transition-colors",
                  isActiveRoute('/contact') ? "text-blue-600" : "text-gray-600"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                Contact
              </Link>
            </nav>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
