
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  Inbox, 
  UserPlus, 
  Users, 
  MessageCircle, 
  CheckCheck, 
  AlertCircle, 
  Play, 
  Pause,
  Edit, 
  Trash2,
  Plus,
  Calendar,
  ArrowRight,
  ChevronDown, 
  ChevronUp,
  Filter,
  Save
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  company: string;
  position: string;
  avatar: string;
  status: 'new' | 'contacted' | 'responded' | 'nurturing' | 'qualified' | 'converted';
  lastActivity: string;
  lastMessage?: string;
  nextFollowUp?: string;
  tags: string[];
  engagementScore: number;
  platform: 'linkedin' | 'twitter' | 'email';
}

interface FollowUpTemplate {
  id: string;
  name: string;
  description: string;
  triggers: {
    event: 'connection_accepted' | 'no_response' | 'message_received' | 'profile_viewed' | 'custom';
    delay: number; // days
    delayType: 'days' | 'hours';
    enabled: boolean;
  }[];
  messages: {
    id: string;
    subject?: string;
    content: string;
    enabled: boolean;
  }[];
  isActive: boolean;
  statistics: {
    sent: number;
    opened: number;
    replied: number;
    converted: number;
  };
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    company: 'TechCorp',
    position: 'CTO',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'contacted',
    lastActivity: '2 days ago',
    lastMessage: 'Thanks for connecting, would love to discuss your tech needs.',
    nextFollowUp: 'Tomorrow',
    tags: ['tech', 'decision-maker'],
    engagementScore: 65,
    platform: 'linkedin'
  },
  {
    id: '2',
    name: 'Sara Wilson',
    company: 'MarketBoost',
    position: 'Marketing Director',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    status: 'responded',
    lastActivity: '12 hours ago',
    lastMessage: 'I'd be interested in learning more about your services.',
    nextFollowUp: '3 days',
    tags: ['marketing', 'interested'],
    engagementScore: 82,
    platform: 'linkedin'
  },
  {
    id: '3',
    name: 'Michael Chen',
    company: 'GrowthLabs',
    position: 'CEO',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    status: 'new',
    lastActivity: '5 days ago',
    tags: ['founder', 'startup'],
    engagementScore: 45,
    platform: 'twitter'
  },
  {
    id: '4',
    name: 'Emily Johnson',
    company: 'InnoTech Solutions',
    position: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    status: 'nurturing',
    lastActivity: '1 day ago',
    lastMessage: 'Let's schedule a call next week to discuss further.',
    nextFollowUp: '5 days',
    tags: ['product', 'mid-funnel'],
    engagementScore: 78,
    platform: 'linkedin'
  },
  {
    id: '5',
    name: 'David Williams',
    company: 'Enterprise Systems',
    position: 'Sales Manager',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    status: 'qualified',
    lastActivity: '3 hours ago',
    lastMessage: 'I'll bring this up in our next team meeting.',
    nextFollowUp: '2 days',
    tags: ['sales', 'enterprise', 'qualified'],
    engagementScore: 92,
    platform: 'email'
  }
];

const mockTemplates: FollowUpTemplate[] = [
  {
    id: '1',
    name: 'New Connection Nurture',
    description: 'Follow up sequence after a new connection accepts',
    triggers: [
      {
        event: 'connection_accepted',
        delay: 1,
        delayType: 'days',
        enabled: true
      }
    ],
    messages: [
      {
        id: 'm1',
        content: 'Thanks for connecting! I noticed you work in {{industry}} - I'd love to learn more about what you're working on at {{company}}.',
        enabled: true
      },
      {
        id: 'm2',
        content: 'Hi {{first_name}}, just following up on my previous message. I thought you might be interested in this article about {{industry}} trends: [link]. Would love to hear your thoughts!',
        enabled: true
      },
      {
        id: 'm3',
        content: 'Hi {{first_name}}, I wanted to share a case study about how we helped a company similar to {{company}} increase their growth by 43%. Would this be relevant to your current priorities?',
        enabled: true
      }
    ],
    isActive: true,
    statistics: {
      sent: 128,
      opened: 87,
      replied: 42,
      converted: 18
    }
  },
  {
    id: '2',
    name: 'Conference Follow-up',
    description: 'Follow up with contacts met at a conference',
    triggers: [
      {
        event: 'custom',
        delay: 1,
        delayType: 'days',
        enabled: true
      }
    ],
    messages: [
      {
        id: 'm1',
        content: 'Hi {{first_name}}, it was great meeting you at {{custom_field_1}}! I enjoyed our conversation about {{custom_field_2}}.',
        enabled: true
      },
      {
        id: 'm2',
        content: 'Hello {{first_name}}, I just wanted to check in and see if you had a chance to think about what we discussed at the conference? I'd be happy to schedule a follow-up call.',
        enabled: true
      }
    ],
    isActive: false,
    statistics: {
      sent: 45,
      opened: 38,
      replied: 22,
      converted: 8
    }
  }
];

