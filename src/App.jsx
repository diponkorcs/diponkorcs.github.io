import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";
import MobileApp from "#mobile/MobileApp.jsx";
import useIsMobile from "#hooks/useIsMobile.js";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const DesktopApp = () => (
  <main>
    <Navbar />
    <Welcome />
    <Dock />

    {/* Windows */}
    <Terminal />
    <Safari />
    <Resume />
    <Finder />
    <Text />
    <Image />
    <Contact />
    <Photos />

    {/* Shortcuts */}
    <Home />
  </main>
);

const App = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileApp /> : <DesktopApp />;
};

export default App;
