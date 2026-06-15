import { Suspense, lazy } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Academics = lazy(() => import("@/pages/academics"));
const CampusLife = lazy(() => import("@/pages/campus-life"));
const Admissions = lazy(() => import("@/pages/admissions"));
const Contact = lazy(() => import("@/pages/contact"));
const Register = lazy(() => import("@/pages/register"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/academics" component={Academics} />
      <Route path="/campus-life" component={CampusLife} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/contact" component={Contact} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-xl text-foreground/80">Loading…</div>}>
                <Router />
              </Suspense>
            </main>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
