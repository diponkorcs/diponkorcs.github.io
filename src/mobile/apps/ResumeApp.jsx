import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import MobileSheet from "#mobile/MobileSheet.jsx";
import useWindowStore from "#store/window";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const RESUME_URL = "files/DiponkorResume.pdf";

const ResumeApp = () => {
  const { windows } = useWindowStore();
  const { isOpen } = windows.resume;

  // Only load the PDF the first time the sheet is opened (saves data on phones)
  const [hasOpened, setHasOpened] = useState(isOpen);
  if (isOpen && !hasOpened) setHasOpened(true);

  // Render pages at the exact width of the screen
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.floor(entry.contentRect.width))
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <MobileSheet
      id="resume"
      title="Resume.pdf"
      bodyClassName="bg-gray-200"
      actions={
        <a href={RESUME_URL} download title="Download Resume">
          <Download size={20} />
        </a>
      }
    >
      <div ref={wrapRef} className="resume-body">
        {hasOpened && width > 0 ? (
          <Document
            file={RESUME_URL}
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
        ) : null}
      </div>
    </MobileSheet>
  );
};

export default ResumeApp;
