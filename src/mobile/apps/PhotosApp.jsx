import { useState } from "react";
import clsx from "clsx";
import MobileSheet from "#mobile/MobileSheet.jsx";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "#store/window";

const PhotosApp = () => {
  const { openWindow } = useWindowStore();
  const [activeTab, setActiveTab] = useState(photosLinks[0]?.id);

  const openImage = (id, img) =>
    openWindow("imgfile", {
      id,
      name: "Gallery Image",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: img,
    });

  return (
    <MobileSheet id="photos" title="Gallery">
      {/* Desktop sidebar becomes a scrollable pill row */}
      <div className="photo-tabs">
        {photosLinks.map(({ id, icon, title }) => (
          <button
            key={id}
            type="button"
            className={clsx(id === activeTab && "active")}
            onClick={() => setActiveTab(id)}
          >
            <img src={icon} alt="" />
            {title}
          </button>
        ))}
      </div>

      <ul className="photo-grid">
        {gallery.map(({ id, img }) => (
          <li key={id}>
            <button type="button" onClick={() => openImage(id, img)}>
              <img src={img} alt={`Gallery image ${id}`} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
    </MobileSheet>
  );
};

export default PhotosApp;
