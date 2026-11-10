import { lazy, Suspense } from "react";
import useIsMobile from "#hooks/useIsMobile.js";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

// Each UI is its own chunk: phones only download the mobile code,
// desktops only download the desktop code.
const DesktopApp = lazy(() => import("./DesktopApp.jsx"));
const MobileApp = lazy(() => import("#mobile/MobileApp.jsx"));

const App = () => {
  const isMobile = useIsMobile();

  // fallback is null: the wallpaper (set on <body>) shows while loading
  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileApp /> : <DesktopApp />}
    </Suspense>
  );
};

export default App;
