import { useState, useEffect } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <RouterNavLink
      to={to}
      className={`px-3 py-2 rounded-md font-medium transition-colors hover:bg-gray-100 ${
        isActive ? "bg-gray-100 text-gray-900" : "text-gray-700"
      }`}
    >
      {children}
    </RouterNavLink>
  );
};

const MobileNavLink = ({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link to={to} onClick={onClick} className="block px-4 py-3 text-gray-800 hover:bg-gray-100">
    {children}
  </Link>
);

const AuthStatus = ({ className }: { className?: string }) => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <p className="text-gray-700">
          Hello,{" "}
          <Link to="/profile" className="underline">
            {user.email}
          </Link>
        </p>
        <Button variant="outline" size="sm" onClick={signOut}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Link to="/login">
        <Button variant="outline" size="sm">
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm">Sign Up</Button>
      </Link>
    </div>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full py-4 px-4 md:px-6 bg-white border-b shadow-sm">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl">NEB Science Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/pyq">PYQs</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/bookmarks">Bookmarks</NavLink>
        </nav>

        {/* Right side - Auth status or hamburger */}
        <div className="flex items-center">
          <AuthStatus className="hidden md:flex" />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={closeMobileMenu}>
          <div
            className="absolute right-0 top-0 h-screen w-3/4 max-w-sm bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <p className="font-bold text-lg">Menu</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4">
              <MobileNavLink to="/" onClick={closeMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/pyq" onClick={closeMobileMenu}>
                PYQs
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={closeMobileMenu}>
                About
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={closeMobileMenu}>
                Contact
              </MobileNavLink>
              <MobileNavLink to="/bookmarks" onClick={closeMobileMenu}>
                Bookmarks
              </MobileNavLink>
              <div className="mt-4 pt-4 border-t">
                <AuthStatus className="flex flex-col space-y-2" />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
