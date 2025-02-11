import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="header">
      {/* <div className="brand-logo">
        <img src={BrandLogo} alt="brand-logo" className="brand-logo-img" />
      </div> */}
      <div className="brand-name">Paper Agency</div>
      <div
        className="auth-logo"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <FontAwesomeIcon icon={faUser} className="auth-logo-icon" />
        {isDropdownVisible && (
          <div className="dropdown">
            {/* <div className="option">
              <div className="dropdown-item">My Profile</div>
              <FontAwesomeIcon icon={faUser} className="action-icon" />
            </div> */}
            <div className="option">
              <div className="dropdown-item">Logout</div>
              <FontAwesomeIcon icon={faSignOut} className="action-icon" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
