import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  PlayCircle, 
  PauseCircle,
  ChevronDown,
  ChevronUp,
  Save,
  Copy,
  Users,
  CalendarCheck
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FollowUpStep {
  id: string;
  type: 'message' | 'wait' | 'task';
  content: string;
  waitDays?: number;
  taskType?: 'call' | 'email' | 'meeting' | 'other';
  enabled: boolean;
}

interface FollowUpSequence {
  id: string;
  name: string;
  description: string;
  steps: FollowUpStep[];
  active: boolean;
  leadsCount: number;
  completionRate: number;
  createdAt: string;
}

// Mock data for demonstration
const mockSequences: FollowUpSequence[] = [
  {
    id: '1',
    name: 'Post-Meeting Nurture',
    description: 'Follow up after initial sales meetings',
    steps: [
      {
        id: 's1',
        type: 'message',
        content: 'Hi {{first_name}}, it was great meeting you today. I\'ve attached the materials we discussed. Let me know if you have any questions.',
        enabled: true,
      },
      {
        id: 's2',
        type: 'wait',
        content: 'Wait for response',
        waitDays: 3,
        enabled: true,
      },
      {
        id: 's3',
        type: 'message',
        content: 'Hello {{first_name}}, I wanted to follow up on our conversation about {{product_name}}. Have you had a chance to review the materials?',
        enabled: true,
      },
      {
        id: 's4',
        type: 'task',
        content: 'Schedule a follow-up call with {{first_name}}',
        taskType: 'call',
        enabled: true,
      }
    ],
    active: true,
    leadsCount: 12,
    completionRate: 65,
    createdAt: '2023-11-08',
  },
  {
    id: '2',
    name: 'Proposal Follow-Up',
    description: 'Follow up after sending a proposal or quote',
    steps: [
      {
        id: 's1',
        type: 'message',
        content: 'Hi {{first_name}}, I wanted to check if you received the proposal I sent over for {{company}}?',
        enabled: true,
      },
      {
        id: 's2',
        type: 'wait',
        content: 'Wait for response',
        waitDays: 2,
        enabled: true,
      },
      {
        id: 's3',
        type: 'message',
        content: 'Hello {{first_name}}, I'm following up on the proposal I sent. I'd be happy to address any questions or concerns you might have.',
        enabled: true,
      },
      {
        id: 's4',
        type: 'task',
        content: 'Schedule a proposal review call',
        taskType: 'meeting',
        enabled: true,
      }
    ],
    active: false,
    leadsCount: 5,
    completionRate: 40,
    createdAt: '2023-11-15',
  }
];

const personalizationVariables = [
  { name: 'first_name', description: 'Lead\'s first name' },
  { name: 'last_name', description: 'Lead\'s last name' },
  { name: 'full_name', description: 'Lead\'s full name' },
  { name: 'company', description: 'Lead\'s company name' },
  { name: 'title', description: 'Lead\'s job title' },
  { name: 'product_name', description: 'Your product or service name' },
  { name: 'meeting_date', description: 'Date of your last meeting' },
];

