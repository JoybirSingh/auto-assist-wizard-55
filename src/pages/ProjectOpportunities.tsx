
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Search,
  Filter,
  Bell,
  Target,
  Briefcase,
  Users,
  Calendar,
  FileSearch,
  MessageSquare,
  Bookmark,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  CalendarDays,
  BarChart2,
  Sparkles,
  Building,
  Tag,
  Star,
  ChevronDown,
  Plus,
  ArrowUpRight,
  Trash2
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Sample data
const projectOpportunities = [
  {
    id: '1',
    title: 'Enterprise CRM Implementation',
    company: 'TechVision Inc.',
    logo: 'https://randomuser.me/api/portraits/lego/1.jpg',
    budget: '$80,000 - $120,000',
    deadline: '2023-06-15',
    matchScore: 92,
    status: 'active',
    description: 'Looking for experienced team to implement CRM solution across multiple departments with custom integrations.',
    location: 'Remote',
    industry: 'Technology',
    skills: ['CRM', 'Salesforce', 'Integration', 'Enterprise'],
    contact: 'Sarah Johnson',
    source: 'linkedin',
    postedDate: '2023-05-01',
    lastActivity: '2 days ago',
    competitors: 4,
    engagementLevel: 'high'
  },
  {
    id: '2',
    title: 'Digital Marketing Campaign',
    company: 'GrowthLabs',
    logo: 'https://randomuser.me/api/portraits/lego/2.jpg',
    budget: '$30,000 - $50,000',
    deadline: '2023-07-01',
    matchScore: 85,
    status: 'active',
    description: 'Seeking marketing experts to create and execute a comprehensive digital campaign focused on lead generation.',
    location: 'New York, NY (Hybrid)',
    industry: 'Marketing',
    skills: ['SEO', 'PPC', 'Content Marketing', 'Analytics'],
    contact: 'Michael Chen',
    source: 'twitter',
    postedDate: '2023-05-05',
    lastActivity: '5 days ago',
    competitors: 8,
    engagementLevel: 'medium'
  },
  {
    id: '3',
    title: 'Mobile App Development',
    company: 'InnovateTech',
    logo: 'https://randomuser.me/api/portraits/lego/3.jpg',
    budget: '$60,000 - $90,000',
    deadline: '2023-08-15',
    matchScore: 78,
    status: 'active',
    description: 'Development of a cross-platform mobile application with real-time features and payment integration.',
    location: 'Remote',
    industry: 'Software',
    skills: ['React Native', 'Firebase', 'UI/UX', 'Mobile Development'],
    contact: 'Jessica Lee',
    source: 'linkedin',
    postedDate: '2023-05-10',
    lastActivity: '1 week ago',
    competitors: 6,
    engagementLevel: 'medium'
  },
  {
    id: '4',
    title: 'Data Migration Project',
    company: 'Enterprise Solutions',
    logo: 'https://randomuser.me/api/portraits/lego/4.jpg',
    budget: '$40,000 - $60,000',
    deadline: '2023-06-30',
    matchScore: 94,
    status: 'rfp',
    description: 'Large-scale data migration from legacy systems to cloud-based solution with minimal downtime requirements.',
    location: 'Chicago, IL (On-site)',
    industry: 'Finance',
    skills: ['Data Migration', 'AWS', 'SQL', 'ETL'],
    contact: 'Robert Garcia',
    source: 'linkedin',
    postedDate: '2023-05-08',
    lastActivity: '3 days ago',
    competitors: 3,
    engagementLevel: 'very-high'
  },
  {
    id: '5',
    title: 'E-commerce Website Redesign',
    company: 'RetailPlus',
    logo: 'https://randomuser.me/api/portraits/lego/5.jpg',
    budget: '$25,000 - $40,000',
    deadline: '2023-07-15',
    matchScore: 88,
    status: 'draft',
    description: 'Complete redesign of existing e-commerce platform with focus on mobile responsiveness and checkout optimization.',
    location: 'Remote',
    industry: 'Retail',
    skills: ['E-commerce', 'UI/UX', 'Shopify', 'Web Development'],
    contact: 'Emily Watson',
    source: 'twitter',
    postedDate: '2023-05-12',
    lastActivity: '4 days ago',
    competitors: 9,
    engagementLevel: 'high'
  }
];

