import React from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Type } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Paste your text here...",
  isLoading 
}) => {
  return (
    <Card variant="glass" className="p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary">
          <Type className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Paste your text</h3>
          <p className="text-sm text-muted-foreground">
            Enter or paste the text you want to summarize
          </p>
        </div>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[200px] resize-none border-border/50 focus:border-primary transition-colors"
        disabled={isLoading}
      />
      
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span>{value.length} characters</span>
        <span>Max 10,000 characters</span>
      </div>
    </Card>
  );
};

export default TextInput;