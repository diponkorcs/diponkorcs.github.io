import { techStack } from "#constants/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <p>Window Controls</p>
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@diponkorcs % </span>
          Show Tech Stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="tech-item">
              <Check className="check" size={20} />
              <h3>{category}</h3>

              <ul>
                {items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

// Wrap Terminal component with WindowWrapper HOC
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
