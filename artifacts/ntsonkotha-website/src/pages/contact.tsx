import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Building, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import heroImg from "@assets/WhatsApp_Image_2026-05-26_at_13.55.45_(1)_1779883577724.jpeg";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string({ required_error: "Please select a subject" }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message Sent Successfully",
      description: "We will get back to you as soon as possible.",
      className: "bg-primary text-primary-foreground border-none",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="School building" 
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
            Get In Touch
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            <div className="bg-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-white text-xl mb-4">Physical Address</h3>
              <p className="text-foreground/70 leading-relaxed">
                Mgqukhwebe A/A, Agnes Rest<br />
                Lady Frere, 5410<br />
                Eastern Cape, South Africa
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-white text-xl mb-4">Contact Numbers</h3>
              <p className="text-foreground/70 leading-relaxed">
                Primary: +27 87 160 0951<br />
                Alt: +27 47 878 6900
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
                <Mail className="w-4 h-4" /> ntsonkothaschool@gmail.com
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border border-white/5 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-white text-xl mb-4">Postal & Admin</h3>
              <p className="text-foreground/70 leading-relaxed mb-4">
                P.O. Box 631<br />
                Queenstown, 5320
              </p>
              <div className="w-full pt-4 border-t border-white/10">
                <span className="text-sm font-bold text-white uppercase tracking-widest bg-accent px-3 py-1 rounded">EMIS: 200600642</span>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Map */}
            <div className="h-[600px] bg-card rounded-xl overflow-hidden border border-white/5 shadow-xl relative group">
              <div className="absolute inset-0 pointer-events-none border-4 border-primary/0 group-hover:border-primary/50 transition-colors z-10 rounded-xl"></div>
              <iframe 
                src="https://www.google.com/maps?q=Lady+Frere,+Eastern+Cape,+South+Africa&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)" }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Form */}
            <div className="bg-card p-8 md:p-10 rounded-xl border-t-4 border-primary shadow-xl">
              <h2 className="text-3xl font-serif font-bold text-white mb-8">Send an Enquiry</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background border-white/10 text-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="082 123 4567" className="bg-background border-white/10 text-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/90">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-background border-white/10 text-white" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-white/10 text-white">
                              <SelectValue placeholder="Select enquiry type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-white/10 text-white">
                            <SelectItem value="general">General Enquiry</SelectItem>
                            <SelectItem value="admissions">Admissions</SelectItem>
                            <SelectItem value="academics">Academics</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px] bg-background border-white/10 text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest h-14">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
