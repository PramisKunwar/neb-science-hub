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

  // Group subjects into columns for more compact display
  const leftColumnSubjects = subjects.slice(0, Math.ceil(subjects.length / 2));
  const rightColumnSubjects = subjects.slice(Math.ceil(subjects.length / 2));

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105">
          <div className="bg-nebBlue mr-2 p-1 rounded text-white">
            <Bookmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-nebBlue tracking-tight">
              NEB 
              <span className="relative">
                Science
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
              <span className="text-gray-700 font-bold"> Hub</span>
            </span>
            <span className="text-xs text-gray-500 -mt-1 font-medium tracking-wide">Your Science Resource Center</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-3 py-1.5" })}
                  active={location.pathname === '/'}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-3 py-1.5">Subjects</NavigationMenuTrigger>
              <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                <NavigationMenuContent>
                  <div className="w-[480px] p-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0">
                      <div>
                        {leftColumnSubjects.map((subject) => (
                          <Link
                            key={subject.id}
                            to={`/subjects/${subject.id}`}
                            className="flex items-start py-2 group border-b border-gray-100 hover:bg-gray-50 rounded-md px-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 group-hover:text-nebBlue transition-colors">
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
                            className="flex items-start py-2 group border-b border-gray-100 hover:bg-gray-50 rounded-md px-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 group-hover:text-nebBlue transition-colors">
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
                  </div>
                </NavigationMenuContent>
              </Suspense>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pyq">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-3 py-1.5" })}
                  active={location.pathname === '/pyq'}
                >
                  PYQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-3 py-1.5" })}
                  active={location.pathname === '/about'}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "px-3 py-1.5" })}
                  active={location.pathname === '/contact'}
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
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white pt-16 px-4">
            <nav className="space-y-3">
              <Link
                to="/"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue transition-colors flex items-center",
                  location.pathname === '/' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                <span className="bg-blue-50 p-1 rounded mr-2 text-nebBlue">
                  <Sparkles className="h-4 w-4" />
                </span>
                Home
              </Link>
              <div className="py-1">
                <h3 className="text-lg font-medium mb-1 text-gray-800">Subjects</h3>
                <div className="ml-3 grid grid-cols-2 gap-x-2 gap-y-1">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className={cn(
                        "block py-1 hover:text-nebBlue transition-colors",
                        location.pathname === `/subjects/${subject.id}`
                          ? "text-nebBlue font-medium"
                          : "text-gray-600"
                      )}
                      onClick={toggleMobileMenu}
                    >
                      {subject.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                to="/pyq"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue transition-colors",
                  location.pathname === '/pyq' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                PYQ
              </Link>
              <Link
                to="/about"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue transition-colors",
                  location.pathname === '/about' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue transition-colors",
                  location.pathname === '/contact' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
