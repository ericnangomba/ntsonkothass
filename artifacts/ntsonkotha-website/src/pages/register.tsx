import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import heroImg from "@assets/unnamed_(2)_1779883577720.jpg";

const formSchema = z.object({
  // Section 1
  firstName: z.string().min(2, "Required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Required"),
  dob: z.string().min(1, "Required"),
  gender: z.enum(["male", "female"], { required_error: "Required" }),
  idNumber: z.string().min(13, "13-digit ID required"),
  nationality: z.string().min(2, "Required"),
  homeLanguage: z.string().min(2, "Required"),

  // Section 2
  address: z.string().min(5, "Required"),
  postalCode: z.string().min(4, "Required"),
  cellNumber: z.string().min(10, "Required"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  guardianName: z.string().min(2, "Required"),
  guardianPhone: z.string().min(10, "Required"),
  guardianEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  relationship: z.string().min(2, "Required"),

  // Section 3
  currentSchool: z.string().min(2, "Required"),
  currentGrade: z.string().min(1, "Required"),
  gradeApplying: z.string({ required_error: "Required" }),
  termApplying: z.string({ required_error: "Required" }),
  yearApplying: z.string().min(4, "Required"),
  boardingType: z.enum(["day", "boarding"], { required_error: "Required" }),

  // Section 5
  confirmTrue: z.boolean().refine(val => val === true, { message: "You must confirm this" }),
  agreeCode: z.boolean().refine(val => val === true, { message: "You must agree to the policy" }),
});

export default function Register() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      idNumber: "",
      nationality: "South African",
      homeLanguage: "isiXhosa",
      address: "",
      postalCode: "",
      cellNumber: "",
      email: "",
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
      relationship: "",
      currentSchool: "",
      currentGrade: "",
      yearApplying: "2026",
      confirmTrue: false,
      agreeCode: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Application Submitted Successfully",
      description: "Your application has been received. We will contact you within 5 business days.",
      className: "bg-primary text-primary-foreground border-none font-bold",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Hero */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt="Students" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#0D1B4E]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-6xl font-black text-primary mb-4 drop-shadow-lg"
          >
            Learner Registration
          </motion.h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-card rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="bg-primary p-6 text-primary-foreground text-center">
              <h2 className="text-2xl font-serif font-bold uppercase tracking-widest">Application Form</h2>
              <p className="text-sm font-medium mt-1">Ntsonkotha Senior Secondary School</p>
            </div>

            <div className="p-6 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                  
                  {/* Section 1 */}
                  <div className="space-y-6">
                    <div className="border-b border-primary/30 pb-2">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider">1. Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>First Name</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="middleName" render={({ field }) => (
                        <FormItem><FormLabel>Middle Name</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Last Name</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="idNumber" render={({ field }) => (
                        <FormItem><FormLabel>ID / Birth Cert Number</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="nationality" render={({ field }) => (
                        <FormItem><FormLabel>Nationality</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="homeLanguage" render={({ field }) => (
                        <FormItem><FormLabel>Home Language</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-6">
                    <div className="border-b border-primary/30 pb-2">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider">2. Contact Details</h3>
                    </div>

                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem><FormLabel>Physical Address</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="cellNumber" render={({ field }) => (
                        <FormItem><FormLabel>Learner Cell Number</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Learner Email (Optional)</FormLabel><FormControl><Input type="email" className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="guardianName" render={({ field }) => (
                        <FormItem><FormLabel>Parent/Guardian Full Name</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="relationship" render={({ field }) => (
                        <FormItem><FormLabel>Relationship to Learner</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="guardianPhone" render={({ field }) => (
                        <FormItem><FormLabel>Parent/Guardian Phone</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="guardianEmail" render={({ field }) => (
                        <FormItem><FormLabel>Parent/Guardian Email</FormLabel><FormControl><Input type="email" className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-6">
                    <div className="border-b border-primary/30 pb-2">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider">3. Academic Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="currentSchool" render={({ field }) => (
                        <FormItem><FormLabel>Current/Previous School</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="currentGrade" render={({ field }) => (
                        <FormItem><FormLabel>Current Grade</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={form.control} name="gradeApplying" render={({ field }) => (
                        <FormItem><FormLabel>Grade Applying For</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-background"><SelectValue placeholder="Select Grade" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {["Grade 8", "Grade 9", "Grade 10", "Grade 11 (Special Cases)"].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="termApplying" render={({ field }) => (
                        <FormItem><FormLabel>Term Applying For</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-background"><SelectValue placeholder="Select Term" /></SelectTrigger></FormControl>
                            <SelectContent>
                              {["Term 1", "Term 2", "Term 3", "Term 4"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="yearApplying" render={({ field }) => (
                        <FormItem><FormLabel>Academic Year</FormLabel><FormControl><Input className="bg-background" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="boardingType" render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Boarding Status</FormLabel>
                        <FormControl>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="day" /></FormControl><FormLabel className="font-normal">Day Learner</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="boarding" /></FormControl><FormLabel className="font-normal">Boarding Learner</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Section 4 */}
                  <div className="space-y-6">
                    <div className="border-b border-primary/30 pb-2">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider">4. Supporting Documents</h3>
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Birth Certificate / ID</label>
                        <Input type="file" className="bg-background cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Latest Report Card</label>
                        <Input type="file" className="bg-background cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Immunization Card</label>
                        <Input type="file" className="bg-background cursor-pointer" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                      <p className="text-xs text-foreground/60 italic mt-2">* Acceptable formats: PDF, JPG, PNG. Max 5MB per file.</p>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="space-y-6">
                    <div className="border-b border-primary/30 pb-2">
                      <h3 className="text-xl font-bold text-primary uppercase tracking-wider">5. Declaration</h3>
                    </div>
                    
                    <FormField control={form.control} name="confirmTrue" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-white/5 rounded-lg bg-background">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I confirm that all information provided is true and accurate.</FormLabel>
                        </div>
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="agreeCode" render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-white/5 rounded-lg bg-background">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I agree to the school's Code of Conduct and Discipline Policy.</FormLabel>
                        </div>
                      </FormItem>
                    )} />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-widest h-16 text-lg">
                    Submit Application
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
