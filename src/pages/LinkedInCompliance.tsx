
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronRight, 
  Shield, 
  Clock, 
  Settings, 
  BarChart2, 
  AlertTriangle,
  Check,
  Info,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LinkedInCompliance = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("limits");
  const [dailyConnectionsLimit, setDailyConnectionsLimit] = useState<number>(20);
  const [dailyMessagesLimit, setDailyMessagesLimit] = useState<number>(25);
  const [dailyPostsLimit, setDailyPostsLimit] = useState<number>(3);
  const [activityPattern, setActivityPattern] = useState<string>("business-hours");
  
  // Usage metrics (in a real app, these would come from an API)
  const [connectionsUsed, setConnectionsUsed] = useState<number>(7);
  const [messagesUsed, setMessagesUsed] = useState<number>(12);
  const [postsUsed, setPostsUsed] = useState<number>(1);
  
  // Compliance settings
  const [randomizeDelay, setRandomizeDelay] = useState<boolean>(true);
  const [humanPatternEmulation, setHumanPatternEmulation] = useState<boolean>(true);
  const [progressiveRampUp, setProgressiveRampUp] = useState<boolean>(true);
  const [weekendPause, setWeekendPause] = useState<boolean>(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your LinkedIn compliance settings have been updated",
      duration: 3000,
    });
  };
  
  const getComplianceScore = (): number => {
    let score = 0;
    
    // Rate limits factor
    const connectionRatio = dailyConnectionsLimit <= 30 ? 25 : 
                            dailyConnectionsLimit <= 50 ? 20 : 
                            dailyConnectionsLimit <= 70 ? 15 : 10;
    
    const messageRatio = dailyMessagesLimit <= 30 ? 25 : 
                          dailyMessagesLimit <= 50 ? 20 : 
                          dailyMessagesLimit <= 70 ? 15 : 10;
    
    score += connectionRatio + messageRatio;
    
    // Behavior patterns factor
    if (randomizeDelay) score += 10;
    if (humanPatternEmulation) score += 15;
    if (progressiveRampUp) score += 10;
    if (weekendPause) score += 10;
    
    return Math.min(Math.max(score, 0), 100);
  };
  
  const getComplianceLevel = (score: number): {
    level: string;
    color: string;
    description: string;
  } => {
    if (score >= 90) {
      return {
        level: "Excellent",
        color: "bg-green-500",
        description: "Your settings are fully compliant with LinkedIn's terms of service."
      };
    } else if (score >= 70) {
      return {
        level: "Good",
        color: "bg-emerald-500",
        description: "Your settings have a low risk of triggering LinkedIn's automated systems."
      };
    } else if (score >= 50) {
      return {
        level: "Moderate",
        color: "bg-amber-500",
        description: "Your settings may pose some risk. Consider adjusting your limits."
      };
    } else {
      return {
        level: "High Risk",
        color: "bg-red-500",
        description: "Your current settings have a high risk of triggering LinkedIn's automated systems."
      };
    }
  };
  
  const complianceScore = getComplianceScore();
  const complianceLevel = getComplianceLevel(complianceScore);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="font-medium text-foreground">LinkedIn Compliance</span>
            </div>
            <h1 className="text-3xl font-bold">LinkedIn-Compliant Automation</h1>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              Automate your LinkedIn engagement safely by staying within LinkedIn's terms of service and mimicking natural human behavior patterns.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{complianceLevel.level}</span>
                    <span className="text-2xl font-bold">{complianceScore}%</span>
                  </div>
                  <Progress value={complianceScore} className={cn(complianceLevel.color)} />
                  <p className="text-sm text-muted-foreground pt-1">
                    {complianceLevel.description}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-blue-500" />
                  Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Used today</span>
                    <span className="text-lg font-medium">{connectionsUsed}/{dailyConnectionsLimit}</span>
                  </div>
                  <Progress value={(connectionsUsed/dailyConnectionsLimit) * 100} className="bg-gray-200 dark:bg-gray-700" />
                  <p className="text-sm text-muted-foreground pt-1">
                    {dailyConnectionsLimit - connectionsUsed} connections remaining today
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-500" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Used today</span>
                    <span className="text-lg font-medium">{messagesUsed}/{dailyMessagesLimit}</span>
                  </div>
                  <Progress value={(messagesUsed/dailyMessagesLimit) * 100} className="bg-gray-200 dark:bg-gray-700" />
                  <p className="text-sm text-muted-foreground pt-1">
                    {dailyMessagesLimit - messagesUsed} messages remaining today
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  Activity Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current pattern</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full font-medium">
                      {activityPattern === "business-hours" ? "Business Hours" : 
                       activityPattern === "spread-evenly" ? "Spread Evenly" : 
                       activityPattern === "custom" ? "Custom" : "Natural Patterns"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-200 dark:bg-blue-900/50" style={{width: "10%"}}></div>
                      <div className="h-full bg-blue-300 dark:bg-blue-800/60" style={{width: "15%"}}></div>
                      <div className="h-full bg-blue-400 dark:bg-blue-700/70" style={{width: "20%"}}></div>
                      <div className="h-full bg-blue-500 dark:bg-blue-600/80" style={{width: "25%"}}></div>
                      <div className="h-full bg-blue-400 dark:bg-blue-700/70" style={{width: "15%"}}></div>
                      <div className="h-full bg-blue-300 dark:bg-blue-800/60" style={{width: "10%"}}></div>
                      <div className="h-full bg-blue-200 dark:bg-blue-900/50" style={{width: "5%"}}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="limits" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>Rate Limits</span>
                </TabsTrigger>
                <TabsTrigger value="patterns" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Behavior Patterns</span>
                </TabsTrigger>
                <TabsTrigger value="monitoring" className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4" />
                  <span>Monitoring</span>
                </TabsTrigger>
              </TabsList>
              
              <div className={cn(
                "px-3 py-1 rounded-full text-xs",
                mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
              )}>
                <span className="font-semibold">{mode === 'assisted' ? 'Assisted' : 'Autonomous'}</span> Mode
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TabsContent value="limits">
                <Card>
                  <CardHeader>
                    <CardTitle>Rate Limits Configuration</CardTitle>
                    <CardDescription>
                      Set safe daily limits for your LinkedIn activities to avoid triggering LinkedIn's automated detection systems.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Daily Connection Requests</label>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              dailyConnectionsLimit <= 30 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              dailyConnectionsLimit <= 50 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                              dailyConnectionsLimit <= 70 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {dailyConnectionsLimit <= 30 ? "Safe" :
                               dailyConnectionsLimit <= 50 ? "Moderate" :
                               dailyConnectionsLimit <= 70 ? "Risky" : "High Risk"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider 
                              value={[dailyConnectionsLimit]} 
                              onValueChange={(values) => setDailyConnectionsLimit(values[0])}
                              max={100}
                              step={1}
                              className="flex-grow"
                            />
                            <span className="w-12 text-center font-medium">{dailyConnectionsLimit}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            LinkedIn's unofficial limit is approximately 100 per week or ~15 per day
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Daily Messages</label>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              dailyMessagesLimit <= 30 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              dailyMessagesLimit <= 50 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                              dailyMessagesLimit <= 70 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {dailyMessagesLimit <= 30 ? "Safe" :
                               dailyMessagesLimit <= 50 ? "Moderate" :
                               dailyMessagesLimit <= 70 ? "Risky" : "High Risk"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider 
                              value={[dailyMessagesLimit]} 
                              onValueChange={(values) => setDailyMessagesLimit(values[0])}
                              max={100}
                              step={1}
                              className="flex-grow"
                            />
                            <span className="w-12 text-center font-medium">{dailyMessagesLimit}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Recommended to stay under 50 messages per day for established accounts
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium">Daily Posts</label>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-xs font-medium",
                              dailyPostsLimit <= 3 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                              dailyPostsLimit <= 5 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                              dailyPostsLimit <= 7 ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            )}>
                              {dailyPostsLimit <= 3 ? "Safe" :
                               dailyPostsLimit <= 5 ? "Moderate" :
                               dailyPostsLimit <= 7 ? "Risky" : "High Risk"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Slider 
                              value={[dailyPostsLimit]} 
                              onValueChange={(values) => setDailyPostsLimit(values[0])}
                              max={10}
                              step={1}
                              className="flex-grow"
                            />
                            <span className="w-12 text-center font-medium">{dailyPostsLimit}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            More than 3 posts per day may reduce engagement and appear spammy
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">LinkedIn Compliance Warning</h3>
                            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                              Setting excessively high limits may trigger LinkedIn's automated systems and could result in 
                              temporary restrictions or account suspension. We recommend staying well within safe limits, 
                              especially for newer accounts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveSettings}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="patterns">
                <Card>
                  <CardHeader>
                    <CardTitle>Human Behavior Patterns</CardTitle>
                    <CardDescription>
                      Configure how your automated activities should mimic natural human behavior patterns to avoid detection.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Activity Distribution Pattern</label>
                        <Select value={activityPattern} onValueChange={setActivityPattern}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity pattern" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="business-hours">Business Hours (9am-5pm)</SelectItem>
                            <SelectItem value="spread-evenly">Spread Evenly Throughout Day</SelectItem>
                            <SelectItem value="natural-patterns">Natural Human Patterns</SelectItem>
                            <SelectItem value="custom">Custom Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          "Natural Human Patterns" mimics typical LinkedIn usage with higher activity during morning, lunch, and evening hours
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Behavior Settings</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-sm">Randomize Delay Between Actions</div>
                              <div className="text-xs text-muted-foreground">Varies wait time between actions</div>
                            </div>
                            <Switch
                              checked={randomizeDelay}
                              onCheckedChange={setRandomizeDelay}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-sm">Human Pattern Emulation</div>
                              <div className="text-xs text-muted-foreground">Includes random pauses and browsing behavior</div>
                            </div>
                            <Switch
                              checked={humanPatternEmulation}
                              onCheckedChange={setHumanPatternEmulation}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-sm">Progressive Ramp-Up</div>
                              <div className="text-xs text-muted-foreground">Gradually increases activity over time</div>
                            </div>
                            <Switch
                              checked={progressiveRampUp}
                              onCheckedChange={setProgressiveRampUp}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="text-sm">Weekend Activity Pause</div>
                              <div className="text-xs text-muted-foreground">Reduces activity on weekends (more natural)</div>
                            </div>
                            <Switch
                              checked={weekendPause}
                              onCheckedChange={setWeekendPause}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Weekly Activity Distribution</h3>
                          <div className="h-48 w-full flex items-end">
                            <div className="w-full grid grid-cols-7 gap-2 h-[calc(100%-24px)]">
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '60%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Mon</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '75%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Tue</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '85%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Wed</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '70%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Thu</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '50%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Fri</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '30%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Sat</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="h-full w-full flex flex-col-reverse">
                                  <div className="w-full bg-blue-500 dark:bg-blue-600" style={{height: '20%'}}></div>
                                </div>
                                <span className="text-xs mt-2">Sun</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            This chart shows how your activity will be distributed throughout the week based on your settings.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Pattern Emulation Benefits</h3>
                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                              Mimicking natural human behavior patterns significantly reduces the risk of triggering LinkedIn's 
                              automated systems. Our algorithm introduces variability in timing, activity patterns, and browsing 
                              behavior to closely resemble authentic human interaction.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline">Reset to Default</Button>
                    <Button onClick={handleSaveSettings}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="monitoring">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Monitoring & Safety</CardTitle>
                    <CardDescription>
                      Monitor your LinkedIn activity and receive alerts for any potential compliance risks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="border border-green-100 dark:border-green-800/30">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-500" />
                              Account Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="font-medium text-green-700 dark:text-green-400">Healthy</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              No restrictions or warnings detected
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              Monitoring Status
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <span className="font-medium">Active</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Last checked: 10 minutes ago
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-500" />
                              Safety Score
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-lg">92/100</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Based on activity patterns and limits
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Recent Activity Log</h3>
                        <div className="border rounded-lg divide-y dark:divide-gray-800 overflow-hidden">
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-blue-100 rounded-full text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">10 connection requests sent</div>
                                <div className="text-xs text-muted-foreground">Spread over 3 hours with natural delays</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Today, 10:23 AM</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-blue-100 rounded-full text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">5 personalized messages sent</div>
                                <div className="text-xs text-muted-foreground">To new connections with 2-3 minute intervals</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Today, 9:45 AM</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-blue-100 rounded-full text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Daily activity report generated</div>
                                <div className="text-xs text-muted-foreground">All metrics within safe limits</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Today, 9:00 AM</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-amber-100 rounded-full text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                                <AlertTriangle className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">Connection request rate adjusted</div>
                                <div className="text-xs text-muted-foreground">Automatically slowed down to maintain safety</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Yesterday, 3:12 PM</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50">
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 bg-green-100 rounded-full text-green-700 dark:bg-green-900/50 dark:text-green-400">
                                <Check className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">LinkedIn profile engagement increased</div>
                                <div className="text-xs text-muted-foreground">+27% profile views in the last 7 days</div>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Yesterday, 11:30 AM</span>
                          </div>
                        </div>
                        <div className="flex justify-center mt-4">
                          <Button variant="outline" size="sm">View Full Activity Log</Button>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Activity Safety System</h3>
                            <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                              Our system continuously monitors your LinkedIn account for any signs of restrictions or unusual behavior. 
                              If any potential risks are detected, the system will automatically adjust your activity patterns and notify you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" size="sm">
                      Export Activity Report
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LinkedInCompliance;
