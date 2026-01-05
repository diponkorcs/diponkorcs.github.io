import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import { locations } from "#constants";
import useLocationStore from "#store/location.js";
import { clsx } from "clsx";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {/* Favourites Section */}
          <ul>{renderList("Favorites", Object.values(locations))}</ul>
          {/* Work Section */}
          <ul>{renderList("Work", locations.work.children)}</ul>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
