import React from "react";
import { Link } from "react-router-dom";
import sidebarItems from "../json/sidebar.json";
const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  return (
    <div className="sidebarItem">
      <div className={`sidebarItem-inner ${active}`}>
        <i className={props.icon} aria-hidden="true"></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};
export default function Sidebar(props) {
  //   const activeItem = sidebarItems.findIndex(
  //     (item) => item.route === props.location.pathname
  //   );
  return (
    <div className="sidebar">
      <div className="sidebarLogo">
        <span>URL- Shortner</span>
      </div>
      {sidebarItems.map((e, i) => (
        <Link key={i} to={e.route}>
          <SidebarItem
            title={e.display_name}
            icon={e.icon}
            // active={i === activeItem}
          />
        </Link>
      ))}
    </div>
  );
}
