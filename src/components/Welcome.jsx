import React, { useRef } from "react";

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>Welcome to my portfolio website!</p>
    </section>
  );
};

export default Welcome;
