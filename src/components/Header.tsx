import { useState, lazy, Suspense, useEffect } from "react";
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
import { Menu, X, Bookmark, Sparkles, UserCircle, LogOut } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { getCurrentUser, isAuthenticated, signOut } from "@/lib/supabase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Lazy load heavy components
const LazyContent = lazy(() => Promise.resolve({ default: NavigationMenuContent }));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

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

  // Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsUserAuthenticated(authenticated);
        
        if (authenticated) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setIsUserAuthenticated(false);
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Group subjects into columns for more compact display
  const leftColumnSubjects = subjects.slice(0, Math.ceil(subjects.length / 2));
  const rightColumnSubjects = subjects.slice(Math.ceil(subjects.length / 2));

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-nebPalette-lightGray transition-all duration-300",
      scrolled ? "border-b border-nebPalette-beige shadow-sm" : ""
    )}>
      <div className="container flex items-center justify-between h-16 px-4 md:px-6 mx-auto">
        <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105" aria-label="NEB Science Hub Home">
          <div className="bg-nebPalette-navy mr-2 p-1 rounded text-white">
            <Bookmark className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-nebPalette-navy tracking-tight">
              NEB 
              <span className="relative">
                Science
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-nebPalette-navy transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" aria-hidden="true"></span>
              </span>
              <span className="text-nebPalette-teal font-bold"> Hub</span>
            </span>
            {location.pathname === '/' && (
              <span className="text-xs text-nebPalette-teal -mt-1 font-medium tracking-wide">Your Science Resource Center</span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink
                    className={cn(
                      "nav-item px-3 py-1.5 text-sm font-medium relative group",
                      isActiveRoute('/') && "nav-item-active"
                    )}
                  >
                    Home
                    {isActiveRoute('/') && (
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "nav-item px-3 py-1.5 text-sm font-medium relative group",
                    isActiveRoute('/subjects') && "nav-item-active"
                  )}
                >
                  Subjects
                  {isActiveRoute('/subjects') && (
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>
                  )}
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
                              "flex items-start py-2 group border-b border-nebPalette-beige hover:bg-nebPalette-lightGray rounded-md px-2",
                              isActiveRoute(`/subjects/${subject.id}`) && "bg-nebPalette-lightGray"
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium group-hover:text-nebPalette-navy transition-colors",
                                isActiveRoute(`/subjects/${subject.id}`) ? "text-nebPalette-navy" : "text-nebPalette-teal"
                              )}>
                                {subject.name}
                              </p>
                              <p className="text-xs text-nebPalette-teal truncate mt-0.5 pr-4">
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
                              "flex items-start py-2 group border-b border-nebPalette-beige hover:bg-nebPalette-lightGray rounded-md px-2",
                              isActiveRoute(`/subjects/${subject.id}`) && "bg-nebPalette-lightGray"
                            )}
                          >
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                "text-sm font-medium group-hover:text-nebPalette-navy transition-colors",
                                isActiveRoute(`/subjects/${subject.id}`) ? "text-nebPalette-navy" : "text-nebPalette-teal"
                              )}>
                                {subject.name}
                              </p>
                              <p className="text-xs text-nebPalette-teal truncate mt-0.5 pr-4">
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
                      "nav-item px-3 py-1.5 text-sm font-medium relative group",
                      isActiveRoute('/pyq') && "nav-item-active"
                    )}
                  >
                    PYQ
                    {isActiveRoute('/pyq') && (
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink
                    className={cn(
                      "nav-item px-3 py-1.5 text-sm font-medium relative group",
                      isActiveRoute('/about') && "nav-item-active"
                    )}
                  >
                    About
                    {isActiveRoute('/about') && (
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                  <NavigationMenuLink
                    className={cn(
                      "nav-item px-3 py-1.5 text-sm font-medium relative group",
                      isActiveRoute('/contact') && "nav-item-active"
                    )}
                  >
                    Contact
                    {isActiveRoute('/contact') && (
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-nebPalette-red rounded-full"></span>
                    )}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User Authentication Section */}
          {isUserAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative rounded-full h-8 w-8 p-0 overflow-hidden border border-nebPalette-beige hover:border-nebPalette-teal hover:bg-nebPalette-lightGray"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={user?.user_metadata?.avatar_url} 
                      alt="User profile" 
                    />
                    <AvatarFallback 
                      className="bg-nebPalette-navy text-white"
                    >
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                  <DropdownMenuItem className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600 hover:text-red-700"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" onClick={() => window.scrollTo(0, 0)}>
              <Button
                variant="outline"
                size="sm"
                className="border-nebPalette-teal text-nebPalette-navy hover:bg-nebPalette-teal hover:text-white"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {isUserAuthenticated && (
            <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
                <AvatarFallback className="bg-nebPalette-navy text-white">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
          )}
          
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-nebPalette-lightGray pt-16 px-4">
            <nav className="space-y-3">
              <Link
                to="/"
                className={cn(
                  "mobile-nav-item pl-4",
                  isActiveRoute('/') ? "mobile-nav-item-active" : "text-nebPalette-teal"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                <span className="bg-nebPalette-lightGray p-1 rounded mr-2 text-nebPalette-navy">
                  <Sparkles className="h-4 w-4 inline" aria-hidden="true" />
                </span>
                Home
              </Link>
              <div className="py-1">
                <h3 className="text-lg font-medium mb-1 text-nebPalette-navy">Subjects</h3>
                <div className="ml-3 grid grid-cols-2 gap-x-2 gap-y-1 max-h-60 overflow-y-auto">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className={cn(
                        "mobile-nav-item pl-4",
                        isActiveRoute(`/subjects/${subject.id}`) ? "mobile-nav-item-active" : "text-nebPalette-teal"
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
                  "mobile-nav-item pl-4",
                  isActiveRoute('/pyq') ? "mobile-nav-item-active" : "text-nebPalette-teal"
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
                  "mobile-nav-item pl-4",
                  isActiveRoute('/about') ? "mobile-nav-item-active" : "text-nebPalette-teal"
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
                  "mobile-nav-item pl-4", 
                  isActiveRoute('/contact') ? "mobile-nav-item-active" : "text-nebPalette-teal"
                )}
                onClick={() => {
                  toggleMobileMenu();
                  window.scrollTo(0, 0);
                }}
              >
                Contact
              </Link>

              {/* Add authentication options to mobile menu */}
              <div className="border-t border-nebPalette-beige pt-3 mt-4">
                {isUserAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="mobile-nav-item pl-4 flex items-center"
                      onClick={() => {
                        toggleMobileMenu();
                        window.scrollTo(0, 0);
                      }}
                    >
                      <UserCircle className="h-4 w-4 mr-2" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut();
                        toggleMobileMenu();
                      }}
                      className="mobile-nav-item pl-4 flex items-center text-red-600 w-full text-left"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="mobile-nav-item pl-4 text-nebPalette-navy font-medium"
                    onClick={() => {
                      toggleMobileMenu();
                      window.scrollTo(0, 0);
                    }}
                  >
                    Sign In / Register
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
