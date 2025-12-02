import dayjs from "dayjs";
import { navLinks, navIcons } from "#constants";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      {/* Left Side */}
      <div>
        {/* Apple Icon */}
        <img src="/images/logo.svg" alt="appleLogo" />
        <p className="font-bold">Diponkor Chandra Shil</p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
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

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};

export default Navbar;
