import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
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
            <FontAwesomeIcon icon="bars" />
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
            <FontAwesomeIcon icon="times" />
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
            <FontAwesomeIcon icon={["fas", "user"]} />
          </div>

          {stateHideMenu == true ? (
            <ul className={cx("combobox_admin")}>
              <li onClick={handleLogout}>
                <FontAwesomeIcon icon="sign-out-alt" />
                Logout
              </li>
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
