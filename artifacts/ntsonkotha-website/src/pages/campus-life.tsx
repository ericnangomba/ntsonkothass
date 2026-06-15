import { motion } from "framer-motion";
import { Globe, Music, Trophy } from "lucide-react";

import summerImg from "@assets/unnamed_(9)_1779883577723.webp";
import agriImg from "@assets/lab_agriculture_soil.jpg";
import rugbyImg from "@assets/rugby_team.jpg";
import soccerFormalImg from "@assets/soccer_team_formal.jpg";
import netballImg from "@assets/netball_team.jpg";
import athleticsImg from "@assets/athletics_team.jpg";
import awards2Img from "@assets/awards_staff_ceremony2.jpg";
import awardsCertsImg from "@assets/awards_teachers_certificates.jpg";
import gallery1 from "@assets/unnamed_(7)_1779883577722.jpg";
import gallery2 from "@assets/unnamed_1779883577724.webp";
import gallery3 from "@assets/unnamed_(5)_1779883577721.jpg";

const sports = [
  { name: "Rugby", desc: "Fierce regional tradition.", img: rugbyImg, alt: "Rugby team on field" },
  { name: "Soccer", desc: "District & provincial contenders.", img: soccerFormalImg, alt: "Soccer team in blue & white" },
  { name: "Netball", desc: "Fast-paced competitive excellence.", img: netballImg, alt: "Netball team on field" },
  { name: "Athletics", desc: "Track & field regional champions.", img: athleticsImg, alt: "Athletics team on running track" },
];

export default function CampusLife() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/Campus Life.jpeg" 
            alt="Students on outing" 
            className="w-full h-full object-cover"
            loading="eager"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-[#0D1B4E]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 mt-12 md:mt-20 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl font-black text-primary mb-4 drop-shadow-lg"
          >
            Campus Life
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      {/* Boarding */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Our Home</h3>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">The Boarding Experience</h2>
              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p>
                  As one of only three elite boarding institutions in the region, Ntsonkotha provides a highly structured and supportive environment for young men and women.
                </p>
                <p>
                  Our hostels are more than just accommodation; they are learning communities where discipline, independence, and lifelong friendships are forged. Boarders benefit from supervised evening study sessions, structured weekend activities, and a deeply ingrained culture of mutual respect.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-xl transform rotate-3"></div>
              <img src={summerImg} alt="Students in summer uniform" className="relative z-10 w-full h-auto object-cover rounded-xl shadow-2xl border-4 border-card" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* Sports Portfolio */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">On the Field</h3>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Sports &amp; Athletics</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">Our learners compete with pride at district and provincial level across four major codes.</p>
          </div>

          {/* 2×2 Sport Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {sports.map((sport) => (
              <div key={sport.name} className="relative overflow-hidden rounded-xl shadow-2xl group aspect-video">
                <img
                  src={sport.img}
                  alt={sport.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4E]/90 via-[#0D1B4E]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-1 block">{sport.name}</span>
                  <p className="text-white font-semibold text-lg leading-tight">{sport.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Outreach */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img src={agriImg} alt="Agricultural science outreach activity" className="w-full h-auto object-cover rounded-xl shadow-2xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Beyond the Classroom</h3>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Culture &amp; Social Impact</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1"><Music className="w-6 h-6 text-primary" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Traditional Choir &amp; Debate</h4>
                    <p className="text-foreground/70 leading-relaxed">Our award-winning traditional choir preserves our rich Xhosa heritage, while our debate teams compete fiercely in regional symposiums, developing articulate future leaders.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1"><Globe className="w-6 h-6 text-primary" /></div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Agricultural Science Outreach</h4>
                    <p className="text-foreground/70 leading-relaxed">Learners engage hands-on with soil science and sustainable farming, connecting academic learning to real environmental stewardship in our local communities of Mgqukhwebe and Agnes Rest.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School & Teacher Awards */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Recognition of Excellence</h3>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">School &amp; Teacher Awards</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
            <p className="mt-6 text-foreground/70 max-w-2xl mx-auto">
              Ntsonkotha educators and staff are consistently recognised by the Chris Hani West Education District for exceptional teaching and school leadership.
            </p>
          </div>

          {/* Awards photos - arranged bottom-to-top: individual recognition first, ceremony second */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img src={awardsCertsImg} alt="Teachers with framed certificates and trophies" className="w-full h-64 md:h-80 lg:h-[28rem] object-cover object-bottom" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="text-white font-semibold">Certificate Recipients</p>
                <p className="text-foreground/60 text-sm">Staff honoured for excellence</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img
                src={awards2Img}
                alt="Staff receiving award with trophy and certificate"
                className="w-full h-64 md:h-80 lg:h-[28rem] object-cover"
                style={{ objectPosition: "center 15%" }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4E]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-white font-semibold">District Awards Ceremony</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img src={gallery1} alt="Trophy celebration" className="w-full h-72 object-cover rounded-lg shadow-lg" loading="lazy" decoding="async" />
            <img src={gallery2} alt="Community event" className="w-full h-72 object-cover rounded-lg shadow-lg" loading="lazy" decoding="async" />
            <img src={gallery3} alt="Class portrait" className="w-full h-72 object-cover rounded-lg shadow-lg" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </div>
  );
}
