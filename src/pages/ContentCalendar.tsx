
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  FileEdit, 
  Calendar as CalendarIconOutline, 
  Linkedin, 
  Twitter, 
  BarChart2, 
  Users, 
  MessageSquare,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Hash,
  LayoutGrid,
  List,
  Search,
  Filter,
  Eye,
  FileText
} from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

// Sample data for the content calendar
const scheduledContent = [
  {
    id: 1,
    title: "Industry Trends Analysis",
    platform: "linkedin",
    scheduledDate: "2023-05-15T09:00:00.000Z",
    status: "scheduled",
    type: "article",
    engagementPrediction: 85,
    tags: ["trends", "analysis", "industry"]
  },
  {
    id: 2,
    title: "New Product Announcement",
    platform: "twitter",
    scheduledDate: "2023-05-16T14:30:00.000Z",
    status: "scheduled",
    type: "post",
    engagementPrediction: 92,
    tags: ["product", "announcement", "launch"]
  },
  {
    id: 3,
    title: "Company Achievement",
    platform: "linkedin",
    scheduledDate: "2023-05-18T11:00:00.000Z",
    status: "draft",
    type: "post",
    engagementPrediction: 78,
    tags: ["achievement", "milestone", "company"]
  },
  {
    id: 4,
    title: "Customer Success Story",
    platform: "linkedin",
    scheduledDate: "2023-05-20T10:00:00.000Z",
    status: "scheduled",
    type: "article",
    engagementPrediction: 89,
    tags: ["success", "customer", "case-study"]
  },
  {
    id: 5,
    title: "Industry Conference Highlights",
    platform: "twitter",
    scheduledDate: "2023-05-22T15:00:00.000Z",
    status: "draft",
    type: "thread",
    engagementPrediction: 76,
    tags: ["conference", "highlights", "industry"]
  }
];

// Best posting times data
const bestPostingTimes = [
  { day: "Monday", times: ["9:00 AM", "12:30 PM", "5:00 PM"], audienceActivity: "high" },
  { day: "Tuesday", times: ["8:30 AM", "1:00 PM", "6:00 PM"], audienceActivity: "very-high" },
  { day: "Wednesday", times: ["9:30 AM", "2:30 PM", "7:00 PM"], audienceActivity: "high" },
  { day: "Thursday", times: ["10:00 AM", "1:30 PM", "4:30 PM"], audienceActivity: "medium" },
  { day: "Friday", times: ["11:00 AM", "3:00 PM", "5:30 PM"], audienceActivity: "high" },
  { day: "Saturday", times: ["11:30 AM", "3:30 PM"], audienceActivity: "low" },
  { day: "Sunday", times: ["12:00 PM", "7:30 PM"], audienceActivity: "low" }
];

