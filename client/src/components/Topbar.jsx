import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { refreshPage } from "./../shared/shared";

export default function Topbar() {
  const [active, setActive] = useState(1);
  const handleChange = (index) => {
    setActive(index);
  };
  const logout = () => {
    Cookies.remove("--t");
    refreshPage();
  };
  return (
    <div className="topbar">
      <div className="topNavLeft">
        #<span style={{ color: "#FFBF00" }}>My</span>
        <span style={{ color: "#FAA0A0" }}>Moments</span>
      </div>
      <div className="topNavRight">
        <ul className="topNavRightItems">
          <Link to="/app/home" onClick={() => handleChange(1)}>
            <li className={`topNavItem ${active === 1 ? "active" : ""}`}>
              Home
            </li>
          </Link>
          <Link to="/app/today" onClick={() => handleChange(2)}>
            <li className={`topNavItem ${active === 2 ? "active" : ""}`}>
              Today
            </li>
          </Link>
          <Link to="/app/write" onClick={() => handleChange(3)}>
            <li className={`topNavItem ${active === 3 ? "active" : ""}`}>
              Write
            </li>
          </Link>
          <Link to="/app/calendar" onClick={() => handleChange(4)}>
            <li className={`topNavItem ${active === 4 ? "active" : ""}`}>
              Calendar
            </li>
          </Link>
          <Link to="/login" onClick={() => logout()}>
            <li className={`topNavItem`}>Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
