
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMode } from '@/context/ModeContext';
import { 
  Hash, 
  Plus,
  Send,
  ThumbsUp,
  MessageSquare,
  BarChart3,
  Edit,
  Trash2,
  AlertTriangle,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopicItem {
  id: string;
  name: string;
  commentLimit: number;
  priority: 'high' | 'medium' | 'low';
  enabled: boolean;
}

const priorityColors = {
  high: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400",
  medium: "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400",
  low: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
};

const TopicCommentSettings = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [topics, setTopics] = useState<TopicItem[]>([
    { id: '1', name: '#artificialintelligence', commentLimit: 5, priority: 'high', enabled: true },
    { id: '2', name: '#remotework', commentLimit: 3, priority: 'medium', enabled: true },
    { id: '3', name: '#productmanagement', commentLimit: 4, priority: 'high', enabled: true },
    { id: '4', name: '#careerdevelopment', commentLimit: 2, priority: 'low', enabled: false },
    { id: '5', name: '#leadership', commentLimit: 3, priority: 'medium', enabled: true },
  ]);
  
  const [newTopic, setNewTopic] = useState('');
  const [editingTopic, setEditingTopic] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<{name: string, commentLimit: number, priority: 'high' | 'medium' | 'low'}>({
    name: '',
    commentLimit: 3,
    priority: 'medium'
  });
  
  const totalDailyComments = topics
    .filter(topic => topic.enabled)
    .reduce((sum, topic) => sum + topic.commentLimit, 0);
  
  const isExcessiveComments = totalDailyComments > 30;
  
  const handleAddTopic = () => {
    if (!newTopic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic or hashtag",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (topics.some(topic => topic.name.toLowerCase() === newTopic.toLowerCase())) {
      toast({
        title: "Error",
        description: "This topic already exists",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const formattedTopic = newTopic.startsWith('#') ? newTopic : `#${newTopic}`;
    
    setTopics([
      ...topics,
      {
        id: Date.now().toString(),
        name: formattedTopic.toLowerCase().replace(/\s+/g, ''),
        commentLimit: 3,
        priority: 'medium' as const,
        enabled: true
      }
    ]);
    
    setNewTopic('');
    
    toast({
      title: "Topic added",
      description: `${formattedTopic} has been added to your tracking list`,
      duration: 3000,
    });
  };
  
  const startEditing = (topic: TopicItem) => {
    setEditingTopic(topic.id);
    setEditingValues({
      name: topic.name,
      commentLimit: topic.commentLimit,
      priority: topic.priority
    });
  };
  
  const saveEditing = () => {
    if (!editingTopic) return;
    
    if (!editingValues.name.trim()) {
      toast({
        title: "Error",
        description: "Topic name cannot be empty",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setTopics(topics.map(topic => 
      topic.id === editingTopic
        ? { 
            ...topic, 
            name: editingValues.name.startsWith('#') ? editingValues.name : `#${editingValues.name}`,
            commentLimit: editingValues.commentLimit,
            priority: editingValues.priority
          }
        : topic
    ));
    
    setEditingTopic(null);
    
    toast({
      title: "Topic updated",
      description: "Your topic settings have been saved",
      duration: 2000,
    });
  };
  
  const cancelEditing = () => {
    setEditingTopic(null);
  };
  
  const toggleTopic = (id: string) => {
    setTopics(topics.map(topic => 
      topic.id === id ? { ...topic, enabled: !topic.enabled } : topic
    ));
  };
  
  const deleteTopic = (id: string) => {
    setTopics(topics.filter(topic => topic.id !== id));
    
    toast({
      title: "Topic removed",
      description: "The topic has been removed from your tracking list",
      duration: 2000,
    });
  };
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Hash className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-medium">Topic-Based Engagement</h2>
        {mode === 'autonomous' && (
          <Badge className="ml-2 bg-autonomous-DEFAULT/20 text-autonomous-DEFAULT">Autonomous Mode</Badge>
        )}
      </div>

      <div className="space-y-6">
        {/* Total Comments Summary */}
        <div className={cn(
          "p-4 rounded-lg border",
          isExcessiveComments 
            ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" 
            : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
        )}>
          <div className="flex items-start gap-3">
            {isExcessiveComments ? (
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            ) : (
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
            )}
            <div>
              <h3 className="font-medium">Total Daily Comments: {totalDailyComments}</h3>
              <p className="text-sm mt-1">
                {isExcessiveComments 
                  ? "Warning: This is a high number of daily comments which may appear spammy. Consider reducing some topic limits."
                  : "Your current comment distribution looks good and should appear natural."}
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant="outline" className="bg-white/50 dark:bg-black/50">
                  <MessageSquare className="w-3.5 h-3.5 mr-1" />
                  {topics.filter(t => t.enabled).length} Active Topics
                </Badge>
                <Badge variant="outline" className="bg-white/50 dark:bg-black/50">
                  <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                  Auto-Engagement On
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Topic Input */}
        <div>
          <Label htmlFor="add-topic" className="mb-2 block">Add New Topic or Hashtag</Label>
          <div className="flex gap-2">
            <Input
              id="add-topic"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="artificialintelligence"
              className="flex-1"
            />
            <Button onClick={handleAddTopic} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            The # symbol will be added automatically if not included
          </p>
        </div>
        
        {/* Topics List */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Your Tracked Topics ({topics.length})
          </h3>
          
          {topics.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Hash className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No topics added yet. Add a topic above to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topics.map((topic) => (
                <div 
                  key={topic.id} 
                  className={cn(
                    "p-4 rounded-lg border transition-all",
                    topic.enabled
                      ? "border-gray-200 dark:border-gray-700"
                      : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 opacity-60"
                  )}
                >
                  {editingTopic === topic.id ? (
                    // Editing Mode
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Topic Name</Label>
                        <Input
                          value={editingValues.name}
                          onChange={(e) => setEditingValues({...editingValues, name: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <Label className="text-sm">Daily Comment Limit: {editingValues.commentLimit}</Label>
                          <span className="text-xs text-muted-foreground">
                            {editingValues.commentLimit <= 3 ? "Conservative" : 
                             editingValues.commentLimit <= 7 ? "Moderate" : 
                             "Aggressive"}
                          </span>
                        </div>
                        <Slider
                          value={[editingValues.commentLimit]}
                          min={1}
                          max={10}
                          step={1}
                          onValueChange={(value) => setEditingValues({...editingValues, commentLimit: value[0]})}
                          className="mt-2"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm">Engagement Priority</Label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          {(['high', 'medium', 'low'] as const).map((priority) => (
                            <button
                              key={priority}
                              type="button"
                              className={cn(
                                "px-3 py-1.5 text-xs font-medium rounded-md",
                                editingValues.priority === priority
                                  ? `${priorityColors[priority]} border-none`
                                  : "bg-gray-100 dark:bg-gray-800"
                              )}
                              onClick={() => setEditingValues({...editingValues, priority})}
                            >
                              {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={cancelEditing}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm"
                          onClick={saveEditing}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className={cn(
                            "w-3 h-3 rounded-full",
                            topic.enabled ? priorityColors[topic.priority].split(' ')[0] : "bg-gray-300 dark:bg-gray-600"
                          )}
                        />
                        <div>
                          <h4 className="font-medium">{topic.name}</h4>
                          <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <MessageSquare className="w-3.5 h-3.5 mr-1" />
                              {topic.commentLimit} comments/day
                            </span>
                            <span className="flex items-center">
                              <Send className="w-3.5 h-3.5 mr-1" />
                              {topic.priority} priority
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleTopic(topic.id)}
                        >
                          <span className={cn(
                            "relative inline-flex h-4 w-8 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none",
                            topic.enabled ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                          )}>
                            <span className={cn(
                              "inline-block h-4 w-4 rounded-full bg-white dark:bg-gray-100 transform ring-0 transition-transform duration-200 ease-in-out",
                              topic.enabled ? "translate-x-4" : "translate-x-0"
                            )} />
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600"
                          onClick={() => startEditing(topic)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600"
                          onClick={() => deleteTopic(topic.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Tips */}
        <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4 text-sm">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4" />
            Topic Engagement Tips
          </h3>
          <ul className="space-y-2 text-blue-700 dark:text-blue-200">
            <li>• Focus on 3-5 topics that align with your professional expertise</li>
            <li>• Set higher comment limits on topics where you're establishing authority</li>
            <li>• Use "high" priority for trending topics with growth potential</li>
            <li>• Keep total daily comments under 30 to maintain natural engagement patterns</li>
            <li>• Update your topics monthly to stay relevant with industry trends</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicCommentSettings;