const FollowUpAutomation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [templates, setTemplates] = useState<FollowUpTemplate[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedContact, setExpandedContact] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<FollowUpTemplate | null>(null);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const toggleExpandContact = (id: string) => {
    if (expandedContact === id) {
      setExpandedContact(null);
    } else {
      setExpandedContact(id);
    }
  };
  
  const toggleExpandTemplate = (id: string) => {
    if (expandedTemplate === id) {
      setExpandedTemplate(null);
    } else {
      setExpandedTemplate(id);
    }
  };
  
  const toggleTemplateStatus = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
    
    const template = templates.find(t => t.id === id);
    if (template) {
      toast({
        title: template.isActive ? "Automation paused" : "Automation activated",
        description: `"${template.name}" is now ${template.isActive ? "paused" : "active"}`,
        duration: 3000,
      });
    }
  };

  const handleFollowUpNow = (contact: Contact) => {
    toast({
      title: "Follow-up sent",
      description: `Your message has been sent to ${contact.name}`,
      duration: 3000,
    });
  };
  
  const handleCreateTemplate = () => {
    const newTemplate: FollowUpTemplate = {
      id: `template-${Date.now()}`,
      name: 'New Follow-up Sequence',
      description: 'Enter a description for this sequence',
      triggers: [
        {
          event: 'connection_accepted',
          delay: 1,
          delayType: 'days',
          enabled: true
        }
      ],
      messages: [
        {
          id: `msg-${Date.now()}`,
          content: 'Enter your message content here. Use {{variables}} for personalization.',
          enabled: true
        }
      ],
      isActive: false,
      statistics: {
        sent: 0,
        opened: 0,
        replied: 0,
        converted: 0
      }
    };
    
    setEditingTemplate(newTemplate);
  };
  
  const handleEditTemplate = (template: FollowUpTemplate) => {
    setEditingTemplate({ ...template });
  };
  
  const handleDeleteTemplate = (id: string) => {
    const template = templates.find(t => t.id === id);
    if (template) {
      setTemplates(templates.filter(t => t.id !== id));
      toast({
        title: "Template deleted",
        description: `"${template.name}" has been deleted`,
        duration: 3000,
      });
    }
  };
  
  const handleAddMessage = () => {
    if (!editingTemplate) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      content: 'Enter your message content here.',
      enabled: true
    };
    
    setEditingTemplate({
      ...editingTemplate,
      messages: [...editingTemplate.messages, newMessage]
    });
  };
  
  const handleAddTrigger = () => {
    if (!editingTemplate) return;
    
    const newTrigger = {
      event: 'custom' as const,
      delay: 1,
      delayType: 'days' as const,
      enabled: true
    };
    
    setEditingTemplate({
      ...editingTemplate,
      triggers: [...editingTemplate.triggers, newTrigger]
    });
  };
  
  const handleUpdateMessage = (messageId: string, updates: Partial<{content: string, enabled: boolean}>) => {
    if (!editingTemplate) return;
    
    setEditingTemplate({
      ...editingTemplate,
      messages: editingTemplate.messages.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    });
  };
  
  const handleUpdateTrigger = (index: number, updates: Partial<FollowUpTemplate['triggers'][0]>) => {
    if (!editingTemplate) return;
    
    setEditingTemplate({
      ...editingTemplate,
      triggers: editingTemplate.triggers.map((trigger, i) => 
        i === index ? { ...trigger, ...updates } : trigger
      )
    });
  };
  
  const handleDeleteMessage = (messageId: string) => {
    if (!editingTemplate) return;
    
    setEditingTemplate({
      ...editingTemplate,
      messages: editingTemplate.messages.filter(msg => msg.id !== messageId)
    });
  };
  
  const handleDeleteTrigger = (index: number) => {
    if (!editingTemplate) return;
    
    setEditingTemplate({
      ...editingTemplate,
      triggers: editingTemplate.triggers.filter((_, i) => i !== index)
    });
  };
  
  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    
    if (editingTemplate.name.trim() === '') {
      toast({
        title: "Error",
        description: "Template name cannot be empty",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (editingTemplate.messages.length === 0) {
      toast({
        title: "Error",
        description: "Template must have at least one message",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    const existingTemplateIndex = templates.findIndex(t => t.id === editingTemplate.id);
    
    if (existingTemplateIndex >= 0) {
      // Update existing template
      const updatedTemplates = [...templates];
      updatedTemplates[existingTemplateIndex] = editingTemplate;
      setTemplates(updatedTemplates);
      
      toast({
        title: "Template updated",
        description: `"${editingTemplate.name}" has been updated`,
        duration: 3000,
      });
    } else {
      // Add new template
      setTemplates([...templates, editingTemplate]);
      
      toast({
        title: "Template created",
        description: `"${editingTemplate.name}" has been created`,
        duration: 3000,
      });
    }
    
    setEditingTemplate(null);
  };

  const filteredContacts = contacts.filter(contact => {
    // Filter by search query
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'outline';
      case 'contacted': return 'secondary';
      case 'responded': return 'default';
      case 'nurturing': return 'blue';
      case 'qualified': return 'green';
      case 'converted': return 'purple';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'responded': return 'Responded';
      case 'nurturing': return 'Nurturing';
      case 'qualified': return 'Qualified';
      case 'converted': return 'Converted';
      default: return status;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Follow-up Automation</h2>
        <p className="text-muted-foreground">
          Manage contacts and automate follow-up sequences to nurture relationships
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Contacts ({contacts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="sequences" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            <span>Sequences ({templates.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="pt-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search contacts by name, company, or position..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="nurturing">Nurturing</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No contacts found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters to find contacts.
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map(contact => (
                <Card key={contact.id} className="overflow-hidden">
                  <CardHeader className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img 
                          src={contact.avatar} 
                          alt={contact.name} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          <CardDescription>
                            {contact.position} at {contact.company}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={getStatusBadgeVariant(contact.status)}>
                              {getStatusLabel(contact.status)}
                            </Badge>
                            {contact.nextFollowUp && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>Follow-up: {contact.nextFollowUp}</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Engagement</div>
                          <div className="text-lg font-bold">{contact.engagementScore}%</div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => toggleExpandContact(contact.id)}
                        >
                          {expandedContact === contact.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedContact === contact.id && (
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Engagement Score</h4>
                          <Progress 
                            value={contact.engagementScore} 
                            className="h-2"
                            indicatorClassName={getScoreColor(contact.engagementScore)}
                          />
                        </div>
                        
                        {contact.lastMessage && (
                          <div>
                            <h4 className="text-sm font-medium mb-2">Last Message</h4>
                            <div className="p-3 bg-muted/30 rounded-md text-sm">
                              {contact.lastMessage}
                            </div>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {contact.tags.map(tag => (
                              <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Last activity: {contact.lastActivity}
                          </div>
                          <div className="text-sm">
                            Platform: {contact.platform}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                  
                  <CardFooter className="py-3 px-6 flex justify-end gap-2 bg-muted/20">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-3.5 w-3.5" />
                      <span>Notes</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      <span>Schedule</span>
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleFollowUpNow(contact)}
                    >
                      <MessageCircle className="mr-2 h-3.5 w-3.5" />
                      <span>Follow Up</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sequences" className="pt-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Follow-up Sequences</h3>
            <Button onClick={handleCreateTemplate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Sequence
            </Button>
          </div>

          {editingTemplate ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {templates.some(t => t.id === editingTemplate.id) 
                    ? 'Edit Sequence' 
                    : 'Create Sequence'}
                </CardTitle>
                <CardDescription>
                  Define trigger events and follow-up messages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="template-name" className="text-sm font-medium block mb-1">
                      Sequence Name
                    </label>
                    <Input
                      id="template-name"
                      value={editingTemplate.name}
                      onChange={(e) => setEditingTemplate({ 
                        ...editingTemplate, 
                        name: e.target.value 
                      })}
                      placeholder="Enter sequence name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="template-description" className="text-sm font-medium block mb-1">
                      Description
                    </label>
                    <Textarea
                      id="template-description"
                      value={editingTemplate.description}
                      onChange={(e) => setEditingTemplate({ 
                        ...editingTemplate, 
                        description: e.target.value 
                      })}
                      placeholder="Describe the purpose of this sequence"
                      rows={2}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">Trigger Events</h4>
                    <Button variant="outline" size="sm" onClick={handleAddTrigger}>
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      Add Trigger
                    </Button>
                  </div>
                  
                  {editingTemplate.triggers.length === 0 ? (
                    <div className="text-center py-6 border border-dashed rounded-md">
                      <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No triggers defined</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={handleAddTrigger}
                      >
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add Trigger
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editingTemplate.triggers.map((trigger, index) => (
                        <div key={index} className="p-4 border rounded-md bg-muted/30">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                {index + 1}
                              </div>
                              <h5 className="text-sm font-medium">Trigger Event</h5>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteTrigger(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium block mb-1">
                                Event Type
                              </label>
                              <Select
                                value={trigger.event}
                                onValueChange={(value: any) => handleUpdateTrigger(index, { event: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="connection_accepted">Connection Accepted</SelectItem>
                                  <SelectItem value="no_response">No Response</SelectItem>
                                  <SelectItem value="message_received">Message Received</SelectItem>
                                  <SelectItem value="profile_viewed">Profile Viewed</SelectItem>
                                  <SelectItem value="custom">Custom Event</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-end gap-2">
                              <div className="flex-1">
                                <label className="text-sm font-medium block mb-1">
                                  Wait Period
                                </label>
                                <Input
                                  type="number"
                                  min={0}
                                  value={trigger.delay}
                                  onChange={(e) => handleUpdateTrigger(index, { 
                                    delay: parseInt(e.target.value) || 0 
                                  })}
                                />
                              </div>
                              <div className="flex-1">
                                <Select
                                  value={trigger.delayType}
                                  onValueChange={(value: 'days' | 'hours') => handleUpdateTrigger(index, { 
                                    delayType: value 
                                  })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="days">Days</SelectItem>
                                    <SelectItem value="hours">Hours</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center">
                            <Switch
                              id={`trigger-enabled-${index}`}
                              checked={trigger.enabled}
                              onCheckedChange={(checked) => handleUpdateTrigger(index, { 
                                enabled: checked 
                              })}
                            />
                            <label 
                              htmlFor={`trigger-enabled-${index}`}
                              className="ml-2 text-sm"
                            >
                              Trigger is active
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">Follow-up Messages</h4>
                    <Button variant="outline" size="sm" onClick={handleAddMessage}>
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      Add Message
                    </Button>
                  </div>
                  
                  {editingTemplate.messages.length === 0 ? (
                    <div className="text-center py-6 border border-dashed rounded-md">
                      <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No messages defined</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={handleAddMessage}
                      >
                        <Plus className="mr-2 h-3.5 w-3.5" />
                        Add Message
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editingTemplate.messages.map((message, index) => (
                        <div key={message.id} className="p-4 border rounded-md bg-muted/30">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-medium">
                                {index + 1}
                              </div>
                              <h5 className="text-sm font-medium">Message {index + 1}</h5>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium block mb-1">
                                Message Content
                              </label>
                              <Textarea
                                value={message.content}
                                onChange={(e) => handleUpdateMessage(message.id, { 
                                  content: e.target.value 
                                })}
                                placeholder="Write your follow-up message..."
                                rows={4}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Use {{'{{'}}first_name{{'}}'}} or {{'{{'}}company{{'}}'}} for personalization
                              </p>
                            </div>
                            
                            <div className="flex items-center">
                              <Switch
                                id={`message-enabled-${message.id}`}
                                checked={message.enabled}
                                onCheckedChange={(checked) => handleUpdateMessage(message.id, { 
                                  enabled: checked 
                                })}
                              />
                              <label 
                                htmlFor={`message-enabled-${message.id}`}
                                className="ml-2 text-sm"
                              >
                                Message is active
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="template-active"
                    checked={editingTemplate.isActive}
                    onCheckedChange={(checked) => setEditingTemplate({
                      ...editingTemplate,
                      isActive: checked
                    })}
                  />
                  <label htmlFor="template-active" className="text-sm">
                    Activate sequence immediately
                  </label>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Available Personalization Variables</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{{'{{'}}first_name{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}last_name{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}company{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}position{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}industry{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}custom_field_1{{'}}'}}</Badge>
                    <Badge variant="secondary">{{'{{'}}custom_field_2{{'}}'}}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setEditingTemplate(null)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveTemplate}>
                  <Save className="mr-2 h-4 w-4" />
                  {templates.some(t => t.id === editingTemplate.id) 
                    ? 'Save Changes' 
                    : 'Create Sequence'}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <>
              {templates.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No sequences created yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Create automated follow-up sequences to nurture your connections 
                      and move them through your sales funnel.
                    </p>
                    <Button onClick={handleCreateTemplate}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Sequence
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {templates.map(template => (
                    <Card key={template.id}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{template.name}</CardTitle>
                            <CardDescription>{template.description}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant={template.isActive ? "default" : "outline"} 
                              size="sm"
                              onClick={() => toggleTemplateStatus(template.id)}
                            >
                              {template.isActive ? (
                                <>
                                  <Pause className="mr-2 h-4 w-4" />
                                  <span>Pause</span>
                                </>
                              ) : (
                                <>
                                  <Play className="mr-2 h-4 w-4" />
                                  <span>Activate</span>
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleExpandTemplate(template.id)}
                            >
                              {expandedTemplate === template.id ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Triggers: </span>
                            <span className="font-medium">{template.triggers.filter(t => t.enabled).length}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Messages: </span>
                            <span className="font-medium">{template.messages.filter(m => m.enabled).length}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status: </span>
                            <span className={template.isActive ? "text-green-600 font-medium dark:text-green-400" : "text-amber-600 font-medium dark:text-amber-400"}>
                              {template.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        
                        {expandedTemplate === template.id && (
                          <div className="mt-4 space-y-6">
                            <div>
                              <h4 className="text-sm font-medium mb-3">Performance</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-muted/30 p-3 rounded-md text-center">
                                  <div className="text-lg font-bold">{template.statistics.sent}</div>
                                  <div className="text-xs text-muted-foreground">Messages Sent</div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-md text-center">
                                  <div className="text-lg font-bold">{template.statistics.opened}</div>
                                  <div className="text-xs text-muted-foreground">Opened</div>
                                </div>
                                <div className="bg-muted/30 p-3 rounded-md text-center">
                                  <div className="text-lg font-bold">{template.statistics.replied}</div>
                                  <div className="text-xs text-muted-foreground">Replied</div>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-center">
                                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                    {template.statistics.converted}
                                  </div>
                                  <div className="text-xs text-green-600 dark:text-green-400">Converted</div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-3">Trigger Events</h4>
                              <div className="space-y-2">
                                {template.triggers.map((trigger, index) => (
                                  <div 
                                    key={index}
                                    className="p-3 border rounded-md bg-muted/20 flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                        trigger.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                      }`}>
                                        {index + 1}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">
                                          {trigger.event === 'connection_accepted' && 'Connection Accepted'}
                                          {trigger.event === 'no_response' && 'No Response'}
                                          {trigger.event === 'message_received' && 'Message Received'}
                                          {trigger.event === 'profile_viewed' && 'Profile Viewed'}
                                          {trigger.event === 'custom' && 'Custom Event'}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                                          <Clock className="h-3 w-3" />
                                          <span>Wait {trigger.delay} {trigger.delayType}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Badge variant={trigger.enabled ? "default" : "outline"} className="ml-auto">
                                      {trigger.enabled ? 'Active' : 'Inactive'}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-3">Follow-up Messages</h4>
                              <div className="space-y-3">
                                {template.messages.map((message, index) => (
                                  <div 
                                    key={message.id}
                                    className="p-3 border rounded-md bg-muted/20"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                          message.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                        }`}>
                                          {index + 1}
                                        </div>
                                        <div className="text-sm font-medium">Message {index + 1}</div>
                                      </div>
                                      <Badge variant={message.enabled ? "default" : "outline"}>
                                        {message.enabled ? 'Active' : 'Inactive'}
                                      </Badge>
                                    </div>
                                    <div className="text-sm mt-2">{message.content}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="flex-1 h-px bg-muted"></div>
                              <div className="px-2 text-xs text-muted-foreground">Sequence Flow</div>
                              <div className="flex-1 h-px bg-muted"></div>
                            </div>
                            
                            <div className="flex flex-col items-center">
                              <div className="p-2 border rounded-md bg-primary/10 text-primary text-sm">
                                Trigger Event
                              </div>
                              <ArrowRight className="h-6 w-6 my-1 text-muted-foreground" />
                              <div className="p-2 border rounded-md bg-muted/30 text-sm">
                                Wait Period
                              </div>
                              <ArrowRight className="h-6 w-6 my-1 text-muted-foreground" />
                              <div className="p-2 border rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">
                                First Message
                              </div>
                              {template.messages.length > 1 && (
                                <>
                                  <ArrowRight className="h-6 w-6 my-1 text-muted-foreground" />
                                  <div className="p-2 border rounded-md bg-muted/30 text-sm">
                                    Wait Period
                                  </div>
                                  <ArrowRight className="h-6 w-6 my-1 text-muted-foreground" />
                                  <div className="p-2 border rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm">
                                    Follow-up Messages
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FollowUpAutomation;
