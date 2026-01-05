import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";
import React from "react";
import useWindowStore from "#store/window";

const Navbar = () => {

  const { openWindow } = useWindowStore();
  return (
    <nav>
      {/* Left Side */}
      <div>
        {/* Apple Icon */}
        <img src="/images/logo.svg" alt="appleLogo" />
        <p className="font-bold">Diponkor Chandra Shil</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p> {name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd | DD MMM YYYY | h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
