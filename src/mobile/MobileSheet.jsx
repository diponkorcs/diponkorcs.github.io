import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";

// How far (px) the sheet must be dragged down before it closes
const CLOSE_DISTANCE = 110;

/*
  Mobile counterpart of WindowWrapper.
  A full-height card that slides up from the bottom when its window opens.
  - Uses the same window store as desktop (isOpen / zIndex / data)
  - Close with the red dot, or drag the header down
  - Several sheets can be open; the newest is on top (zIndex from the store)
*/
const MobileSheet = ({ id, title, actions, bodyClassName, children }) => {
  const { windows, closeWindow, focusWindow } = useWindowStore();
  const { isOpen, zIndex } = windows[id];

  const sheetRef = useRef(null);
  const headerRef = useRef(null);
  const firstRender = useRef(true);

  // Open / close animation
  useGSAP(() => {
    const el = sheetRef.current;
    if (!el) return;

    gsap.killTweensOf(el);

    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(el, {
        display: isOpen ? "flex" : "none",
        yPercent: isOpen ? 0 : 100,
        y: 0,
      });
      return;
    }

    if (isOpen) {
      gsap.set(el, { display: "flex", y: 0 });
      gsap.fromTo(
        el,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.45, ease: "power3.out" }
      );
    } else {
      gsap.to(el, {
        yPercent: 100,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => gsap.set(el, { display: "none", y: 0 }),
      });
    }
  }, [isOpen]);

  // Drag the header down to close
  useGSAP(() => {
    const el = sheetRef.current;
    if (!el || !headerRef.current) return;

    const [drag] = Draggable.create(el, {
      type: "y",
      trigger: headerRef.current,
      bounds: { minY: 0, maxY: 4000 },
      onPress: () => focusWindow(id),
      onRelease() {
        if (this.y > CLOSE_DISTANCE) {
          closeWindow(id);
        } else {
          gsap.to(el, { y: 0, duration: 0.25, ease: "power2.out" });
        }
      },
    });

    return () => drag.kill();
  }, []);

  return (
    <section
      ref={sheetRef}
      className={clsx("sheet", `sheet-${id}`)}
      style={{ zIndex }}
      aria-hidden={!isOpen}
    >
      <header ref={headerRef} className="sheet-header">
        <span className="sheet-grabber" />

        <div className="sheet-bar">
          <div className="sheet-controls">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => closeWindow(id)}
            >
              <i />
            </button>
            <span className="minimize">
              <i />
            </span>
            <span className="maximize">
              <i />
            </span>
          </div>

          <h2>{title}</h2>

          <div className="sheet-actions">{actions}</div>
        </div>
      </header>

      <div className={clsx("sheet-body", bodyClassName)}>{children}</div>
    </section>
  );
};

export default MobileSheet;
