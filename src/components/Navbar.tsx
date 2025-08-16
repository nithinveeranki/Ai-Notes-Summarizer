import { Button } from "@/components/ui/button";
import { FileText, Sparkles, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-primary shadow-soft group-hover:shadow-glow transition-all">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            AI Notes Summarizer
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/summarize" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/summarize" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Summarize
          </Link>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            Sign In / Sign Up
          </Button>
          <Link to="/summarize">
            <Button variant="hero" size="sm">
              <Sparkles className="h-4 w-4" />
              Summarize
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;