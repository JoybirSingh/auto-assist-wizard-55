import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { UserCircle, Users, Star, ArrowUpRight, Clock, BellRing, Tag, Search, Zap, Filter } from 'lucide-react';

const RelationshipIntelligence = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  
  const dummyContacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director at TechGrowth",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      relationshipScore: 87,
      lastInteraction: "3 days ago",
      tags: ["marketing", "technology", "lead"],
      potentialValue: "high",
      nextAction: "Send follow-up on project proposal",
      nextActionDue: "Tomorrow"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Senior Developer at CodeCraft",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
      relationshipScore: 64,
      lastInteraction: "2 weeks ago",
      tags: ["development", "ai", "recruitment"],
      potentialValue: "medium",
      nextAction: "Share relevant article on AI development",
      nextActionDue: "This week"
    },
    {
      id: 3,
      name: "Taylor Rodriguez",
      position: "CEO at Innovate Solutions",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      relationshipScore: 92,
      lastInteraction: "Yesterday",
      tags: ["executive", "decision-maker", "partner"],
      potentialValue: "very high",
      nextAction: "Schedule quarterly strategy meeting",
      nextActionDue: "Next week"
    }
  ];
  
  const handleSearch = () => {
    setIsLoading(true);
    // Simulate search loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto py-8 space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-500" />
              Relationship Intelligence System
            </h1>
            <p className="text-muted-foreground mt-2">
              Strategically manage and nurture your professional relationships
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              <Clock className="w-3.5 h-3.5 mr-1" />
              3 Connections need attention
            </Badge>
            <Button size="sm" className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              Find Opportunities
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1">
            <Input
              placeholder="Search connections by name, company, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-1.5" onClick={handleSearch}>
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="outline" className="flex items-center gap-1.5">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Connections</SelectItem>
                <SelectItem value="score-high">Highest Relationship Score</SelectItem>
                <SelectItem value="recent">Recent Interactions</SelectItem>
                <SelectItem value="value">Highest Potential Value</SelectItem>
                <SelectItem value="attention">Needs Attention</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="connections">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-4">
            <TabsTrigger value="connections" className="flex items-center gap-1.5">
              <UserCircle className="w-4 h-4" />
              <span>Connections</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span>Insights</span>
            </TabsTrigger>
            <TabsTrigger value="reminders" className="flex items-center gap-1.5">
              <BellRing className="w-4 h-4" />
              <span>Reminders</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections" className="space-y-6">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-1/3" />
                          <Skeleton className="h-3 w-1/2" />
                          <div className="flex gap-2 mt-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-10 w-28" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {dummyContacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row gap-4 p-6">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <img 
                              src={contact.avatarUrl} 
                              alt={contact.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-background"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-0.5">
                              <div 
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                                  ${contact.relationshipScore >= 80 ? 'bg-green-500' : 
                                    contact.relationshipScore >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              >
                                {contact.relationshipScore}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-medium">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground">{contact.position}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            <Button variant="ghost" size="sm" className="h-5 text-xs px-1">
                              <Tag className="w-3 h-3 mr-1" />
                              Add
                            </Button>
                          </div>
                          
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            Last interaction: {contact.lastInteraction}
                          </div>
                        </div>
                        
                        <div className="w-full md:w-64 space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Relationship strength</span>
                              <span>{contact.relationshipScore}%</span>
                            </div>
                            <Progress value={contact.relationshipScore} className="h-1.5" />
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className={`w-4 h-4 ${
                                contact.potentialValue === 'very high' ? 'text-purple-500' :
                                contact.potentialValue === 'high' ? 'text-blue-500' :
                                'text-amber-500'
                              }`} />
                              <span className="font-medium capitalize">{contact.potentialValue} value</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Next action: {contact.nextAction}</p>
                            <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Due: {contact.nextActionDue}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex border-t">
                        <Button variant="ghost" className="flex-1 rounded-none text-xs h-10 border-r">
                          View Profile
                        </Button>
                        <Button variant="ghost" className="flex-1 rounded-none text-xs h-10 border-r">
                          Log Interaction
                        </Button>
                        <Button variant="ghost" className="flex-1 rounded-none text-xs h-10">
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Network Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">76%</div>
                  <p className="text-sm text-muted-foreground">Overall strength of your connections</p>
                  <Progress value={76} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto text-sm">View detailed analysis</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">23%</div>
                  <p className="text-sm text-muted-foreground">Monthly connection interaction rate</p>
                  <Progress value={23} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto text-sm">Improve engagement</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Growth Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">12</div>
                  <p className="text-sm text-muted-foreground">High-value connection opportunities</p>
                  <Progress value={60} className="h-2 mt-2" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto text-sm">Explore opportunities</Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Network Composition</CardTitle>
                <CardDescription>Breakdown of your professional connections by industry and role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border rounded-md bg-muted/50">
                  <p className="text-muted-foreground">Network composition visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connection Recommendations</CardTitle>
                <CardDescription>Strategic connections to help you reach your career goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 border rounded-md">
                      <img 
                        src={`https://i.pravatar.cc/150?img=${i+10}`} 
                        alt="Recommended contact" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">Recommended Connection {i}</h4>
                        <p className="text-sm text-muted-foreground">Executive at Company {i}</p>
                      </div>
                      <div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          98% match
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Based on your career goals</p>
                      </div>
                      <Button size="sm">Connect</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Relationship Maintenance</CardTitle>
                <CardDescription>Suggested actions to nurture your professional relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
                    <div className="p-2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">Reconnect with David Miller</h4>
                      <p className="text-sm text-muted-foreground">No interaction in the past 45 days</p>
                    </div>
                    
                    <div className="flex gap-2 sm:self-center">
                      <Button size="sm" variant="outline">Skip</Button>
                      <Button size="sm">Send Message</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      <Star className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">Follow up with Anna Johnson</h4>
                      <p className="text-sm text-muted-foreground">About the project proposal from last week</p>
                    </div>
                    
                    <div className="flex gap-2 sm:self-center">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-md bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">Congratulate Tom Wilson</h4>
                      <p className="text-sm text-muted-foreground">On his new position as Marketing Director</p>
                    </div>
                    
                    <div className="flex gap-2 sm:self-center">
                      <Button size="sm" variant="outline">Skip</Button>
                      <Button size="sm">Send Message</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Scheduled meetings and networking opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 border rounded-md flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md font-medium text-center">
                          <div className="text-xs">Jun</div>
                          <div>{10 + i}</div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Virtual Coffee with Contact {i}</h4>
                          <p className="text-xs text-muted-foreground">10:00 AM - 10:30 AM</p>
                        </div>
                        <Button size="sm" variant="outline">Prepare</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Relationship Milestones</CardTitle>
                  <CardDescription>Important dates and opportunities to reconnect</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-3 border rounded-md flex items-center gap-3">
                        <div className="flex-1">
                          <h4 className="font-medium">Contact {i}'s Work Anniversary</h4>
                          <p className="text-xs text-muted-foreground">5 years at Company {i}</p>
                        </div>
                        <Badge variant="outline">{i === 1 ? 'Today' : `In ${i} days`}</Badge>
                        <Button size="sm">Congratulate</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default RelationshipIntelligence;
