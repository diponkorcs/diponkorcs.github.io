import React, { useRef } from "react";
import gsap from "gsap";

// Font weight animation settings
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

// text styling function
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `'whgt ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

// function to setup animated text hover effect
const setupHoverEffect = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span"); //we'll target each letter by the span tag
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'whgt ${weight}`,
    });
  };

  const handleMouseMove = (event) => {
    const {left} = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const {left: l, width: w} = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000)
    })
  }
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey, Im Diponkor! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-8">
        {renderText(
          "Portfolio",
          "text-9xl italic font-georama"
          // 400 // Dont need to pass 400, cause it is default, declared in function parameter
        )}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
