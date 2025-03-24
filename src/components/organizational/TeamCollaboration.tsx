import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  FileSpreadsheet, 
  FileText, 
  User, 
  PlusCircle,
  CheckCircle2,
  BarChart2,
  Bell,
  Clock,
  ChevronDown,
  ArrowUpRight,
  CalendarDays,
  Zap,
  Eye
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useMode } from '@/context/ModeContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  performance: {
    postsCreated: number;
    commentsGenerated: number;
    engagementRate: number;
  };
}

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'review';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface ContentPlan {
  id: string;
  title: string;
  type: 'post' | 'article' | 'poll' | 'video';
  status: 'draft' | 'scheduled' | 'published';
  author: string;
  publishDate: string;
  engagement?: {
    views: number;
    likes: number;
    comments: number;
  };
}

const TeamCollaboration = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Alex Morgan',
      role: 'Content Strategist',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
      performance: {
        postsCreated: 24,
        commentsGenerated: 87,
        engagementRate: 8.3
      }
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Social Media Manager',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online',
      performance: {
        postsCreated: 38,
        commentsGenerated: 104,
        engagementRate: 9.7
      }
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Marketing Analyst',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      status: 'away',
      performance: {
        postsCreated: 12,
        commentsGenerated: 56,
        engagementRate: 7.1
      }
    },
    {
      id: '4',
      name: 'Emily Davis',
      role: 'Content Creator',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      status: 'offline',
      performance: {
        postsCreated: 31,
        commentsGenerated: 72,
        engagementRate: 8.9
      }
    }
  ];
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Create monthly content calendar',
      status: 'in-progress',
      assignee: 'Sarah Johnson',
      dueDate: '2023-07-15',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Design LinkedIn banner for product launch',
      status: 'pending',
      assignee: 'Emily Davis',
      dueDate: '2023-07-18',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Analyze Q2 LinkedIn campaign performance',
      status: 'completed',
      assignee: 'Michael Chen',
      dueDate: '2023-07-10',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Draft case study on recent client success',
      status: 'review',
      assignee: 'Alex Morgan',
      dueDate: '2023-07-20',
      priority: 'medium'
    },
    {
      id: '5',
      title: 'Schedule executive thought leadership posts',
      status: 'pending',
      assignee: 'Sarah Johnson',
      dueDate: '2023-07-25',
      priority: 'low'
    }
  ];
  
  const contentPlans: ContentPlan[] = [
    {
      id: '1',
      title: 'New Product Feature Announcement',
      type: 'post',
      status: 'scheduled',
      author: 'Alex Morgan',
      publishDate: '2023-07-17'
    },
    {
      id: '2',
      title: 'Industry Trends Analysis 2023',
      type: 'article',
      status: 'draft',
      author: 'Sarah Johnson',
      publishDate: '2023-07-22'
    },
    {
      id: '3',
      title: 'Customer Success Story: TechCorp',
      type: 'video',
      status: 'published',
      author: 'Emily Davis',
      publishDate: '2023-07-08',
      engagement: {
        views: 1242,
        likes: 87,
        comments: 24
      }
    },
    {
      id: '4',
      title: "What's Your Biggest Marketing Challenge?",
      type: 'poll',
      status: 'published',
      author: 'Michael Chen',
      publishDate: '2023-07-05',
      engagement: {
        views: 876,
        likes: 52,
        comments: 18
      }
    }
  ];
  
  const assignTask = () => {
    toast({
      title: "Task Assigned",
      description: "The task has been assigned successfully.",
      duration: 3000,
    });
  };
  
  const inviteTeamMember = () => {
    toast({
      title: "Invitation Sent",
      description: "An invitation has been sent to join your team.",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Team Collaboration</h2>
          <p className="text-muted-foreground">Coordinate LinkedIn strategy with your team</p>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Users className="w-6 h-6" />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="content">Content Plan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>
                    LinkedIn engagement metrics across your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <div className="font-bold text-3xl">98</div>
                        <div className="text-sm text-muted-foreground">Posts This Month</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          <span>+12% from last month</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <div className="font-bold text-3xl">287</div>
                        <div className="text-sm text-muted-foreground">Comments Generated</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          <span>+18% from last month</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <div className="font-bold text-3xl">8.5%</div>
                        <div className="text-sm text-muted-foreground">Avg. Engagement Rate</div>
                        <div className="text-xs text-green-600 mt-1 flex items-center">
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          <span>+2.1% from last month</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Team Members Performance</h3>
                      <div className="space-y-3">
                        {teamMembers.map((member) => (
                          <div key={member.id} className="flex items-center gap-4">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center">
                                  <span className="font-medium truncate mr-2">{member.name}</span>
                                  <span className={cn(
                                    "w-2 h-2 rounded-full",
                                    member.status === 'online' ? "bg-green-500" : 
                                    member.status === 'away' ? "bg-amber-500" : 
                                    "bg-gray-300"
                                  )}></span>
                                </div>
                                <span className="text-xs font-medium">
                                  {member.performance.engagementRate}% engagement
                                </span>
                              </div>
                              <Progress value={member.performance.engagementRate * 10} className="h-1.5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Upcoming Content</h3>
                      <div className="space-y-2">
                        {contentPlans.filter(plan => plan.status === 'scheduled').map((plan) => (
                          <div key={plan.id} className="flex items-center justify-between p-2 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "p-2 rounded-full",
                                plan.type === 'post' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : 
                                plan.type === 'article' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400" : 
                                plan.type === 'video' ? "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400" : 
                                "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                              )}>
                                {plan.type === 'post' ? <MessageSquare className="w-4 h-4" /> : 
                                plan.type === 'article' ? <FileText className="w-4 h-4" /> : 
                                plan.type === 'video' ? <FileSpreadsheet className="w-4 h-4" /> : 
                                <BarChart2 className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{plan.title}</div>
                                <div className="text-xs text-muted-foreground">By {plan.author}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="gap-1">
                                <CalendarDays className="w-3 h-3" />
                                <span>{new Date(plan.publishDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                              </Badge>
                              <Button size="sm" variant="outline">Preview</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teamMembers[1].avatar} alt={teamMembers[1].name} />
                          <AvatarFallback>{teamMembers[1].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{teamMembers[1].name}</span> created a new content plan
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teamMembers[0].avatar} alt={teamMembers[0].name} />
                          <AvatarFallback>{teamMembers[0].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{teamMembers[0].name}</span> completed a task
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">5 hours ago</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teamMembers[2].avatar} alt={teamMembers[2].name} />
                          <AvatarFallback>{teamMembers[2].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{teamMembers[2].name}</span> generated analytics report
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">Yesterday</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={teamMembers[3].avatar} alt={teamMembers[3].name} />
                          <AvatarFallback>{teamMembers[3].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">{teamMembers[3].name}</span> published a new post
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-muted-foreground">Yesterday</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tasks
                        .filter(task => task.status !== 'completed' && new Date(task.dueDate) > new Date())
                        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                        .slice(0, 3)
                        .map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-2 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                task.priority === 'high' ? "bg-red-500" : 
                                task.priority === 'medium' ? "bg-amber-500" : 
                                "bg-blue-500"
                              )}></div>
                              <span className="text-sm">{task.title}</span>
                            </div>
                            <Badge variant="outline" className="gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</span>
                            </Badge>
                          </div>
                        ))}
                    </div>
                    
                    <Button variant="ghost" size="sm" className="w-full mt-3">
                      View All Tasks
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Badge variant={
                      member.status === 'online' ? "secondary" : 
                      member.status === 'away' ? "outline" : 
                      "default"
                    }>
                      {member.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Posts</div>
                        <div className="font-medium">{member.performance.postsCreated}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Comments</div>
                        <div className="font-medium">{member.performance.commentsGenerated}</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Engagement Rate</span>
                        <span className="font-medium">{member.performance.engagementRate}%</span>
                      </div>
                      <Progress value={member.performance.engagementRate * 10} className="h-1.5" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">Profile</Button>
                      <Button size="sm" variant="outline" className="flex-1">Message</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-dashed flex flex-col items-center justify-center py-6">
              <div className="p-3 rounded-full bg-muted mb-3">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">Invite Team Member</h3>
              <p className="text-sm text-muted-foreground text-center px-4 mb-4">
                Add colleagues to collaborate on LinkedIn content
              </p>
              <Button variant="outline" onClick={inviteTeamMember}>
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>Invite Member</span>
              </Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Team Tasks</CardTitle>
                  <CardDescription>
                    Manage and coordinate LinkedIn-related tasks
                  </CardDescription>
                </div>
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span>New Task</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  <div className="space-y-3 min-w-[250px]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                        <span>Pending</span>
                      </h3>
                      <Badge>{tasks.filter(t => t.status === 'pending').length}</Badge>
                    </div>
                    
                    {tasks.filter(task => task.status === 'pending').map((task) => (
                      <div 
                        key={task.id}
                        className={cn(
                          "p-3 border rounded-lg bg-white shadow-sm dark:bg-gray-800",
                          task.priority === 'high' ? "border-l-4 border-l-red-500" : 
                          task.priority === 'medium' ? "border-l-4 border-l-amber-500" : 
                          "border-l-4 border-l-blue-500"
                        )}
                      >
                        <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                            </span>
                          </div>
                          <Badge variant={
                            task.priority === 'high' ? "destructive" : 
                            task.priority === 'medium' ? "secondary" : 
                            "outline"
                          } className="text-[10px]">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee}</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Assign
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full p-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                      <PlusCircle className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 min-w-[250px]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span>In Progress</span>
                      </h3>
                      <Badge>{tasks.filter(t => t.status === 'in-progress').length}</Badge>
                    </div>
                    
                    {tasks.filter(task => task.status === 'in-progress').map((task) => (
                      <div 
                        key={task.id}
                        className={cn(
                          "p-3 border rounded-lg bg-white shadow-sm dark:bg-gray-800",
                          task.priority === 'high' ? "border-l-4 border-l-red-500" : 
                          task.priority === 'medium' ? "border-l-4 border-l-amber-500" : 
                          "border-l-4 border-l-blue-500"
                        )}
                      >
                        <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                            </span>
                          </div>
                          <Badge variant={
                            task.priority === 'high' ? "destructive" : 
                            task.priority === 'medium' ? "secondary" : 
                            "outline"
                          } className="text-[10px]">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee}</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Update
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full p-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                      <PlusCircle className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 min-w-[250px]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <span>Review</span>
                      </h3>
                      <Badge>{tasks.filter(t => t.status === 'review').length}</Badge>
                    </div>
                    
                    {tasks.filter(task => task.status === 'review').map((task) => (
                      <div 
                        key={task.id}
                        className={cn(
                          "p-3 border rounded-lg bg-white shadow-sm dark:bg-gray-800",
                          task.priority === 'high' ? "border-l-4 border-l-red-500" : 
                          task.priority === 'medium' ? "border-l-4 border-l-amber-500" : 
                          "border-l-4 border-l-blue-500"
                        )}
                      >
                        <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                            </span>
                          </div>
                          <Badge variant={
                            task.priority === 'high' ? "destructive" : 
                            task.priority === 'medium' ? "secondary" : 
                            "outline"
                          } className="text-[10px]">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee}</span>
                          </div>
                          <div className="flex gap-1">
                            <button className="text-xs text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">
                              Approve
                            </button>
                            <span className="text-xs text-muted-foreground">|</span>
                            <button className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                              Revise
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="w-full p-2 border border-dashed rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors">
                      <PlusCircle className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  
                  <div className="space-y-3 min-w-[250px]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Completed</span>
                      </h3>
                      <Badge>{tasks.filter(t => t.status === 'completed').length}</Badge>
                    </div>
                    
                    {tasks.filter(task => task.status === 'completed').map((task) => (
                      <div 
                        key={task.id}
                        className="p-3 border rounded-lg bg-muted/50"
                      >
                        <h4 className="font-medium text-sm mb-2 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 mr-1.5 dark:text-green-400" />
                          <span className="line-through opacity-70">{task.title}</span>
                        </h4>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground mr-1" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(task.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-[10px] opacity-70">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div className="flex items-center">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{task.assignee}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">Jul 10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className
