
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  MessageSquare,
  User,
  Users,
  Sparkles,
  Mail,
  Clock,
  Calendar,
  Star,
  Heart,
  ThumbsUp,
  Smile,
  Meh,
  Frown,
  PieChart,
  BarChart2,
  Activity,
  Send,
  RefreshCw,
  FileText,
  AlertCircle,
  CheckCircle,
  Copy,
  Edit,
  ChevronDown,
  Eye,
  Phone,
  Bell,
  Tag,
  Linkedin,
  Twitter,
  Building,
  Plus,
  ArrowDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart as RPieChart,
  Pie,
  Cell
} from 'recharts';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Sample data
const customerData = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'TechVision Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'Marketing Director',
    email: 'sarah.j@techvision.com',
    phone: '+1 (555) 123-4567',
    lastContact: '2023-05-10',
    sentiment: 'positive',
    engagementScore: 87,
    platform: 'linkedin',
    status: 'active',
    tags: ['marketing', 'enterprise', 'decision-maker'],
    recentActivity: 'Commented on your post about AI marketing strategies',
    lastInteraction: '2 days ago',
    relationshipStage: 'nurturing',
    followUpDate: '2023-05-18',
    notes: 'Interested in our marketing automation solutions. Follow up with case studies.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'InnovateTech',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'CTO',
    email: 'm.chen@innovatetech.com',
    phone: '+1 (555) 987-6543',
    lastContact: '2023-05-05',
    sentiment: 'neutral',
    engagementScore: 65,
    platform: 'twitter',
    status: 'active',
    tags: ['technical', 'enterprise', 'decision-maker'],
    recentActivity: 'Viewed your profile',
    lastInteraction: '1 week ago',
    relationshipStage: 'awareness',
    followUpDate: '2023-05-15',
    notes: 'Looking for AI integration solutions. Send technical documentation.'
  },
  {
    id: '3',
    name: 'Jessica Lee',
    company: 'Enterprise Solutions',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    role: 'VP of Sales',
    email: 'j.lee@enterprisesolutions.com',
    phone: '+1 (555) 333-7890',
    lastContact: '2023-05-12',
    sentiment: 'very-positive',
    engagementScore: 92,
    platform: 'linkedin',
    status: 'active',
    tags: ['sales', 'enterprise', 'decision-maker', 'champion'],
    recentActivity: 'Messaged about scheduling a demo',
    lastInteraction: '3 days ago',
    relationshipStage: 'decision',
    followUpDate: '2023-05-14',
    notes: 'Ready to present proposal to stakeholders. Prepare ROI analysis.'
  },
  {
    id: '4',
    name: 'Robert Garcia',
    company: 'GrowthLabs',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    role: 'Product Manager',
    email: 'r.garcia@growthlabs.com',
    phone: '+1 (555) 555-1234',
    lastContact: '2023-04-28',
    sentiment: 'negative',
    engagementScore: 43,
    platform: 'twitter',
    status: 'inactive',
    tags: ['product', 'startup'],
    recentActivity: 'No recent activity',
    lastInteraction: '3 weeks ago',
    relationshipStage: 'aware',
    followUpDate: '2023-05-20',
    notes: 'Had concerns about implementation timeline. Need to address specific concerns.'
  },
  {
    id: '5',
    name: 'Emily Watson',
    company: 'RetailPlus',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    role: 'Digital Marketing Manager',
    email: 'e.watson@retailplus.com',
    phone: '+1 (555) 222-8765',
    lastContact: '2023-05-08',
    sentiment: 'positive',
    engagementScore: 78,
    platform: 'linkedin',
    status: 'active',
    tags: ['marketing', 'retail', 'mid-level'],
    recentActivity: 'Liked your content about retail analytics',
    lastInteraction: '5 days ago',
    relationshipStage: 'interest',
    followUpDate: '2023-05-16',
    notes: 'Interested in learning more about analytics platform. Schedule personalized demo.'
  }
];

const engagementActivityData = [
  { month: 'Jan', messages: 12, mentions: 5, likes: 20, profile: 15 },
  { month: 'Feb', messages: 15, mentions: 8, likes: 25, profile: 18 },
  { month: 'Mar', messages: 20, mentions: 12, likes: 30, profile: 22 },
  { month: 'Apr', messages: 25, mentions: 15, likes: 35, profile: 28 },
  { month: 'May', messages: 30, mentions: 18, likes: 40, profile: 32 },
];

const sentimentDistributionData = [
  { name: 'Very Positive', value: 35 },
  { name: 'Positive', value: 45 },
  { name: 'Neutral', value: 12 },
  { name: 'Negative', value: 8 },
];

