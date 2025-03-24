
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Users, Calendar, FileText, MousePointerClick } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import TeamCollaboration from '@/components/organizational/TeamCollaboration';

const OrganizationalTools = () => {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState("team");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-medium text-foreground">Organizational Tools</span>
            </div>
            <h1 className="text-3xl font-bold">Organizational Tools</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Empower your team with advanced collaboration tools, templates, and lead qualification systems for coordinated LinkedIn strategy.
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Team Collaboration</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Content Calendar</span>
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Branded Templates</span>
                </TabsTrigger>
                <TabsTrigger value="leads" className="flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4" />
                  <span>Lead Qualification</span>
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
              <TabsContent value="team">
                <TeamCollaboration />
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Content Calendar Integration</h3>
                    <p className="text-muted-foreground max-w-md">
                      Connect with existing marketing calendars like HubSpot, CoSchedule and more.
                      Coming soon in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="templates">
                <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Branded Templates</h3>
                    <p className="text-muted-foreground max-w-md">
                      Create and manage company-specific content templates for consistent messaging.
                      Coming soon in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="leads">
                <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
                  <div className="text-center">
                    <MousePointerClick className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium mb-1">Lead Qualification System</h3>
                    <p className="text-muted-foreground max-w-md">
                      Rate and prioritize leads based on engagement metrics and qualification criteria.
                      Coming soon in the next update.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrganizationalTools;
