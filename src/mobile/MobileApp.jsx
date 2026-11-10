import StatusBar from "#mobile/StatusBar.jsx";
import HomeScreen from "#mobile/HomeScreen.jsx";
import MobileDock from "#mobile/MobileDock.jsx";

// Root of the phone UI. Desktop windows are not rendered here;
// step 2 adds full-screen "sheets" that reuse the same window store.
const MobileApp = () => {
  return (
    <main id="mobile">
      <StatusBar />
      <HomeScreen />
      <MobileDock />
    </main>
  );
};

export default MobileApp;
