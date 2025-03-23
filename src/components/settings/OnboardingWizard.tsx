
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Link, 
  Settings, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Linkedin,
  FileText,
  Target,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/ModeContext';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const steps = [
  "Connect",
  "Objective",
  "Style",
  "Topics",
  "Schedule",
  "Complete"
];

const OnboardingWizard = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [automatedCommenting, setAutomatedCommenting] = useState(true);
  const [objective, setObjective] = useState("networking");
  const [writingStyle, setWritingStyle] = useState("professional");
  const [topicTags, setTopicTags] = useState<string[]>(["tech", "ai", "product"]);
  const [sampleText, setSampleText] = useState("");
  
  const progress = Math.round((currentStep / (steps.length - 1)) * 100);
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStep === 0 && !isLinkedInConnected) {
      toast({
        title: "LinkedIn Not Connected",
        description: "Please connect your LinkedIn account to continue.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    
    if (currentStep === steps.length - 2) {
      toast({
        title: "Setup Complete!",
        description: "Your LinkedIn automation is now ready to go.",
        duration: 3000,
      });
    }
  };
  
  const handleConnectLinkedIn = () => {
    setIsLinkedInConnected(true);
    toast({
      title: "LinkedIn Connected",
      description: "Your LinkedIn account has been successfully connected.",
      duration: 3000,
    });
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !topicTags.includes(newTag)) {
        setTopicTags([...topicTags, newTag]);
        e.currentTarget.value = '';
      }
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTopicTags(topicTags.filter(t => t !== tag));
  };
  
  return (
    <motion.div
      className="glass-card rounded-xl p-6 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Settings className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-medium">LinkedIn Growth Setup</h2>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Setup Progress</h3>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex mb-8 border-b dark:border-gray-800">
        {steps.map((step, index) => (
          <div
            key={step}
            className={cn(
              "pb-2 px-4 text-center border-b-2 text-sm font-medium transition-colors flex-1",
              currentStep === index 
                ? "border-primary text-primary" 
                : index < currentStep 
                  ? "border-green-500 text-green-500" 
                  : "border-transparent text-muted-foreground"
            )}
          >
            <div className="hidden md:block">{step}</div>
            <div className="md:hidden">{index + 1}</div>
          </div>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[300px]"
        >
          {currentStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Connect Your LinkedIn Account</h3>
              <p className="text-muted-foreground">
                We need access to your LinkedIn account to automate your networking and engagement.
              </p>
              
              <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">Connect your professional profile</p>
                    </div>
                  </div>
                  
                  {isLinkedInConnected ? (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Connected
                      </Badge>
                      <Button variant="outline" size="sm">Disconnect</Button>
                    </div>
                  ) : (
                    <Button onClick={handleConnectLinkedIn}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={automatedCommenting} 
                    onCheckedChange={setAutomatedCommenting}
                  />
                  <div>
                    <h4 className="text-sm font-medium">Enable automated commenting</h4>
                    <p className="text-xs text-muted-foreground">
                      Allow AI to engage with your network automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Set Your LinkedIn Objective</h3>
              <p className="text-muted-foreground">
                What's your primary goal? This helps us tailor our AI engagement strategy.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "networking",
                    title: "Grow my network",
                    description: "Connect with more relevant professionals",
                    icon: <User className="w-5 h-5" />
                  },
                  {
                    id: "visibility",
                    title: "Increase visibility",
                    description: "Get more profile and content views",
                    icon: <Target className="w-5 h-5" />
                  },
                  {
                    id: "engagement",
                    title: "Boost engagement",
                    description: "Get more reactions and comments",
                    icon: <MessageSquare className="w-5 h-5" />
                  },
                  {
                    id: "leads",
                    title: "Generate leads",
                    description: "Find potential clients or customers",
                    icon: <Link className="w-5 h-5" />
                  }
                ].map((obj) => (
                  <button
                    key={obj.id}
                    className={cn(
                      "p-4 border rounded-lg text-left transition-all duration-200",
                      objective === obj.id 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                    )}
                    onClick={() => setObjective(obj.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={cn(
                        "p-2 rounded-full",
                        mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                      )}>
                        {obj.icon}
                      </div>
                      {objective === obj.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <h4 className="font-medium">{obj.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{obj.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Customize Your Writing Style</h3>
              <p className="text-muted-foreground">
                How would you like our AI to represent you in comments and messages?
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "professional",
                    title: "Professional",
                    description: "Formal and business-appropriate"
                  },
                  {
                    id: "casual",
                    title: "Casual",
                    description: "Friendly and conversational"
                  },
                  {
                    id: "enthusiastic",
                    title: "Enthusiastic",
                    description: "Energetic and positive"
                  },
                  {
                    id: "analytical",
                    title: "Analytical",
                    description: "Data-driven and insightful"
                  },
                  {
                    id: "supportive",
                    title: "Supportive",
                    description: "Encouraging and helpful"
                  },
                  {
                    id: "authoritative",
                    title: "Authoritative",
                    description: "Expert and confident"
                  }
                ].map((style) => (
                  <button
                    key={style.id}
                    className={cn(
                      "p-4 border rounded-lg text-left transition-all duration-200",
                      writingStyle === style.id 
                        ? "border-primary bg-primary/5" 
                        : "border-gray-200 hover:border-gray-300 dark:border-gray-800 dark:hover:border-gray-700"
                    )}
                    onClick={() => setWritingStyle(style.id)}
                  >
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{style.title}</h4>
                      {writingStyle === style.id && <CheckCircle2 className="w-4 h-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </button>
                ))}
              </div>
              
              <div className="pt-4">
                <label className="block text-sm font-medium mb-2">
                  Provide a writing sample (optional)
                </label>
                <Textarea
                  placeholder="Paste a sample of your writing to help our AI mimic your style..."
                  className="min-h-20"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This helps our AI better match your unique voice and tone
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Select Your Topics of Interest</h3>
              <p className="text-muted-foreground">
                What topics should we focus on for content and engagement?
              </p>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Add topics (press Enter after each)
                </label>
                <Input
                  placeholder="Add a topic tag..."
                  onKeyDown={handleAddTag}
                />
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {topicTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="py-1.5 px-3 flex items-center gap-1 bg-primary/10 hover:bg-primary/20"
                    >
                      {tag}
                      <button 
                        className="ml-1 hover:text-primary"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  
                  {topicTags.length === 0 && (
                    <p className="text-sm text-muted-foreground italic">
                      No topics added yet. Add some topics to improve engagement relevance.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="border-t dark:border-gray-800 pt-4 mt-6">
                <h4 className="text-sm font-medium mb-3">Popular topic suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {["artificial intelligence", "leadership", "marketing", "remote work", "entrepreneurship", "design"].map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => !topicTags.includes(tag) && setTopicTags([...topicTags, tag])}
                      disabled={topicTags.includes(tag)}
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Set Your Engagement Schedule</h3>
              <p className="text-muted-foreground">
                When should our AI engage with your network?
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Activity frequency</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: "low",
                        title: "Low",
                        description: "5-10 engagements per day"
                      },
                      {
                        id: "medium",
                        title: "Medium",
                        description: "10-20 engagements per day"
                      },
                      {
                        id: "high",
                        title: "High",
                        description: "20-30 engagements per day"
                      }
                    ].map((freq) => (
                      <div
                        key={freq.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            id={freq.id} 
                            name="frequency" 
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                            defaultChecked={freq.id === "medium"}
                          />
                          <label htmlFor={freq.id} className="font-medium">
                            {freq.title}
                          </label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">
                          {freq.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Preferred time of day</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: "morning",
                        title: "Morning",
                        time: "7:00 AM - 11:00 AM"
                      },
                      {
                        id: "afternoon",
                        title: "Afternoon",
                        time: "12:00 PM - 4:00 PM"
                      },
                      {
                        id: "evening",
                        title: "Evening",
                        time: "5:00 PM - 9:00 PM"
                      },
                      {
                        id: "spread",
                        title: "Spread throughout the day",
                        time: "All day engagement"
                      }
                    ].map((time) => (
                      <div
                        key={time.id}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            id={time.id} 
                            name="timing" 
                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                            defaultChecked={time.id === "spread"}
                          />
                          <label htmlFor={time.id} className="font-medium">
                            {time.title}
                          </label>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">
                          {time.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              
              <h3 className="text-lg font-medium">Setup Complete!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your LinkedIn automation is now configured. You can change these settings at any time from your dashboard.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-lg mx-auto">
                <div className="border rounded-lg p-4 text-left">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Write Your First Post
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use our AI to create engaging LinkedIn content
                  </p>
                </div>
                
                <div className="border rounded-lg p-4 text-left">
                  <h4 className="font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Find New Leads
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discover potential connections based on your interests
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-8 pt-6 border-t dark:border-gray-800">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={cn(currentStep === 0 && "invisible")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={currentStep === 0 && !isLinkedInConnected}
        >
          {currentStep < steps.length - 1 ? (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default OnboardingWizard;
