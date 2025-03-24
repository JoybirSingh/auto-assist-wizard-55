
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Briefcase, 
  ArrowRight, 
  GraduationCap,
  Book,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useMode } from '@/context/ModeContext';

interface SkillProgress {
  name: string;
  level: number;
  growth: number;
}

interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  requiredSkills: SkillProgress[];
  icon: React.ReactNode;
}

const CareerPathMapping = () => {
  const { mode } = useMode();
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  
  const skills: SkillProgress[] = [
    { name: 'Content Strategy', level: 85, growth: 12 },
    { name: 'Analytics', level: 72, growth: 8 },
    { name: 'Audience Engagement', level: 90, growth: 15 },
    { name: 'Personal Branding', level: 78, growth: 7 },
    { name: 'Industry Knowledge', level: 65, growth: 5 },
  ];
  
  const careerPaths: CareerPath[] = [
    {
      title: 'Content Marketing Director',
      description: 'Lead content strategy across channels with a focus on audience growth and engagement metrics.',
      matchScore: 92,
      requiredSkills: [
        { name: 'Content Strategy', level: 90, growth: 5 },
        { name: 'Team Leadership', level: 75, growth: 10 },
        { name: 'Marketing Analytics', level: 80, growth: 8 },
        { name: 'Budget Management', level: 60, growth: 15 },
      ],
      icon: <Award className="w-5 h-5" />
    },
    {
      title: 'Growth Marketing Lead',
      description: 'Drive user acquisition and engagement strategies focused on sustainable growth metrics.',
      matchScore: 87,
      requiredSkills: [
        { name: 'Analytics', level: 85, growth: 5 },
        { name: 'A/B Testing', level: 70, growth: 12 },
        { name: 'User Acquisition', level: 75, growth: 8 },
        { name: 'Growth Modeling', level: 65, growth: 10 },
      ],
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Industry Thought Leader',
      description: 'Establish yourself as a recognized voice in your industry through strategic content and speaking engagements.',
      matchScore: 83,
      requiredSkills: [
        { name: 'Personal Branding', level: 85, growth: 7 },
        { name: 'Public Speaking', level: 60, growth: 15 },
        { name: 'Industry Knowledge', level: 90, growth: 5 },
        { name: 'Content Creation', level: 80, growth: 8 },
      ],
      icon: <Users className="w-5 h-5" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Career Path Mapping</h2>
          <p className="text-muted-foreground">AI-driven career trajectory based on your LinkedIn profile</p>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Target className="w-6 h-6" />
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="border rounded-lg p-5 space-y-5 bg-white dark:bg-gray-800">
            <h3 className="font-medium text-lg">Your Current Skills</h3>
            
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm">{skill.level}%</span>
                      <span className="text-xs text-green-600">+{skill.growth}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full">
                      <Progress value={skill.level} className="h-2" />
                    </div>
                    <div className={cn(
                      "text-xs px-1.5 py-0.5 rounded font-medium",
                      skill.level >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                      skill.level >= 60 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : 
                      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    )}>
                      {skill.level >= 80 ? "Expert" : skill.level >= 60 ? "Advanced" : "Intermediate"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-3 border-t">
              <h4 className="text-sm font-medium mb-2">Recommended Skills to Develop</h4>
              <div className="flex flex-wrap gap-2">
                <div className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5 dark:bg-blue-900/20 dark:text-blue-400">
                  <GraduationCap className="w-3 h-3" />
                  <span>Leadership</span>
                </div>
                <div className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium flex items-center gap-1.5 dark:bg-green-900/20 dark:text-green-400">
                  <Book className="w-3 h-3" />
                  <span>Data Analysis</span>
                </div>
                <div className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1.5 dark:bg-purple-900/20 dark:text-purple-400">
                  <Users className="w-3 h-3" />
                  <span>Team Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Career Path Matches</h3>
          
          {careerPaths.map((path) => (
            <motion.div
              key={path.title}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md",
                selectedPath?.title === path.title ? "ring-2 ring-primary" : ""
              )}
              onClick={() => setSelectedPath(path)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-full mt-0.5",
                    mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
                  )}>
                    {path.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{path.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                  </div>
                </div>
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium flex items-center justify-center min-w-[3rem]",
                  path.matchScore >= 90 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                  path.matchScore >= 80 ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : 
                  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                )}>
                  {path.matchScore}% match
                </div>
              </div>
              
              {selectedPath?.title === path.title && (
                <motion.div 
                  className="mt-4 pt-4 border-t space-y-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h5 className="text-sm font-medium">Required Skills</h5>
                  <div className="space-y-3">
                    {path.requiredSkills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-xs">{skill.level}% required</span>
                        </div>
                        <Progress value={skill.level} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2 flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Growth potential:</span> 
                      <span className="ml-1 font-medium text-green-600">High</span>
                    </div>
                    <Button size="sm" className="gap-1">
                      <span>View Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPathMapping;
