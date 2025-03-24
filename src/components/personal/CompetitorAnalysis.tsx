
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  BarChart2, 
  Users, 
  TrendingUp, 
  Activity,
  ThumbsUp,
  MessageSquare,
  Eye,
  RefreshCcw
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useMode } from '@/context/ModeContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Competitor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  connections: number;
  endorsements: number;
  posts: number;
  engagementRate: number;
  profileCompleteness: number;
  recentActivity: {
    posts: number;
    comments: number;
    reactions: number;
  };
  contentCategories: {
    name: string;
    percentage: number;
  }[];
  strengths: string[];
  growthRate: number;
}

const competitors: Competitor[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    title: 'Senior Product Marketing Manager at TechCorp',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    connections: 1250,
    endorsements: 87,
    posts: 145,
    engagementRate: 8.7,
    profileCompleteness: 95,
    recentActivity: {
      posts: 12,
      comments: 34,
      reactions: 89
    },
    contentCategories: [
      { name: 'Product Marketing', percentage: 45 },
      { name: 'Industry News', percentage: 30 },
      { name: 'Team Culture', percentage: 25 }
    ],
    strengths: ['Visual Content', 'Industry Analysis', 'Consistent Posting'],
    growthRate: 12
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    title: 'Marketing Director at GrowthLabs',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    connections: 1830,
    endorsements: 112,
    posts: 203,
    engagementRate: 9.2,
    profileCompleteness: 98,
    recentActivity: {
      posts: 18,
      comments: 57,
      reactions: 124
    },
    contentCategories: [
      { name: 'Leadership', percentage: 40 },
      { name: 'Marketing Strategy', percentage: 35 },
      { name: 'Career Growth', percentage: 25 }
    ],
    strengths: ['Thought Leadership', 'Personal Branding', 'Network Engagement'],
    growthRate: 15
  },
  {
    id: '3',
    name: 'Michael Chen',
    title: 'Head of Growth at InnovateTech',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    connections: 1540,
    endorsements: 94,
    posts: 167,
    engagementRate: 7.8,
    profileCompleteness: 92,
    recentActivity: {
      posts: 8,
      comments: 41,
      reactions: 72
    },
    contentCategories: [
      { name: 'Growth Strategy', percentage: 50 },
      { name: 'Data Analysis', percentage: 30 },
      { name: 'Team Building', percentage: 20 }
    ],
    strengths: ['Data-Driven Content', 'Case Studies', 'Technical Insights'],
    growthRate: 9
  }
];

