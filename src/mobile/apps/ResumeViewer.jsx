import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// The PDF renderer (react-pdf + pdf.js) is large, so it lives in its own
// chunk and is only downloaded when the Resume sheet is first opened.
const ResumeViewer = ({ file, width }) => {
  const [numPages, setNumPages] = useState(0);

  return (
    <Document
      file={file}
      onLoadSuccess={({ numPages: n }) => setNumPages(n)}
      loading={<p className="resume-msg">Loading resume…</p>}
      error={<p className="resume-msg">Could not load the resume.</p>}
    >
      {Array.from({ length: numPages }, (_, i) => (
        <div key={i} className="resume-page">
          <Page
            pageNumber={i + 1}
            width={width}
            renderTextLayer
            renderAnnotationLayer
          />
        </div>
      ))}
    </Document>
  );
};

export default ResumeViewer;
