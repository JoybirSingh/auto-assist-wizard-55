
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Play, 
  Pause, 
  SkipForward, 
  Clock, 
  MessageSquare, 
  CheckCircle2,
  Star,
  PlusCircle,
  Save,
  X,
  VideoIcon
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useMode } from '@/context/ModeContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
  completed: boolean;
}

interface MockInterview {
  id: string;
  title: string;
  duration: number;
  questions: number;
  description: string;
  image: string;
  category: string;
}

const InterviewPreparation = () => {
  const { mode } = useMode();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  const questions: Question[] = [
    {
      id: '1',
      question: "What strategies have you used to grow your LinkedIn network and engagement?",
      category: "LinkedIn Strategy",
      difficulty: 'medium',
      tips: [
        "Mention specific metrics and growth percentages",
        "Discuss both your content strategy and engagement approach",
        "Highlight any tools or analytics you've used"
      ],
      completed: false
    },
    {
      id: '2',
      question: "Describe a successful content campaign you've run on LinkedIn and how you measured its success.",
      category: "Content Marketing",
      difficulty: 'hard',
      tips: [
        "Structure your answer with campaign goals, execution, and results",
        "Include specific KPIs you tracked",
        "Discuss what you learned from the campaign"
      ],
      completed: false
    },
    {
      id: '3',
      question: "How do you stay updated with LinkedIn's algorithm changes and adapt your strategy accordingly?",
      category: "Platform Knowledge",
      difficulty: 'medium',
      tips: [
        "Mention specific sources you follow for LinkedIn updates",
        "Discuss how you test algorithm changes",
        "Share an example of how you adapted to a recent change"
      ],
      completed: false
    },
    {
      id: '4',
      question: "How would you approach building a LinkedIn presence for a brand new company?",
      category: "Brand Building",
      difficulty: 'hard',
      tips: [
        "Discuss initial strategy and setup",
        "Cover content planning and audience targeting",
        "Explain how you'd measure early success"
      ],
      completed: false
    },
    {
      id: '5',
      question: "What metrics do you consider most important when evaluating LinkedIn performance?",
      category: "Analytics",
      difficulty: 'easy',
      tips: [
        "Discuss both standard and custom metrics",
        "Explain why these metrics matter for business goals",
        "Mention how frequently you would review these metrics"
      ],
      completed: false
    }
  ];
  
  const mockInterviews: MockInterview[] = [
    {
      id: '1',
      title: "LinkedIn Marketing Specialist",
      duration: 30,
      questions: 12,
      description: "Practice for roles focused on LinkedIn strategy and content creation.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      category: "Marketing"
    },
    {
      id: '2',
      title: "Social Media Manager",
      duration: 25,
      questions: 10,
      description: "Comprehensive interview covering all social platforms including LinkedIn.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      category: "Digital Marketing"
    },
    {
      id: '3',
      title: "Content Strategy Lead",
      duration: 40,
      questions: 15,
      description: "Senior-level interview for content strategy leadership roles.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      category: "Content"
    }
  ];
  
  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording started",
      description: "Your answer is being recorded",
      duration: 3000,
    });
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
    setShowFeedback(true);
    toast({
      title: "Recording completed",
      description: "Your answer has been analyzed",
      duration: 3000,
    });
  };
  
  const handleStartPractice = () => {
    setIsPracticing(true);
    setCurrentQuestion(0);
    setShowFeedback(false);
    setAnswerText('');
  };
  
  const handleEndPractice = () => {
    setIsPracticing(false);
    toast({
      title: "Practice session completed",
      description: "Great job! You've completed this practice session.",
      duration: 3000,
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setAnswerText('');
    } else {
      handleEndPractice();
    }
  };
  
  const handleSubmitAnswer = () => {
    setShowFeedback(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Interview Preparation</h2>
          <p className="text-muted-foreground">AI-powered mock interview practice for LinkedIn roles</p>
        </div>
        <div className={cn(
          "p-2.5 rounded-full",
          mode === 'assisted' ? 'bg-assisted-muted text-assisted-DEFAULT' : 'bg-autonomous-muted text-autonomous-DEFAULT'
        )}>
          <Mic className="w-6 h-6" />
        </div>
      </div>
      
      <Tabs defaultValue="practice">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="practice">Question Practice</TabsTrigger>
          <TabsTrigger value="interviews">Mock Interviews</TabsTrigger>
          <TabsTrigger value="history">History & Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="practice">
          {isPracticing ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge>{questions[currentQuestion].category}</Badge>
                      <CardTitle className="mt-2 text-xl">
                        {questions[currentQuestion].question}
                      </CardTitle>
                    </div>
                    <Badge variant={
                      questions[currentQuestion].difficulty === 'easy' ? 'outline' : 
                      questions[currentQuestion].difficulty === 'medium' ? 'secondary' : 
                      'destructive'
                    }>
                      {questions[currentQuestion].difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        <span>2-3 mins</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-24 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {currentQuestion + 1}/{questions.length}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {!showFeedback ? (
                      <>
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Hints & Tips:</h4>
                          <ul className="space-y-1">
                            {questions[currentQuestion].tips.map((tip, index) => (
                              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-3 pt-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Your Answer:</h4>
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="gap-1.5">
                                    <VideoIcon className="w-3.5 h-3.5" />
                                    <span>Video</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Video Response</DialogTitle>
                                    <DialogDescription>
                                      Record a video answer to the interview question.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex flex-col items-center justify-center py-8 bg-muted rounded-md">
                                    {isRecording ? (
                                      <div className="space-y-4 flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                                          <Mic className="w-8 h-8 text-red-500" />
                                        </div>
                                        <div className="text-sm">Recording... 00:42</div>
                                        <Button variant="outline" onClick={handleStopRecording}>
                                          Stop Recording
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="space-y-4 flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                                          <VideoIcon className="w-8 h-8 text-muted-foreground" />
                                        </div>
                                        <div className="text-sm text-muted-foreground">Click to start recording</div>
                                        <Button onClick={handleStartRecording}>
                                          Start Recording
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline">Cancel</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm" className="gap-1.5">
                                <Mic className="w-3.5 h-3.5" />
                                <span>Audio</span>
                              </Button>
                            </div>
                          </div>
                          <Textarea 
                            placeholder="Type your answer here..."
                            className="min-h-[150px]"
                            value={answerText}
                            onChange={(e) => setAnswerText(e.target.value)}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsPracticing(false)}>
                              End Practice
                            </Button>
                            <Button onClick={handleSubmitAnswer} disabled={answerText.length < 10}>
                              Submit Answer
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Your Answer:</h4>
                          <div className="bg-muted p-3 rounded-md text-sm">
                            {answerText}
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium flex items-center gap-2">
                            <span>AI Feedback</span>
                            <Badge variant="outline" className="gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>8/10</span>
                            </Badge>
                          </h4>
                          
                          <div className="space-y-2">
                            <div className="bg-green-50 border border-green-100 p-3 rounded-md dark:bg-green-900/20 dark:border-green-900">
                              <h5 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Strengths</h5>
                              <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
                                <li className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                  <span>Your answer was well-structured and easy to follow</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                  <span>You provided specific examples to support your points</span>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-amber-50 border border-amber-100 p-3 rounded-md dark:bg-amber-900/20 dark:border-amber-900">
                              <h5 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">Areas for Improvement</h5>
                              <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
                                <li className="flex items-start gap-1.5">
                                  <PlusCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                  <span>Consider including more metrics and quantifiable results</span>
                                </li>
                                <li className="flex items-start gap-1.5">
                                  <PlusCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                  <span>Your answer could be more concise; try to focus on key points</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium">Sample Answer:</h4>
                          <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                            "For LinkedIn growth, I implemented a three-part strategy that increased my network by 40% in six months. First, I analyzed my audience using LinkedIn Analytics to understand what content resonated best, which showed that industry insights gained 3x more engagement than general updates. Second, I established a consistent posting schedule of 3x weekly, focusing on thought leadership content. Finally, I actively engaged with my network's content daily, spending 20 minutes each morning commenting on posts from key connections. This approach led to a 65% increase in profile views and a 28% higher engagement rate compared to the previous period."
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2 pt-4">
                          <Button variant="outline" onClick={() => setIsPracticing(false)}>
                            End Practice
                          </Button>
                          <Button onClick={handleNextQuestion}>
                            Next Question
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Individual Questions</CardTitle>
                  <CardDescription>
                    Select questions to practice for LinkedIn-related job interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((q, index) => (
                      <div 
                        key={q.id}
                        className="border p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => {
                          setCurrentQuestion(index);
                          setIsPracticing(true);
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{q.category}</Badge>
                            {q.completed && (
                              <Badge variant="secondary" className="gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Completed</span>
                              </Badge>
                            )}
                          </div>
                          <Badge variant={
                            q.difficulty === 'easy' ? 'outline' : 
                            q.difficulty === 'medium' ? 'secondary' : 
                            'destructive'
                          }>
                            {q.difficulty}
                          </Badge>
                        </div>
                        <h3 className="font-medium">{q.question}</h3>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-1.5">
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Custom Question</span>
                  </Button>
                  <Button onClick={handleStartPractice}>Start Practice</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="interviews">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInterviews.map((interview) => (
              <Card key={interview.id} className="overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 z-10"></div>
                  <img 
                    src={interview.image} 
                    alt={interview.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 z-20">
                    <Badge className="bg-white/90 text-black hover:bg-white/80">
                      {interview.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{interview.title}</CardTitle>
                  <CardDescription>{interview.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{interview.duration} mins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{interview.questions} questions</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Interview</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Create Custom Interview</CardTitle>
                <CardDescription>
                  Design your own interview flow with specific questions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <div className="p-3 border border-dashed rounded-full">
                  <PlusCircle className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Create New Interview
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Practice History</CardTitle>
              <CardDescription>
                Track your progress and improvements over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Questions Practiced</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Mock Interviews</div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold">7.8</div>
                    <div className="text-sm text-muted-foreground">Average Score</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Performance by Category
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>LinkedIn Strategy</span>
                        <span>8.5/10</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Content Marketing</span>
                        <span>7.2/10</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Analytics & Reporting</span>
                        <span>6.8/10</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Brand Building</span>
                        <span>9.1/10</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Recent Practice Sessions
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">LinkedIn Marketing Specialist</h4>
                          <p className="text-sm text-muted-foreground">Mock Interview • 30 mins</p>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>8.2/10</span>
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Play className="w-3.5 h-3.5" />
                          <span>Replay</span>
                        </Button>
                        <Button size="sm" variant="secondary" className="gap-1.5">
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Notes</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Content Strategy Practice</h4>
                          <p className="text-sm text-muted-foreground">Question Practice • 15 mins</p>
                        </div>
                        <Badge variant="outline" className="gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>7.5/10</span>
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Play className="w-3.5 h-3.5" />
                          <span>Replay</span>
                        </Button>
                        <Button size="sm" variant="secondary" className="gap-1.5">
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Notes</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InterviewPreparation;
