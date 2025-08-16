import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import SummaryResult from "@/components/SummaryResult";
import { Sparkles, FileText, Type } from "lucide-react";
import { summarizeText, readFileContent } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";

const Summarize = () => {
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!textInput.trim() && !selectedFile) {
      toast({
        title: "No content to summarize",
        description: "Please enter text or upload a file first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSummary("");

    try {
      let content = textInput;
      
      if (selectedFile && activeTab === "file") {
        content = await readFileContent(selectedFile);
      }

      const result = await summarizeText({ text: content, file: selectedFile });
      
      if (result.success) {
        setSummary(result.summary);
        toast({
          title: "Summary generated!",
          description: "Your document has been successfully summarized.",
        });
      } else {
        throw new Error(result.error || "Failed to generate summary");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canSummarize = (activeTab === "text" && textInput.trim()) || 
                      (activeTab === "file" && selectedFile);

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          AI-Powered Summarization
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Transform your documents into{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            clear summaries
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload a file or paste your text to get instant AI-powered insights and key takeaways.
        </p>
      </div>

      {/* Input Section */}
      <Card variant="soft" className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            Choose your input method
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-0 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                Paste Text
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Upload File
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-6">
              <TextInput
                value={textInput}
                onChange={setTextInput}
                isLoading={isLoading}
                placeholder="Paste your text here... (max 10,000 characters)"
              />
            </TabsContent>
            
            <TabsContent value="file" className="mt-6">
              <FileUpload
                onFileSelect={setSelectedFile}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>

          {/* Summarize Button */}
          <div className="flex justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={handleSummarize}
              disabled={!canSummarize || isLoading}
              className="min-w-48"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Summary
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {(isLoading || summary) && (
        <div className="space-y-4">
          <SummaryResult summary={summary} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default Summarize;