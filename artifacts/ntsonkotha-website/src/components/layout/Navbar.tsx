import { Link } from "wouter";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/ntsonkotha-senior-secondary-school_1779883577719.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Academics", href: "/academics" },
    { label: "Campus Life", href: "/campus-life" },
    { label: "Admissions", href: "/admissions" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0D1B4E] border-b-2 border-primary w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 md:h-32">
          <Link href="/" className="flex items-center gap-2 sm:gap-4">
            <img src={logoUrl} alt="Ntsonkotha S.S.S Logo" className="h-16 sm:h-24 md:h-40 w-auto object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors font-medium text-xs lg:text-sm uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link href="/register">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider px-4 lg:px-6 text-xs lg:text-sm">
                Register
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-white/10 h-10 w-10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0D1B4E] border-t border-white/10">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-white/5 uppercase tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 pt-4">
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
