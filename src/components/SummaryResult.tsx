import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Download, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SummaryResultProps {
  summary: string;
  isLoading?: boolean;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary, isLoading }) => {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "Copied!",
        description: "Summary copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Summary saved to your downloads",
    });
  };

  if (isLoading) {
    return (
      <Card variant="glow" className="animate-pulse">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg animate-spin flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <div className="h-5 bg-muted rounded w-32 mb-2"></div>
              <div className="h-4 bg-muted rounded w-48"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </CardContent>
      </Card>
    );
  }

  if (!summary) return null;

  return (
    <Card variant="glow" className="animate-in slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-accent">
            <Sparkles className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Summary</h3>
            <p className="text-sm text-muted-foreground font-normal">
              Key insights and main points extracted
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
              {summary}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="success" 
            onClick={copyToClipboard}
            className="flex-1"
          >
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </Button>
          
          <Button 
            variant="outline" 
            onClick={downloadSummary}
            className="flex-1"
          >
            <Download className="h-4 w-4" />
            Download Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryResult;