
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AuthStatus } from "./auth/AuthStatus";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="text-nebBlue">NEB</span> Science Hub
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="transition-colors hover:text-foreground/80">Home</Link>
          <Link to="/pyq" className="transition-colors hover:text-foreground/80">PYQs</Link>
          <Link to="/about" className="transition-colors hover:text-foreground/80">About</Link>
          <Link to="/contact" className="transition-colors hover:text-foreground/80">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <AuthStatus />
          <Button variant="default" size="sm">
            Subscribe
          </Button>
        </div>
      </div>
    </header>
  );
}
