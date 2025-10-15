import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker - using the bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href;

const PdfToText = () => {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setExtractedText("");
    setIsProcessing(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");
        fullText += pageText + "\n\n";
      }

      setExtractedText(fullText.trim());
      toast({
        title: "Success!",
        description: "Text extracted from PDF successfully.",
      });
    } catch (error) {
      console.error("Error extracting text:", error);
      toast({
        title: "Error",
        description: "Failed to extract text from PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([extractedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file?.name.replace(".pdf", "")}_extracted.txt`;
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
            PDF to Text
          </h1>
          <p className="text-muted-foreground">
            Extract text content from your PDF files instantly
          </p>
        </div>

        <Card className="p-8 shadow-card mb-6">
          <FileUploader
            onFileSelect={handleFileSelect}
            accept="application/pdf"
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
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <p className="text-lg font-medium">Processing your PDF...</p>
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

export default PdfToText;