const CompetitorAnalysis = () => {
  const { mode } = useMode();
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor>(competitors[0]);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  
  const runFullAnalysis = () => {
    setAnalysisLoading(true);
    setTimeout(() => setAnalysisLoading(false), 2000);
  };
  
  // Get your stats for comparison
  const yourStats = {
    connections: 1100,
    endorsements: 75,
    posts: 110,
    engagementRate: 7.2,
    profileCompleteness: 88,
    growthRate: 8
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Competitor Profile Analysis</h2>
          <p className="text-muted-foreground">Compare your metrics against peers in your industry</p>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <UserCheck className="w-6 h-6" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Industry Peers</CardTitle>
              <CardDescription>Select a profile to analyze</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {competitors.map((competitor) => (
                  <motion.div 
                    key={competitor.id}
                    className={cn(
                      "p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-l-2",
                      selectedCompetitor.id === competitor.id 
                        ? "border-l-primary bg-gray-50 dark:bg-gray-800" 
                        : "border-l-transparent"
                    )}
                    whileHover={{ x: 2 }}
                    onClick={() => setSelectedCompetitor(competitor)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={competitor.avatar} alt={competitor.name} />
                        <AvatarFallback>{competitor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{competitor.name}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[180px]">{competitor.title}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-3 border-t">
                <Button size="sm" variant="outline" className="w-full" onClick={runFullAnalysis}>
                  {analysisLoading ? (
                    <>
                      <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Refresh Analysis
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content Analysis</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Network Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Connections</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{yourStats.connections}</span>
                            <span className="text-xs text-muted-foreground">You</span>
                          </div>
                        </div>
                        <Progress value={(yourStats.connections / selectedCompetitor.connections) * 100} className="h-2" />
                        <div className="flex justify-end text-xs text-muted-foreground mt-1">
                          {selectedCompetitor.connections} ({selectedCompetitor.name})
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Endorsements</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{yourStats.endorsements}</span>
                            <span className="text-xs text-muted-foreground">You</span>
                          </div>
                        </div>
                        <Progress value={(yourStats.endorsements / selectedCompetitor.endorsements) * 100} className="h-2" />
                        <div className="flex justify-end text-xs text-muted-foreground mt-1">
                          {selectedCompetitor.endorsements} ({selectedCompetitor.name})
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Content Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Posts</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{yourStats.posts}</span>
                            <span className="text-xs text-muted-foreground">You</span>
                          </div>
                        </div>
                        <Progress value={(yourStats.posts / selectedCompetitor.posts) * 100} className="h-2" />
                        <div className="flex justify-end text-xs text-muted-foreground mt-1">
                          {selectedCompetitor.posts} ({selectedCompetitor.name})
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Profile Completeness</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{yourStats.profileCompleteness}%</span>
                            <span className="text-xs text-muted-foreground">You</span>
                          </div>
                        </div>
                        <Progress value={(yourStats.profileCompleteness / selectedCompetitor.profileCompleteness) * 100} className="h-2" />
                        <div className="flex justify-end text-xs text-muted-foreground mt-1">
                          {selectedCompetitor.profileCompleteness}% ({selectedCompetitor.name})
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Growth Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="pt-2 pb-4 px-2">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{yourStats.growthRate}%</div>
                        <div className="text-sm text-muted-foreground mt-1">Your Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">{selectedCompetitor.growthRate}%</div>
                        <div className="text-sm text-muted-foreground mt-1">Their Growth</div>
                      </div>
                      <div className="text-center">
                        <div className={cn(
                          "text-3xl font-bold",
                          selectedCompetitor.growthRate > yourStats.growthRate ? "text-red-500" : "text-green-500"
                        )}>
                          {selectedCompetitor.growthRate > yourStats.growthRate ? 
                            `-${(selectedCompetitor.growthRate - yourStats.growthRate).toFixed(1)}%` : 
                            `+${(yourStats.growthRate - selectedCompetitor.growthRate).toFixed(1)}%`
                          }
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">Difference</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold">10.5%</div>
                        <div className="text-sm text-muted-foreground mt-1">Industry Avg</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Competitor Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedCompetitor.strengths.map((strength) => (
                      <Badge key={strength} variant="secondary">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-3 text-sm">
                    <h4 className="font-medium">Improvement Opportunities:</h4>
                    <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                      <li>Increase posting frequency to match competitor's cadence</li>
                      <li>Expand your content topics to include industry analysis</li>
                      <li>Engage more with {selectedCompetitor.name}'s network</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="content" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Content Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 pt-2">
                    {selectedCompetitor.contentCategories.map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{category.name}</span>
                          <span className="text-sm">{category.percentage}%</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 text-sm">
                    <h4 className="font-medium">Content Strategy Insights:</h4>
                    <ul className="list-disc pl-5 mt-1 text-muted-foreground">
                      <li>{selectedCompetitor.name} focuses primarily on {selectedCompetitor.contentCategories[0].name}</li>
                      <li>Their engagement rate is highest on {selectedCompetitor.contentCategories[0].name} content</li>
                      <li>Consider balancing your content categories similarly</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-4 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-center">
                      <div className="rounded-full bg-green-100 p-2.5 dark:bg-green-900/20">
                        <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-3">
                    <div className="text-2xl font-bold">{selectedCompetitor.recentActivity.reactions}</div>
                    <p className="text-xs text-muted-foreground">Monthly Reactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-center">
                      <div className="rounded-full bg-blue-100 p-2.5 dark:bg-blue-900/20">
                        <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-3">
                    <div className="text-2xl font-bold">{selectedCompetitor.recentActivity.comments}</div>
                    <p className="text-xs text-muted-foreground">Monthly Comments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-0">
                    <div className="flex justify-center">
                      <div className="rounded-full bg-purple-100 p-2.5 dark:bg-purple-900/20">
                        <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pt-3">
                    <div className="text-2xl font-bold">{(selectedCompetitor.recentActivity.reactions * 15).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Est. Monthly Views</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm">Engagement Rate Comparison</CardTitle>
                    <Badge>Premium Feature</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 pt-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Engagement Rate</span>
                        <span className="font-medium">{yourStats.engagementRate}%</span>
                      </div>
                      <Progress value={yourStats.engagementRate * 10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{selectedCompetitor.name}'s Engagement Rate</span>
                        <span className="font-medium">{selectedCompetitor.engagementRate}%</span>
                      </div>
                      <Progress value={selectedCompetitor.engagementRate * 10} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Industry Average</span>
                        <span className="font-medium">6.8%</span>
                      </div>
                      <Progress value={6.8 * 10} className="h-2" />
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t text-sm">
                    <h4 className="font-medium">AI Recommendation:</h4>
                    <p className="mt-1 text-muted-foreground">
                      {selectedCompetitor.name} achieves higher engagement by posting content with industry insights and personal experiences. Consider incorporating more personal stories in your content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
