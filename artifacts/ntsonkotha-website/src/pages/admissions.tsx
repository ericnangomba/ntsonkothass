import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, CalendarHeart, GraduationCap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroImg from "@assets/unnamed_(3)_1779883577720.jpg";

export default function Admissions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Students assembly" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-[#0D1B4E]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-black text-primary mb-4 drop-shadow-lg"
          >
            Join Our School Family
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Timeline */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-10">Admissions Framework</h2>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-white/10">
                {[
                  { title: "Submit Application", desc: "Applications open annually from April to October for the following academic year.", icon: FileText },
                  { title: "Provide Documentation", desc: "Submit all required certified documents to the administration office.", icon: CheckCircle2 },
                  { title: "Assessment & Placement", desc: "Review of academic history and boarding capacity availability.", icon: GraduationCap },
                  { title: "Confirmation of Admission", desc: "Successful candidates receive formal notification and orientation details.", icon: CalendarHeart }
                ].map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      {i + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card p-6 rounded-xl border border-white/5 shadow-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <step.icon className="w-5 h-5 text-accent" />
                        <h3 className="font-bold text-white text-lg">{step.title}</h3>
                      </div>
                      <p className="text-sm text-foreground/70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-12">
              
              {/* Checklist */}
              <div className="bg-card p-8 rounded-xl border-t-4 border-primary shadow-xl">
                <h3 className="text-2xl font-serif font-bold text-white mb-6">Required Documents</h3>
                <ul className="space-y-4">
                  {[
                    "Certified Birth Certificate / ID",
                    "Immunization Card (Clinic Card)",
                    "Latest School Report Card",
                    "Transfer Letter (if applicable)",
                    "Study Permits (international learners)"
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      <span className="text-foreground/80 font-medium">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Uniform Policy */}
              <div className="bg-card p-8 rounded-xl border-t-4 border-accent shadow-xl">
                <h3 className="text-2xl font-serif font-bold text-white mb-4">Uniform & Discipline</h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  Our uniform consists of White, Navy Blue, Red, and Gold accents. It is a symbol of our unity and equality. Wearing the Ntsonkotha uniform is a privilege that demands exemplary behavior.
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  All admissions are subject to the learner and parent agreeing to the Code of Conduct governed by the School Governing Body (SGB).
                </p>
              </div>

              <div className="text-center pt-4">
                <Link href="/register">
                  <Button size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-widest h-16 text-lg shadow-[0_0_40px_rgba(245,192,0,0.3)]">
                    Apply Now Online
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
