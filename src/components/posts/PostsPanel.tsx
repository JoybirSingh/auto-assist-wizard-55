
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileEdit, 
  BarChart2, 
  Gauge, 
  Users, 
  Lightbulb,
  Linkedin
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import PostComposer from '@/components/settings/PostComposer';
import ScheduledPosts from '@/components/settings/ScheduledPosts';
import PostAnalytics from '@/components/settings/PostAnalytics';
import PerformanceInsights from '@/components/posts/PerformanceInsights';
import AudienceInsights from '@/components/posts/AudienceInsights';
import ContentSuggestions from '@/components/posts/ContentSuggestions';

const PostsPanel = () => {
  const { mode } = useMode();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Linkedin className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-semibold">LinkedIn Content Manager</h1>
      </div>
      
      <Tabs defaultValue="create">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <FileEdit className="w-4 h-4" />
            <span className="hidden sm:inline">Create Post</span>
            <span className="sm:hidden">Create</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            <span className="hidden sm:inline">Analytics</span>
            <span className="sm:hidden">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Gauge className="w-4 h-4" />
            <span className="hidden sm:inline">Performance</span>
            <span className="sm:hidden">Perform</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Audience</span>
            <span className="sm:hidden">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Suggestions</span>
            <span className="sm:hidden">Ideas</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <PostComposer />
            <ScheduledPosts />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PostAnalytics />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="performance">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <PerformanceInsights />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="audience">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AudienceInsights />
          </motion.div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ContentSuggestions />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostsPanel;