const ContentCalendar = () => {
  const { mode } = useMode();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  
  // Filter content by selected platform
  const filteredContent = platformFilter === "all" 
    ? scheduledContent 
    : scheduledContent.filter(item => item.platform === platformFilter);
  
  // Group content by date for calendar view
  const contentByDate = filteredContent.reduce((acc, item) => {
    const dateStr = new Date(item.scheduledDate).toDateString();
    if (!acc[dateStr]) {
      acc[dateStr] = [];
    }
    acc[dateStr].push(item);
    return acc;
  }, {} as Record<string, typeof scheduledContent>);
  
  // Function to render calendar day cell with content
  const renderCalendarDay = (day: Date) => {
    const dateStr = day.toDateString();
    const dayContent = contentByDate[dateStr] || [];
    
    return (
      <div className="h-full min-h-[80px] p-1 relative">
        <div className="text-sm font-medium p-1">{day.getDate()}</div>
        
        {dayContent.length > 0 && (
          <div className="space-y-1 mt-1">
            {dayContent.map((item) => (
              <div 
                key={item.id}
                className={cn(
                  "text-xs p-1 rounded truncate cursor-pointer",
                  item.platform === "linkedin" 
                    ? "bg-[#0A66C2]/10 text-[#0A66C2] border-l-2 border-[#0A66C2]" 
                    : "bg-[#1DA1F2]/10 text-[#1DA1F2] border-l-2 border-[#1DA1F2]"
                )}
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Content Calendar</h1>
                <p className="text-muted-foreground">
                  Plan and schedule your content for maximum engagement
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    <span>Create Content</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Create New Content</DialogTitle>
                    <DialogDescription>
                      Schedule new content for your social platforms
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input placeholder="Enter content title..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Platform</label>
                      <Select defaultValue="linkedin">
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin" className="flex items-center gap-2">
                            <Linkedin size={14} />
                            <span>LinkedIn</span>
                          </SelectItem>
                          <SelectItem value="twitter" className="flex items-center gap-2">
                            <Twitter size={14} />
                            <span>Twitter</span>
                          </SelectItem>
                          <SelectItem value="both" className="flex items-center gap-2">
                            <Users size={14} />
                            <span>Both</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content Type</label>
                      <Select defaultValue="post">
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">Post</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="thread">Thread</SelectItem>
                          <SelectItem value="poll">Poll</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date & Time</label>
                      <div className="flex gap-2">
                        <Input type="date" className="w-full" />
                        <Input type="time" className="w-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <Input placeholder="Enter tags separated by commas..." />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Schedule Content</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(view === "calendar" && "bg-accent")}
                  onClick={() => setView("calendar")}
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(view === "list" && "bg-accent")}
                  onClick={() => setView("list")}
                >
                  <List size={16} />
                </Button>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Filter by platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setDate(newDate);
                  }
                }}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  if (date) {
                    const newDate = new Date(date);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setDate(newDate);
                  }
                }}>
                  <ChevronRight size={16} />
                </Button>
                {date && (
                  <div className="text-sm font-medium">
                    {format(date, 'MMMM yyyy')}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {view === "calendar" ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Content Schedule</CardTitle>
                      <CardDescription>All scheduled content across platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border rounded-md"
                        renderDay={renderCalendarDay}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Content</CardTitle>
                      <CardDescription>All scheduled content across platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredContent.length > 0 ? (
                          filteredContent.map((item) => (
                            <Card key={item.id} className="overflow-hidden">
                              <div className={cn(
                                "h-1",
                                item.platform === "linkedin" ? "bg-[#0A66C2]" : "bg-[#1DA1F2]"
                              )} />
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      {item.platform === "linkedin" ? (
                                        <Badge variant="outline" className="bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20">
                                          <Linkedin size={12} className="mr-1" /> LinkedIn
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline" className="bg-[#1DA1F2]/10 text-[#1DA1F2] border-[#1DA1F2]/20">
                                          <Twitter size={12} className="mr-1" /> Twitter
                                        </Badge>
                                      )}
                                      <Badge variant="outline">
                                        {item.type}
                                      </Badge>
                                      <Badge variant={item.status === "scheduled" ? "outline" : "secondary"}>
                                        {item.status}
                                      </Badge>
                                    </div>
                                    <h3 className="font-medium text-base mb-1">{item.title}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground gap-3">
                                      <span className="flex items-center gap-1">
                                        <CalendarIconOutline size={14} />
                                        {new Date(item.scheduledDate).toLocaleDateString()}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Clock size={14} />
                                        {new Date(item.scheduledDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <BarChart2 size={14} />
                                        {item.engagementPrediction}% engagement
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <Button variant="ghost" size="icon">
                                      <FileEdit size={16} />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal size={16} />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {item.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      <Hash size={10} className="mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12">
                            <CalendarIconOutline className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-medium mb-2">No content scheduled</h3>
                            <p className="text-muted-foreground text-center max-w-md mb-6">
                              You don't have any content scheduled for the selected platform.
                            </p>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button>Create Content</Button>
                              </DialogTrigger>
                              <DialogContent>
                                {/* Content creation form */}
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimal Posting Times</CardTitle>
                    <CardDescription>When your audience is most active</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bestPostingTimes.map((dayData) => (
                        <div key={dayData.day} className="flex items-start gap-3">
                          <div className="min-w-[100px] font-medium">{dayData.day}</div>
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-1 mb-1">
                              {dayData.times.map((time) => (
                                <Badge 
                                  key={time} 
                                  className={cn(
                                    "bg-background",
                                    dayData.audienceActivity === "very-high" && "border-green-500 text-green-700",
                                    dayData.audienceActivity === "high" && "border-blue-500 text-blue-700",
                                    dayData.audienceActivity === "medium" && "border-amber-500 text-amber-700",
                                    dayData.audienceActivity === "low" && "border-gray-500 text-gray-700"
                                  )}
                                  variant="outline"
                                >
                                  <Clock size={10} className="mr-1" />
                                  {time}
                                </Badge>
                              ))}
                            </div>
                            <div className={cn(
                              "h-1.5 rounded-full",
                              dayData.audienceActivity === "very-high" && "bg-green-500",
                              dayData.audienceActivity === "high" && "bg-blue-500",
                              dayData.audienceActivity === "medium" && "bg-amber-500",
                              dayData.audienceActivity === "low" && "bg-gray-300"
                            )} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <BarChart2 size={16} />
                      <span>View Detailed Analytics</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Ideas</CardTitle>
                    <CardDescription>AI-generated post suggestions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md bg-background">
                        <div className="font-medium mb-1">Industry Insight</div>
                        <p className="text-sm text-muted-foreground">
                          Share your perspective on recent changes in the [industry] and how they impact [target audience].
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Plus size={14} />
                            <span>Use</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-background">
                        <div className="font-medium mb-1">Client Success Story</div>
                        <p className="text-sm text-muted-foreground">
                          Highlight a recent client success story focusing on the challenges they overcame with your solution.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Plus size={14} />
                            <span>Use</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-background">
                        <div className="font-medium mb-1">Team Spotlight</div>
                        <p className="text-sm text-muted-foreground">
                          Feature a team member and their expertise, showing the human side of your business.
                        </p>
                        <div className="flex justify-end mt-2">
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Plus size={14} />
                            <span>Use</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <FileText size={16} />
                      <span>Get More Ideas</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>Recent engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Average Engagement</div>
                        <div className="font-medium">8.4%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Top Platform</div>
                        <div className="font-medium flex items-center gap-1">
                          <Linkedin size={14} />
                          <span>LinkedIn</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Best Content Type</div>
                        <div className="font-medium">Article</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">Best Posting Day</div>
                        <div className="font-medium">Tuesday</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 gap-2">
                      <Eye size={16} />
                      <span>View Full Report</span>
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

export default ContentCalendar;
