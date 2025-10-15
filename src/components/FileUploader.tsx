import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
}

export const FileUploader = ({ 
  onFileSelect, 
  accept, 
  maxSize = 10485760, // 10MB default
  disabled = false 
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    maxSize,
    multiple: false,
    disabled
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center transition-smooth cursor-pointer",
        isDragActive 
          ? "border-primary bg-primary/5 shadow-card" 
          : "border-border hover:border-primary hover:bg-accent/5",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <>
            <File className="w-16 h-16 text-primary animate-bounce" />
            <p className="text-lg font-medium text-primary">Drop your file here</p>
          </>
        ) : (
          <>
            <div className="inline-flex p-4 rounded-full gradient-primary">
              <Upload className="w-12 h-12 text-white" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-1">
                Drag & drop your file here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
          </>
        )}
        
        {fileRejections.length > 0 && (
          <p className="text-sm text-destructive">
            {fileRejections[0].errors[0].message}
          </p>
        )}
      </div>
    </div>
  );
};
