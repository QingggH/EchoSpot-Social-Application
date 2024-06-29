import React from "react";
import { BUTTON_NAMES } from "../../constants";
import { FaSearch, FaHome } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import "./Header.css";

function Header({ onLogout, onNavigationButtonClick }) {
  const buttonsConfig = [
    {
      name: BUTTON_NAMES.SEARCH_USER,
      label: "Search",
      icon: FaSearch,
      action: BUTTON_NAMES.SEARCH_USER,
    },
    {
      name: BUTTON_NAMES.HOME_PAGE,
      label: "Home",
      icon: FaHome,
      action: BUTTON_NAMES.HOME_PAGE,
    },
    {
      name: BUTTON_NAMES.MY_PROFILE,
      label: "My Profile",
      icon: IoPerson,
      action: BUTTON_NAMES.MY_PROFILE,
    },
  ];

  const handleNavigation = (action) => {
    onNavigationButtonClick(action);
  };

  return (
    <header className="header">
      <div className="header-title">
        <div
          className="header-title-content"
          onClick={() => onNavigationButtonClick(BUTTON_NAMES.HOME_PAGE)}
        >
          EchoSpot
        </div>
      </div>
      <div className="controls">
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
        {buttonsConfig.map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              className="control-btn"
              onClick={() => handleNavigation(button.action)}
            >
              <Icon className="control-icon" />
            </button>
          );
        })}
      </div>
    </header>
  );
}

export default Header;
