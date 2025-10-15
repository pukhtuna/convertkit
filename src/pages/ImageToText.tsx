import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Tesseract from "tesseract.js";

const ImageToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setExtractedText("");
    setIsProcessing(true);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(
        selectedFile,
        "eng",
        {
          logger: (m) => {
            if (m.status === "recognizing text") {
              setProgress(Math.round(m.progress * 100));
            }
          },
        }
      );

      setExtractedText(result.data.text);
      toast({
        title: "Success!",
        description: "Text extracted from image successfully.",
      });
    } catch (error) {
      console.error("Error extracting text:", error);
      toast({
        title: "Error",
        description: "Failed to extract text from image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.split(".")[0]}_extracted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Image to Text (OCR)
          </h1>
          <p className="text-muted-foreground">
            Extract text from images using optical character recognition
          </p>
        </div>

        <Card className="p-8 shadow-card mb-6">
          <FileUploader
            onFileSelect={handleFileSelect}
            accept="image/*"
            disabled={isProcessing}
          />

          {file && (
            <div className="mt-6 p-4 bg-accent/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Selected file: <span className="font-medium text-foreground">{file.name}</span>
              </p>
            </div>
          )}
        </Card>

        {isProcessing && (
          <Card className="p-8 shadow-card">
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-lg font-medium">Processing your image...</p>
              <div className="w-full max-w-xs">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {progress}% complete
                </p>
              </div>
            </div>
          </Card>
        )}

        {extractedText && !isProcessing && (
          <Card className="p-8 shadow-card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Extracted Text</h2>
              <Button onClick={handleDownload} className="gradient-primary">
                <Download className="w-4 h-4 mr-2" />
                Download Text
              </Button>
            </div>
            <Textarea
              value={extractedText}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageToText;
