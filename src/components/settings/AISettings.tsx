
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  Sliders,
  BookOpen,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import linkedinService, { AISettings as AISettingsType } from '@/services/linkedinService';

const AISettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AISettingsType>({
    enableLearning: false,
    preferredTone: 'Professional',
    preferredLength: 'medium'
  });
  const [hasWritingSamples, setHasWritingSamples] = useState(false);
  const [hasCommentHistory, setHasCommentHistory] = useState(false);

  useEffect(() => {
    // Load settings from service
    const savedSettings = linkedinService.getAISettings();
    setSettings(savedSettings);
    
    // Check if writing samples and comment history exist
    const samples = linkedinService.getWritingSamples();
    setHasWritingSamples(samples.length > 0);
    
    const history = linkedinService.getCommentHistory();
    setHasCommentHistory(history.length > 0);
  }, []);

  const handleChangeSettings = (newSettings: Partial<AISettingsType>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    linkedinService.saveAISettings(updatedSettings);
    
    toast({
      title: "AI settings updated",
      description: "Your AI preferences have been saved",
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
        <Brain className="w-5 h-5 text-purple-500" />
        <h2 className="text-xl font-medium">AI Comment Settings</h2>
        <Badge className="ml-2 bg-purple-500/20 text-purple-700 dark:text-purple-300 hover:bg-purple-500/30">New</Badge>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium flex items-center gap-2">
                Learning Mode
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p>When enabled, the AI will learn from your commenting habits to better match your style over time.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <p className="text-sm text-muted-foreground">Let AI learn from your commenting patterns</p>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="learning-mode" 
                checked={settings.enableLearning}
                onCheckedChange={(checked) => handleChangeSettings({ enableLearning: checked })}
              />
              <Label htmlFor="learning-mode" className="sr-only">Learning Mode</Label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className={cn(
              "p-4 rounded-lg border transition-all", 
              (hasWritingSamples) 
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20" 
                : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
            )}>
              <div className="flex items-center gap-2">
                <BookOpen className={cn(
                  "w-4 h-4",
                  hasWritingSamples ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )} />
                <h4 className="font-medium text-sm">Writing Samples</h4>
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {hasWritingSamples 
                  ? "Writing samples available for style mimicry" 
                  : "No writing samples available"}
              </p>
            </div>
            
            <div className={cn(
              "p-4 rounded-lg border transition-all", 
              (hasCommentHistory && settings.enableLearning) 
                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20" 
                : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
            )}>
              <div className="flex items-center gap-2">
                <MessageSquare className={cn(
                  "w-4 h-4",
                  (hasCommentHistory && settings.enableLearning) ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )} />
                <h4 className="font-medium text-sm">Comment History</h4>
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {(hasCommentHistory && settings.enableLearning)
                  ? "Learning from your comment history" 
                  : hasCommentHistory 
                    ? "Comment history available (enable learning)"
                    : "No comment history available"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            Default Comment Tone
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the default tone for your AI-generated comments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          
          <RadioGroup 
            defaultValue={settings.preferredTone} 
            onValueChange={(value) => handleChangeSettings({ preferredTone: value })}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {['Professional', 'Casual', 'Enthusiastic', 'Insightful', 'Supportive'].map((tone) => (
              <label 
                key={tone}
                className={cn(
                  "flex items-center space-x-2 rounded-lg border p-3 cursor-pointer transition-all",
                  settings.preferredTone === tone 
                    ? "border-purple-500 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20" 
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
              >
                <RadioGroupItem value={tone} id={`tone-${tone.toLowerCase()}`} />
                <Label htmlFor={`tone-${tone.toLowerCase()}`} className="w-full cursor-pointer">{tone}</Label>
              </label>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            Comment Length
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the default length for your AI-generated comments</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          
          <RadioGroup 
            defaultValue={settings.preferredLength} 
            onValueChange={(value: 'short' | 'medium' | 'long') => handleChangeSettings({ preferredLength: value })}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { value: 'short', label: 'Short', description: '1-2 sentences' },
              { value: 'medium', label: 'Medium', description: '2-3 sentences' },
              { value: 'long', label: 'Long', description: '4+ sentences' }
            ].map((option) => (
              <label 
                key={option.value}
                className={cn(
                  "flex flex-col rounded-lg border p-3 cursor-pointer transition-all",
                  settings.preferredLength === option.value 
                    ? "border-purple-500 bg-purple-50 dark:border-purple-700 dark:bg-purple-900/20" 
                    : "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600"
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`length-${option.value}`} />
                  <Label htmlFor={`length-${option.value}`} className="font-medium cursor-pointer">{option.label}</Label>
                </div>
                <p className="text-xs text-muted-foreground mt-1 pl-6">{option.description}</p>
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    </motion.div>
  );
};

export default AISettings;
