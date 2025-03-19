
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Plus, FileText } from 'lucide-react';
import linkedinService, { WritingSample } from '@/services/linkedinService';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const WritingSamples = () => {
  const { toast } = useToast();
  const [samples, setSamples] = useState<WritingSample[]>([]);
  const [newSample, setNewSample] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Load writing samples on component mount
    const loadedSamples = linkedinService.getWritingSamples();
    setSamples(loadedSamples);
  }, []);

  const handleAddSample = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newSample.trim()) {
      toast({
        title: "Error",
        description: "Please enter a writing sample",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const addedSample = linkedinService.addWritingSample(newSample);
      setSamples(prev => [...prev, addedSample]);
      setNewSample('');
      
      toast({
        title: "Success",
        description: "Writing sample added successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error adding writing sample:', error);
      toast({
        title: "Error",
        description: "Failed to add writing sample",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteSample = (id: string) => {
    try {
      const success = linkedinService.deleteWritingSample(id);
      
      if (success) {
        setSamples(prev => prev.filter(sample => sample.id !== id));
        toast({
          title: "Success",
          description: "Writing sample deleted",
          duration: 3000,
        });
      } else {
        throw new Error('Failed to delete sample');
      }
    } catch (error) {
      console.error('Error deleting writing sample:', error);
      toast({
        title: "Error",
        description: "Failed to delete writing sample",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  // Format timestamp to a readable date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          Writing Samples for Style Mimicry
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add examples of your writing style to help the AI generate more personalized comments. 
          The more samples you provide, the better the AI can mimic your unique voice.
        </p>

        <form onSubmit={handleAddSample} className="mb-6">
          <div className="space-y-3">
            <textarea
              value={newSample}
              onChange={(e) => setNewSample(e.target.value)}
              placeholder="Enter a sample of your writing style (e.g., a LinkedIn post or comment you've written in the past)"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 h-32 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newSample.trim()}
              className={cn(
                "w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-white font-medium transition-all duration-200",
                (isSubmitting || !newSample.trim()) 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  <span>Adding Sample...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Sample</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {samples.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-500">
                No writing samples yet. Add your first sample to get started.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-600">{samples.length} Writing Sample(s)</p>
              {samples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  className="bg-white rounded-lg border border-gray-200 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Sample {index + 1}</span>
                    </div>
                    <span className="text-xs text-gray-500">{formatDate(sample.createdAt)}</span>
                  </div>
                  <p className="text-sm mb-3 whitespace-pre-wrap">{sample.content}</p>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDeleteSample(sample.id)}
                      className="text-xs flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WritingSamples;
