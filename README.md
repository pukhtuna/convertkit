# ConvertKit - Universal File Conversion Platform

A modern, privacy-focused file conversion tool built with React and TypeScript. Convert PDFs to text, extract text from images using OCR, and generate PDFs from text - all in your browser with complete privacy.

## Live: ![live-link](convertkt.netlify.app)

![ConvertKit Preview](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)

## ✨ Features

- **PDF to Text**: Extract text content from PDF documents instantly
- **Image to Text**: Use OCR technology to extract text from images and scanned documents
- **Text to PDF**: Convert plain text into professional PDF documents
- **Privacy-First**: All conversions happen locally in your browser - your files never leave your device
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Fast & Secure**: No server uploads, no data collection, complete privacy

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (recommended: use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```bash
# Clone the repository
git clone https://github.com/pukhtuna/convertkit.git

# Navigate to the project directory
cd convertkit

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **PDF Processing**: PDF.js
- **OCR**: Tesseract.js
- **PDF Generation**: jsPDF
- **Routing**: React Router DOM
- **State Management**: TanStack Query

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ConversionCard.tsx
│   └── FileUploader.tsx
├── pages/              # Page components
│   ├── Index.tsx       # Home page
│   ├── PdfToText.tsx   # PDF to text conversion
│   ├── ImageToText.tsx # Image to text conversion
│   ├── TextToPdf.tsx   # Text to PDF conversion
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css           # Global styles and design system
```

## 🔧 Configuration

The app uses a custom design system defined in `src/index.css` with:

- **Primary Color**: Purple (`262 83% 58%`)
- **Secondary Color**: Green (`142 76% 36%`)
- **Custom Gradients**: Purple-to-magenta and green-to-teal
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in dark mode support

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Other Platforms

The app is a standard Vite React application and can be deployed to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR capabilities
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
- [jsPDF](https://github.com/parallax/jsPDF) for PDF generation

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ using React, TypeScript, and modern web technologies.
