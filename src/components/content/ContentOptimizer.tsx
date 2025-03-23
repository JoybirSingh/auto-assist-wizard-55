
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Users, 
  Edit, 
  CheckCircle2, 
  MessageSquare,
  FileBarChart,
  Sparkles,
  Lightbulb,
  AlertCircle,
  Clock,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentSuggestion {
  id: string;
  title: string;
  description: string;
  estimatedEngagement: number;
  targetAudience: string[];
  topics: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ContentAnalysis {
  id: string;
  content: string;
  score: number;
  engagement: number;
  readability: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
  suggestions: {
    type: 'improvement' | 'warning' | 'idea';
    text: string;
  }[];
  audienceMatch: number;
}

// Mock data for demonstration
const mockSuggestions: ContentSuggestion[] = [
  {
    id: '1',
    title: 'Top 5 LinkedIn Growth Strategies for 2023',
    description: 'A deep dive into proven strategies that are driving LinkedIn growth this year with practical examples.',
    estimatedEngagement: 87,
    targetAudience: ['Marketing Professionals', 'Social Media Managers', 'Business Owners'],
    topics: ['LinkedIn', 'Social Media Growth', 'Content Strategy'],
    difficulty: 'medium',
  },
  {
    id: '2',
    title: 'How AI is Transforming the Future of Work',
    description: 'Explore the impact of artificial intelligence on workflows, productivity, and job roles.',
    estimatedEngagement: 92,
    targetAudience: ['Tech Leaders', 'Business Executives', 'HR Professionals'],
    topics: ['AI', 'Future of Work', 'Technology Trends'],
    difficulty: 'medium',
  },
  {
    id: '3',
    title: 'Building an Authentic Personal Brand on LinkedIn',
    description: 'Practical steps to develop a personal brand that resonates with your target audience while staying true to your values.',
    estimatedEngagement: 84,
    targetAudience: ['Entrepreneurs', 'Job Seekers', 'Career Changers'],
    topics: ['Personal Branding', 'LinkedIn', 'Career Development'],
    difficulty: 'easy',
  },
];

const ContentOptimizer = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('analyzer');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ContentAnalysis | null>(null);
  const [suggestions] = useState<ContentSuggestion[]>(mockSuggestions);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [audience, setAudience] = useState<string>('');

  const analyzeContent = () => {
    if (!content.trim()) {
      toast({
        title: "Empty content",
        description: "Please enter some content to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Generate mock analysis result
      const mockAnalysis: ContentAnalysis = {
        id: `analysis-${Date.now()}`,
        content: content,
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        engagement: Math.floor(Math.random() * 40) + 60, // 60-100
        readability: Math.floor(Math.random() * 30) + 70, // 70-100
        sentiment: Math.random() > 0.6 ? 'positive' : (Math.random() > 0.5 ? 'neutral' : 'negative'),
        keywords: extractKeywords(content),
        suggestions: generateSuggestions(content),
        audienceMatch: Math.floor(Math.random() * 30) + 70, // 70-100
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your content has been analyzed successfully",
      });
    }, 2000);
  };

  const extractKeywords = (text: string): string[] => {
    // This is a simplified mock implementation
    const commonWords = ['the', 'and', 'a', 'to', 'of', 'in', 'that', 'is', 'it', 'for', 'with'];
    const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
    
    // Filter out common words and count occurrences
    const wordCounts = words.filter(word => 
      !commonWords.includes(word) && word.length > 3
    ).reduce((acc: {[key: string]: number}, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
    
    // Sort by frequency and take top 5
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  };

  const generateSuggestions = (text: string): ContentAnalysis['suggestions'] => {
    const suggestions: ContentAnalysis['suggestions'] = [];
    
    // Add some mock suggestions based on content length
    if (text.length < 200) {
      suggestions.push({
        type: 'warning',
        text: 'Your content is quite short. LinkedIn posts with 1000-2000 characters tend to perform better.'
      });
    }
    
    // Add suggestion about questions
    if (!text.includes('?')) {
      suggestions.push({
        type: 'improvement',
        text: 'Consider adding a question to engage your audience and encourage comments.'
      });
    }
    
    // Add suggestion about hashtags
    if (!text.includes('#')) {
      suggestions.push({
        type: 'improvement',
        text: 'Adding 3-5 relevant hashtags can increase your post visibility.'
      });
    }
    
    // Add a generic idea suggestion
    suggestions.push({
      type: 'idea',
      text: 'Try including a specific call to action at the end of your post to boost engagement.'
    });
    
    return suggestions;
  };

  const handleGenerateContent = (suggestion: ContentSuggestion) => {
    // In a real implementation, this would generate content based on the suggestion
    // For this demo, we'll just set a placeholder
    setContent(`# ${suggestion.title}\n\nThis is a generated draft for the topic: ${suggestion.title}.\n\nKey points to address:\n- Main benefits of this approach\n- Real-world examples\n- How to implement these strategies\n- Common mistakes to avoid\n\nTarget audience: ${suggestion.targetAudience.join(', ')}\n\nDon't forget to add industry-specific insights and personal experiences to make this content more authentic and engaging.`);
    
    setActiveTab('analyzer');
    
    toast({
      title: "Content draft generated",
      description: "A draft has been created based on the selected suggestion",
    });
  };

  const getSentimentColor = (sentiment: ContentAnalysis['sentiment']) => {
    switch(sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-amber-500';
    }
  };

  const getSentimentIcon = (sentiment: ContentAnalysis['sentiment']) => {
    switch(sentiment) {
      case 'positive': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'negative': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <MessageSquare className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Optimization</h2>
        <p className="text-muted-foreground">Analyze and optimize your LinkedIn content for maximum engagement</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="analyzer">Content Analyzer</TabsTrigger>
          <TabsTrigger value="suggestions">Content Suggestions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analyzer" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Content Analyzer</CardTitle>
                  <CardDescription>
                    Paste your LinkedIn post or article to analyze its performance potential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="content">Your Content</Label>
                      <Textarea 
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Paste or write your LinkedIn content here..."
                        className="h-[250px] font-mono"
                      />
                    </div>
                    <Button 
                      onClick={analyzeContent}
                      disabled={isAnalyzing || !content.trim()}
                      className="w-full"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Content'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Audience Targeting</CardTitle>
                  <CardDescription>
                    Specify your target audience for more accurate analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Input
                        id="audience"
                        value={audience}
                        onChange={(e) => setAudience(e.target.value)}
                        placeholder="e.g., Marketing Professionals"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Who is this content primarily for?
                      </p>
                    </div>
                    
                    <div>
                      <Label>Content Topics</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['LinkedIn', 'Marketing', 'Personal Branding', 'Career', 'Leadership', 'Technology', 'AI', 'Business'].map(topic => (
                          <Badge 
                            key={topic}
                            variant={selectedTopics.includes(topic) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              if (selectedTopics.includes(topic)) {
                                setSelectedTopics(selectedTopics.filter(t => t !== topic));
                              } else {
                                setSelectedTopics([...selectedTopics, topic]);
                              }
                            }}
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Content Analysis Results
                  </CardTitle>
                  <CardDescription>
                    Based on patterns from high-performing LinkedIn content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Overall Score</Label>
                        <span className="font-semibold text-lg">{analysisResult.score}%</span>
                      </div>
                      <Progress value={analysisResult.score} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Engagement Potential</Label>
                        <span className="font-semibold text-lg">{analysisResult.engagement}%</span>
                      </div>
                      <Progress value={analysisResult.engagement} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Readability</Label>
                        <span className="font-semibold text-lg">{analysisResult.readability}%</span>
                      </div>
                      <Progress value={analysisResult.readability} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label>Audience Match</Label>
                        <span className="font-semibold text-lg">{analysisResult.audienceMatch}%</span>
                      </div>
                      <Progress value={analysisResult.audienceMatch} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Key Keywords
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.keywords.map(keyword => (
                            <Badge key={keyword} variant="secondary">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          {getSentimentIcon(analysisResult.sentiment)}
                          <span>Content Sentiment</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center h-full">
                          <span className={`capitalize font-medium text-lg ${getSentimentColor(analysisResult.sentiment)}`}>
                            {analysisResult.sentiment}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Audience Fit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1">{analysisResult.audienceMatch}%</div>
                          <p className="text-sm text-muted-foreground">
                            Match with target audience
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Improvement Suggestions</h3>
                    <div className="space-y-3">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="p-3 border rounded-md flex gap-3 items-start"
                        >
                          {suggestion.type === 'improvement' && (
                            <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                          )}
                          {suggestion.type === 'warning' && (
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          {suggestion.type === 'idea' && (
                            <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-sm font-medium capitalize">
                              {suggestion.type}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {suggestion.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Analysis
                  </Button>
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Apply Suggestions
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="suggestions" className="mt-6">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Content Ideas for High Engagement
                </CardTitle>
                <CardDescription>
                  AI-generated content suggestions based on trending topics and your audience interests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {suggestions.map(suggestion => (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                            <Badge>
                              {suggestion.estimatedEngagement}% Engagement
                            </Badge>
                          </div>
                          <CardDescription>
                            {suggestion.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="font-medium mb-1 flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                Target Audience
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {suggestion.targetAudience.map(audience => (
                                  <Badge key={audience} variant="outline" className="font-normal">
                                    {audience}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium mb-1 flex items-center gap-1">
                                <FileBarChart className="w-4 h-4" />
                                Topics
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {suggestion.topics.map(topic => (
                                  <Badge key={topic} variant="secondary" className="font-normal">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-medium mb-1 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Difficulty
                              </div>
                              <Badge 
                                variant="outline" 
                                className={`
                                  font-normal capitalize
                                  ${suggestion.difficulty === 'easy' ? 'text-green-500 border-green-200 bg-green-50' : 
                                    suggestion.difficulty === 'medium' ? 'text-amber-500 border-amber-200 bg-amber-50' : 
                                    'text-red-500 border-red-200 bg-red-50'}
                                `}
                              >
                                {suggestion.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            onClick={() => handleGenerateContent(suggestion)}
                            className="w-full sm:w-auto"
                          >
                            Generate Content Draft
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentOptimizer;
