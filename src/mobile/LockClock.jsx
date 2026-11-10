import useNow from "#hooks/useNow.js";

// iOS lock-screen style date + large clock, from the visitor's device time
const LockClock = () => {
  const now = useNow();

  return (
    <div className="lock-clock">
      <p className="lock-date">{now.format("ddd D MMM")}</p>
      <time className="lock-time" dateTime={now.format("HH:mm")}>
        {now.format("h")}
        <span className="colon">:</span>
        {now.format("mm")}
      </time>
    </div>
  );
};

export default LockClock;
