import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import logoUrl from "@assets/ntsonkotha-senior-secondary-school_1779883577719.png";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B4E] pt-12 md:pt-16 pb-6 md:pb-8 border-t-4 border-primary text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand & Motto */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <img src={logoUrl} alt="Ntsonkotha S.S.S Logo" className="h-24 sm:h-32 md:h-48 w-auto object-contain" />
            </div>
            <p className="text-xs md:text-sm text-foreground/70 leading-relaxed max-w-sm">
              A proud pillar of academic excellence, heritage, and community spirit in the Eastern Cape since 1969. Through adversity to the stars.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-base md:text-lg text-primary mb-4 md:mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors text-xs md:text-sm font-medium">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-foreground/80 hover:text-primary transition-colors text-xs md:text-sm font-medium">
                  Academic Excellence
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="text-foreground/80 hover:text-primary transition-colors text-xs md:text-sm font-medium">
                  Campus Life
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-foreground/80 hover:text-primary transition-colors text-xs md:text-sm font-medium">
                  Admissions Policy
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-foreground/80 hover:text-primary transition-colors text-xs md:text-sm font-medium flex items-center gap-2 justify-center sm:justify-start">
                  Apply Now <span className="bg-accent text-white text-[9px] md:text-[10px] px-2 py-0.5 rounded font-bold">OPEN</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h4 className="font-serif font-bold text-base md:text-lg text-primary mb-4 md:mb-6 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3 justify-center sm:justify-start">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                  Mgqukhwebe A/A, Agnes Rest<br />
                  Lady Frere, 5410<br />
                  Eastern Cape, South Africa
                </span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                <span className="text-xs md:text-sm text-foreground/80">+27 87 160 0951</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 justify-center sm:justify-start">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-accent shrink-0" />
                <a href="mailto:ntsonkothaschool@gmail.com" className="text-xs md:text-sm text-foreground/80 hover:text-primary transition-colors">
                  ntsonkothaschool@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/50">
            &copy; {new Date().getFullYear()} Ntsonkotha Senior Secondary School. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-foreground/50">
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Directory</Link>
            <span>•</span>
            <span>Eastern Cape Department of Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
