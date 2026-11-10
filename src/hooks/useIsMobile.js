import { useEffect, useState } from "react";

// Anything narrower than this gets the mobile (iOS-style) UI.
// 768px matches Tailwind's `md` breakpoint.
export const MOBILE_QUERY = "(max-width: 767px)";

const getMatch = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
};

export default useIsMobile;
