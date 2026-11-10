import clsx from "clsx";
import { Wifi, Signal } from "lucide-react";
import useNow from "#hooks/useNow.js";

// `showTime` is false on the first page, where the big lock-screen clock
// is already visible (same as iOS).
const StatusBar = ({ showTime = true }) => {
  const now = useNow();

  return (
    <header className="status-bar">
      <time className={clsx(!showTime && "is-hidden")}>
        {now.format("h:mm")}
      </time>

      <div className="status-icons">
        <Signal size={16} strokeWidth={2.5} />
        <Wifi size={16} strokeWidth={2.5} />
        <span className="battery">
          <span className="battery-level" />
        </span>
      </div>
    </header>
  );
};

export default StatusBar;
