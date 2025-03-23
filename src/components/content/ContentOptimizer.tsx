
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import {
  Lightbulb,
  BarChart2,
  LineChart,
  Rocket,
  ArrowUp,
  ArrowDown,
  Zap,
  Sparkles,
  Check,
  RefreshCw,
  Copy,
  Send,
  Clock,
  Users,
  MessageSquare,
  ThumbsUp
} from 'lucide-react';

interface ContentInsight {
  score: number;
  category: string;
  improvement: string;
  impact: 'high' | 'medium' | 'low';
}

interface OptimizationResult {
  overallScore: number;
  engagementScore: number;
  reachScore: number;
  readabilityScore: number;
  insights: ContentInsight[];
  suggestedEdits: string[];
  topPerformingPhrases: string[];
  estimatedPerformance: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockTopPosts = [
  {
    id: '1',
    content: 'Excited to announce we've just closed our Series B funding round of $12M! This investment will help us scale our AI-powered solution to more industries and continue our mission of making data accessible to everyone. Thanks to our amazing team and investors for believing in our vision. #startup #funding #ai #datascience',
    likes: 245,
    comments: 56,
    shares: 34,
    views: 8700,
    engagementRate: 3.8,
  },
  {
    id: '2',
    content: 'Just published my latest article on "5 Ways AI Is Transforming Healthcare in 2023" - from early disease detection to personalized treatment plans, the possibilities are endless. What other applications are you excited about? Check out the link in comments to read more. #healthcare #artificialintelligence #innovation',
    likes: 189,
    comments: 42,
    shares: 28,
    views: 7200,
    engagementRate: 3.6,
  },
  {
    id: '3',
    content: 'Question for my network: What's the biggest challenge you're facing with implementing data-driven decision making in your organization? Looking to gather insights for an upcoming workshop I'm hosting next month.',
    likes: 156,
    comments: 87,
    shares: 12,
    views: 5400,
    engagementRate: 4.7,
  },
];

const ContentOptimizer = () => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('optimize');
  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [optimizedContent, setOptimizedContent] = useState('');
  const [toneValue, setToneValue] = useState([50]); // 0-100 scale for tone (professional to casual)
  const [lengthValue, setLengthValue] = useState([50]); // 0-100 scale for length (concise to detailed)

  const analyzeContent = async () => {
    if (content.trim().length < 10) {
      toast({
        title: "Content too short",
        description: "Please enter at least 10 characters to analyze",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setIsAnalyzing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock optimization result
    const result: OptimizationResult = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      engagementScore: Math.floor(Math.random() * 30) + 60, // 60-90
      reachScore: Math.floor(Math.random() * 40) + 50, // 50-90
      readabilityScore: Math.floor(Math.random() * 20) + 75, // 75-95
      insights: [
        {
          score: 7,
          category: 'Headline',
          improvement: 'Add a stronger opening hook to grab attention immediately',
          impact: 'high',
        },
        {
          score: 8,
          category: 'Call to Action',
          improvement: 'End with a clearer call-to-action that prompts engagement',
          impact: 'high',
        },
        {
          score: 6,
          category: 'Keywords',
          improvement: 'Include more industry-specific keywords to improve visibility',
          impact: 'medium',
        },
        {
          score: 9,
          category: 'Questions',
          improvement: 'Add a thought-provoking question to encourage comments',
          impact: 'medium',
        },
        {
          score: 5,
          category: 'Hashtags',
          improvement: 'Use more targeted hashtags to reach the right audience',
          impact: 'low',
        },
      ],
      suggestedEdits: [
        'Start with "Just released:" to create urgency',
        'Include a statistic or data point to add credibility',
        'Add "Thoughts?" at the end to encourage comments',
        'Use 2-3 hashtags that are trending in your industry',
        'Keep paragraphs to 1-2 sentences for better readability on mobile',
      ],
      topPerformingPhrases: [
        'I'm excited to announce',
        'What do you think about',
        'Based on my experience',
        'Here are 3 key takeaways',
        'The future of [industry]',
      ],
      estimatedPerformance: {
        views: Math.floor(Math.random() * 5000) + 3000,
        likes: Math.floor(Math.random() * 100) + 50,
        comments: Math.floor(Math.random() * 40) + 10,
        shares: Math.floor(Math.random() * 30) + 5,
      },
    };

    setOptimizationResult(result);
    
    // Generate an "optimized" version of the content
    let improved = content;
    
    // Add a hook if missing
    if (!improved.startsWith('I'm excited') && !improved.startsWith('Just released') && !improved.startsWith('Breaking:')) {
      improved = 'Excited to share: ' + improved;
    }
    
    // Add a question if missing
    if (!improved.includes('?')) {
      improved += ' What are your thoughts on this?';
    }
    
    // Add hashtags if missing
    if (!improved.includes('#')) {
      improved += ' #innovation #leadership #growth';
    }
    
    setOptimizedContent(improved);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis complete",
      description: "Content analyzed and optimization suggestions ready",
      duration: 3000,
    });
  };

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(optimizedContent);
    toast({
      title: "Copied to clipboard",
      description: "Optimized content copied successfully",
      duration: 2000,
    });
  };

