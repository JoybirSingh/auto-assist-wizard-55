
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMode } from "@/context/ModeContext";

// Sample data for analytics
const performanceData = [
  { month: 'Jan', engagement: 45, likes: 32, comments: 18 },
  { month: 'Feb', engagement: 52, likes: 38, comments: 24 },
  { month: 'Mar', engagement: 48, likes: 36, comments: 20 },
  { month: 'Apr', engagement: 70, likes: 45, comments: 35 },
  { month: 'May', engagement: 95, likes: 65, comments: 42 },
  { month: 'Jun', engagement: 78, likes: 53, comments: 38 },
];

const topPerformingPosts = [
  {
    id: '1',
    title: 'How AI is Transforming Product Management',
    engagement: 98,
    likes: 72,
    comments: 34,
    date: '2023-06-15',
  },
  {
    id: '2',
    title: '5 UX Design Trends to Watch in 2023',
    engagement: 85,
    likes: 64,
    comments: 29,
    date: '2023-05-22',
  },
  {
    id: '3',
    title: 'The Future of Remote Work: Lessons Learned',
    engagement: 79,
    likes: 58,
    comments: 25,
    date: '2023-04-10',
  },
];

const audienceInterests = [
  { topic: 'Artificial Intelligence', interest: 92 },
  { topic: 'UX/UI Design', interest: 88 },
  { topic: 'Product Management', interest: 85 },
  { topic: 'Remote Work', interest: 76 },
  { topic: 'Career Development', interest: 72 },
  { topic: 'Tech Industry News', interest: 68 },
];

const improvementSuggestions = [
  {
    id: '1',
    title: 'Add more visual content',
    description: 'Posts with images or infographics receive 65% more engagement than text-only posts.',
    impact: 'high',
  },
  {
    id: '2',
    title: 'Post during peak hours',
    description: 'Your audience is most active between 9-11am and 4-6pm on weekdays.',
    impact: 'medium',
  },
  {
    id: '3',
    title: 'Ask questions in your posts',
    description: 'Posts ending with questions receive 2x more comments on average.',
    impact: 'high',
  },
  {
    id: '4',
    title: 'Share industry insights',
    description: 'Your posts analyzing industry trends perform 40% better than personal updates.',
    impact: 'medium',
  },
];

const topicSuggestions = [
  {
    id: '1',
    title: 'The impact of AI on UX design processes',
    description: 'Combines two high-interest topics for your audience',
    relevance: 95,
  },
  {
    id: '2',
    title: 'Remote collaboration tools for product teams',
    description: 'Addresses pain points for your product management audience',
    relevance: 88,
  },
  {
    id: '3',
    title: 'Career transitions into AI product roles',
    description: 'Combines career development with AI interest',
    relevance: 85,
  },
];

const PostAnalytics = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const getImpactColor = (impact: string) => {
    if (impact === 'high') return "text-green-600 dark:text-green-400";
    if (impact === 'medium') return "text-amber-600 dark:text-amber-400";
    return "text-blue-600 dark:text-blue-400";
  };
  
  const getImpactBg = (impact: string) => {
    if (impact === 'high') return "bg-green-100 dark:bg-green-900/30";
    if (impact === 'medium') return "bg-amber-100 dark:bg-amber-900/30";
    return "bg-blue-100 dark:bg-blue-900/30";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Audience</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span>Suggestions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Post Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer 
                    className="w-full" 
                    config={{
                      engagement: { color: mode === 'assisted' ? '#10b981' : '#3b82f6' },
                      likes: { color: '#9333ea' },
                      comments: { color: '#f97316' },
                    }}
                  >
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="engagement" name="Engagement" fill="var(--color-engagement)" />
                      <Bar dataKey="likes" name="Likes" fill="var(--color-likes)" />
                      <Bar dataKey="comments" name="Comments" fill="var(--color-comments)" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-500" />
                  Top Performing Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformingPosts.map((post, index) => (
                    <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">Posted on {new Date(post.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 text-sm">
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">{post.engagement}</span>
                            <span className="text-muted-foreground text-xs">Engagement</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">{post.likes}</span>
                            <span className="text-muted-foreground text-xs">Likes</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="font-semibold">{post.comments}</span>
                            <span className="text-muted-foreground text-xs">Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="audience">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  Audience Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceInterests.map((interest) => (
                    <div key={interest.topic} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{interest.topic}</span>
                        <span className="font-medium">{interest.interest}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${interest.interest}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Recommended Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicSuggestions.map((topic) => (
                    <div key={topic.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{topic.title}</h3>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                              {topic.relevance}% match
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
                        </div>
                        <button 
                          className="text-sm px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                          onClick={() => {
                            toast({
                              title: "Topic added to drafts",
                              description: `"${topic.title}" has been added to your draft posts`,
                              duration: 3000,
                            });
                          }}
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="suggestions">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors duration-200">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "px-2 py-0.5 text-xs rounded-full",
                          getImpactBg(suggestion.impact),
                          getImpactColor(suggestion.impact)
                        )}>
                          {suggestion.impact.charAt(0).toUpperCase() + suggestion.impact.slice(1)} impact
                        </div>
                        <div>
                          <h3 className="font-medium">{suggestion.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="flex items-center justify-center py-4">
              <button 
                className={cn(
                  "py-2.5 px-6 rounded-lg text-white font-medium transition-all duration-200 hover:bg-opacity-90",
                  mode === 'assisted' ? "bg-assisted-DEFAULT" : "bg-autonomous-DEFAULT"
                )}
                onClick={() => {
                  toast({
                    title: "Analysis completed",
                    description: "Your content strategy has been refreshed with the latest insights",
                    duration: 3000,
                  });
                }}
              >
                Refresh Analysis
              </button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default PostAnalytics;
