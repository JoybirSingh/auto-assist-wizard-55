
import React from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/ui/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Brain, MessageSquare, Copy, CheckSquare, FileText, Bot, Settings, Upload, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DigitalTwin = () => {
  const { toast } = useToast();
  const [writingSamples, setWritingSamples] = React.useState<string[]>([]);
  const [sampleText, setSampleText] = React.useState('');
  const [trainingProgress, setTrainingProgress] = React.useState(0);
  const [isTraining, setIsTraining] = React.useState(false);
  const [tonePreference, setTonePreference] = React.useState<number[]>([50]);
  const [creativityLevel, setCreativityLevel] = React.useState<number[]>([60]);
  const [autoLearn, setAutoLearn] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('train');
  
  const handleAddSample = () => {
    if (sampleText.trim()) {
      setWritingSamples([...writingSamples, sampleText.trim()]);
      setSampleText('');
      toast({
        title: "Writing sample added",
        description: "Your writing sample has been added to your digital twin's training data.",
      });
    }
  };
  
  const startTraining = () => {
    if (writingSamples.length < 3) {
      toast({
        title: "More samples needed",
        description: "Please add at least 3 writing samples for effective training.",
        variant: "destructive",
      });
      return;
    }
    
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: "Training complete",
            description: "Your digital twin has been updated with your writing style.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  const handleResetTwin = () => {
    setWritingSamples([]);
    setTrainingProgress(0);
    toast({
      title: "Digital twin reset",
      description: "Your digital twin has been reset. You can add new writing samples to retrain it.",
    });
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard.",
    });
  };

  const navigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
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
              <Brain className="w-8 h-8 text-purple-500" />
              Digital Twin Technology
            </h1>
            <p className="text-muted-foreground mt-2">
              Train your AI to write, comment, and respond exactly like you would
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1 bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
              Twin Status: {trainingProgress === 100 ? 'Active' : 'Needs Training'}
            </Badge>
            <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={handleResetTwin}>
              <RotateCcw className="w-4 h-4" />
              Reset Twin
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="train" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-4">
            <TabsTrigger value="train" className="flex items-center gap-1.5">
              <Brain className="w-4 h-4" />
              <span>Train</span>
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Generate</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1.5">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="train" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Train Your Digital Twin</CardTitle>
                <CardDescription>
                  Add writing samples to help your Digital Twin learn your unique style, tone, and expressions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea 
                    placeholder="Paste a sample of your writing here (LinkedIn posts, comments, articles, etc.)"
                    className="min-h-32"
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <p className="text-xs text-muted-foreground">
                      {writingSamples.length} samples added ({writingSamples.length < 3 ? `Add at least ${3 - writingSamples.length} more` : 'Ready to train'})
                    </p>
                    <Button size="sm" onClick={handleAddSample}>Add Sample</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Training Samples</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {writingSamples.length > 0 ? (
                      writingSamples.map((sample, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md text-sm">
                          {sample.length > 100 ? `${sample.substring(0, 100)}...` : sample}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 bg-muted rounded-md text-sm text-muted-foreground">
                        No samples added yet. Add your writing samples above.
                      </div>
                    )}
                  </div>
                </div>
                
                {isTraining ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Training in progress...</span>
                      <span>{Math.round(trainingProgress)}%</span>
                    </div>
                    <Progress value={trainingProgress} className="h-2" />
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    disabled={writingSamples.length < 3} 
                    onClick={startTraining}
                  >
                    {trainingProgress === 100 ? 'Retrain Model' : 'Start Training'}
                  </Button>
                )}
                
                <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 rounded-md dark:bg-blue-900/20 dark:text-blue-300">
                  <Upload className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">Import from LinkedIn</p>
                    <p className="text-blue-700 dark:text-blue-400">
                      Connect your LinkedIn account to automatically import your posts and comments for training.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="generate" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Content in Your Style</CardTitle>
                <CardDescription>
                  Create LinkedIn posts, comments, and messages that sound like you wrote them
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trainingProgress < 100 ? (
                  <div className="p-6 text-center space-y-4">
                    <Brain className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium">Train Your Digital Twin First</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Before generating content, you need to train your Digital Twin with at least 3 writing samples.
                    </p>
                    <Button onClick={() => navigateToTab('train')}>
                      Go to Training
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">What would you like to create?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="justify-start text-left">
                          <FileText className="w-4 h-4 mr-2" />
                          LinkedIn Post
                        </Button>
                        <Button variant="outline" className="justify-start text-left">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Comment
                        </Button>
                        <Button variant="outline" className="justify-start text-left">
                          <Bot className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="justify-start text-left">
                          <CheckSquare className="w-4 h-4 mr-2" />
                          Custom
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content Topic/Brief</label>
                      <Textarea 
                        placeholder="Describe what you want to write about (e.g., 'A post about the future of AI in marketing')"
                        className="min-h-20"
                      />
                    </div>
                    
                    <Button className="w-full">Generate Content</Button>
                    
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Generated Output</h4>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard("Sample generated content would appear here.")}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="p-3 bg-muted rounded-md text-sm">
                        Sample generated content would appear here.
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">Regenerate</Button>
                        <Button size="sm" className="flex-1">Use This</Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Twin Settings</CardTitle>
                <CardDescription>
                  Customize how your Digital Twin learns and generates content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Content Tone</label>
                    <span className="text-xs text-muted-foreground">
                      {tonePreference[0] < 33 ? 'More Formal' : tonePreference[0] > 66 ? 'More Casual' : 'Balanced'}
                    </span>
                  </div>
                  <Slider
                    value={tonePreference}
                    onValueChange={setTonePreference}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Formal</span>
                    <span>Balanced</span>
                    <span>Casual</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Creativity Level</label>
                    <span className="text-xs text-muted-foreground">
                      {creativityLevel[0] < 33 ? 'More Conservative' : creativityLevel[0] > 66 ? 'More Creative' : 'Balanced'}
                    </span>
                  </div>
                  <Slider
                    value={creativityLevel}
                    onValueChange={setCreativityLevel}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Continuous Learning</label>
                      <p className="text-xs text-muted-foreground">Automatically learn from your new content</p>
                    </div>
                    <Switch checked={autoLearn} onCheckedChange={setAutoLearn} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Advanced Analytics</label>
                      <p className="text-xs text-muted-foreground">Track performance of twin-generated content</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">Style Preservation</label>
                      <p className="text-xs text-muted-foreground">Strictly adhere to your writing style</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default DigitalTwin;
