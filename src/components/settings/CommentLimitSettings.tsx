
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMode } from '@/context/ModeContext';
import { 
  MessageSquare, 
  AlertTriangle, 
  ShieldCheck, 
  Smile,
  Info,
  Sliders, 
  ThumbsUp,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Safety threshold levels based on comment count
const SAFETY_LEVELS = {
  SAFE: { max: 15, color: 'green', icon: ShieldCheck, message: 'Safe range' },
  MODERATE: { min: 16, max: 25, color: 'amber', icon: ThumbsUp, message: 'Moderate activity' },
  HIGH: { min: 26, max: 40, color: 'orange', icon: AlertTriangle, message: 'High activity - use caution' },
  EXCESSIVE: { min: 41, color: 'red', icon: AlertTriangle, message: 'Excessive - likely to trigger spam detection' }
};

// Emoji suggestions for commenting
const SUGGESTED_EMOJIS = [
  { emoji: '👍', name: 'thumbs up', usage: 'Show approval or agreement' },
  { emoji: '💯', name: 'hundred', usage: 'Indicate strong agreement' },
  { emoji: '🔥', name: 'fire', usage: 'Show enthusiasm for great content' },
  { emoji: '👏', name: 'clap', usage: 'Applaud achievements or announcements' },
  { emoji: '💡', name: 'light bulb', usage: 'Highlight ideas or insights' },
  { emoji: '🤔', name: 'thinking', usage: 'Express contemplation or curiosity' },
  { emoji: '✅', name: 'check mark', usage: 'Confirm or validate points' },
  { emoji: '📊', name: 'chart', usage: 'Reference data or analytics' }
];

const CommentLimitSettings = () => {
  const { toast } = useToast();
  const { mode } = useMode();
  const [commentLimit, setCommentLimit] = useState<number>(10);
  const [useEmojis, setUseEmojis] = useState<boolean>(true);
  const [favoriteEmojis, setFavoriteEmojis] = useState<string[]>(['👍', '💯', '🔥']);
  
  // Get safety level based on comment count
  const getSafetyLevel = (count: number) => {
    if (count <= SAFETY_LEVELS.SAFE.max) return SAFETY_LEVELS.SAFE;
    if (count <= SAFETY_LEVELS.MODERATE.max) return SAFETY_LEVELS.MODERATE;
    if (count <= SAFETY_LEVELS.HIGH.max) return SAFETY_LEVELS.HIGH;
    return SAFETY_LEVELS.EXCESSIVE;
  };
  
  const safetyLevel = getSafetyLevel(commentLimit);
  
  // Calculate safety percentage (inverse - lower is safer)
  const getSafetyPercentage = (count: number) => {
    // Max value is 50, giving us a good range for the safety meter
    const maxUnsafe = 50;
    const percentage = Math.min((count / maxUnsafe) * 100, 100);
    return 100 - percentage; // Invert so higher is safer
  };
  
  const safetyPercentage = getSafetyPercentage(commentLimit);
  
  // Handle emoji selection
  const toggleEmojiSelection = (emoji: string) => {
    if (favoriteEmojis.includes(emoji)) {
      setFavoriteEmojis(favoriteEmojis.filter(e => e !== emoji));
    } else if (favoriteEmojis.length < 5) {
      setFavoriteEmojis([...favoriteEmojis, emoji]);
    } else {
      toast({
        title: "Maximum emojis reached",
        description: "You can select up to 5 favorite emojis",
        duration: 3000,
      });
    }
  };
  
  // Handle comment limit change
  const handleLimitChange = (value: number[]) => {
    setCommentLimit(value[0]);
  };
  
  // Generate comment recommendation based on current settings
  const getCommentRecommendation = () => {
    const level = getSafetyLevel(commentLimit);
    
    if (level === SAFETY_LEVELS.SAFE) {
      return "This is a safe number of daily comments that won't trigger any platform restrictions.";
    } else if (level === SAFETY_LEVELS.MODERATE) {
      return "This is a moderate activity level. Make sure your comments are genuinely engaging and not repetitive.";
    } else if (level === SAFETY_LEVELS.HIGH) {
      return "This high activity level might look unnatural. Consider spacing out your comments throughout the day.";
    } else {
      return "This number of comments is likely to trigger spam detection. We strongly recommend reducing this limit.";
    }
  };

  return (
    <motion.div 
      className="glass-card rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <MessageSquare className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-medium">Daily Comment Limits</h2>
        {mode === 'autonomous' && (
          <Badge className="ml-2 bg-autonomous-DEFAULT/20 text-autonomous-DEFAULT">Autonomous Mode</Badge>
        )}
      </div>

      <div className="space-y-6">
        {/* Comment Limit Control */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="comment-limit" className="text-base font-medium">
              Daily Comment Limit
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="comment-limit"
                type="number"
                min={1}
                max={50}
                value={commentLimit}
                onChange={(e) => setCommentLimit(Number(e.target.value))}
                className="w-16 h-8 text-center"
              />
              <span className="text-sm text-muted-foreground">comments/day</span>
            </div>
          </div>
          
          <Slider
            value={[commentLimit]}
            min={1}
            max={50}
            step={1}
            onValueChange={handleLimitChange}
            className="py-4"
          />
          
          {/* Safety Indicator */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <safetyLevel.icon className={`w-5 h-5 text-${safetyLevel.color}-600`} />
                <h3 className="font-medium">Safety Level: <span className={`text-${safetyLevel.color}-600`}>{safetyLevel.message}</span></h3>
              </div>
              <Badge className={cn(
                "bg-opacity-20",
                safetyLevel === SAFETY_LEVELS.SAFE ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                safetyLevel === SAFETY_LEVELS.MODERATE ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" :
                safetyLevel === SAFETY_LEVELS.HIGH ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" :
                "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
              )}>
                {commentLimit} comments
              </Badge>
            </div>
            
            <Progress 
              value={safetyPercentage} 
              className={cn(
                "h-2",
                safetyPercentage > 75 ? "bg-green-100" :
                safetyPercentage > 50 ? "bg-amber-100" :
                safetyPercentage > 25 ? "bg-orange-100" :
                "bg-red-100"
              )}
            />
            
            <p className="text-sm text-muted-foreground mt-2">
              {getCommentRecommendation()}
            </p>
          </div>
        </div>
        
        {/* Emoji Settings */}
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2">
                <Smile className="w-4 h-4 text-yellow-500" />
                Include Emojis
                <span className="text-xs text-muted-foreground ml-1">(recommended)</span>
              </h3>
              <p className="text-sm text-muted-foreground">Comments with emojis get 15% more engagement</p>
            </div>
            <Switch 
              checked={useEmojis}
              onCheckedChange={setUseEmojis}
            />
          </div>
          
          {useEmojis && (
            <div className="space-y-3 pl-6 pt-2">
              <h4 className="text-sm font-medium">Select your favorite emojis (max 5)</h4>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_EMOJIS.map((emojiData) => (
                  <button
                    key={emojiData.emoji}
                    onClick={() => toggleEmojiSelection(emojiData.emoji)}
                    className={cn(
                      "p-2 rounded-md border text-lg transition-all hover:bg-accent",
                      favoriteEmojis.includes(emojiData.emoji) 
                        ? "border-primary bg-primary/10" 
                        : "border-border"
                    )}
                    title={`${emojiData.name}: ${emojiData.usage}`}
                  >
                    <span>{emojiData.emoji}</span>
                    {favoriteEmojis.includes(emojiData.emoji) && (
                      <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                These emojis will be used intelligently based on the context of your comments
              </p>
            </div>
          )}
        </div>
        
        {/* Advanced Comment Settings */}
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h3 className="font-medium">Comment Suggestions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="comment-guidelines" className="text-sm">Commenting Guidelines</Label>
              <Textarea 
                id="comment-guidelines" 
                placeholder="Add specific instructions for your AI comments..."
                className="h-24 text-sm"
                defaultValue="Keep comments positive and supportive. Ask thoughtful questions. Avoid generic phrases like 'Great post!'"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="p-2 mr-3 rounded-md bg-blue-50 dark:bg-blue-900/20">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Comment Quality Tips</h4>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc pl-4">
                    <li>Refer to specifics from the post to show genuine engagement</li>
                    <li>End with a question to encourage conversation</li>
                    <li>Use varied language to avoid repetition</li>
                    <li>Space out comments throughout the day</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label className="text-sm">Comment scheduling</Label>
                  <p className="text-xs text-muted-foreground">Spread comments evenly throughout the day</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommentLimitSettings;