// Keyword monitoring data
const keywordAlerts = [
  {
    id: '1',
    keyword: 'CRM implementation',
    source: 'LinkedIn',
    matches: 3,
    latestMatch: '2 hours ago',
    priority: 'high',
    status: 'unread'
  },
  {
    id: '2',
    keyword: 'Mobile app development',
    source: 'Twitter',
    matches: 5,
    latestMatch: '1 day ago',
    priority: 'medium',
    status: 'read'
  },
  {
    id: '3',
    keyword: 'Data migration finance',
    source: 'LinkedIn',
    matches: 2,
    latestMatch: '3 hours ago',
    priority: 'high',
    status: 'unread'
  },
  {
    id: '4',
    keyword: 'E-commerce redesign',
    source: 'Twitter',
    matches: 4,
    latestMatch: '2 days ago',
    priority: 'low',
    status: 'read'
  }
];

const ProjectOpportunities = () => {
  const { mode } = useMode();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(['4']);
  
  // Filter opportunities
  const filteredOpportunities = projectOpportunities.filter(opp => {
    const matchesSearch = searchQuery === '' || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'saved' && savedOpportunities.includes(opp.id)) ||
      (filterStatus === opp.status);
    
    return matchesSearch && matchesStatus;
  });
  
  const toggleSaveOpportunity = (id: string) => {
    if (savedOpportunities.includes(id)) {
      setSavedOpportunities(savedOpportunities.filter(oppId => oppId !== id));
    } else {
      setSavedOpportunities([...savedOpportunities, id]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Project Opportunities</h1>
                <p className="text-muted-foreground">
                  Discover and track potential projects across platforms
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Bell size={16} />
                  <span>Alerts</span>
                  <Badge className="ml-1 bg-red-500">4</Badge>
                </Button>
                <Button variant="opportunity" className="gap-2">
                  <FileSearch size={16} />
                  <span>Create RFP Alert</span>
                </Button>
              </div>
            </div>
            
            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search opportunities by title, company, or skills..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Tabs defaultValue="all" value={filterStatus} onValueChange={setFilterStatus} className="w-full">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="rfp">RFPs</TabsTrigger>
                    <TabsTrigger value="saved">Saved</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </div>
            </div>
            
            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {filteredOpportunities.length > 0 ? (
                    filteredOpportunities.map((opportunity) => (
                      <Card key={opportunity.id} className="overflow-hidden">
                        <div className={cn(
                          "h-1.5",
                          opportunity.matchScore >= 90 ? "bg-green-500" :
                          opportunity.matchScore >= 80 ? "bg-blue-500" :
                          "bg-amber-500"
                        )} />
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 rounded-full overflow-hidden border">
                                <img 
                                  src={opportunity.logo} 
                                  alt={opportunity.company} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                                <CardDescription className="flex items-center gap-1">
                                  <Building size={14} />
                                  <span>{opportunity.company}</span>
                                </CardDescription>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleSaveOpportunity(opportunity.id)}
                              >
                                <Bookmark
                                  size={18}
                                  className={savedOpportunities.includes(opportunity.id) ? "fill-current" : ""}
                                />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2 space-y-4">
                          <div className="text-sm text-muted-foreground">
                            {opportunity.description}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Budget</div>
                              <div className="font-medium">{opportunity.budget}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Deadline</div>
                              <div className="font-medium">
                                {format(new Date(opportunity.deadline), 'MMM d, yyyy')}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Location</div>
                              <div className="font-medium">{opportunity.location}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Industry</div>
                              <div className="font-medium">{opportunity.industry}</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-muted-foreground mb-2">Match Score</div>
                            <div className="flex items-center gap-3">
                              <div className="w-12 text-center font-bold">
                                {opportunity.matchScore}%
                              </div>
                              <Progress 
                                value={opportunity.matchScore} 
                                className="h-2.5" 
                                indicatorClassName={cn(
                                  opportunity.matchScore >= 90 ? "bg-green-500" :
                                  opportunity.matchScore >= 80 ? "bg-blue-500" :
                                  "bg-amber-500"
                                )}
                              />
                              <div className="text-xs text-muted-foreground">
                                {opportunity.matchScore >= 90 ? "Excellent" :
                                 opportunity.matchScore >= 80 ? "Good" :
                                 "Fair"} match
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-2 border-t">
                          <div className="flex items-center text-sm text-muted-foreground gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              Posted {format(new Date(opportunity.postedDate), 'MMM d')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={14} />
                              {opportunity.competitors} competitors
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              Active {opportunity.lastActivity}
                            </span>
                          </div>
                          <Button size="sm" className="gap-1">
                            <ArrowUpRight size={14} />
                            <span>View Details</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
                      <FileSearch className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-medium mb-2">No opportunities found</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-6">
                        Try adjusting your search criteria or filters to find suitable opportunities.
                      </p>
                      <Button onClick={() => {
                        setSearchQuery('');
                        setFilterStatus('all');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Keyword Monitoring */}
                <Card>
                  <CardHeader>
                    <CardTitle>Keyword Monitoring</CardTitle>
                    <CardDescription>Track important terms in your network</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Add new keyword..." className="flex-1" />
                      <Button variant="outline" size="icon">
                        <Plus size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      {keywordAlerts.map(alert => (
                        <div 
                          key={alert.id}
                          className={cn(
                            "p-3 border rounded-md",
                            alert.status === 'unread' && "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium mb-1 flex items-center gap-2">
                                {alert.keyword}
                                {alert.status === 'unread' && (
                                  <Badge className="bg-amber-500">New</Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>
                                  {alert.matches} mentions
                                </span>
                                <span>•</span>
                                <span>
                                  {alert.source}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2 text-xs">
                            Latest match: {alert.latestMatch}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      View All Keywords
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Competitor Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Activity</CardTitle>
                    <CardDescription>Keep track of your competitors</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">TechSolutions Inc.</div>
                        <Badge variant="outline" className="text-amber-600 bg-amber-50 dark:bg-amber-900/20">Active</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Bidding on 3 similar projects
                      </div>
                      <div className="mt-2 text-xs flex items-center gap-2 text-muted-foreground">
                        <span>Last active: 2 hours ago</span>
                        <span>•</span>
                        <span>CRM, Integration</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">DataWorks Agency</div>
                        <Badge variant="outline" className="text-green-600 bg-green-50 dark:bg-green-900/20">New</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Recently won data migration project
                      </div>
                      <div className="mt-2 text-xs flex items-center gap-2 text-muted-foreground">
                        <span>Last active: 1 day ago</span>
                        <span>•</span>
                        <span>Data Migration, ETL</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">MobileDev Team</div>
                        <Badge variant="outline" className="text-blue-600 bg-blue-50 dark:bg-blue-900/20">Watching</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Active in mobile app development space
                      </div>
                      <div className="mt-2 text-xs flex items-center gap-2 text-muted-foreground">
                        <span>Last active: 5 days ago</span>
                        <span>•</span>
                        <span>React Native, Mobile</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      View All Competitors
                    </Button>
                  </CardContent>
                </Card>
                
                {/* RFP Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle>RFP Alerts</CardTitle>
                    <CardDescription>Request for proposal notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 border rounded-md bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">New RFP: Enterprise CRM</div>
                        <Badge className="bg-blue-500">New</Badge>
                      </div>
                      <div className="text-sm mt-1">
                        Deadline: {format(new Date('2023-06-15'), 'MMM d, yyyy')}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Match score: 94%
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">RFP: Data Migration Project</div>
                        <Badge variant="outline">7 days ago</Badge>
                      </div>
                      <div className="text-sm mt-1">
                        Deadline: {format(new Date('2023-06-30'), 'MMM d, yyyy')}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Match score: 86%
                        </div>
                        <Button variant="outline" size="sm" className="h-8">
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Plus size={14} className="mr-2" />
                      <span>Configure RFP Alerts</span>
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Opportunity Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle>Opportunity Insights</CardTitle>
                    <CardDescription>Analytics and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Win Rate</div>
                        <div className="font-medium">32%</div>
                      </div>
                      <Progress value={32} className="h-2" />
                      <div className="text-xs text-green-600 dark:text-green-400">+5% from last quarter</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Avg. Project Value</div>
                        <div className="font-medium">$48,500</div>
                      </div>
                      <Progress value={65} className="h-2" />
                      <div className="text-xs text-green-600 dark:text-green-400">+12% from last quarter</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Best-fit Industry</div>
                        <div className="font-medium">Technology</div>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="text-xs text-muted-foreground">85% match rate</div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-2">Recommendations</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <Sparkles size={16} className="text-amber-500 mt-0.5" />
                          <span>Focus on data migration projects for highest win probability.</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Sparkles size={16} className="text-amber-500 mt-0.5" />
                          <span>Finance industry opportunities have 35% higher average value.</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Sparkles size={16} className="text-amber-500 mt-0.5" />
                          <span>Add "Cloud Migration" to your keyword alerts for more matches.</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      <BarChart2 size={14} className="mr-2" />
                      <span>View Full Analytics</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectOpportunities;
