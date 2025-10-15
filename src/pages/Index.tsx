import { ConversionCard } from "@/components/ConversionCard";
import { FileText, Image, FileType2, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="p-3 rounded-xl gradient-primary shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            ConvertKit
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your files with ease. Free, fast, and secure conversion tools at your fingertips.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ConversionCard
            title="PDF to Text"
            description="Extract text content from PDF documents instantly"
            icon={FileText}
            to="/pdf-to-text"
            gradient="primary"
          />
          
          <ConversionCard
            title="Image to Text"
            description="Use OCR to extract text from images and scanned documents"
            icon={Image}
            to="/image-to-text"
            gradient="secondary"
          />
          
          <ConversionCard
            title="Text to PDF"
            description="Convert plain text into professional PDF documents"
            icon={FileType2}
            to="/text-to-pdf"
            gradient="primary"
          />
        </div>

        <footer className="mt-20 text-center text-sm text-muted-foreground">
          <p>All conversions happen in your browser. Your files never leave your device.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
