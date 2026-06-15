import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts";
import { Calculator, Globe2, Landmark } from "lucide-react";

import heroImg from "@assets/unnamed_(11)_1779883577723.jpg";
import classImg1 from "@assets/unnamed_(11)_1779883577723.jpg";
import labImg from "@assets/lab_biology_dissection.jpg";
const labTestsImg = "/lab_tests1.jpeg";

const passRateData = [
  { year: "2021", candidates: 251, achieved: 157, rate: 62.55 },
  { year: "2022", candidates: 210, achieved: 124, rate: 59.05 },
  { year: "2023", candidates: 123, achieved: 90, rate: 73.17 },
  { year: "2024", candidates: 110, achieved: 103, rate: 93.64 },
  { year: "2025", candidates: 168, achieved: 160, rate: 95.24 },
];

export default function Academics() {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Classroom" 
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
            Academic Excellence
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
            Ntsonkotha is a consistently <span className="text-primary font-bold">top-performing public school</span> in the Chris Hani West district, proving that rural institutions can compete at the highest national levels.
          </p>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">5-Year Matric Results</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">A trajectory of consistent improvement and dedication from our learners and educators.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Chart */}
            <div className="h-[400px] w-full bg-background p-6 rounded-xl border border-white/5 shadow-xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={passRateData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#0D1B4E', borderColor: '#F5C000', color: '#fff' }}
                    formatter={(value) => [`${value}%`, 'Pass Rate']}
                  />
                  <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                    {passRateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.year === "2025" ? "#F5C000" : "#2A3A7C"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="py-4 px-4 font-bold text-white uppercase tracking-wider text-sm">Year</th>
                    <th className="py-4 px-4 font-bold text-white uppercase tracking-wider text-sm text-center">Candidates</th>
                    <th className="py-4 px-4 font-bold text-white uppercase tracking-wider text-sm text-center">Achieved</th>
                    <th className="py-4 px-4 font-bold text-white uppercase tracking-wider text-sm text-right">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {passRateData.slice().reverse().map((row, i) => (
                    <tr key={row.year} className={`transition-colors hover:bg-white/5 ${row.year === "2025" ? "bg-primary/10 border-l-4 border-primary" : ""}`}>
                      <td className="py-5 px-4 font-bold text-white">{row.year}</td>
                      <td className="py-5 px-4 text-foreground/80 text-center">{row.candidates}</td>
                      <td className="py-5 px-4 text-foreground/80 text-center">{row.achieved}</td>
                      <td className="py-5 px-4 text-right">
                        <span className={`font-bold ${row.year === "2025" ? "text-primary text-lg" : "text-white"}`}>
                          {row.rate}%
                        </span>
                        {row.year === "2025" && <span className="block text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Record High</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Academic Pathways</h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-white/5 hover:border-primary transition-colors">
              <Calculator className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">STEM Stream</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">Mathematics, Physical Sciences, Life Sciences, and Agricultural Sciences focused on developing future innovators.</p>
              <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Pure Mathematics</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Physical Sciences</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Life Sciences</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl border border-white/5 hover:border-primary transition-colors">
              <Landmark className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Commercial Stream</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">Accounting, Business Studies, and Economics preparing learners for the corporate and entrepreneurial world.</p>
              <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Accounting</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Business Studies</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> Economics</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl border border-white/5 hover:border-primary transition-colors">
              <Globe2 className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Humanities</h3>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">History, Geography, and Languages cultivating critical thinkers, leaders, and communicators.</p>
              <ul className="space-y-2 text-sm text-foreground/80 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> History & Geography</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> isiXhosa Home Language</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent"></div> English First Additional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Science */}
      <section className="py-24 bg-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              <img src={labImg} alt="Life Sciences dissection practical" className="w-full h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B4E]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">Life Sciences</span>
                <p className="text-white font-semibold">Dissection Practical — Hands-On Biology</p>
              </div>
            </div>
            <div>
              <h3 className="text-accent font-bold tracking-widest uppercase text-sm mb-2">Learning by Doing</h3>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Practical Science &amp; Labs</h2>
              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p>
                  Ntsonkotha learners don't just study science — they practise it. Our Life Sciences programme includes hands-on dissection practicals that bring anatomy, physiology, and biological systems to life far beyond the textbook.
                </p>
                <p>
                  These real-world practicals are a core part of our STEM curriculum, developing scientific thinking, careful observation, and the confidence to engage with challenging material firsthand.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border border-white/10">
                  <p className="text-primary font-bold text-xl">Life Sciences</p>
                  <p className="text-foreground/60 text-sm mt-1">Anatomy &amp; Physiology</p>
                </div>
                <div className="bg-background p-4 rounded-lg border border-white/10">
                  <p className="text-primary font-bold text-xl">Agri-Science</p>
                  <p className="text-foreground/60 text-sm mt-1">Soil &amp; Crop Practicals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Photos */}
      <section className="pb-24 pt-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src={classImg1} alt="Classroom learning" className="w-full h-96 object-cover rounded-xl shadow-2xl" />
            <img src={labTestsImg} alt="Students conducting lab tests" className="w-full h-96 object-cover rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
