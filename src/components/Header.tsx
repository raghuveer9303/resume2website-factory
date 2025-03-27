
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-xl font-display font-bold tracking-tight">Resume2Website</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#upload" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Upload Resume
          </a>
          <a href="#customize" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Customize
          </a>
          <a href="#preview" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Preview
          </a>
          <a href="#marketplace" className="text-sm font-medium hover:text-primary/80 transition-colors">
            Marketplace
          </a>
          <Button variant="default" size="sm" className="rounded-full px-6">
            Sign In
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 pt-16 px-4 transition-transform duration-300 md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-8 mt-8">
          <a 
            href="#upload" 
            className="text-lg font-medium text-center" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Upload Resume
          </a>
          <a 
            href="#customize" 
            className="text-lg font-medium text-center" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Customize
          </a>
          <a 
            href="#preview" 
            className="text-lg font-medium text-center" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Preview
          </a>
          <a 
            href="#marketplace" 
            className="text-lg font-medium text-center" 
            onClick={() => setMobileMenuOpen(false)}
          >
            Marketplace
          </a>
          <Button className="w-full rounded-full mt-4">
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
