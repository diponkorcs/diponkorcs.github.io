import React from "react";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Import PDF worker and styles from react-pdf, needed for proper PDF rendering, copied from react-pdf documentation
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set the worker source for pdfjs, copied from react-pdf documentation
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />

        <h2>Resume.pdf</h2>

        <a
          href="files/DiponkorResume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <Document file="files/DiponkorResume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
