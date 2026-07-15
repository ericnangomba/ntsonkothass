import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, GraduationCap, MapPin, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/WhatsApp_Image_2026-05-26_at_13.55.45_1779883577724.jpeg";
import logoUrl from "@assets/ntsonkotha-senior-secondary-school_1779883577719.png";
import leaderImg from "@assets/rcs2026.jpg";
import cultureImg from "@assets/unnamed_(4)_1779883577721.jpg";
import sportsImg from "@assets/unnamed_(1)_1779883577719.jpg";
import awardsImg from "@assets/unnamed_(10)_1779883577723.jpg";

function StatCounter({ label, value, prefix = "", suffix = "" }: { label: string, value: string, prefix?: string, suffix?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center space-y-2 p-6 border-l border-white/10 first:border-l-0"
    >
      <div className="text-4xl md:text-5xl font-serif font-bold text-primary">
        {prefix}{value}{suffix}
      </div>
      <div className="text-sm uppercase tracking-widest text-foreground/80 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] lg:h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Ntsonkotha S.S.S at dusk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B4E]/40 via-[#0D1B4E]/25 to-[#0D1B4E]/70" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-4 md:mt-8">
          <motion.img 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src={logoUrl} 
            alt="School Logo" 
            className="w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto mb-4 md:mb-6 lg:mb-8 drop-shadow-2xl"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-primary mb-3 md:mb-6 leading-tight drop-shadow-lg"
          >
            Through Adversity <br/><span className="text-white">to the Stars</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/90 max-w-3xl mx-auto mb-6 md:mb-10 lg:mb-12 leading-relaxed font-light px-2"
          >
            Welcome to Ntsonkotha Senior Secondary School — A proud pillar of academic excellence, heritage, and community spirit in the Eastern Cape since 1969.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2"
          >
            <Link href="/campus-life">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider h-12 sm:h-14 px-6 sm:px-8 text-xs sm:text-base">
                Explore Our Campus
              </Button>
            </Link>
            <Link href="/admissions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold uppercase tracking-wider h-12 sm:h-14 px-6 sm:px-8 text-xs sm:text-base bg-transparent">
                Admissions Info
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-10 h-10 text-primary opacity-80" />
        </motion.div>
      </section>

      {/* Quick Links Ribbon */}
      <div className="bg-primary py-3 md:py-4">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <Link href="/admissions" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-primary-foreground font-bold uppercase tracking-widest hover:text-white transition-colors text-center">
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </span>
              <span className="text-xs md:text-sm">Admissions</span>
            </Link>
            <span className="hidden md:block text-primary-foreground/30">•</span>
            <Link href="/academics" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-primary-foreground font-bold uppercase tracking-widest hover:text-white transition-colors text-center">
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </span>
              <span className="text-xs md:text-sm">Academic Results</span>
            </Link>
            <span className="hidden md:block text-primary-foreground/30">•</span>
            <Link href="/campus-life" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-primary-foreground font-bold uppercase tracking-widest hover:text-white transition-colors text-center">
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </span>
              <span className="text-xs md:text-sm">Campus Life</span>
            </Link>
            <span className="hidden md:block text-primary-foreground/30">•</span>
            <Link href="/contact" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-primary-foreground font-bold uppercase tracking-widest hover:text-white transition-colors text-center">
              <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto md:mx-0">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </span>
              <span className="text-xs md:text-sm">Contact Us</span>
            </Link>
          </div>
      </div>

      {/* Stats Section */}
      <section className="bg-card py-12 md:py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-x-0 md:divide-x divide-white/10">
            <StatCounter label="Year Founded" value="1969" />
            <StatCounter label="2025 Matric Pass" value="95.2" suffix="%" />
            <StatCounter label="Enrolled Learners" value="620" suffix="+" />
            <StatCounter label="Learner:Educator" value="33:1" />
          </div>
        </div>
      </section>

      {/* Principal's Welcome */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="space-y-2">
                <h3 className="text-accent font-bold tracking-widest uppercase text-sm">Welcome</h3>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  A Message from <br/><span className="text-primary">Leadership</span>
                </h2>
              </div>
              <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed border-l-4 border-primary pl-6 font-serif italic">
                "At Ntsonkotha, we believe in holistic growth. We do not merely produce matriculants; we cultivate leaders, thinkers, and resilient individuals who are prepared to face the world. Our heritage is deeply rooted in this community, and our future is as bright as the stars we aim for."
              </blockquote>
              <div className="pt-4">
                <p className="font-bold text-white uppercase tracking-wider">Mrs. Siyeka-Silosini</p>
                <p className="text-primary text-sm font-medium">Principal, Ntsonkotha S.S.S.</p>
              </div>
              <Link href="/about">
                <Button variant="link" className="text-primary hover:text-white p-0 h-auto font-bold uppercase tracking-wider mt-4">
                  Read Our Full Story &rarr;
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary translate-x-4 translate-y-4 rounded-lg"></div>
              <img 
                src={leaderImg} 
                alt="Current Leadership" 
                className="relative z-10 w-full h-[500px] object-cover rounded-lg border-2 border-primary shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full h-12 bg-card overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full text-background fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Latest Highlights */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-accent font-bold tracking-widest uppercase text-xs md:text-sm mb-2">Campus News</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white">Latest Highlights</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Annual Cultural Day",
                image: cultureImg,
                desc: "Celebrating our diverse heritage with traditional attire, music, and cuisine.",
                date: "Oct 2024"
              },
              {
                title: "Inter-School Sports Derby",
                image: sportsImg,
                desc: "Ntsonkotha triumphs in the regional rugby and netball championships.",
                date: "Aug 2024"
              },
              {
                title: "Academic Excellence Awards",
                image: awardsImg,
                desc: "Honoring our top achievers across all grades for their outstanding dedication.",
                date: "Feb 2025"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-background rounded-lg overflow-hidden border-t-4 border-primary group hover:-translate-y-2 transition-transform duration-300 shadow-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                    {item.date}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6">{item.desc}</p>
                  <Button variant="link" className="text-primary hover:text-white p-0 h-auto font-bold uppercase tracking-wider text-xs">
                    Read More &rarr;
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
