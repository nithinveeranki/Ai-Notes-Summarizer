import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isLoading }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="space-y-4">
      <Card 
        variant="glass" 
        className={cn(
          "transition-all duration-200 cursor-pointer border-2 border-dashed",
          isDragActive ? "border-primary bg-primary/5 shadow-glow" : "border-border hover:border-primary/50",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <div {...getRootProps()} className="p-8">
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={cn(
              "flex items-center justify-center w-16 h-16 rounded-full transition-all",
              isDragActive ? "bg-gradient-primary scale-110" : "bg-muted"
            )}>
              <Upload className={cn(
                "h-8 w-8 transition-colors",
                isDragActive ? "text-primary-foreground" : "text-muted-foreground"
              )} />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">
                {isDragActive ? "Drop your file here" : "Upload a document"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to select a file
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX, and TXT files
              </p>
            </div>

            {!isDragActive && (
              <Button variant="outline" size="sm" disabled={isLoading}>
                Choose File
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Uploaded File Display */}
      {uploadedFile && (
        <Card variant="soft" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-accent">
                <File className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent">
                <Check className="h-4 w-4 text-accent-foreground" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileUpload;