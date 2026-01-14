// This hoc (Higher Order Component) is intended to wrap components that need to interact with the browser window object.
// This HOC is basically a function that takes component as input and returns the same componenet enhanced and wrapped with window object functionalities.

import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Terminal } from "#windows";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
    const firstRender = useRef(true);

    // Per-window close animation mapping. Rendered conditionally by which window is being closed captured by windowKey.
    const CLOSE_ANIMATIONS = {
      finder: {
        scale: 0.8,
        opacity: 0,
        x: 500,
        y: 100,
        duration: 0.6,
        ease: "power3.in",
      },
      safari: {
        scale: 0.8,
        opacity: 0,
        x: 100,
        y: 500,
        duration: 0.6,
        ease: "power3.in",
      },
      photos: {
        scale: 0.8,
        opacity: 0,
        x: -500,
        y: 500,
        duration: 0.6,
        ease: "power3.in",
      },
      contact: {
        scale: 0.8,
        opacity: 0,
        x: -500,
        y: 100,
        duration: 0.6,
        ease: "power3.in",
      },
      terminal: {
        scale: 0.8,
        opacity: 0,
        x: 500,
        y: 500,
        duration: 0.6,
        ease: "power3.in",
      },

      default: {
        scale: 0.8,
        opacity: 0,
        x: 500,
        y: 500,
        duration: 0.6,
        ease: "power3.in",
      },
    };

    // Use GSAP to handle side effects related to window opening
    useGSAP(() => {
      const element = ref.current;
      if (!element) return;

      // prevent overlapping tweens on rapid toggles
      gsap.killTweensOf(element);

      // If this is the very first render, just ensure the correct
      // initial visibility (don't force a close animation here).
      if (firstRender.current) {
        firstRender.current = false;
        element.style.display = isOpen ? "block" : "none";
        if (isOpen) {
          gsap.fromTo(
            element,
            { scale: 0.8, opacity: 0, x: 500, y: 500 },
            {
              scale: 1,
              opacity: 1,
              x: -90,
              y: 0,
              duration: 1,
              ease: "power3.out",
            }
          );
        }

        return;
      }

      // Subsequent toggles: play open or close animations
      if (isOpen) {
        element.style.display = "block";
        gsap.fromTo(
          element,
          { scale: 0.8, opacity: 0, x: 500, y: 500 },
          {
            scale: 1,
            opacity: 1,
            x: -90,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      } else {
        const anim = CLOSE_ANIMATIONS[windowKey] || CLOSE_ANIMATIONS.default;

        gsap.to(element, {
          ...anim,
          onComplete: () => {
            element.style.display = "none";
          },
        });
      }
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
      });

      return () => instance.kill();
    }, []);

    // Handle display property based on isOpen state
    useLayoutEffect(() => {
      const element = ref.current;
      if (!element) return;

      // On mount ensure the element has correct initial visibility.
      // For subsequent toggles we only set display when opening so the
      // close animation can hide the element onComplete.
      if (firstRender.current) {
        element.style.display = isOpen ? "block" : "none";
      } else if (isOpen) {
        element.style.display = "block";
      }
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
