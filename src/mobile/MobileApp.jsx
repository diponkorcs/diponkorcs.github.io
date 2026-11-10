import { useState } from "react";
import StatusBar from "#mobile/StatusBar.jsx";
import HomeScreen from "#mobile/HomeScreen.jsx";
import MobileDock from "#mobile/MobileDock.jsx";

// Root of the phone UI. Desktop windows are not rendered here;
// step 2 adds full-screen "sheets" that reuse the same window store.
const MobileApp = () => {
  const [page, setPage] = useState(0);

  return (
    <main id="mobile">
      {/* Hide the small status-bar clock while the big clock is on screen */}
      <StatusBar showTime={page !== 0} />
      <HomeScreen onPageChange={setPage} />
      <MobileDock />
    </main>
  );
};

export default MobileApp;
