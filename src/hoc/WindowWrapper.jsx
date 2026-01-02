// This hoc (Higher Order Component) is intended to wrap components that need to interact with the browser window object.
// This HOC is basically a function that takes component as input and returns the same componenet enhanced and wrapped with window object functionalities.

import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Use GSAP to handle side effects related to window opening
    useGSAP(() => {
      const element = ref.current;
      if (!element || !isOpen) return;

      element.style.display = "block";

      // opening animation
      gsap.fromTo(
        element,
        { scale: 0.8, opacity: 0, x: 500, y: 500 },
        { scale: 1, opacity: 1, x: -90, y: 0, duration: 1, ease: "power3.out" }
      );
    }, [isOpen]);

    // use GSAP to make the window draggable
    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      const [instance] = Draggable.create(element, {
        onPress: () => focusWindow(windowKey),
        bounds: window.document.body,
        edgeResistance: 0.65,
        type: "x,y",
        inertia: true,
      })

      return () => instance.kill();
    }, [])

    // Handle display property based on isOpen state
    useLayoutEffect(() => {
      const element = ref.current;

      if (!element) return;
      element.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
