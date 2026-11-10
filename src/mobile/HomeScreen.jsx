import { useRef, useState } from "react";
import clsx from "clsx";
import { dockApps, locations } from "#constants";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const projects = locations.work?.children ?? [];

// Gallery (left) and Archive (right) sit just above the dock
const galleryApp = dockApps.find((app) => app.id === "photos");
const archiveApp = dockApps.find((app) => app.id === "trash");

const PAGE_COUNT = 2;

const AppIcon = ({ label, src, onClick, dim = false }) => (
  <button type="button" className="app-icon" onClick={onClick}>
    <img src={src} alt={label} className={dim ? "opacity-60" : ""} />
    <span>{label}</span>
  </button>
);

const HomeScreen = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  // Update the page dots as the user swipes
  const handleScroll = () => {
    const el = pagerRef.current;
    if (!el) return;
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goToPage = (index) => {
    const el = pagerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  const openProject = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  return (
    <section className="home-screen">
      {/* Swipeable pages */}
      <div ref={pagerRef} className="pager" onScroll={handleScroll}>
        {/* Page 1: greeting */}
        <div className="page">
          <div className="greeting-widget">
            <p>Hey, I'm Diponkor! Welcome to my</p>
            <h1>Portfolio</h1>
          </div>
        </div>

        {/* Page 2: project folders */}
        <div className="page">
          <ul className="app-grid">
            {projects.map((project) => (
              <li key={project.id}>
                <AppIcon
                  label={project.name}
                  src="/images/folder.png"
                  onClick={() => openProject(project)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Page indicator */}
      <div className="page-dots">
        {Array.from({ length: PAGE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            className={clsx(i === page && "active")}
            onClick={() => goToPage(i)}
          />
        ))}
      </div>

      {/* Row above the dock: Gallery on the left, Archive on the right */}
      <ul className="app-grid side-row">
        <li>
          <AppIcon
            label={galleryApp.name}
            src={`/images/${galleryApp.icon}`}
            onClick={() => openWindow(galleryApp.id)}
          />
        </li>
        <li />
        <li />
        <li>
          <AppIcon
            label={archiveApp.name}
            src={`/images/${archiveApp.icon}`}
            dim={!archiveApp.canOpen}
            onClick={() => archiveApp.canOpen && openWindow(archiveApp.id)}
          />
        </li>
      </ul>
    </section>
  );
};

export default HomeScreen;
