import { dockApps } from "#constants";
import useWindowStore from "#store/window";

// Four pinned apps, like the iOS dock
const DOCK_IDS = ["finder", "safari", "contact", "terminal"];
const DOCK = DOCK_IDS.map((id) => dockApps.find((app) => app.id === id));

const MobileDock = () => {
  const { openWindow } = useWindowStore();

  return (
    <footer className="mobile-dock liquid-glass">
      {DOCK.map(({ id, name, icon }) => (
        <button
          key={id}
          type="button"
          aria-label={name}
          onClick={() => openWindow(id)}
        >
          <img src={`/images/${icon}`} alt={name} />
        </button>
      ))}
    </footer>
  );
};

export default MobileDock;
