import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import useWindowStore from "#store/window";

const ResumeViewer = lazy(() => import("#mobile/apps/ResumeViewer.jsx"));

const RESUME_URL = "files/DiponkorResume.pdf";

const ResumeApp = () => {
  const { windows } = useWindowStore();
  const { isOpen } = windows.resume;

  // Only load the PDF (and the PDF reader code) the first time the sheet opens
  const [hasOpened, setHasOpened] = useState(isOpen);
  if (isOpen && !hasOpened) setHasOpened(true);

  // Render pages at the exact width of the screen
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(0);

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
          <Suspense fallback={<p className="resume-msg">Loading resume…</p>}>
            <ResumeViewer file={RESUME_URL} width={width} />
          </Suspense>
        ) : null}
      </div>
    </MobileSheet>
  );
};

export default ResumeApp;
