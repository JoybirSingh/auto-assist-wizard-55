
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Target, UserCheck, Mic, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import CareerPathMapping from '@/components/personal/CareerPathMapping';
import CompetitorAnalysis from '@/components/personal/CompetitorAnalysis';
import InterviewPreparation from '@/components/personal/InterviewPreparation';
import ResumeProfileSync from '@/components/personal/ResumeProfileSync';

const PersonalGrowth = () => {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState("career");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-medium text-foreground">Personal Growth Tools</span>
            </div>
            <h1 className="text-3xl font-bold">Personal Growth Tools</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Maximize your professional development with powerful AI-driven tools for career advancement, skill development, and personal branding.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="career" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>Career Path</span>
                </TabsTrigger>
                <TabsTrigger value="competitors" className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>Competitor Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="interview" className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Interview Prep</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  <span>Resume Sync</span>
                </TabsTrigger>
              </TabsList>
              
              <div className={cn(
                "px-3 py-1 rounded-full text-xs",
                mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
              )}>
                <span className="font-semibold">{mode === 'assisted' ? 'Assisted' : 'Autonomous'}</span> Mode
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TabsContent value="career">
                <CareerPathMapping />
              </TabsContent>
              
              <TabsContent value="competitors">
                <CompetitorAnalysis />
              </TabsContent>
              
              <TabsContent value="interview">
                <InterviewPreparation />
              </TabsContent>
              
              <TabsContent value="resume">
                <ResumeProfileSync />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PersonalGrowth;
