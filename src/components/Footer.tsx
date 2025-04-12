
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
    // In a real application, we would handle the subscription here
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-nebBlue">NEB Science Hub</h3>
            <p className="text-sm text-gray-600">
              Your one-stop resource for Grade 11 science notes, past papers, and revision materials
              following the NEB curriculum in Nepal.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-nebBlue">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-nebBlue">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-nebBlue">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-nebBlue">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-nebBlue">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-nebBlue text-sm">
                Home
              </Link>
              <Link to="/subjects/physics" className="text-gray-600 hover:text-nebBlue text-sm">
                Physics
              </Link>
              <Link to="/subjects/chemistry" className="text-gray-600 hover:text-nebBlue text-sm">
                Chemistry
              </Link>
              <Link to="/subjects/mathematics" className="text-gray-600 hover:text-nebBlue text-sm">
                Mathematics
              </Link>
              <Link to="/pyq" className="text-gray-600 hover:text-nebBlue text-sm">
                Past Papers
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-nebBlue text-sm">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-nebBlue text-sm">
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-nebBlue">Subscribe to Newsletter</h3>
            <p className="text-sm text-gray-600">
              Stay updated with our latest notes and exam tips!
            </p>
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1"
                required
              />
              <Button type="submit" size="sm" className="bg-nebBlue text-white hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Mail className="h-4 w-4" />
              <span>contact@nebsciencehub.com</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-gray-600">
          <p>© 2081 NEB Science Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
