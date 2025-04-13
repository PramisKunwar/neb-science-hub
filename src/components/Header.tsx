import { useState } from "react";
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
import { Menu, X } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-nebBlue">NEB Science Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={location.pathname === '/'}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Subjects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {subjects.map((subject) => (
                    <li key={subject.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          to={`/subjects/${subject.id}`}
                        >
                          <div className="text-sm font-medium leading-none">{subject.name}</div>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{subject.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/pyq">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={location.pathname === '/pyq'}
                >
                  PYQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={location.pathname === '/about'}
                >
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
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
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white pt-16 px-4">
            <nav className="space-y-4">
              <Link
                to="/"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue",
                  location.pathname === '/' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <div className="py-2">
                <h3 className="text-lg font-medium mb-2">Subjects</h3>
                <div className="ml-4 space-y-2">
                  {subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={`/subjects/${subject.id}`}
                      className={cn(
                        "block py-1 hover:text-nebBlue",
                        location.pathname === `/subjects/${subject.id}`
                          ? "text-nebBlue"
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
                  "block py-2 text-lg font-medium hover:text-nebBlue",
                  location.pathname === '/pyq' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                PYQ
              </Link>
              <Link
                to="/about"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue",
                  location.pathname === '/about' ? "text-nebBlue" : "text-gray-600"
                )}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={cn(
                  "block py-2 text-lg font-medium hover:text-nebBlue",
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