const messageSuggestions = [
  {
    id: '1',
    title: 'Follow-up on Demo',
    content: 'Hi [Name], I wanted to follow up on our recent demo and see if you had any additional questions. I'm available to discuss further details or provide more information about specific features you're interested in.',
    type: 'follow-up'
  },
  {
    id: '2',
    title: 'Value Proposition',
    content: 'Hi [Name], Based on our conversations about your challenges with [specific issue], I thought you might be interested in how our solution has helped similar companies achieve [specific benefit]. Would you be open to discussing how this might work for [Company]?',
    type: 'nurture'
  },
  {
    id: '3',
    title: 'Content Share',
    content: 'Hi [Name], I came across this article that discusses [relevant topic] and immediately thought of our recent conversation. It offers some interesting insights that might be valuable for your current initiatives at [Company]. Let me know what you think!',
    type: 'content'
  },
  {
    id: '4',
    title: 'Meeting Request',
    content: 'Hi [Name], I'd like to schedule some time to discuss how we can address the [specific challenge] you mentioned during our last conversation. Would you have 30 minutes available next week? I have some specific ideas I'd like to share.',
    type: 'meeting'
  },
];

const SENTIMENT_COLORS = {
  'very-positive': '#10b981',
  'positive': '#3b82f6',
  'neutral': '#9ca3af',
  'negative': '#f59e0b',
  'very-negative': '#ef4444'
};

const PIE_COLORS = ['#10b981', '#3b82f6', '#9ca3af', '#f59e0b'];

