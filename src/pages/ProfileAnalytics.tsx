
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  BarChart2, 
  Sparkles, 
  Users, 
  Award, 
  Target,
  ArrowUp,
  ArrowDown,
  Lightbulb,
  MessageSquare,
  Clock,
  Edit,
  FileText,
  ThumbsUp,
  BarChart3,
  Activity,
  Plus
} from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';

// Sample data
const profileStrengthData = [
  { category: 'Headline', score: 85, maxScore: 100 },
  { category: 'Summary', score: 70, maxScore: 100 },
  { category: 'Skills', score: 90, maxScore: 100 },
  { category: 'Experience', score: 75, maxScore: 100 },
  { category: 'Education', score: 95, maxScore: 100 },
  { category: 'Certifications', score: 50, maxScore: 100 },
  { category: 'Activity', score: 65, maxScore: 100 },
];

const engagementData = [
  { name: 'Mon', linkedin: 15, twitter: 8, average: 12 },
  { name: 'Tue', linkedin: 20, twitter: 14, average: 17 },
  { name: 'Wed', linkedin: 25, twitter: 16, average: 20 },
  { name: 'Thu', linkedin: 18, twitter: 12, average: 15 },
  { name: 'Fri', linkedin: 22, twitter: 18, average: 20 },
  { name: 'Sat', linkedin: 30, twitter: 24, average: 27 },
  { name: 'Sun', linkedin: 28, twitter: 22, average: 25 },
];

const contentPerformanceData = [
  { name: 'Post 1', views: 1200, engagement: 120, score: 9.2 },
  { name: 'Post 2', views: 950, engagement: 85, score: 8.7 },
  { name: 'Post 3', views: 1500, engagement: 150, score: 9.5 },
  { name: 'Post 4', views: 800, engagement: 60, score: 7.8 },
  { name: 'Post 5', views: 1300, engagement: 115, score: 9.0 },
];

