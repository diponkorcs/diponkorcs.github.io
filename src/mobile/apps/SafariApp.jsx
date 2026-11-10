import MobileSheet from "#mobile/MobileSheet.jsx";
import { experiences } from "#constants";

const SafariApp = () => {
  return (
    <MobileSheet id="safari" title="Experiences" bodyClassName="bg-gray-50">
      <div className="exp-list">
        <h2 className="exp-heading">Education & Experiences</h2>

        {experiences.map(({ id, name, role, period, description, image }) => (
          <article key={id} className="exp-card">
            <img src={image} alt={name} loading="lazy" />

            <div>
              <h3>{name}</h3>
              <p className="role">{role}</p>
              <p className="period">{period}</p>
              <p className="desc">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </MobileSheet>
  );
};

export default SafariApp;