const FollowUpAutomation = () => {
  const { toast } = useToast();
  const [sequences, setSequences] = useState<FollowUpSequence[]>(mockSequences);
  const [editingSequence, setEditingSequence] = useState<FollowUpSequence | null>(null);
  const [expandedSequence, setExpandedSequence] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const handleToggleSequence = (id: string) => {
    setSequences(sequences.map(seq => 
      seq.id === id ? { ...seq, active: !seq.active } : seq
    ));
    
    const sequence = sequences.find(seq => seq.id === id);
    if (sequence) {
      toast({
        title: sequence.active ? "Sequence paused" : "Sequence activated",
        description: `"${sequence.name}" is now ${sequence.active ? "paused" : "running"}`,
        duration: 3000,
      });
    }
  };

  const handleToggleExpand = (id: string) => {
    setExpandedSequence(expandedSequence === id ? null : id);
  };

  const handleEditSequence = (sequence: FollowUpSequence) => {
    setEditingSequence({ ...sequence });
  };

  const handleDeleteSequence = (id: string) => {
    const sequence = sequences.find(seq => seq.id === id);
    if (sequence) {
      toast({
        title: "Sequence deleted",
        description: `"${sequence.name}" has been deleted`,
        duration: 3000,
      });
      setSequences(sequences.filter(seq => seq.id !== id));
    }
  };

  const handleDuplicateSequence = (sequence: FollowUpSequence) => {
    const newSequence = {
      ...sequence,
      id: `seq-${Date.now()}`,
      name: `${sequence.name} (Copy)`,
      active: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setSequences([...sequences, newSequence]);
    
    toast({
      title: "Sequence duplicated",
      description: `Created a copy of "${sequence.name}"`,
      duration: 3000,
    });
  };

  const handleSaveSequence = () => {
    if (!editingSequence) return;
    
    if (editingSequence.id.startsWith('new-')) {
      // Creating a new sequence
      const newSequence = {
        ...editingSequence,
        id: `seq-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0],
        leadsCount: 0,
        completionRate: 0,
      };
      
      setSequences([...sequences, newSequence]);
      
      toast({
        title: "Sequence created",
        description: `"${newSequence.name}" has been created`,
        duration: 3000,
      });
    } else {
      // Editing existing sequence
      setSequences(sequences.map(seq => 
        seq.id === editingSequence.id ? editingSequence : seq
      ));
      
      toast({
        title: "Sequence updated",
        description: `"${editingSequence.name}" has been updated`,
        duration: 3000,
      });
    }
    
    setEditingSequence(null);
  };

  const handleAddSequence = () => {
    const newSequence: FollowUpSequence = {
      id: `new-${Date.now()}`,
      name: 'New Follow-Up Sequence',
      description: 'Enter a description for this sequence',
      steps: [
        {
          id: `step-${Date.now()}`,
          type: 'message',
          content: 'Hi {{first_name}}, I wanted to follow up on our recent conversation.',
          enabled: true,
        }
      ],
      active: false,
      leadsCount: 0,
      completionRate: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setEditingSequence(newSequence);
  };

  const handleAddStep = () => {
    if (!editingSequence) return;
    
    const newStep: FollowUpStep = {
      id: `step-${Date.now()}`,
      type: 'message',
      content: '',
      enabled: true,
    };
    
    setEditingSequence({
      ...editingSequence,
      steps: [...editingSequence.steps, newStep],
    });
  };

  const handleUpdateStep = (stepId: string, updates: Partial<FollowUpStep>) => {
    if (!editingSequence) return;
    
    setEditingSequence({
      ...editingSequence,
      steps: editingSequence.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      ),
    });
  };

  const handleRemoveStep = (stepId: string) => {
    if (!editingSequence) return;
    
    setEditingSequence({
      ...editingSequence,
      steps: editingSequence.steps.filter(step => step.id !== stepId),
    });
  };

  const filteredSequences = sequences.filter(seq => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return seq.active;
    if (activeTab === 'inactive') return !seq.active;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Follow-Up Automation</h2>
          <p className="text-muted-foreground">Create and manage automated follow-up sequences for leads and prospects</p>
        </div>
        <Button onClick={handleAddSequence}>
          <Plus className="mr-2 h-4 w-4" />
          New Sequence
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Sequences</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
      </Tabs>

      {!editingSequence ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredSequences.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-6">
              <div className="text-center space-y-2">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">No sequences found</h3>
                <p className="text-muted-foreground">
                  Create your first follow-up sequence to start automating your communications.
                </p>
                <Button onClick={handleAddSequence} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Sequence
                </Button>
              </div>
            </Card>
          ) : (
            filteredSequences.map(sequence => (
              <Card key={sequence.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{sequence.name}</CardTitle>
                        <Badge variant={sequence.active ? "default" : "secondary"}>
                          {sequence.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <CardDescription>{sequence.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleToggleSequence(sequence.id)}
                      >
                        {sequence.active ? (
                          <PauseCircle className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleExpand(sequence.id)}
                      >
                        {expandedSequence === sequence.id ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-muted-foreground">Leads: </span>
                        <span className="font-medium">{sequence.leadsCount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completion: </span>
                        <span className="font-medium">{sequence.completionRate}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Steps: </span>
                        <span className="font-medium">{sequence.steps.length}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created: </span>
                      <span className="font-medium">{sequence.createdAt}</span>
                    </div>
                  </div>

                  {expandedSequence === sequence.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 border rounded-md p-4 space-y-4"
                    >
                      {sequence.steps.map((step, index) => (
                        <div 
                          key={step.id} 
                          className="p-3 border rounded-md bg-muted/30"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">
                                  {step.type === 'message' && 'Message'}
                                  {step.type === 'wait' && 'Wait'}
                                  {step.type === 'task' && 'Task'}
                                </Badge>
                                {step.waitDays && (
                                  <span className="text-xs text-muted-foreground">
                                    {step.waitDays} days
                                  </span>
                                )}
                                {step.taskType && (
                                  <span className="text-xs text-muted-foreground">
                                    {step.taskType}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm whitespace-pre-line">{step.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-0">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDuplicateSequence(sequence)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditSequence(sequence)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteSequence(sequence.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSequence.id.startsWith('new-') ? 'Create Sequence' : 'Edit Sequence'}
            </CardTitle>
            <CardDescription>
              {editingSequence.id.startsWith('new-') 
                ? 'Create a new automated follow-up sequence' 
                : `Editing "${editingSequence.name}"`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sequence-name">Sequence Name</Label>
                <Input
                  id="sequence-name"
                  value={editingSequence.name}
                  onChange={(e) => setEditingSequence({
                    ...editingSequence,
                    name: e.target.value
                  })}
                  placeholder="Enter sequence name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sequence-description">Description</Label>
                <Textarea
                  id="sequence-description"
                  value={editingSequence.description}
                  onChange={(e) => setEditingSequence({
                    ...editingSequence,
                    description: e.target.value
                  })}
                  placeholder="Describe the purpose of this sequence"
                  rows={2}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="sequence-active"
                  checked={editingSequence.active}
                  onCheckedChange={(checked) => setEditingSequence({
                    ...editingSequence,
                    active: checked
                  })}
                />
                <Label htmlFor="sequence-active">Sequence is active</Label>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Sequence Steps</h3>
                <Button variant="outline" size="sm" onClick={handleAddStep}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
              
              <div className="space-y-4">
                {editingSequence.steps.map((step, index) => (
                  <div 
                    key={step.id} 
                    className="border rounded-md p-4 space-y-4 bg-muted/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {index + 1}
                        </div>
                        <Select
                          value={step.type}
                          onValueChange={(value: 'message' | 'wait' | 'task') => 
                            handleUpdateStep(step.id, { type: value })
                          }
                        >
                          <Label className="sr-only">Step Type</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Type:</span>
                            <div className="flex-1">
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select step type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="message">Message</SelectItem>
                                <SelectItem value="wait">Wait Period</SelectItem>
                                <SelectItem value="task">Task</SelectItem>
                              </SelectContent>
                            </div>
                          </div>
                        </Select>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveStep(step.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {step.type === 'wait' ? (
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={`wait-days-${step.id}`}>Wait for</Label>
                        <Input
                          id={`wait-days-${step.id}`}
                          type="number"
                          className="w-20"
                          value={step.waitDays || 1}
                          min={1}
                          max={30}
                          onChange={(e) => handleUpdateStep(step.id, { 
                            waitDays: parseInt(e.target.value) || 1 
                          })}
                        />
                        <span>days</span>
                      </div>
                    ) : step.type === 'task' ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`task-content-${step.id}`}>Task Description</Label>
                          <Textarea
                            id={`task-content-${step.id}`}
                            value={step.content}
                            onChange={(e) => handleUpdateStep(step.id, { 
                              content: e.target.value 
                            })}
                            placeholder="Describe the task"
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`task-type-${step.id}`}>Task Type</Label>
                          <Select
                            value={step.taskType || 'other'}
                            onValueChange={(value: 'call' | 'email' | 'meeting' | 'other') => 
                              handleUpdateStep(step.id, { taskType: value })
                            }
                          >
                            <SelectTrigger id={`task-type-${step.id}`}>
                              <SelectValue placeholder="Select task type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="call">Phone Call</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="meeting">Meeting</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor={`step-content-${step.id}`}>Message Content</Label>
                        <Textarea
                          id={`step-content-${step.id}`}
                          value={step.content}
                          onChange={(e) => handleUpdateStep(step.id, { 
                            content: e.target.value 
                          })}
                          placeholder="Write your message content"
                          rows={4}
                        />
                        <div className="text-xs text-muted-foreground">
                          Use variables like {"{{"} first_name {"}}"}  to personalize your message
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`step-enabled-${step.id}`}
                        checked={step.enabled}
                        onCheckedChange={(checked) => handleUpdateStep(step.id, { 
                          enabled: checked 
                        })}
                      />
                      <Label htmlFor={`step-enabled-${step.id}`}>Step is enabled</Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">Available Personalization Variables</h4>
              <div className="flex flex-wrap gap-2">
                {personalizationVariables.map(variable => (
                  <Badge key={variable.name} variant="secondary" className="cursor-pointer">
                    {"{{"} {variable.name} {"}}"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setEditingSequence(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveSequence}>
              <Save className="mr-2 h-4 w-4" />
              {editingSequence.id.startsWith('new-') ? 'Create Sequence' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default FollowUpAutomation;
