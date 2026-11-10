import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import { locations } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

// Small grey caption under each item in a folder
const describe = (item) => {
  if (item.kind === "folder") return `${item.children?.length ?? 0} items`;
  if (item.fileType === "url") return "Website";
  if (item.fileType === "img") return "Image";
  if (item.fileType === "txt") return "Text";
  if (item.fileType === "pdf") return "PDF";
  return "";
};

// Let long file names wrap after dots, dashes and underscores
// (e.g. "SmartThinksBD." / "com") instead of in the middle of a word
const wrapName = (name) => name.replace(/([._-])/g, "$1\u200B");

// iOS-style grouped list row
const Row = ({ icon, label, onClick }) => (
  <li>
    <button type="button" className="inset-row" onClick={onClick}>
      <img src={icon} alt="" />
      <div className="inset-row-text">
        <span>{label}</span>
        <ChevronRight size={18} />
      </div>
    </button>
  </li>
);

/*
  Mobile Finder, styled like the iOS Files app.
  - "Browse" root: Favorites + My Projects (the desktop sidebar)
  - Tapping a location opens it as a grid; folders go deeper, files open
    their own sheet (text / image / resume) or the website
*/
const FinderApp = () => {
  const { windows, openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { isOpen, data } = windows.finder;

  // Navigation stack. Empty = Browse root.
  const [stack, setStack] = useState([]);

  // Reset navigation each time the sheet opens:
  // dock opens at the root, a home-screen folder opens that project.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStack(data?.view === "root" || !activeLocation ? [] : [activeLocation]);
    }
  }

  const current = stack[stack.length - 1];
  const previous = stack[stack.length - 2];

  const goTo = (location) => {
    setActiveLocation(location);
    setStack((s) => [...s, location]);
  };

  const goBack = () => {
    const next = stack.slice(0, -1);
    setStack(next);
    setActiveLocation(next[next.length - 1] ?? locations.work);
  };

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return goTo(item);
    if (["fig", "url"].includes(item.fileType) && item.href) {
      return window.open(item.href, "_blank", "noopener,noreferrer");
    }
    openWindow(`${item.fileType}${item.kind}`, item);
  };

  return (
    <MobileSheet id="finder" title="Portfolio" bodyClassName="bg-gray-100">
      <div className="files-nav">
        {current ? (
          <button type="button" className="files-back" onClick={goBack}>
            <ChevronLeft size={22} />
            {previous?.name ?? "Browse"}
          </button>
        ) : null}

        <h1 className="files-title">{current?.name ?? "Browse"}</h1>
      </div>

      {current ? (
        // Folder contents
        <ul className="files-grid">
          {current.children?.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => openItem(item)}>
                <img src={item.icon} alt="" />
                <span>{wrapName(item.name)}</span>
                <small>{describe(item)}</small>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        // Browse root
        <>
          <div className="files-section">
            <h3>Favorites</h3>
            <ul className="inset-list">
              {Object.values(locations).map((loc) => (
                <Row
                  key={loc.id}
                  icon={loc.icon}
                  label={loc.name}
                  onClick={() => goTo(loc)}
                />
              ))}
            </ul>
          </div>

          <div className="files-section">
            <h3>My Projects</h3>
            <ul className="inset-list">
              {locations.work.children.map((project) => (
                <Row
                  key={project.id}
                  icon="/images/folder.png"
                  label={project.name}
                  onClick={() => goTo(project)}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </MobileSheet>
  );
};

export default FinderApp;
