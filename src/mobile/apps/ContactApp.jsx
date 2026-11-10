import { Mail } from "lucide-react";
import MobileSheet from "#mobile/MobileSheet.jsx";
import { socials } from "#constants";

const EMAIL = "diponkorchandrashil678@gmail.com";

const ContactApp = () => {
  return (
    <MobileSheet id="contact" title="Contact Me">
      <div className="contact">
        <img
          src="/images/dipto.JPG"
          alt="Diponkor"
          className="avatar"
          loading="lazy"
        />

        <h3>Lets Connect</h3>
        <p className="sub">Got an idea? Lets Talk!!</p>

        <a href={`mailto:${EMAIL}`} className="email">
          <Mail size={16} />
          {EMAIL}
        </a>

        <ul className="socials">
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: bg }}
              >
                <img src={icon} alt="" />
                <span>{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </MobileSheet>
  );
};

export default ContactApp;
