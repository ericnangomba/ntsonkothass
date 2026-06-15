import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import logoUrl from "@assets/ntsonkotha-senior-secondary-school_1779883577719.png";

export default function Footer() {
  return (
    <footer className="bg-[#0D1B4E] pt-16 pb-8 border-t-4 border-primary text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Motto */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-4 mb-6">
              <img src={logoUrl} alt="Ntsonkotha S.S.S Logo" className="h-16 w-auto object-contain" />
              <div>
                <h3 className="font-serif font-bold text-xl text-primary tracking-wide">
                  NTSONKOTHA S.S.S.
                </h3>
                <p className="font-serif italic text-sm text-foreground/80">
                  "Per Ardua Ad Astra"
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground/70 leading-relaxed max-w-sm">
              A proud pillar of academic excellence, heritage, and community spirit in the Eastern Cape since 1969. Through adversity to the stars.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg text-primary mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                  Academic Excellence
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                  Campus Life
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
                  Admissions Policy
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium flex items-center gap-2">
                  Apply Now <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded font-bold">OPEN</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg text-primary mb-6 uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-foreground/80 leading-relaxed">
                  Mgqukhwebe A/A, Agnes Rest<br />
                  Lady Frere, 5410<br />
                  Eastern Cape, South Africa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-sm text-foreground/80">+27 87 160 0951</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a href="mailto:ntsonkothaschool@gmail.com" className="text-sm text-foreground/80 hover:text-primary transition-colors">
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
