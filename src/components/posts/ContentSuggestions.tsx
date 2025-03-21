
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  BarChart3,
  Calendar,
  Clock,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Copy,
  CheckCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMode } from "@/context/ModeContext";
import { cn } from '@/lib/utils';

// Sample data for demonstration
const trendingTopics = [
  {
    id: '1',
    title: 'AI in Talent Acquisition',
    category: 'artificial intelligence',
    engagement: 92,
    trending: '+28%',
  },
  {
    id: '2',
    title: 'Remote Work Productivity Tips',
    category: 'remote work',
    engagement: 88,
    trending: '+15%',
  },
  {
    id: '3',
    title: 'LinkedIn Audio Events',
    category: 'linkedin features',
    engagement: 85,
    trending: '+42%',
  },
  {
    id: '4',
    title: 'Sustainability in Business',
    category: 'business strategy',
    engagement: 78,
    trending: '+12%',
  },
];

const contentIdeas = [
  {
    id: '1',
    title: 'How AI is Transforming Recruitment in 2023',
    description: 'Share insights on how AI tools are making hiring more efficient and reducing bias in the recruitment process.',
    relevance: 95,
    suggestedTiming: 'Tuesday, 10:00 AM',
    estimatedEngagement: 'High',
  },
  {
    id: '2',
    title: '5 Remote Work Habits That Boosted My Productivity',
    description: 'Personal story about productivity hacks that transformed your remote work experience.',
    relevance: 91,
    suggestedTiming: 'Monday, 9:00 AM',
    estimatedEngagement: 'High',
  },
  {
    id: '3',
    title: 'The Future of Networking: LinkedIn Audio Events',
    description: 'Discuss how LinkedIn's audio features are changing professional networking.',
    relevance: 88,
    suggestedTiming: 'Wednesday, 2:00 PM',
    estimatedEngagement: 'Medium',
  },
  {
    id: '4',
    title: 'Implementing Sustainable Practices in Your Business',
    description: 'Practical steps companies can take to become more environmentally responsible while maintaining profitability.',
    relevance: 82,
    suggestedTiming: 'Thursday, 11:00 AM',
    estimatedEngagement: 'Medium',
  },
];

const contentTemplates = [
  {
    id: '1',
    title: 'Success Story',
    structure: [
      'Hook: Start with an attention-grabbing statement about a challenge you faced',
      'Background: Provide context on the situation and why it was difficult',
      'Solution: Explain the approach you took to solve the problem',
      'Results: Share specific outcomes and metrics',
      'Lesson: What did you learn that others can apply?',
      'Question: End with a question to engage your audience'
    ],
    example: "One year ago, our team was struggling with a 45% project delay rate. Here's how we turned it around...",
  },
  {
    id: '2',
    title: 'Industry Trend Analysis',
    structure: [
      'Trend Identification: Name the trend you're seeing in your industry',
      'Evidence: Provide data points or examples that confirm the trend',
      'Impact Analysis: Discuss how this trend is changing your industry',
      'Future Prediction: Where do you see this trend going?',
      'Strategic Advice: How should professionals adapt?',
      'Engagement: Ask for others' thoughts or experiences'
    ],
    example: "I'm seeing a major shift in how companies approach talent acquisition. Here are 3 key trends changing the game...",
  },
  {
    id: '3',
    title: 'Expert Tips',
    structure: [
      'Expertise Statement: Establish your credibility on the topic',
      'Problem Identification: What challenge are you helping solve?',
      'Tips List: 3-5 actionable tips with brief explanations',
      'Implementation: How to get started with your advice',
      'Personal Example: Share a quick story about using one of these tips',
      'Call to Action: Encourage sharing or trying one tip'
    ],
    example: "After 10+ years in product management, here are my top 5 tips for launching successful products that most people overlook...",
  },
];

const engagementMetrics = {
  'High': { color: 'text-green-600', bg: 'bg-green-100' },
  'Medium': { color: 'text-amber-600', bg: 'bg-amber-100' },
  'Low': { color: 'text-red-600', bg: 'bg-red-100' },
};

