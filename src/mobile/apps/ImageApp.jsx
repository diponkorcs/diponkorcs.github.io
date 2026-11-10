import { useState } from "react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import useWindowStore from "#store/window";

const ImageApp = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  // Keep showing the last image while the sheet slides closed
  const [shown, setShown] = useState(data);
  if (data && data !== shown) setShown(data);

  const { name, imageUrl } = shown ?? {};

  return (
    <MobileSheet id="imgfile" title={name ?? ""} bodyClassName="bg-gray-100">
      {imageUrl ? (
        <div className="img-viewer">
          <img src={imageUrl} alt={name} />
        </div>
      ) : null}
    </MobileSheet>
  );
};

export default ImageApp;
