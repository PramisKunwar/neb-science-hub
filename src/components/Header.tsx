import { useState, lazy, Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Menu, X, Bookmark, Sparkles } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { AuthStatus } from "@/components/auth/AuthStatus";

// Lazy load heavy components
const LazyContent = lazy(() => Promise.resolve({
  default: NavigationMenuContent
}));
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
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

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Group subjects into columns for more compact display
  const leftColumnSubjects = subjects.slice(0, Math.ceil(subjects.length / 2));
  const rightColumnSubjects = subjects.slice(Math.ceil(subjects.length / 2));
  return <header className={cn("sticky top-0 z-50 w-full bg-nebPalette-lightGray transition-all duration-300", scrolled ? "border-b border-nebPalette-beige shadow-sm" : "")}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105" aria-label="NEB Science Hub Home">
          <div className="bg-nebPalette-navy mr-2 p-1 rounded text-white">
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-nebPalette-navy tracking-tight">
              NEB 
              <span className="relative text-[#bf3952]">
                Science
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-nebPalette-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
              </span>
              <span className="text-nebPalette-teal font-bold"> Hub</span>
            </span>
            {location.pathname === '/' && <span className="text-xs text-nebPalette-teal -mt-1 font-medium tracking-wide">Your Science Resource Center</span>}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink className={cn("nav-item px-3 py-1.5 text-sm font-medium relative group", isActiveRoute('/') && "nav-item-active")}>
                    Home
                    {isActiveRoute('/') && <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn("nav-item px-3 py-1.5 text-sm font-medium relative group", isActiveRoute('/subjects') && "nav-item-active")}>
                  Subjects
                  {isActiveRoute('/subjects') && <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>}
                </NavigationMenuTrigger>
                <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                  <NavigationMenuContent>
                    <div className="w-[480px] p-4 grid grid-cols-2 gap-x-4">
                      <div>
                        {leftColumnSubjects.map(subject => <Link key={subject.id} to={`/subjects/${subject.id}`} onClick={() => window.scrollTo(0, 0)} className={cn("flex items-start py-2 group border-b border-nebPalette-beige hover:bg-nebPalette-lightGray rounded-md px-2", isActiveRoute(`/subjects/${subject.id}`) && "bg-nebPalette-lightGray")}>
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-medium group-hover:text-nebPalette-navy transition-colors", isActiveRoute(`/subjects/${subject.id}`) ? "text-nebPalette-navy" : "text-nebPalette-teal")}>
                                {subject.name}
                              </p>
                              <p className="text-xs text-nebPalette-teal truncate mt-0.5 pr-4">
                                {subject.description}
                              </p>
                            </div>
                          </Link>)}
                      </div>
                      <div>
                        {rightColumnSubjects.map(subject => <Link key={subject.id} to={`/subjects/${subject.id}`} onClick={() => window.scrollTo(0, 0)} className={cn("flex items-start py-2 group border-b border-nebPalette-beige hover:bg-nebPalette-lightGray rounded-md px-2", isActiveRoute(`/subjects/${subject.id}`) && "bg-nebPalette-lightGray")}>
                            <div className="flex-1 min-w-0">
                              <p className={cn("text-sm font-medium group-hover:text-nebPalette-navy transition-colors", isActiveRoute(`/subjects/${subject.id}`) ? "text-nebPalette-navy" : "text-nebPalette-teal")}>
                                {subject.name}
                              </p>
                              <p className="text-xs text-nebPalette-teal truncate mt-0.5 pr-4">
                                {subject.description}
                              </p>
                            </div>
                          </Link>)}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </Suspense>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pyq" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink className={cn("nav-item px-3 py-1.5 text-sm font-medium relative group", isActiveRoute('/pyq') && "nav-item-active")}>
                    PYQ
                    {isActiveRoute('/pyq') && <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink className={cn("nav-item px-3 py-1.5 text-sm font-medium relative group", isActiveRoute('/about') && "nav-item-active")}>
                    About
                    {isActiveRoute('/about') && <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink className={cn("nav-item px-3 py-1.5 text-sm font-medium relative group", isActiveRoute('/contact') && "nav-item-active")}>
                    Contact
                    {isActiveRoute('/contact') && <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <AuthStatus />
        </div>

        {/* Mobile Menu Button and Auth */}
        <div className="flex md:hidden items-center space-x-2">
          <AuthStatus />
          <Button variant="outline" size="icon" onClick={toggleMobileMenu} aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
            {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="fixed inset-0 z-50 bg-nebPalette-lightGray pt-16 px-4">
            <nav className="space-y-3">
              <Link to="/" className={cn("mobile-nav-item pl-4", isActiveRoute('/') ? "mobile-nav-item-active" : "text-nebPalette-teal")} onClick={() => {
            toggleMobileMenu();
            window.scrollTo(0, 0);
          }}>
                <span className="bg-nebPalette-lightGray p-1 rounded mr-2 text-nebPalette-navy">
                  <Sparkles className="h-4 w-4 inline" aria-hidden="true" />
                </span>
                Home
              </Link>
              <div className="py-1">
                <h3 className="text-lg font-medium mb-1 text-nebPalette-navy">Subjects</h3>
                <div className="ml-3 grid grid-cols-2 gap-x-2 gap-y-1 max-h-60 overflow-y-auto">
                  {subjects.map(subject => <Link key={subject.id} to={`/subjects/${subject.id}`} className={cn("mobile-nav-item pl-4", isActiveRoute(`/subjects/${subject.id}`) ? "mobile-nav-item-active" : "text-nebPalette-teal")} onClick={() => {
                toggleMobileMenu();
                window.scrollTo(0, 0);
              }}>
                      {subject.name}
                    </Link>)}
                </div>
              </div>
              <Link to="/pyq" className={cn("mobile-nav-item pl-4", isActiveRoute('/pyq') ? "mobile-nav-item-active" : "text-nebPalette-teal")} onClick={() => {
            toggleMobileMenu();
            window.scrollTo(0, 0);
          }}>
                PYQ
              </Link>
              <Link to="/about" className={cn("mobile-nav-item pl-4", isActiveRoute('/about') ? "mobile-nav-item-active" : "text-nebPalette-teal")} onClick={() => {
            toggleMobileMenu();
            window.scrollTo(0, 0);
          }}>
                About
              </Link>
              <Link to="/contact" className={cn("mobile-nav-item pl-4", isActiveRoute('/contact') ? "mobile-nav-item-active" : "text-nebPalette-teal")} onClick={() => {
            toggleMobileMenu();
            window.scrollTo(0, 0);
          }}>
                Contact
              </Link>
            </nav>
            <Button variant="outline" size="icon" className="absolute top-4 right-4" onClick={toggleMobileMenu} aria-label="Close menu">
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>}
      </div>
    </header>;
}