const ContentSuggestions = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [copiedId, setCopiedId] = useState('');
  
  const handleCopyTemplate = (template) => {
    setSelectedTemplate(template);
    setPostContent(`[${template.title} Format]\n\n${template.example}\n\n---\n\nStructure:\n${template.structure.map(item => `• ${item}`).join('\n')}`);
    
    toast({
      title: "Template applied",
      description: `${template.title} template has been loaded into the editor`,
      duration: 3000,
    });
  };
  
  const handleCopyIdea = (idea) => {
    setCopiedId(idea.id);
    navigator.clipboard.writeText(idea.title + '\n\n' + idea.description);
    
    setTimeout(() => {
      setCopiedId('');
    }, 2000);
    
    toast({
      title: "Content idea copied",
      description: "The idea has been copied to your clipboard",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <TrendingUp className="w-5 h-5 text-pink-600" />
          <h2 className="text-xl font-medium">Trending Topics in Your Network</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingTopics.map((topic) => (
            <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{topic.category}</span>
                    <h3 className="font-medium mt-1">{topic.title}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <TrendingUp className="w-3 h-3" />
                      <span>{topic.trending}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <BarChart3 className="w-3 h-3 text-blue-500" />
                      <span className="text-sm">{topic.engagement}% relevance</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <h2 className="text-xl font-medium">Personalized Content Ideas</h2>
        </div>

        <div className="space-y-4">
          {contentIdeas.map((idea) => (
            <Card key={idea.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{idea.title}</h3>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {idea.relevance}% match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{idea.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{idea.suggestedTiming}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Est. engagement: </span>
                        <span className={cn(
                          "px-1.5 py-0.5 rounded-full",
                          engagementMetrics[idea.estimatedEngagement].bg,
                          engagementMetrics[idea.estimatedEngagement].color
                        )}>
                          {idea.estimatedEngagement}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-1"
                      onClick={() => handleCopyIdea(idea)}
                    >
                      {copiedId === idea.id ? (
                        <>
                          <CheckCheck className="w-4 h-4" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                    <Button 
                      size="sm"
                      className="gap-1"
                      onClick={() => {
                        toast({
                          title: "Idea saved",
                          description: `"${idea.title}" has been added to your draft posts`,
                          duration: 3000,
                        });
                      }}
                    >
                      <span>Use</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-medium">Content Templates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {contentTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{template.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="italic text-muted-foreground mb-3">"{template.example}"</p>
                <div className="space-y-1">
                  {template.structure.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {template.structure.length > 3 && (
                    <p className="text-xs text-muted-foreground">+ {template.structure.length - 3} more steps</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-1"
                  onClick={() => handleCopyTemplate(template)}
                >
                  <Copy className="w-4 h-4" />
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              {selectedTemplate ? selectedTemplate.title : "Content Editor"}
            </CardTitle>
            <CardDescription>
              {selectedTemplate 
                ? "Edit the template to create your post" 
                : "Select a template or start writing your own content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your LinkedIn post here..."
              className="min-h-[200px] resize-y"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline"
              onClick={() => {
                if (postContent.trim()) {
                  setPostContent('');
                  setSelectedTemplate(null);
                  toast({
                    title: "Draft cleared",
                    description: "Your draft has been cleared",
                    duration: 2000,
                  });
                }
              }}
            >
              Clear
            </Button>
            <Button 
              className={cn(
                mode === 'assisted' ? "bg-assisted-DEFAULT" : "bg-autonomous-DEFAULT"
              )}
              onClick={() => {
                if (postContent.trim()) {
                  toast({
                    title: "Content saved to drafts",
                    description: "Your content has been saved to your drafts",
                    duration: 3000,
                  });
                } else {
                  toast({
                    title: "Empty content",
                    description: "Please write some content before saving",
                    variant: "destructive",
                    duration: 3000,
                  });
                }
              }}
            >
              Save to Drafts
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContentSuggestions;
