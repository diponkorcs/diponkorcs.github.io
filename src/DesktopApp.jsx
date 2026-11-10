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

// The original macOS desktop. Moved out of App.jsx unchanged so it can be
// loaded only on larger screens (phones never download it).
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

export default DesktopApp;
