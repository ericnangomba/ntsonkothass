import { motion } from "framer-motion";
import { BookOpen, Home as HomeIcon, Medal, Globe } from "lucide-react";

import heroImg from "@assets/WhatsApp_Image_2026-05-26_at_13.55.45_(1)_1779883577724.jpeg";
import gallery1 from "@assets/unnamed_(3)_1779883577720.jpg";
import gallery2 from "@assets/unnamed_(5)_1779883577721.jpg";
import gallery3 from "@assets/unnamed_1779883577724.webp";
import awardsImg from "@assets/awards1_1779888923524.jpeg";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Ntsonkotha S.S.S Administration" 
            className="w-full h-full object-cover"
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
            Our Heritage & Legacy
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-serif mb-12 text-center">
              Founded in May 1969, Ntsonkotha Senior Secondary School owes its existence to the visionary Nomtshongwana clan who generously donated the land, and the passionate local community spearheaded by Mr. Noholoza.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              Named after the life-giving waters of the local Ntsonkotha stream, the school has grown from humble beginnings into one of only three elite boarding institutions in the region. For over five decades, we have stood as a beacon of hope and excellence in the Chris Hani West district.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Our journey from a rural community initiative to a top-performing institution is a testament to the resilience of our people. We carry the dreams of Agnes Rest, Lady Frere, and the broader Eastern Cape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Motto Section */}
      <section className="py-24 bg-card border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-6xl md:text-8xl font-black text-white mb-8 tracking-wider opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap select-none pointer-events-none">
            PER ARDUA AD ASTRA
          </h2>
          <div className="relative">
            <h3 className="font-serif text-4xl md:text-6xl font-bold text-primary mb-8 drop-shadow-md">
              "Through Adversity to the Stars"
            </h3>
            <div className="w-32 h-1 bg-accent mx-auto mb-10"></div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
              This motto encapsulates the spirit of the Ntsonkotha learner. We recognize the socio-economic challenges of our rural context, not as excuses, but as the very fire that tempers our resolve. We forge brilliant futures through hard work, discipline, and unyielding ambition.
            </p>
          </div>
        </div>
      </section>

      {/* Our Identity */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Our Identity</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Academic Rigor", desc: "A relentless pursuit of academic excellence, evidenced by our consistent 90%+ matric pass rates." },
              { icon: HomeIcon, title: "Disciplined Boarding Life", desc: "A structured, nurturing environment that builds character, independence, and lifelong bonds." },
              { icon: Medal, title: "Regional Leadership", desc: "Setting the benchmark for public education in the Eastern Cape through innovation and dedication." },
              { icon: Globe, title: "Social Impact", desc: "Deeply rooted in our community, fostering environmental conservation and social responsibility." }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-xl border border-white/5 hover:border-primary/50 transition-colors text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Row */}
      <section className="py-12 bg-background pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Our School in Pictures</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <img src={gallery1} alt="School Assembly" className="w-full h-72 object-cover rounded-lg shadow-xl" />
            <img src={gallery2} alt="Students with Teacher" className="w-full h-72 object-cover rounded-lg shadow-xl lg:translate-y-6" />
            <img src={gallery3} alt="Community Group" className="w-full h-72 object-cover rounded-lg shadow-xl" />
            <div className="relative">
              <img src={awardsImg} alt="School and Teacher Awards Ceremony" className="w-full h-72 object-cover rounded-lg shadow-xl lg:translate-y-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
