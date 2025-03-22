
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ModeProvider } from "@/context/ModeContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Posts from "./pages/Posts";
import LeadDiscovery from "./pages/LeadDiscovery";
import ProfileAnalytics from "./pages/ProfileAnalytics";
import ContentCalendar from "./pages/ContentCalendar";
import CompanyDashboard from "./pages/CompanyDashboard";
import ProjectOpportunities from "./pages/ProjectOpportunities";
import CustomerEngagement from "./pages/CustomerEngagement";

// Import framer-motion for animations
import { MotionConfig } from "framer-motion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <ModeProvider>
          <MotionConfig reducedMotion="user">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/leads" element={<LeadDiscovery />} />
                <Route path="/profile-analytics" element={<ProfileAnalytics />} />
                <Route path="/content-calendar" element={<ContentCalendar />} />
                <Route path="/company-dashboard" element={<CompanyDashboard />} />
                <Route path="/opportunities" element={<ProjectOpportunities />} />
                <Route path="/customer-engagement" element={<CustomerEngagement />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MotionConfig>
        </ModeProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
