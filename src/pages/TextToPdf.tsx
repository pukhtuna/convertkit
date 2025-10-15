import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

const TextToPdf = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const handleConvert = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      const lineHeight = 7;
      
      // Split text into lines that fit the page width
      const lines = doc.splitTextToSize(text, maxWidth);
      
      let y = margin;
      let pageNumber = 1;

      lines.forEach((line: string, index: number) => {
        // Check if we need a new page
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
          pageNumber++;
        }
        
        doc.text(line, margin, y);
        y += lineHeight;
      });

      doc.save("converted-text.pdf");
      
      toast({
        title: "Success!",
        description: "PDF created and downloaded successfully.",
      });
    } catch (error) {
      console.error("Error creating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to create PDF. Please try again.",
        variant: "destructive",
      });
    }
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
            Text to PDF
          </h1>
          <p className="text-muted-foreground">
            Convert your text into a downloadable PDF document
          </p>
        </div>

        <Card className="p-8 shadow-card">
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              Enter your text
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[400px] font-mono text-sm"
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleConvert}
              disabled={!text.trim()}
              className="gradient-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              Convert to PDF
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TextToPdf;
