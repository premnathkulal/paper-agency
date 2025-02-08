import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";
import { faHeart, faTools } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-message">
        Made with <FontAwesomeIcon icon={faHeart} className="heart" /> and{" "}
        <FontAwesomeIcon icon={faTools} className="tools" />
        &nbsp;&nbsp;by Hare Krishna DevWorks
      </div>
      <div className="footer-text">
        All Rights Reserved <FontAwesomeIcon icon={faCopyright} /> Hare Krishna
        DevWorks
      </div>
    </div>
  );
};

export default Footer;