const audienceData = [
  { name: 'Technology', value: 35 },
  { name: 'Marketing', value: 25 },
  { name: 'Finance', value: 15 },
  { name: 'HR', value: 10 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const ProfileAnalytics = () => {
  const { mode } = useMode();
  
  // Calculate profile strength
  const totalScore = profileStrengthData.reduce((acc, item) => acc + item.score, 0);
  const totalMaxScore = profileStrengthData.reduce((acc, item) => acc + item.maxScore, 0);
  const profileStrength = Math.round((totalScore / totalMaxScore) * 100);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Profile Analytics</h1>
                <p className="text-muted-foreground">
                  Analyze and optimize your social presence across platforms
                </p>
              </div>
              <Button variant="analytics" className="flex items-center gap-2">
                <Edit size={16} />
                <span>Edit Profiles</span>
              </Button>
            </div>
            
            {/* Profile Strength Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Profile Strength</CardTitle>
                    <div className={cn(
                      "p-2 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Target className="w-5 h-5" />
                    </div>
                  </div>
                  <CardDescription>Overall profile completeness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-3xl font-bold">{profileStrength}%</div>
                    <Badge className={cn(
                      profileStrength >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                      profileStrength >= 60 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    )}>
                      {profileStrength >= 80 ? "Excellent" : 
                      profileStrength >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <Progress value={profileStrength} className="h-2 mb-4" />
                  
                  <div className="space-y-4">
                    {profileStrengthData.map(item => (
                      <div key={item.category}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm">{item.category}</div>
                          <div className="text-sm font-medium">{item.score}/{item.maxScore}</div>
                        </div>
                        <Progress value={(item.score / item.maxScore) * 100} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-6 gap-2">
                    <Lightbulb size={16} />
                    <span>Get Recommendations</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Engagement Metrics</CardTitle>
                    <div className={cn(
                      "p-2 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <BarChart2 className="w-5 h-5" />
                    </div>
                  </div>
                  <CardDescription>Last 30 days performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Profile Views</div>
                      <div className="text-2xl font-bold">1,238</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <ArrowUp size={14} />
                        <span>32% vs last month</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Post Impressions</div>
                      <div className="text-2xl font-bold">5,742</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <ArrowUp size={14} />
                        <span>17% vs last month</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Comments</div>
                      <div className="text-2xl font-bold">89</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <ArrowUp size={14} />
                        <span>12% vs last month</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Connection Rate</div>
                      <div className="text-2xl font-bold">43%</div>
                      <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                        <ArrowDown size={14} />
                        <span>5% vs last month</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full gap-2">
                    <Activity size={16} />
                    <span>Full Activity Report</span>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Content Performance</CardTitle>
                    <div className={cn(
                      "p-2 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <CardDescription>Your top performing content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentPerformanceData.slice(0, 3).map((post, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full text-white font-medium text-sm",
                          index === 0 ? "bg-amber-500" : 
                          index === 1 ? "bg-slate-400" : 
                          "bg-amber-700"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1 line-clamp-1">{post.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground gap-2">
                            <span className="flex items-center gap-1">
                              <Users size={12} />
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp size={12} />
                              {post.engagement} engagements
                            </span>
                          </div>
                        </div>
                        <Badge className={cn(
                          "ml-auto",
                          post.score >= 9.0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                          post.score >= 8.0 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        )}>
                          {post.score.toFixed(1)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4 gap-2">
                    <BarChart3 size={16} />
                    <span>Content Analytics</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Detailed Analytics Tabs */}
            <Tabs defaultValue="engagement" className="space-y-6">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full max-w-3xl mx-auto">
                <TabsTrigger value="engagement" className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  <span>Engagement</span>
                </TabsTrigger>
                <TabsTrigger value="audience" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Audience</span>
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>Content</span>
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Lightbulb size={16} />
                  <span>Recommendations</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="engagement" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Overview</CardTitle>
                    <CardDescription>Daily engagement across platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={engagementData}
                          margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="linkedin" 
                            stroke="#0A66C2" 
                            strokeWidth={2} 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="twitter" 
                            stroke="#1DA1F2" 
                            strokeWidth={2} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="average" 
                            stroke="#6C63FF" 
                            strokeWidth={2} 
                            strokeDasharray="5 5" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Best Day</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">Saturday</div>
                          <div className="text-muted-foreground">Average: 27 engagements</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Top Platform</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">LinkedIn</div>
                          <div className="text-muted-foreground">23 engagements avg</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Weekly Growth</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">+12%</div>
                          <div className="text-muted-foreground">Compared to last week</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="audience" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Demographics</CardTitle>
                    <CardDescription>Who's engaging with your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={audienceData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {audienceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Top Industries</h3>
                          <div className="space-y-3">
                            {audienceData.map((item, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                  <div className="text-sm">{item.name}</div>
                                  <div className="text-sm font-medium">{item.value}%</div>
                                </div>
                                <Progress 
                                  value={item.value} 
                                  className="h-2" 
                                  style={{ backgroundColor: `${COLORS[index % COLORS.length]}33` }}
                                  indicatorClassName={`bg-[${COLORS[index % COLORS.length]}]`}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-2">Audience Insights</h3>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                              <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 p-1 rounded">
                                <TrendingUp size={14} />
                              </div>
                              <span>Decision makers make up 42% of your audience</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 p-1 rounded">
                                <Users size={14} />
                              </div>
                              <span>Your content reaches 63% more people than peers</span>
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                              <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 p-1 rounded">
                                <Lightbulb size={14} />
                              </div>
                              <span>Tech professionals engage 3x more with your posts</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>How your posts are performing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 mb-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={contentPerformanceData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="views" fill="#8884d8" name="Views" />
                          <Bar yAxisId="right" dataKey="engagement" fill="#82ca9d" name="Engagements" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">Top Performing Posts</h3>
                      <div className="space-y-4">
                        {contentPerformanceData.map((post, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "flex items-center justify-center w-10 h-10 rounded-full text-white font-medium",
                                  index === 0 ? "bg-amber-500" : 
                                  index === 1 ? "bg-slate-400" : 
                                  index === 2 ? "bg-amber-700" :
                                  "bg-gray-300"
                                )}>
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{post.name}</h4>
                                    <Badge className={cn(
                                      post.score >= 9.0 ? "bg-green-100 text-green-800" :
                                      post.score >= 8.0 ? "bg-amber-100 text-amber-800" :
                                      "bg-blue-100 text-blue-800"
                                    )}>
                                      Score: {post.score.toFixed(1)}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center text-sm text-muted-foreground gap-4 mt-1">
                                    <span className="flex items-center gap-1">
                                      <Users size={14} />
                                      {post.views.toLocaleString()} views
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MessageSquare size={14} />
                                      {post.engagement} engagements
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock size={14} />
                                      2 weeks ago
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-4 gap-2">
                        <Plus size={16} />
                        <span>Create New Content</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Optimization Recommendations</CardTitle>
                    <CardDescription>Actionable tips to improve your profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 p-2.5 rounded-full">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Enhance Your Headline</h3>
                          <p className="text-muted-foreground mb-2">
                            Your headline is missing keywords that could help you get discovered. 
                            Include terms like "Marketing Strategy" and "Digital Transformation" 
                            to increase profile views by up to 40%.
                          </p>
                          <Button variant="outline" size="sm">Apply Recommendation</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 p-2.5 rounded-full">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Add Featured Content</h3>
                          <p className="text-muted-foreground mb-2">
                            Profiles with featured content receive 2x more engagement. Add your 
                            recent case study and presentation to showcase your expertise and 
                            attract more relevant connections.
                          </p>
                          <Button variant="outline" size="sm">Add Featured Content</Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 p-2.5 rounded-full">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium mb-1">Add Industry Certifications</h3>
                          <p className="text-muted-foreground mb-2">
                            Your profile has fewer certifications than 75% of similar professionals.
                            Adding relevant certifications can increase your profile credibility and 
                            improve your appearance in search results.
                          </p>
                          <Button variant="outline" size="sm">Add Certifications</Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-medium mb-4">Content Strategy Recommendations</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start gap-3">
                            <div className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 p-1.5 rounded-full mt-0.5">
                              <TrendingUp className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Post during peak hours</p>
                              <p className="text-sm text-muted-foreground">
                                Your audience is most active between 8-10am and 5-7pm on weekdays.
                                Schedule your posts during these times for maximum visibility.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 p-1.5 rounded-full mt-0.5">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Increase post frequency</p>
                              <p className="text-sm text-muted-foreground">
                                You're posting 2 times per week, but your competitors average 4-5 posts.
                                Consider increasing your posting frequency for better engagement.
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 p-1.5 rounded-full mt-0.5">
                              <Users className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">Engage with industry thought leaders</p>
                              <p className="text-sm text-muted-foreground">
                                Commenting on posts from industry influencers can increase your visibility.
                                We've identified 12 key individuals you should engage with.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileAnalytics;
