import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";

const Finder = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
