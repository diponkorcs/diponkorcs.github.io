import { useState } from "react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import useWindowStore from "#store/window";

const TextApp = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  // Keep showing the last file while the sheet slides closed
  // (the store clears `data` as soon as close starts)
  const [shown, setShown] = useState(data);
  if (data && data !== shown) setShown(data);

  const { name, image, subtitle, description } = shown ?? {};

  return (
    <MobileSheet id="txtfile" title={name ?? ""}>
      {shown ? (
        <div className="txt">
          {image ? <img src={image} alt={name} loading="lazy" /> : null}
          {subtitle ? <h3>{subtitle}</h3> : null}
          {Array.isArray(description)
            ? description.map((para, i) => <p key={i}>{para}</p>)
            : null}
        </div>
      ) : null}
    </MobileSheet>
  );
};

export default TextApp;
