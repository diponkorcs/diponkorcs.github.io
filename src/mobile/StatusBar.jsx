import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Wifi, Signal } from "lucide-react";

const StatusBar = () => {
  const [now, setNow] = useState(dayjs());

  // keep the clock ticking once a minute
  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="status-bar">
      <time>{now.format("h:mm")}</time>

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
