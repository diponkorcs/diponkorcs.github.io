import { Check, Flag } from "lucide-react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import { techStack } from "#constants";

const TerminalApp = () => {
  return (
    <MobileSheet id="terminal" title="Tech Stack">
      <div className="term">
        <p>
          <span className="font-bold">@diponkorcs % </span>
          Show Tech Stack
        </p>

        <ul className="term-list">
          {techStack.map(({ category, items }) => (
            <li key={category} className="term-row">
              <h3>
                <Check size={18} />
                {category}
              </h3>

              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="term-foot">
          <p>
            <Check size={18} />
            {techStack.length} of {techStack.length} stacks loaded successfully
            (100%)
          </p>
          <p className="text-black">
            <Flag size={14} fill="black" />
            Served in 6ms
          </p>
        </div>
      </div>
    </MobileSheet>
  );
};

export default TerminalApp;
