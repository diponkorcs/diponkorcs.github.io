import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
