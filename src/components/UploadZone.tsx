
import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  onFileUploaded: (fileName: string) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onFileUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    // Check if file is PDF or CSV
    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a PDF or CSV file",
        variant: "destructive"
      });
      return;
    }

    // Simulate file upload
    setIsUploading(true);
    setFileName(file.name);
    
    // Simulate processing time
    setTimeout(() => {
      setIsUploading(false);
      onFileUploaded(file.name);
      
      toast({
        title: "File Uploaded Successfully",
        description: "Your lab report is being analyzed",
      });
    }, 1500);
  }, [onFileUploaded, toast]);

  const handleSampleReport = useCallback(() => {
    setIsUploading(true);
    setFileName("LabReport-Sample.pdf");
    
    // Simulate processing time
    setTimeout(() => {
      setIsUploading(false);
      onFileUploaded("LabReport-Sample.pdf");
      
      toast({
        title: "Sample Report Loaded",
        description: "Viewing sample lab report analysis",
      });
    }, 1000);
  }, [onFileUploaded, toast]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`upload-zone ${isDragging ? 'upload-zone-active' : ''} ${fileName ? 'border-medical-success border-opacity-50' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className={`h-14 w-14 mb-4 ${fileName ? 'text-medical-success' : 'text-medical-primary'}`} />

          {!fileName ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Drag & Drop your CSV/PDF file here or <label className="text-medical-primary cursor-pointer">Browse</label></h3>
              <p className="mt-2 text-gray-600">Upload your lab report to get instant insights</p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">File Received : {fileName}</h3>
              {isUploading ? (
                <p className="mt-2 text-medical-secondary">Analyzing your lab report...</p>
              ) : (
                <p className="mt-2 text-medical-success">Your file has been analyzed successfully</p>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={handleFileInput}
              accept=".pdf,.csv"
            />
            <Button asChild variant="outline" className="gap-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-4 w-4" />
                Upload File
              </label>
            </Button>
            <Button onClick={handleSampleReport} className="gap-2 bg-medical-primary hover:bg-medical-secondary">
              <FileText className="h-4 w-4" />
              Use Sample Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
