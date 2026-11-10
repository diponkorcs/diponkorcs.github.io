import { useState } from "react";
import clsx from "clsx";
import StatusBar from "#mobile/StatusBar.jsx";
import HomeScreen from "#mobile/HomeScreen.jsx";
import MobileDock from "#mobile/MobileDock.jsx";
import {
  FinderApp,
  SafariApp,
  TerminalApp,
  PhotosApp,
  ContactApp,
  ResumeApp,
  TextApp,
  ImageApp,
} from "#mobile/apps";
import useWindowStore from "#store/window";

// Root of the phone UI: home screen + app sheets (same window store as desktop)
const MobileApp = () => {
  const [page, setPage] = useState(0);
  const { windows } = useWindowStore();
  const hasSheet = Object.values(windows).some((w) => w.isOpen);

  return (
    <main id="mobile" className={clsx(hasSheet && "has-sheet")}>
      {/* Hide the small status-bar clock while the big clock is on screen */}
      <StatusBar showTime={page !== 0 || hasSheet} />
      <HomeScreen onPageChange={setPage} />
      <MobileDock />

      {/* Dims the home screen behind an open app */}
      <div className="sheet-backdrop" />

      {/* App sheets */}
      <FinderApp />
      <SafariApp />
      <TerminalApp />
      <PhotosApp />
      <ContactApp />
      <ResumeApp />
      <TextApp />
      <ImageApp />
    </main>
  );
};

export default MobileApp;