  const handleUseOptimized = () => {
    setContent(optimizedContent);
    toast({
      title: "Content updated",
      description: "Using optimized version as your content",
      duration: 2000,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    if (impact === 'high') return "text-red-600 dark:text-red-400";
    if (impact === 'medium') return "text-amber-600 dark:text-amber-400";
    return "text-blue-600 dark:text-blue-400";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Optimizer</h2>
        <p className="text-muted-foreground">
          Analyze and optimize your content for maximum engagement
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="optimize" className="flex items-center gap-2">
            <Rocket className="h-4 w-4" />
            <span>Optimize</span>
          </TabsTrigger>
          <TabsTrigger value="top-posts" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>Top Posts</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Audience Insights</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="optimize" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Craft Your Content</CardTitle>
                  <CardDescription>
                    Enter your content and our AI will analyze and suggest improvements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Input
                      placeholder="Topic or target keyword (optional)"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Enter your post content here..."
                      className="min-h-32 resize-y"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>{content.length} characters</span>
                      <span>{content.split(/\s+/).filter(Boolean).length} words</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Tone</span>
                        <span className="text-sm">
                          {toneValue[0] <= 33
                            ? "Professional"
                            : toneValue[0] <= 66
                            ? "Balanced"
                            : "Conversational"}
                        </span>
                      </div>
                      <Slider
                        value={toneValue}
                        onValueChange={setToneValue}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Professional</span>
                        <span>Balanced</span>
                        <span>Conversational</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Length</span>
                        <span className="text-sm">
                          {lengthValue[0] <= 33
                            ? "Concise"
                            : lengthValue[0] <= 66
                            ? "Balanced"
                            : "Detailed"}
                        </span>
                      </div>
                      <Slider
                        value={lengthValue}
                        onValueChange={setLengthValue}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Concise</span>
                        <span>Balanced</span>
                        <span>Detailed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={analyzeContent}
                    disabled={isAnalyzing || content.length < 10}
                    className="w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Analyze & Optimize
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {optimizationResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Optimized Version</CardTitle>
                    <CardDescription>
                      Our AI-enhanced version of your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/30 rounded-md whitespace-pre-line">
                      {optimizedContent}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                      <span>{optimizedContent.length} characters</span>
                      <span>
                        {optimizedContent.split(/\s+/).filter(Boolean).length}{" "}
                        words
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCopyOptimized}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </Button>
                    <Button onClick={handleUseOptimized}>
                      <Check className="mr-2 h-4 w-4" />
                      Use This Version
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            {optimizationResult ? (
              <Card>
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                  <CardDescription>
                    How your content scores and suggested improvements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Score</span>
                      <div
                        className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(
                          optimizationResult.overallScore
                        )}`}
                      >
                        {optimizationResult.overallScore}/100
                      </div>
                    </div>
                    <Progress
                      value={optimizationResult.overallScore}
                      indicatorClassName={getScoreBg(
                        optimizationResult.overallScore
                      )}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground block">
                        Engagement
                      </span>
                      <div
                        className={`text-lg font-bold ${getScoreColor(
                          optimizationResult.engagementScore
                        )}`}
                      >
                        {optimizationResult.engagementScore}
                      </div>
                      <Progress
                        value={optimizationResult.engagementScore}
                        indicatorClassName={getScoreBg(
                          optimizationResult.engagementScore
                        )}
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground block">
                        Reach
                      </span>
                      <div
                        className={`text-lg font-bold ${getScoreColor(
                          optimizationResult.reachScore
                        )}`}
                      >
                        {optimizationResult.reachScore}
                      </div>
                      <Progress
                        value={optimizationResult.reachScore}
                        indicatorClassName={getScoreBg(
                          optimizationResult.reachScore
                        )}
                        className="h-1"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground block">
                        Readability
                      </span>
                      <div
                        className={`text-lg font-bold ${getScoreColor(
                          optimizationResult.readabilityScore
                        )}`}
                      >
                        {optimizationResult.readabilityScore}
                      </div>
                      <Progress
                        value={optimizationResult.readabilityScore}
                        indicatorClassName={getScoreBg(
                          optimizationResult.readabilityScore
                        )}
                        className="h-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Key Insights</h4>
                    {optimizationResult.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 border-b pb-2 last:border-0"
                      >
                        <div
                          className={`mt-0.5 p-1 rounded-full ${
                            insight.impact === "high"
                              ? "bg-red-100 dark:bg-red-900/20"
                              : insight.impact === "medium"
                              ? "bg-amber-100 dark:bg-amber-900/20"
                              : "bg-blue-100 dark:bg-blue-900/20"
                          }`}
                        >
                          <Lightbulb
                            className={`h-3 w-3 ${getImpactColor(
                              insight.impact
                            )}`}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {insight.category}
                            </span>
                            <Badge
                              variant="outline"
                              className={getImpactColor(insight.impact)}
                            >
                              {insight.impact} impact
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {insight.improvement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Expected Performance</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {optimizationResult.estimatedPerformance.views.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Views
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {optimizationResult.estimatedPerformance.likes.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Likes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {optimizationResult.estimatedPerformance.comments.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Comments
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {optimizationResult.estimatedPerformance.shares.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Shares
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Content Analysis</CardTitle>
                  <CardDescription>
                    Enter your content and click analyze to see insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Your content analysis will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="top-posts" className="pt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Top Performing Posts</h3>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
            </div>

            <div className="space-y-6">
              {mockTopPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <LineChart className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm mb-2">{post.content}</div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Send className="h-4 w-4" />
                            <span>{post.shares}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {post.engagementRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Engagement
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button variant="ghost" size="sm">
                      <Copy className="mr-2 h-4 w-4" />
                      Use as Template
                    </Button>
                    <Button variant="outline" size="sm">
                      <Zap className="mr-2 h-4 w-4" />
                      Analyze Success Factors
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Content Patterns Analysis</CardTitle>
                <CardDescription>
                  Insights from your best performing content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Top Performing Phrases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {optimizationResult?.topPerformingPhrases.map(
                      (phrase, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {phrase}
                        </Badge>
                      )
                    ) || [
                      "I'm excited to announce",
                      "What do you think about",
                      "Based on my experience",
                      "Here are 3 key takeaways",
                      "The future of [industry]",
                    ].map((phrase, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {phrase}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Best Posting Times
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-muted/30 p-3 rounded-md text-center">
                      <div className="text-sm font-medium">Tuesday</div>
                      <div className="text-xs text-muted-foreground">
                        9:00 - 10:00 AM
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md text-center border border-primary/20">
                      <div className="text-sm font-medium text-primary">
                        Wednesday
                      </div>
                      <div className="text-xs text-primary/80">
                        12:00 - 1:00 PM
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md text-center">
                      <div className="text-sm font-medium">Thursday</div>
                      <div className="text-xs text-muted-foreground">
                        3:00 - 4:00 PM
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md text-center">
                      <div className="text-sm font-medium">Friday</div>
                      <div className="text-xs text-muted-foreground">
                        10:00 - 11:00 AM
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">
                    Content Type Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Questions</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>How-to Content</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Industry News</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Personal Stories</span>
                        <span className="font-medium">63%</span>
                      </div>
                      <Progress value={63} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audience Engagement Patterns</CardTitle>
                <CardDescription>
                  When and how your audience engages with content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Activity by Day of Week
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Monday</div>
                      <Progress value={45} className="h-4" />
                      <div className="w-8 text-sm text-right">45%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Tuesday</div>
                      <Progress value={62} className="h-4" />
                      <div className="w-8 text-sm text-right">62%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Wednesday</div>
                      <Progress
                        value={87}
                        className="h-4"
                        indicatorClassName="bg-primary"
                      />
                      <div className="w-8 text-sm text-right">87%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Thursday</div>
                      <Progress value={74} className="h-4" />
                      <div className="w-8 text-sm text-right">74%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Friday</div>
                      <Progress value={56} className="h-4" />
                      <div className="w-8 text-sm text-right">56%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Saturday</div>
                      <Progress value={32} className="h-4" />
                      <div className="w-8 text-sm text-right">32%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 text-sm">Sunday</div>
                      <Progress value={28} className="h-4" />
                      <div className="w-8 text-sm text-right">28%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Peak Engagement Hours
                  </h4>
                  <div className="flex items-center space-x-2 p-4 bg-primary/5 rounded-md border border-primary/10">
                    <Clock className="h-8 w-8 text-primary/70" />
                    <div>
                      <div className="text-lg font-bold">9:00 AM - 11:00 AM</div>
                      <div className="text-sm text-muted-foreground">
                        Your audience is most active during these hours
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>
                  Who engages with your content the most
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Industries</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm">Software</div>
                      <Progress
                        value={83}
                        className="h-4"
                        indicatorClassName="bg-blue-500"
                      />
                      <div className="w-8 text-sm text-right">83%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm">Marketing</div>
                      <Progress
                        value={65}
                        className="h-4"
                        indicatorClassName="bg-green-500"
                      />
                      <div className="w-8 text-sm text-right">65%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm">Finance</div>
                      <Progress
                        value={42}
                        className="h-4"
                        indicatorClassName="bg-amber-500"
                      />
                      <div className="w-8 text-sm text-right">42%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm">Healthcare</div>
                      <Progress
                        value={38}
                        className="h-4"
                        indicatorClassName="bg-violet-500"
                      />
                      <div className="w-8 text-sm text-right">38%</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm">Education</div>
                      <Progress
                        value={29}
                        className="h-4"
                        indicatorClassName="bg-rose-500"
                      />
                      <div className="w-8 text-sm text-right">29%</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Job Titles</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-sm font-medium">Engineering</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          32% of audience
                        </span>
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-sm font-medium">Product</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          24% of audience
                        </span>
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-sm font-medium">Marketing</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          18% of audience
                        </span>
                        <ArrowDown className="h-3 w-3 text-red-500" />
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-md">
                      <div className="text-sm font-medium">C-Level</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          12% of audience
                        </span>
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Seniority Level</h4>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Senior/Lead</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress
                        value={42}
                        className="h-2"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Mid-level</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <Progress
                        value={35}
                        className="h-2"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Executive</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <Progress
                        value={15}
                        className="h-2"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Entry-level</span>
                        <span className="font-medium">8%</span>
                      </div>
                      <Progress
                        value={8}
                        className="h-2"
                        indicatorClassName="bg-blue-500"
                      />
                    </div>
                  </div>
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
