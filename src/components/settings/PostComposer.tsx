
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileEdit, 
  Calendar, 
  Send, 
  BarChart2, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import linkedinService, { PostPrediction } from '@/services/linkedinService';

const PostComposer = () => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(new Date());
  const [scheduledTime, setScheduledTime] = useState('09:00');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [prediction, setPrediction] = useState<PostPrediction | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const handleAnalyzePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write some content before analyzing",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await linkedinService.predictPostPerformance(content);
      setPrediction(result);
      
      toast({
        title: "Analysis complete",
        description: "Your post has been analyzed for potential performance",
        duration: 2000,
      });
    } catch (error) {
      console.error('Error analyzing post:', error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze your post at this time",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleSchedulePost = async () => {
    if (!content.trim()) {
      toast({
        title: "Empty post",
        description: "Please write some content before scheduling",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!scheduledDate) {
      toast({
        title: "No date selected",
        description: "Please select a date to schedule your post",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsScheduling(true);
    
    try {
      // Format date and time
      const formattedDate = format(scheduledDate, 'yyyy-MM-dd');
      const scheduledDateTime = `${formattedDate}T${scheduledTime}:00`;
      
      await linkedinService.createPost(content, scheduledDateTime);
      
      toast({
        title: "Post scheduled",
        description: `Your post will be published on ${format(scheduledDate, 'PPP')} at ${scheduledTime}`,
        duration: 3000,
      });
      
      // Reset form
      setContent('');
      setPrediction(null);
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Scheduling failed",
        description: "Unable to schedule your post at this time",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsScheduling(false);
    }
  };
  
  const getPerformanceColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getPerformanceBg = (score: number) => {
    if (score >= 8) return "bg-green-100 dark:bg-green-900/30";
    if (score >= 6) return "bg-amber-100 dark:bg-amber-900/30";
    return "bg-red-100 dark:bg-red-900/30";
  };

  return (
    <motion.div 
      className="glass-card rounded-xl p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <FileEdit className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-medium">Post Creator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <Textarea
            placeholder="What would you like to share with your network?"
            className="min-h-32 resize-y"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <p className="text-xs text-muted-foreground">
              {content.length} characters
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                {scheduledDate ? format(scheduledDate, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={scheduledDate}
                onSelect={setScheduledDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Select value={scheduledTime} onValueChange={setScheduledTime}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
              <SelectItem value="21:00">9:00 PM</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            variant="secondary"
            onClick={handleAnalyzePost}
            disabled={isAnalyzing || !content.trim()}
          >
            {isAnalyzing ? (
              <>
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <BarChart2 className="h-4 w-4" />
                Analyze
              </>
            )}
          </Button>
          
          <Button 
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={handleSchedulePost}
            disabled={isScheduling || !content.trim() || !scheduledDate}
          >
            {isScheduling ? (
              <>
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Schedule
              </>
            )}
          </Button>
        </div>
        
        <AnimatePresence>
          {prediction && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">
                <div className="bg-secondary/40 dark:bg-gray-800/50 px-5 py-3 border-b dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-blue-500" />
                      Performance Prediction
                    </h3>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => setShowSuggestions(!showSuggestions)}
                      >
                        {showSuggestions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <div className="mb-5">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium">Engagement Score</p>
                          <div className={cn(
                            "px-2 py-1 rounded text-xs font-medium flex items-center gap-1",
                            getPerformanceBg(prediction.engagementScore),
                            getPerformanceColor(prediction.engagementScore)
                          )}>
                            {prediction.engagementScore}/10
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className={cn(
                              "h-2 rounded-full",
                              prediction.engagementScore >= 8 ? "bg-green-500" :
                              prediction.engagementScore >= 6 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${prediction.engagementScore * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Estimated Likes</p>
                          <p className="text-sm font-medium">{prediction.estimatedLikes}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Estimated Comments</p>
                          <p className="text-sm font-medium">{prediction.estimatedComments}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Estimated Views</p>
                          <p className="text-sm font-medium">{prediction.estimatedViews}</p>
                        </div>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {showSuggestions && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-500" />
                            Improvement Suggestions
                          </h4>
                          <ul className="space-y-2">
                            {prediction.suggestions.map((suggestion, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PostComposer;
