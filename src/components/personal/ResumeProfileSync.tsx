
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Link2, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Upload,
  Download,
  RefreshCw,
  CheckCircle2,
  Clock,
  Zap,
  FileImage,
  Pencil,
  PlusCircle,
  Copy
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useMode } from '@/context/ModeContext';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SyncItem {
  id: string;
  section: string;
  linkedInContent: string;
  resumeContent: string;
  status: 'synced' | 'conflict' | 'missing';
  recommendation: string;
}

const ResumeProfileSync = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [autoSync, setAutoSync] = useState(false);
  
  const syncItems: SyncItem[] = [
    {
      id: '1',
      section: 'Experience: Product Marketing at TechCorp',
      linkedInContent: 'Led product marketing initiatives for enterprise SaaS platform, increasing user acquisition by 37% YoY.',
      resumeContent: 'Managed product marketing for enterprise software solutions.',
      status: 'conflict',
      recommendation: 'Update resume with specific metrics from LinkedIn (37% YoY growth).'
    },
    {
      id: '2',
      section: 'Skills: Data Analysis',
      linkedInContent: 'Data Analysis with 7 endorsements',
      resumeContent: 'Advanced Data Analysis and Visualization',
      status: 'synced',
      recommendation: 'Content is aligned between platforms.'
    },
    {
      id: '3',
      section: 'Education: MBA, Harvard Business School',
      linkedInContent: 'MBA, Harvard Business School, 2018-2020, GPA: 3.8',
      resumeContent: 'MBA, Harvard Business School',
      status: 'conflict',
      recommendation: 'Add graduation year and GPA to resume for consistency.'
    },
    {
      id: '4',
      section: 'Certifications: Google Analytics',
      linkedInContent: 'Google Analytics Certification, 2021',
      resumeContent: '',
      status: 'missing',
      recommendation: 'Add Google Analytics Certification to resume.'
    },
    {
      id: '5',
      section: 'Experience: Marketing Intern at StartupX',
      linkedInContent: '',
      resumeContent: 'Marketing Intern at StartupX, Summer 2017',
      status: 'missing',
      recommendation: 'Add this experience to LinkedIn for a complete profile.'
    }
  ];
  
  const handleUploadResume = () => {
    setResumeUploaded(true);
    toast({
      title: "Resume uploaded successfully",
      description: "We're analyzing your resume to compare with your LinkedIn profile.",
      duration: 3000,
    });
    
    // Simulate analysis progress
    setSyncInProgress(true);
    setSyncPercentage(0);
    
    const interval = setInterval(() => {
      setSyncPercentage(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncInProgress(false);
          setActiveTab('comparison');
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };
  
  const handleSyncItemAction = (id: string) => {
    toast({
      title: "Change applied",
      description: "The recommended update has been applied successfully.",
      duration: 3000,
    });
  };
  
  const handleToggleAutoSync = () => {
    setAutoSync(!autoSync);
    toast({
      title: autoSync ? "Auto-sync disabled" : "Auto-sync enabled",
      description: autoSync 
        ? "Automatic synchronization has been turned off." 
        : "Your LinkedIn profile and resume will now stay in sync automatically.",
      duration: 3000,
    });
  };
  
  const handleExportResume = () => {
    toast({
      title: "Resume exported",
      description: "Your synchronized resume has been generated and downloaded.",
      duration: 3000,
    });
  };
  
  const calculateSyncStats = () => {
    const total = syncItems.length;
    const synced = syncItems.filter(item => item.status === 'synced').length;
    const conflicts = syncItems.filter(item => item.status === 'conflict').length;
    const missing = syncItems.filter(item => item.status === 'missing').length;
    
    return {
      syncPercentage: Math.round((synced / total) * 100),
      total,
      synced,
      conflicts,
      missing
    };
  };
  
  const stats = calculateSyncStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Resume-LinkedIn Sync</h2>
          <p className="text-muted-foreground">Keep your resume and LinkedIn profile consistent</p>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Link2 className="w-6 h-6" />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="templates">Resume Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Synchronization</CardTitle>
                  <CardDescription>
                    Upload your resume to compare with your LinkedIn profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!resumeUploaded ? (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
                      <div className="p-3 bg-muted rounded-full mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Upload Your Resume</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                        Supported formats: PDF, DOCX, RTF. We'll analyze your resume and compare it with your LinkedIn profile.
                      </p>
                      <div className="flex gap-3">
                        <Button className="gap-2" onClick={handleUploadResume}>
                          <Upload className="w-4 h-4" />
                          <span>Upload Resume</span>
                        </Button>
                        <Button variant="outline">Browse Templates</Button>
                      </div>
                    </div>
                  ) : syncInProgress ? (
                    <div className="py-8 space-y-6">
                      <div className="flex flex-col items-center justify-center">
                        <div className="p-3 bg-blue-100 text-blue-700 rounded-full mb-4 dark:bg-blue-900/30 dark:text-blue-400">
                          <RefreshCw className="w-8 h-8 animate-spin" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Analyzing Your Documents</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
                          We're comparing your resume with your LinkedIn profile to identify inconsistencies.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span>Analysis in progress...</span>
                          <span>{syncPercentage}%</span>
                        </div>
                        <Progress value={syncPercentage} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Extracting data</span>
                          <span>Comparing content</span>
                          <span>Generating recommendations</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold">{stats.syncPercentage}%</div>
                          <div className="text-sm text-muted-foreground">Sync Rate</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold">{stats.conflicts}</div>
                          <div className="text-sm text-muted-foreground">Conflicts Found</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg text-center">
                          <div className="text-3xl font-bold">{stats.missing}</div>
                          <div className="text-sm text-muted-foreground">Missing Items</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between px-4 py-3 bg-amber-50 border border-amber-100 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          <div>
                            <h4 className="font-medium text-amber-800 dark:text-amber-300">Action Needed</h4>
                            <p className="text-sm text-amber-700 dark:text-amber-400">Your LinkedIn profile and resume have inconsistencies</p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => setActiveTab('comparison')}>
                          View Details
                        </Button>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-base font-medium">Recent Activity</h3>
                          <Badge variant="outline">Last 7 days</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 pb-3 border-b">
                            <div className="p-2 rounded-full bg-green-100 text-green-700 mt-0.5 dark:bg-green-900/20 dark:text-green-400">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">LinkedIn profile updated</h4>
                              <p className="text-xs text-muted-foreground">A new certification was added to your LinkedIn profile</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">Certification</Badge>
                                <span className="text-xs text-muted-foreground">2 days ago</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-full bg-blue-100 text-blue-700 mt-0.5 dark:bg-blue-900/20 dark:text-blue-400">
                              <Clock className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Resume last updated</h4>
                              <p className="text-xs text-muted-foreground">Your resume was last modified 14 days ago</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">Resume</Badge>
                                <span className="text-xs text-muted-foreground">14 days ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                {resumeUploaded && !syncInProgress && (
                  <CardFooter className="border-t pt-6 gap-3">
                    <Button className="gap-2" onClick={() => setActiveTab('comparison')}>
                      <RefreshCw className="w-4 h-4" />
                      <span>Rescan Documents</span>
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handleExportResume}>
                      <Download className="w-4 h-4" />
                      <span>Export Updated Resume</span>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Sync Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">Automatic Synchronization</div>
                        <div className="text-xs text-muted-foreground">Keep documents in sync automatically</div>
                      </div>
                      <Switch checked={autoSync} onCheckedChange={handleToggleAutoSync} />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Sync Direction</div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="bidirectional" name="syncDirection" className="form-radio" defaultChecked />
                          <label htmlFor="bidirectional" className="text-sm">Bidirectional (Both ways)</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="linkedinToResume" name="syncDirection" className="form-radio" />
                          <label htmlFor="linkedinToResume" className="text-sm">LinkedIn to Resume</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="resumeToLinkedin" name="syncDirection" className="form-radio" />
                          <label htmlFor="resumeToLinkedin" className="text-sm">Resume to LinkedIn</label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="text-sm font-medium">What to Synchronize</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncExperience" className="form-checkbox" defaultChecked />
                          <label htmlFor="syncExperience" className="text-xs">Experience</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncEducation" className="form-checkbox" defaultChecked />
                          <label htmlFor="syncEducation" className="text-xs">Education</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncSkills" className="form-checkbox" defaultChecked />
                          <label htmlFor="syncSkills" className="text-xs">Skills</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncCertifications" className="form-checkbox" defaultChecked />
                          <label htmlFor="syncCertifications" className="text-xs">Certifications</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncProjects" className="form-checkbox" defaultChecked />
                          <label htmlFor="syncProjects" className="text-xs">Projects</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="syncSummary" className="form-checkbox" />
                          <label htmlFor="syncSummary" className="text-xs">Summary</label>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Advanced Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Content Comparison</CardTitle>
                  <CardDescription>
                    See differences between your LinkedIn profile and resume
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Sync status: </span>
                    <span className="font-medium">{stats.syncPercentage}% aligned</span>
                  </div>
                  <Button size="sm" className="gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Sync All</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {syncItems.map((item) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "border rounded-lg p-4",
                      item.status === 'synced' ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10" : 
                      item.status === 'conflict' ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/10" : 
                      "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "p-1.5 rounded-full",
                          item.status === 'synced' ? "bg-green-100 text-green-700 dark:bg-green-800/40 dark:text-green-400" : 
                          item.status === 'conflict' ? "bg-amber-100 text-amber-700 dark:bg-amber-800/40 dark:text-amber-400" : 
                          "bg-red-100 text-red-700 dark:bg-red-800/40 dark:text-red-400"
                        )}>
                          {item.status === 'synced' ? <CheckCircle className="w-4 h-4" /> : 
                           item.status === 'conflict' ? <AlertTriangle className="w-4 h-4" /> : 
                           <XCircle className="w-4 h-4" />}
                        </div>
                        <h3 className="font-medium">{item.section}</h3>
                      </div>
                      <Badge variant={
                        item.status === 'synced' ? "outline" : 
                        item.status === 'conflict' ? "secondary" : 
                        "destructive"
                      }>
                        {item.status === 'synced' ? "Synced" : 
                         item.status === 'conflict' ? "Conflict" : 
                         "Missing"}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-medium">LinkedIn Content</h4>
                          <Badge variant="outline" className="text-[10px] h-4">Source</Badge>
                        </div>
                        <div className={cn(
                          "text-sm p-2 rounded border",
                          item.linkedInContent ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50 text-muted-foreground italic"
                        )}>
                          {item.linkedInContent || "No content found"}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-medium">Resume Content</h4>
                          <Badge variant="outline" className="text-[10px] h-4">Target</Badge>
                        </div>
                        <div className={cn(
                          "text-sm p-2 rounded border",
                          item.resumeContent ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50 text-muted-foreground italic"
                        )}>
                          {item.resumeContent || "No content found"}
                        </div>
                      </div>
                    </div>
                    
                    {item.status !== 'synced' && (
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-blue-600 mt-0.5 dark:text-blue-400" />
                            <p className="text-sm">{item.recommendation}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleSyncItemAction(item.id)}>
                            Apply Change
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Comparison</span>
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2" onClick={handleExportResume}>
                  <Download className="w-4 h-4" />
                  <span>Export Resume</span>
                </Button>
                <Button className="gap-2">
                  <Zap className="w-4 h-4" />
                  <span>Sync All Content</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Professional Template</CardTitle>
                <CardDescription>
                  Clean and formal design for corporate environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>ATS-optimized layout</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Perfect for finance, law, consulting</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Creative Template</CardTitle>
                    <CardDescription>
                      Modern design for creative professionals
                    </CardDescription>
                  </div>
                  <Badge>Popular</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Visually distinctive layout</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Great for design, marketing, media</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-10 h-10 text-gray-400" />
                </div>
              </div>
              <CardHeader>
                <CardTitle>Technical Template</CardTitle>
                <CardDescription>
                  Optimized for technical and IT professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Skills-focused layout</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                    <span>Perfect for tech, development, IT</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Use Template</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Custom Template</CardTitle>
                <CardDescription>
                  Create your own custom resume template
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="p-3 rounded-full border border-dashed mb-4">
                  <Pencil className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground text-center max-w-xs mb-4">
                  Design a custom template that matches your personal brand and career goals
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Custom</span>
                </Button>
              </CardFooter>
            </Card>
            
            <Dialog>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:border-primary transition-colors overflow-hidden">
                  <div className="aspect-video relative bg-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-primary/10">
                        <Copy className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>LinkedIn-Matching Template</CardTitle>
                    <CardDescription>
                      Resume design that perfectly mirrors your LinkedIn profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span>Automatically syncs with LinkedIn</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                        <span>Perfect content/brand consistency</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="default">
                      Preview Template
                    </Button>
                  </CardFooter>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>LinkedIn-Matching Template</DialogTitle>
                  <DialogDescription>
                    This template automatically syncs with your LinkedIn profile for perfect consistency.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 h-[400px] overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                        <div>
                          <h3 className="text-lg font-bold">John Doe</h3>
                          <p className="text-sm text-muted-foreground">Senior Product Marketing Manager</p>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Summary</h4>
                        <p className="text-sm">
                          Marketing professional with 10+ years of experience in SaaS product marketing, 
                          content strategy, and team leadership. Driven by data-backed decisions and 
                          growth-focused initiatives.
                        </p>
                      </div>
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Experience</h4>
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium">Product Marketing Manager at TechCorp</h5>
                            <p className="text-xs text-muted-foreground">2018 - Present</p>
                            <ul className="text-sm mt-1 list-disc pl-4 space-y-1">
                              <li>Led product marketing initiatives for enterprise SaaS platform</li>
                              <li>Increased user acquisition by 37% YoY</li>
                              <li>Managed a team of 5 marketing specialists</li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium">Marketing Specialist at GrowthCo</h5>
                            <p className="text-xs text-muted-foreground">2015 - 2018</p>
                            <ul className="text-sm mt-1 list-disc pl-4 space-y-1">
                              <li>Developed content strategy for B2B software products</li>
                              <li>Conducted market research and competitor analysis</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="border-t pt-3">
                        <h4 className="text-sm font-semibold uppercase text-muted-foreground mb-2">Education</h4>
                        <div>
                          <h5 className="font-medium">MBA, Harvard Business School</h5>
                          <p className="text-xs text-muted-foreground">2018-2020, GPA: 3.8</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Template Features</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Automatic synchronization with LinkedIn profile</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>ATS-optimized layout for maximum readability</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Professionally designed typography and spacing</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Color scheme customization options</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                          <span>Multiple export formats (PDF, DOCX, HTML)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">Color Scheme</h3>
                      <div className="flex gap-2">
                        <button className="w-6 h-6 rounded-full bg-blue-500 ring-2 ring-offset-2 ring-blue-500"></button>
                        <button className="w-6 h-6 rounded-full bg-green-500"></button>
                        <button className="w-6 h-6 rounded-full bg-purple-500"></button>
                        <button className="w-6 h-6 rounded-full bg-rose-500"></button>
                        <button className="w-6 h-6 rounded-full bg-amber-500"></button>
                        <button className="w-6 h-6 rounded-full bg-gray-700"></button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Use This Template</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeProfileSync;
