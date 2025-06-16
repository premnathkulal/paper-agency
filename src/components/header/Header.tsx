import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../../routes/main-route";

const Header = () => {
  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const handleItemClick = (item: RoutesList) => {
    navigate(item);
  };

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
              <div
                className="dropdown-item"
                onClick={() => handleItemClick(RoutesList.RELEASE_ORDER)}
              >
                Release Order Form
              </div>
            </div>
            <div className="option">
              <div
                className="dropdown-item"
                onClick={() => handleItemClick(RoutesList.JOB_ORDER)}
              >
                Job Order Form
              </div>
            </div>
            <div className="option">
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
                <FontAwesomeIcon icon={faSignOut} className="action-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
