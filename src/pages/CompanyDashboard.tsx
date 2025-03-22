
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart2, 
  TrendingUp,
  Users,
  Target,
  ArrowUp,
  ArrowDown,
  Briefcase,
  UserPlus,
  BarChart3,
  Layers,
  Filter,
  Download,
  Mail,
  Building,
  UserCheck,
  Clock,
  CalendarDays,
  User,
  Handshake,
  Star,
  MessageSquare,
  Share2,
  ExternalLink,
  FileText,
  LayoutDashboard
} from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';

// Sample data
const leadFunnelData = [
  { name: 'Awareness', value: 1200 },
  { name: 'Interest', value: 800 },
  { name: 'Decision', value: 400 },
  { name: 'Action', value: 200 },
  { name: 'Loyalty', value: 150 },
];

const leadsBySourceData = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Twitter', value: 30 },
  { name: 'Referrals', value: 15 },
  { name: 'Webinars', value: 10 },
];

const monthlyLeadsData = [
  { name: 'Jan', leads: 65, conversions: 12 },
  { name: 'Feb', leads: 78, conversions: 15 },
  { name: 'Mar', leads: 90, conversions: 20 },
  { name: 'Apr', leads: 110, conversions: 24 },
  { name: 'May', leads: 125, conversions: 30 },
  { name: 'Jun', leads: 140, conversions: 35 },
];

const teamPerformanceData = [
  { name: 'Sarah', leads: 45, conversions: 12, responseTime: 0.8 },
  { name: 'Mark', leads: 38, conversions: 9, responseTime: 1.2 },
  { name: 'Alex', leads: 52, conversions: 15, responseTime: 0.5 },
  { name: 'Jessica', leads: 30, conversions: 8, responseTime: 1.0 },
  { name: 'Michael', leads: 41, conversions: 11, responseTime: 0.9 },
];