const CustomerEngagement = () => {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  
  // Filter customers based on search and tab
  const filteredCustomers = customerData.filter(customer => {
    const matchesSearch = searchQuery === '' || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'high-engagement' && customer.engagementScore > 75) ||
      (activeTab === 'needs-attention' && customer.engagementScore < 50) ||
      (activeTab === 'follow-up' && new Date(customer.followUpDate) <= new Date());
    
    return matchesSearch && matchesTab;
  });
  
  const handleSelectCustomer = (id: string) => {
    setSelectedCustomer(id === selectedCustomer ? null : id);
  };
  
  const selectedCustomerData = selectedCustomer 
    ? customerData.find(customer => customer.id === selectedCustomer) 
    : null;
  
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'very-positive':
        return <Heart className="w-4 h-4" />;
      case 'positive':
        return <Smile className="w-4 h-4" />;
      case 'neutral':
        return <Meh className="w-4 h-4" />;
      case 'negative':
        return <Frown className="w-4 h-4" />;
      default:
        return <Meh className="w-4 h-4" />;
    }
  };
  
  const getRelationshipStageColor = (stage: string) => {
    switch (stage) {
      case 'aware':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'awareness':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'interest':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'nurturing':
        return 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300';
      case 'decision':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'customer':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
                <h1 className="text-3xl font-bold mb-2">Customer Engagement</h1>
                <p className="text-muted-foreground">
                  Manage and improve relationships with potential customers
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Bell size={16} />
                  <span>Alerts</span>
                </Button>
                <Button className="gap-2">
                  <Users size={16} />
                  <span>Add Contact</span>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Contacts</p>
                      <div className="text-3xl font-bold">347</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                        <Activity size={14} className="mr-1" />
                        <span>92 active this week</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Users className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg. Sentiment</p>
                      <div className="text-3xl font-bold">Positive</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                        <ThumbsUp size={14} className="mr-1" />
                        <span>+12% this month</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Smile className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Follow-ups Needed</p>
                      <div className="text-3xl font-bold">24</div>
                      <div className="flex items-center text-sm text-amber-600 dark:text-amber-400 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>5 high priority</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="border-b pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <CardTitle>Customers & Prospects</CardTitle>
                        <CardDescription>Manage your contacts and engagement</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <Input
                            placeholder="Search contacts..."
                            className="pl-9 h-9 w-full sm:w-auto min-w-[200px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Filter size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <Tabs
                      className="mt-4"
                      value={activeTab}
                      onValueChange={setActiveTab}
                    >
                      <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="high-engagement">High Engagement</TabsTrigger>
                        <TabsTrigger value="needs-attention">Needs Attention</TabsTrigger>
                        <TabsTrigger value="follow-up">Follow-up</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <div 
                            key={customer.id}
                            className={cn(
                              "p-4 transition-colors cursor-pointer hover:bg-muted/50",
                              selectedCustomer === customer.id && "bg-muted"
                            )}
                            onClick={() => handleSelectCustomer(customer.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <img 
                                    src={customer.avatar} 
                                    alt={customer.name} 
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div className={cn(
                                    "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
                                    customer.platform === 'linkedin' ? "bg-[#0A66C2]" : "bg-[#1DA1F2]"
                                  )}></div>
                                </div>
                                <div>
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Building size={12} />
                                    <span>{customer.company}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end gap-1">
                                <Badge className={cn(
                                  customer.engagementScore >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                                  customer.engagementScore >= 60 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                                  customer.engagementScore >= 40 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                )}>
                                  {customer.engagementScore}% Engagement
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {customer.lastInteraction}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <div className="text-sm text-muted-foreground mb-2">
                                {customer.recentActivity || "No recent activity"}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1">
                                  {customer.tags.slice(0, 3).map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {customer.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{customer.tags.length - 3}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                      color: SENTIMENT_COLORS[customer.sentiment as keyof typeof SENTIMENT_COLORS],
                                      backgroundColor: `${SENTIMENT_COLORS[customer.sentiment as keyof typeof SENTIMENT_COLORS]}10`
                                    }}
                                  >
                                    {getSentimentIcon(customer.sentiment)}
                                    <span className="capitalize">{customer.sentiment.replace('-', ' ')}</span>
                                  </div>
                                  <div className={cn(
                                    "text-xs px-2 py-0.5 rounded-full",
                                    getRelationshipStageColor(customer.relationshipStage)
                                  )}>
                                    {customer.relationshipStage}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <User className="h-12 w-12 text-muted-foreground mb-4" />
                          <h3 className="text-xl font-medium mb-2">No contacts found</h3>
                          <p className="text-muted-foreground text-center max-w-md mb-6">
                            Try adjusting your search criteria or filters to find contacts.
                          </p>
                          <Button onClick={() => {
                            setSearchQuery('');
                            setActiveTab('all');
                          }}>
                            Reset Filters
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {selectedCustomerData && (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={selectedCustomerData.avatar} 
                            alt={selectedCustomerData.name} 
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <CardTitle>{selectedCustomerData.name}</CardTitle>
                            <CardDescription>
                              {selectedCustomerData.role} at {selectedCustomerData.company}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Mail size={16} />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Phone size={16} />
                          </Button>
                          {selectedCustomerData.platform === 'linkedin' ? (
                            <Button variant="linkedin" size="icon">
                              <Linkedin size={16} />
                            </Button>
                          ) : (
                            <Button variant="twitter" size="icon">
                              <Twitter size={16} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="text-sm">Email</div>
                              <div className="font-medium">{selectedCustomerData.email}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">Phone</div>
                              <div className="font-medium">{selectedCustomerData.phone}</div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">Last Contact</div>
                              <div className="font-medium">
                                {format(new Date(selectedCustomerData.lastContact), 'MMM d, yyyy')}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">Follow-up Date</div>
                              <div className="font-medium">
                                {format(new Date(selectedCustomerData.followUpDate), 'MMM d, yyyy')}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="text-sm font-medium mb-2">Tags</div>
                            <div className="flex flex-wrap gap-1">
                              {selectedCustomerData.tags.map((tag, index) => (
                                <Badge key={index} className="flex items-center gap-1">
                                  <Tag size={10} />
                                  <span>{tag}</span>
                                </Badge>
                              ))}
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Plus size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Engagement Metrics</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="text-sm">Engagement Score</div>
                                <div className="text-sm font-medium">{selectedCustomerData.engagementScore}%</div>
                              </div>
                              <Progress 
                                value={selectedCustomerData.engagementScore} 
                                className="h-2"
                                indicatorClassName={cn(
                                  selectedCustomerData.engagementScore >= 80 ? "bg-green-500" :
                                  selectedCustomerData.engagementScore >= 60 ? "bg-blue-500" :
                                  selectedCustomerData.engagementScore >= 40 ? "bg-amber-500" :
                                  "bg-red-500"
                                )}
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="text-sm">Sentiment Analysis</div>
                                <div className="text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
                                  style={{
                                    color: SENTIMENT_COLORS[selectedCustomerData.sentiment as keyof typeof SENTIMENT_COLORS],
                                    backgroundColor: `${SENTIMENT_COLORS[selectedCustomerData.sentiment as keyof typeof SENTIMENT_COLORS]}10`
                                  }}
                                >
                                  {getSentimentIcon(selectedCustomerData.sentiment)}
                                  <span className="capitalize">{selectedCustomerData.sentiment.replace('-', ' ')}</span>
                                </div>
                              </div>
                              <Progress 
                                value={
                                  selectedCustomerData.sentiment === 'very-positive' ? 95 :
                                  selectedCustomerData.sentiment === 'positive' ? 75 :
                                  selectedCustomerData.sentiment === 'neutral' ? 50 :
                                  selectedCustomerData.sentiment === 'negative' ? 25 : 10
                                } 
                                className="h-2"
                                indicatorClassName={SENTIMENT_COLORS[selectedCustomerData.sentiment as keyof typeof SENTIMENT_COLORS]}
                              />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <div className="text-sm">Relationship Stage</div>
                                <div className={cn(
                                  "text-xs px-2 py-0.5 rounded-full",
                                  getRelationshipStageColor(selectedCustomerData.relationshipStage)
                                )}>
                                  {selectedCustomerData.relationshipStage}
                                </div>
                              </div>
                              <Progress 
                                value={
                                  selectedCustomerData.relationshipStage === 'customer' ? 100 :
                                  selectedCustomerData.relationshipStage === 'decision' ? 80 :
                                  selectedCustomerData.relationshipStage === 'nurturing' ? 60 :
                                  selectedCustomerData.relationshipStage === 'interest' ? 40 :
                                  selectedCustomerData.relationshipStage === 'awareness' ? 20 : 10
                                } 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notes</h3>
                        <div className="relative">
                          <Textarea 
                            value={selectedCustomerData.notes} 
                            className="min-h-20 pr-10"
                            readOnly
                          />
                          <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7">
                            <Edit size={14} />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Quick Message</h3>
                        <div className="space-y-3">
                          <Textarea 
                            placeholder="Type your message here..."
                            className="min-h-20"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                          />
                          <div className="flex justify-between">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Sparkles size={14} />
                              <span>AI Suggestions</span>
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Schedule</Button>
                              <Button size="sm" className="gap-1">
                                <Send size={14} />
                                <span>Send</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Summary</CardTitle>
                    <CardDescription>
                      Interactions across all platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={engagementActivityData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="messages" 
                            stroke="#8884d8" 
                            activeDot={{ r: 8 }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="mentions" 
                            stroke="#82ca9d" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="likes" 
                            stroke="#ffc658" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="profile" 
                            stroke="#ff7300" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground mb-1">
                          Most Active Platform
                        </div>
                        <div className="font-medium flex items-center gap-1">
                          <Linkedin size={16} className="text-[#0A66C2]" />
                          <span>LinkedIn</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          68% of engagements
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground mb-1">
                          Best Time
                        </div>
                        <div className="font-medium">
                          Tuesdays, 9-11am
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          32% higher response rate
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground mb-1">
                          Avg. Response Time
                        </div>
                        <div className="font-medium">
                          3.5 hours
                        </div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <ArrowDown size={12} />
                          <span>12% better than average</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground mb-1">
                          Monthly Growth
                        </div>
                        <div className="font-medium">
                          +18%
                        </div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                          <ArrowDown size={12} />
                          <span>Growing engagement</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Analysis</CardTitle>
                    <CardDescription>Overall customer sentiment trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RPieChart>
                          <Pie
                            data={sentimentDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {sentimentDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RPieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <div className="text-sm font-medium">Top Positive Themes</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="text-sm">Product quality</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="text-sm">Customer support</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <div className="text-sm">Ease of use</div>
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium mt-4">Areas for Improvement</div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <div className="text-sm">Pricing transparency</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <div className="text-sm">Onboarding process</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Message Suggestions</CardTitle>
                    <CardDescription>AI-powered communication templates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Select defaultValue="follow-up">
                      <SelectTrigger>
                        <SelectValue placeholder="Message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="nurture">Value Proposition</SelectItem>
                        <SelectItem value="content">Content Share</SelectItem>
                        <SelectItem value="meeting">Meeting Request</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="space-y-4 mt-2">
                      {messageSuggestions.slice(0, 2).map((suggestion) => (
                        <div key={suggestion.id} className="border rounded-md p-3 relative">
                          <div className="font-medium mb-2">{suggestion.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {suggestion.content}
                          </div>
                          <div className="absolute top-3 right-3 flex">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Copy size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full" size="sm">
                      <Sparkles size={14} className="mr-2" />
                      <span>Generate Custom Message</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Follow-up Reminders</CardTitle>
                    <CardDescription>Upcoming scheduled follow-ups</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-md p-3 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">Jessica Lee</div>
                          <div className="text-sm text-muted-foreground">
                            Follow up on proposal
                          </div>
                        </div>
                        <Badge className="bg-amber-500">Tomorrow</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm" className="h-7">
                          <Clock size={14} className="mr-1" />
                          <span>Reschedule</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">Michael Chen</div>
                          <div className="text-sm text-muted-foreground">
                            Send technical documentation
                          </div>
                        </div>
                        <Badge variant="outline">May 15</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm" className="h-7">
                          <CheckCircle size={14} className="mr-1" />
                          <span>Mark Complete</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">Emily Watson</div>
                          <div className="text-sm text-muted-foreground">
                            Schedule personalized demo
                          </div>
                        </div>
                        <Badge variant="outline">May 16</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button variant="outline" size="sm" className="h-7">
                          <CheckCircle size={14} className="mr-1" />
                          <span>Mark Complete</span>
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Calendar size={14} className="mr-2" />
                      <span>View All Reminders</span>
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

export default CustomerEngagement;
