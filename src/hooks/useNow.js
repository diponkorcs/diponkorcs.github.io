import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Current time from the visitor's own device (so it is always in their
// local time zone). Re-renders exactly when the minute changes, and
// refreshes when the tab comes back into view.
const useNow = () => {
  const [now, setNow] = useState(() => dayjs());

  useEffect(() => {
    let timeoutId;

    const tick = () => {
      setNow(dayjs());
      const msToNextMinute = 60000 - (Date.now() % 60000);
      timeoutId = setTimeout(tick, msToNextMinute + 50);
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timeoutId);
        tick();
      }
    };

    tick();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return now;
};

export default useNow;
