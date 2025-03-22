
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, UserPlus, Users, Briefcase, Building, Filter, ArrowUpRight, 
  BarChart, Star, MessageSquare, Clock, Share2, Bookmark, ChevronDown,
  PersonStanding, Network, Twitter, Linkedin, CheckCircle2
} from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import LeadFilters from '@/components/leads/LeadFilters';
import LeadCard from '@/components/leads/LeadCard';

const mockLeads = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Marketing Director',
    company: 'TechVision Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    leadScore: 92,
    lastActive: '2 hours ago',
    connectStatus: 'not_connected',
    connections: 478,
    engagementRate: 'High',
    tags: ['marketing', 'tech'],
    platform: 'linkedin',
    mutualConnections: 5,
    recentActivity: 'Published an article about digital marketing trends',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'CTO',
    company: 'InnovateTech',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    leadScore: 87,
    lastActive: '1 day ago',
    connectStatus: 'pending',
    connections: 1023,
    engagementRate: 'Medium',
    tags: ['tech', 'startup'],
    platform: 'linkedin',
    mutualConnections: 2,
    recentActivity: 'Looking for AI integration solutions',
  },
  {
    id: '3',
    name: 'Alex Rivera',
    title: 'Product Manager',
    company: 'GrowthLabs',
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    leadScore: 76,
    lastActive: '3 days ago',
    connectStatus: 'connected',
    connections: 654,
    engagementRate: 'Medium',
    tags: ['product', 'saas'],
    platform: 'twitter',
    mutualConnections: 8,
    recentActivity: 'Asked about project management tools',
  },
  {
    id: '4',
    name: 'Jessica Lee',
    title: 'VP of Sales',
    company: 'Enterprise Solutions',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    leadScore: 95,
    lastActive: '5 hours ago',
    connectStatus: 'not_connected',
    connections: 1246,
    engagementRate: 'Very High',
    tags: ['sales', 'enterprise'],
    platform: 'linkedin',
    mutualConnections: 3,
    recentActivity: 'Searching for automation software',
  },
];

const LeadDiscovery = () => {
  const { mode } = useMode();
  const [activeTab, setActiveTab] = useState('all');
  const [minLeadScore, setMinLeadScore] = useState(70);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  // Filter leads based on current filters
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = searchQuery === '' || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesScore = lead.leadScore >= minLeadScore;
    const matchesPlatform = activeTab === 'all' || 
      (activeTab === 'linkedin' && lead.platform === 'linkedin') ||
      (activeTab === 'twitter' && lead.platform === 'twitter');
    
    return matchesSearch && matchesScore && matchesPlatform;
  });

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleBulkConnect = () => {
    // In a real app, this would connect with multiple leads
    console.log('Connecting with leads:', selectedLeads);
    // Show toast or notification
  };

  const connectVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Lead Discovery</h1>
                <p className="text-muted-foreground">Find and connect with high-potential leads across platforms</p>
              </div>
              <div className="flex gap-2">
                <Button variant="lead" className="flex items-center gap-2">
                  <UserPlus size={16} />
                  <span>Add Leads</span>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Advanced Filters</span>
                </Button>
              </div>
            </div>
            
            {/* Platform tabs */}
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Users size={16} />
                  <span>All Platforms</span>
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="flex items-center gap-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </TabsTrigger>
                <TabsTrigger value="twitter" className="flex items-center gap-2">
                  <Twitter size={16} />
                  <span>Twitter</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {/* Search and filters section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search leads by name, company, or title..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Select defaultValue="engagement">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement">Engagement Score</SelectItem>
                    <SelectItem value="recent">Recently Active</SelectItem>
                    <SelectItem value="connections">Connections</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">Min Lead Score:</div>
                <div className="font-medium">{minLeadScore}</div>
                <Slider
                  className="flex-1"
                  defaultValue={[70]}
                  max={100}
                  step={1}
                  onValueChange={([value]) => setMinLeadScore(value)}
                />
              </div>
            </div>
            
            {/* Selected leads action bar */}
            {selectedLeads.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-6 p-4 bg-muted rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-background">
                    {selectedLeads.length} leads selected
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedLeads([])}>
                    Clear selection
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleBulkConnect} className="flex items-center gap-1">
                    <UserPlus size={14} />
                    <span>Connect All</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>Message All</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Bookmark size={14} />
                    <span>Save List</span>
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* Leads grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLeads.map(lead => (
                <Card key={lead.id} className={cn(
                  "group transition-all duration-300 hover:shadow-md relative overflow-hidden",
                  selectedLeads.includes(lead.id) && "ring-2 ring-primary ring-offset-2"
                )}>
                  <div 
                    className="absolute top-3 right-3 z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelectLead(lead.id);
                    }}
                  >
                    {selectedLeads.includes(lead.id) ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border border-gray-300 bg-white dark:bg-gray-800"></div>
                    )}
                  </div>
                  
                  {/* Platform badge */}
                  <div className="absolute top-3 left-3">
                    {lead.platform === 'linkedin' ? (
                      <Badge variant="outline" className="bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20">
                        <Linkedin size={12} className="mr-1" /> LinkedIn
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20">
                        <Twitter size={12} className="mr-1" /> Twitter
                      </Badge>
                    )}
                  </div>
                  
                  <CardHeader className="pt-12">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img 
                          src={lead.avatar} 
                          alt={lead.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-background"
                        />
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border-2 border-background",
                          lead.leadScore >= 90 ? "bg-green-500 text-white" : 
                          lead.leadScore >= 80 ? "bg-amber-500 text-white" : 
                          "bg-blue-500 text-white"
                        )}>
                          {Math.floor(lead.leadScore / 10)}
                        </div>
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {lead.name}
                          <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardTitle>
                        <CardDescription className="line-clamp-1">{lead.title} at {lead.company}</CardDescription>
                        <div className="flex items-center mt-1 gap-2">
                          <Badge variant="outline" className="text-xs">
                            <Users size={10} className="mr-1" />
                            {lead.connections} connections
                          </Badge>
                          {lead.mutualConnections > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {lead.mutualConnections} mutual
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock size={14} />
                      <span>Active {lead.lastActive}</span>
                    </div>
                    
                    <div className="text-sm mb-4">
                      <span className="font-medium">Recent activity: </span>
                      {lead.recentActivity}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {lead.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <motion.div 
                      variants={connectVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1"
                    >
                      {lead.connectStatus === 'not_connected' && (
                        <Button className="w-full" variant={lead.platform === 'linkedin' ? 'linkedin' : 'twitter'}>
                          <UserPlus size={16} />
                          <span>Connect</span>
                        </Button>
                      )}
                      {lead.connectStatus === 'pending' && (
                        <Button variant="outline" className="w-full">
                          <Clock size={16} />
                          <span>Pending</span>
                        </Button>
                      )}
                      {lead.connectStatus === 'connected' && (
                        <Button variant="outline" className="w-full">
                          <MessageSquare size={16} />
                          <span>Message</span>
                        </Button>
                      )}
                    </motion.div>
                    
                    <Button variant="ghost" size="icon">
                      <ChevronDown size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredLeads.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No leads found</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Try adjusting your filters or search query to find leads that match your criteria.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setMinLeadScore(70);
                  setActiveTab('all');
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LeadDiscovery;
