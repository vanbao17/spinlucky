import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fas);
const cx = classNames.bind(styles);
function Header() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width:600px)" });
  const nav = useNavigate();
  const [stateHideMenu, setstateHideMenu] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  const handleLogout = () => {
    sessionStorage.clear();
    nav("/");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row1")}>
        {isSmallScreen == true ? (
          <div
            onClick={() => {
              setsidebar(!sidebar);
            }}
          >
            <FaBars />
          </div>
        ) : (
          <span>Vai trò của bạn: ADMIN</span>
        )}
        <div
          className={cx("sidebar_slide", sidebar == true ? "xuathien" : "hide")}
        >
          <SideBar />
          <div
            className={cx("icon_close")}
            onClick={() => {
              setsidebar(!sidebar);
            }}
          >
            <FaTimes />
          </div>
        </div>
        <div className={cx("action_admin")}>
          <div></div>
          <div
            className={cx("c")}
            onClick={() => {
              setstateHideMenu(!stateHideMenu);
            }}
          >
            <FaUser />
          </div>

          {stateHideMenu == true ? (
            <ul className={cx("combobox_admin")}>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