const campaignPerformanceData = [
  { name: 'Campaign A', leads: 120, cost: 2000, cpl: 16.7, conversion: 15 },
  { name: 'Campaign B', leads: 90, cost: 1500, cpl: 16.7, conversion: 12 },
  { name: 'Campaign C', leads: 150, cost: 2200, cpl: 14.7, conversion: 18 },
  { name: 'Campaign D', leads: 80, cost: 1200, cpl: 15.0, conversion: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CompanyDashboard = () => {
  const { mode } = useMode();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
                <p className="text-muted-foreground">
                  Track company performance, leads, and team engagement metrics
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2">
                  <Download size={16} />
                  <span>Export Report</span>
                </Button>
                <Button className="gap-2">
                  <LayoutDashboard size={16} />
                  <span>Customize Dashboard</span>
                </Button>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
                      <div className="text-3xl font-bold">2,543</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                        <ArrowUp size={14} className="mr-1" />
                        <span>23% vs last month</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <UserPlus className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                      <div className="text-3xl font-bold">24.8%</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                        <ArrowUp size={14} className="mr-1" />
                        <span>5.3% vs last month</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Target className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg. Response Time</p>
                      <div className="text-3xl font-bold">0.8h</div>
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400 mt-1">
                        <ArrowDown size={14} className="mr-1" />
                        <span>15% vs last month</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Clock className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Customer Acq. Cost</p>
                      <div className="text-3xl font-bold">$142</div>
                      <div className="flex items-center text-sm text-red-600 dark:text-red-400 mt-1">
                        <ArrowUp size={14} className="mr-1" />
                        <span>8% vs last month</span>
                      </div>
                    </div>
                    <div className={cn(
                      "p-3 rounded-full",
                      mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                    )}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Lead Funnel and Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Funnel</CardTitle>
                  <CardDescription>Conversion stages and drop-off rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={leadFunnelData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" fill={mode === 'assisted' ? '#10b981' : '#3b82f6'}>
                          {leadFunnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="rounded-md border p-3">
                      <div className="text-sm text-muted-foreground mb-1">Conversion Rate</div>
                      <div className="text-2xl font-bold">16.7%</div>
                      <div className="text-xs text-muted-foreground">Awareness to Action</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-sm text-muted-foreground mb-1">Drop-off Point</div>
                      <div className="text-2xl font-bold">Decision</div>
                      <div className="text-xs text-muted-foreground">50% drop-off rate</div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-sm text-muted-foreground mb-1">Loyalty Rate</div>
                      <div className="text-2xl font-bold">75%</div>
                      <div className="text-xs text-muted-foreground">Action to Loyalty</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Lead Sources</CardTitle>
                      <CardDescription>Where your leads are coming from</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Filter size={14} />
                      <span>Filter</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={leadsBySourceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {leadsBySourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Source Breakdown</h3>
                      {leadsBySourceData.map((source, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              <span>{source.name}</span>
                            </div>
                            <span className="font-medium">{source.value}%</span>
                          </div>
                          <Progress value={source.value} className="h-1.5" indicatorClassName={`bg-[${COLORS[index % COLORS.length]}]`} />
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <Button variant="outline" className="w-full gap-2">
                          <ExternalLink size={14} />
                          <span>View Source Details</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Team Performance */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>Individual team member metrics</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">This Month</Button>
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div>Team Member</div>
                    <div>Leads Generated</div>
                    <div>Conversions</div>
                    <div>Response Time</div>
                    <div>Performance</div>
                  </div>
                  
                  {teamPerformanceData.map((member, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b last:border-0 items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <span>{member.name}</span>
                      </div>
                      <div>
                        <div className="font-medium">{member.leads}</div>
                        <div className="text-xs text-muted-foreground">
                          {index === 0 || index === 2 ? (
                            <span className="text-green-600 dark:text-green-400 flex items-center">
                              <ArrowUp size={10} className="mr-1" /> 
                              {Math.floor(Math.random() * 10) + 5}%
                            </span>
                          ) : (
                            <span className="text-red-600 dark:text-red-400 flex items-center">
                              <ArrowDown size={10} className="mr-1" /> 
                              {Math.floor(Math.random() * 8) + 2}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{member.conversions}</div>
                        <div className="text-xs text-muted-foreground">
                          {(member.conversions / member.leads * 100).toFixed(1)}% rate
                        </div>
                      </div>
                      <div>
                        <div className="font-medium">{member.responseTime}h</div>
                        <div className="text-xs text-muted-foreground">
                          {member.responseTime < 0.7 ? 'Excellent' : member.responseTime < 1.0 ? 'Good' : 'Average'}
                        </div>
                      </div>
                      <div>
                        <Progress 
                          value={Math.round((member.conversions / member.leads) * 100) + 20} 
                          className="h-2" 
                          indicatorClassName={
                            (member.conversions / member.leads) > 0.25 ? "bg-green-500" :
                            (member.conversions / member.leads) > 0.2 ? "bg-blue-500" :
                            "bg-amber-500"
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Detailed Analytics Tabs */}
            <Tabs defaultValue="lead_trends" className="space-y-6">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full max-w-3xl mx-auto">
                <TabsTrigger value="lead_trends" className="flex items-center gap-2">
                  <TrendingUp size={16} />
                  <span>Lead Trends</span>
                </TabsTrigger>
                <TabsTrigger value="campaigns" className="flex items-center gap-2">
                  <BarChart3 size={16} />
                  <span>Campaigns</span>
                </TabsTrigger>
                <TabsTrigger value="collaboration" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>Collaboration</span>
                </TabsTrigger>
                <TabsTrigger value="forecasting" className="flex items-center gap-2">
                  <Target size={16} />
                  <span>Forecasting</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="lead_trends" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Generation Trends</CardTitle>
                    <CardDescription>Monthly leads and conversions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={monthlyLeadsData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="leads" stackId="1" stroke="#8884d8" fill="#8884d8" />
                          <Area type="monotone" dataKey="conversions" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Growth Rate</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">+24.8%</div>
                          <div className="text-muted-foreground">vs previous quarter</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Best Month</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">June</div>
                          <div className="text-muted-foreground">140 leads generated</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Conversion Rate</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">25.3%</div>
                          <div className="text-muted-foreground">Average in Q2</div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="campaigns" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>ROI and cost analysis by campaign</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border mb-6">
                      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                        <div className="col-span-2">Campaign</div>
                        <div>Leads</div>
                        <div>Conversion</div>
                        <div>Cost per Lead</div>
                        <div>ROI</div>
                      </div>
                      
                      {campaignPerformanceData.map((campaign, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4 p-4 border-b last:border-0">
                          <div className="col-span-2">
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-xs text-muted-foreground">Q2 2023</div>
                          </div>
                          <div>
                            <div className="font-medium">{campaign.leads}</div>
                            <div className="text-xs text-muted-foreground flex items-center">
                              {index % 2 === 0 ? (
                                <span className="text-green-600 dark:text-green-400 flex items-center">
                                  <ArrowUp size={10} className="mr-1" /> 
                                  {Math.floor(Math.random() * 20) + 5}%
                                </span>
                              ) : (
                                <span className="text-red-600 dark:text-red-400 flex items-center">
                                  <ArrowDown size={10} className="mr-1" /> 
                                  {Math.floor(Math.random() * 15) + 2}%
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{campaign.conversion}%</div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(campaign.leads * (campaign.conversion / 100))} customers
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">${campaign.cpl.toFixed(2)}</div>
                            <div className="text-xs text-muted-foreground">
                              Total: ${campaign.cost}
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">
                              {campaign.conversion > 15 ? (
                                <span className="text-green-600 dark:text-green-400">230%</span>
                              ) : campaign.conversion > 12 ? (
                                <span className="text-green-600 dark:text-green-400">180%</span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400">120%</span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {campaign.conversion > 15 ? "Excellent" : campaign.conversion > 12 ? "Good" : "Average"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center">
                      <Button>View All Campaigns</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="collaboration" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Collaboration</CardTitle>
                    <CardDescription>Internal interaction and handoff metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Collaboration Metrics</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="text-sm">Internal Handoff Efficiency</div>
                              <div className="text-sm font-medium">85%</div>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="text-sm">Cross-team Communication</div>
                              <div className="text-sm font-medium">73%</div>
                            </div>
                            <Progress value={73} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="text-sm">Lead Response Coordination</div>
                              <div className="text-sm font-medium">92%</div>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <div className="text-sm">Documentation Completeness</div>
                              <div className="text-sm font-medium">68%</div>
                            </div>
                            <Progress value={68} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Communication Channels</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded">
                                <MessageSquare size={16} />
                              </div>
                              <div>
                                <div className="font-medium">Chat</div>
                                <div className="text-xs text-muted-foreground">Internal team communication</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium">52%</div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded">
                                <Mail size={16} />
                              </div>
                              <div>
                                <div className="font-medium">Email</div>
                                <div className="text-xs text-muted-foreground">Formal communications</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium">28%</div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded">
                                <FileText size={16} />
                              </div>
                              <div>
                                <div className="font-medium">Documents</div>
                                <div className="text-xs text-muted-foreground">Shared documentation</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium">15%</div>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 rounded">
                                <Handshake size={16} />
                              </div>
                              <div>
                                <div className="font-medium">Meetings</div>
                                <div className="text-xs text-muted-foreground">Face-to-face interactions</div>
                              </div>
                            </div>
                            <div className="text-sm font-medium">5%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Lead Assignment Effectiveness</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Avg. Assignment Time</div>
                            <div className="text-2xl font-bold">2.3 hours</div>
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                              <ArrowDown size={10} className="mr-1" /> 
                              15% improvement
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Team Capacity</div>
                            <div className="text-2xl font-bold">78%</div>
                            <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                              <ArrowUp size={10} className="mr-1" /> 
                              Near optimal
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="p-4">
                            <div className="text-sm text-muted-foreground mb-1">Auto-assignment Rate</div>
                            <div className="text-2xl font-bold">65%</div>
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center">
                              <ArrowUp size={10} className="mr-1" /> 
                              12% improvement
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="forecasting" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Forecasting</CardTitle>
                    <CardDescription>Predictive lead generation insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 mb-6">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            ...monthlyLeadsData,
                            { name: 'Jul', leads: 158, conversions: 42, predicted: true },
                            { name: 'Aug', leads: 175, conversions: 48, predicted: true },
                            { name: 'Sep', leads: 190, conversions: 53, predicted: true },
                          ]}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="leads"
                            stroke="#8884d8"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                            dot={(props: any) => {
                              const { cx, cy, payload } = props;
                              if (payload.predicted) {
                                return (
                                  <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#8884d8" viewBox="0 0 10 10">
                                    <circle cx="5" cy="5" r="5" strokeWidth="0" />
                                  </svg>
                                );
                              }
                              return (
                                <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#8884d8" viewBox="0 0 10 10">
                                  <circle cx="5" cy="5" r="5" strokeWidth="0" />
                                </svg>
                              );
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="conversions"
                            stroke="#82ca9d"
                            strokeWidth={2}
                            dot={(props: any) => {
                              const { cx, cy, payload } = props;
                              if (payload.predicted) {
                                return (
                                  <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#82ca9d" viewBox="0 0 10 10">
                                    <circle cx="5" cy="5" r="5" strokeWidth="0" stroke-dasharray="3 3" />
                                  </svg>
                                );
                              }
                              return (
                                <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="#82ca9d" viewBox="0 0 10 10">
                                  <circle cx="5" cy="5" r="5" strokeWidth="0" />
                                </svg>
                              );
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Q3 Forecast</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">523</div>
                          <div className="text-muted-foreground">Projected leads</div>
                          <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            +25% vs Q2
                          </Badge>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Conversion Trend</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">28.2%</div>
                          <div className="text-muted-foreground">Projected rate</div>
                          <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            +3.4% vs Q2
                          </Badge>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-lg">Revenue Impact</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-3xl font-bold">$215K</div>
                          <div className="text-muted-foreground">Projected revenue</div>
                          <Badge className="mt-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            +18% vs Q2
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Growth Opportunities</h3>
                      <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded mt-1">
                              <TrendingUp size={16} />
                            </div>
                            <div>
                              <h4 className="font-medium">Technology Sector</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Our predictive analysis shows a 35% potential growth in the technology sector leads.
                                Focusing on SaaS companies could yield the highest ROI.
                              </p>
                              <Button variant="outline" size="sm">
                                View Analysis
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded mt-1">
                              <Layers size={16} />
                            </div>
                            <div>
                              <h4 className="font-medium">Enterprise Segment</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Enterprise clients show a consistent 22% YoY growth trend. Forecast suggests
                                focusing on this segment could increase average deal size by 40%.
                              </p>
                              <Button variant="outline" size="sm">
                                View Analysis
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 rounded mt-1">
                              <Users size={16} />
                            </div>
                            <div>
                              <h4 className="font-medium">Customer Success Referrals</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Data suggests referral program optimization could increase lead volume by 27%
                                with minimal acquisition cost. Customer success team has been identified as key driver.
                              </p>
                              <Button variant="outline" size="sm">
                                View Analysis
                              </Button>
                            </div>
                          </div>
                        </div>
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

export default CompanyDashboard;
