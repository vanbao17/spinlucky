import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import SideBar from "../SideBar/SideBar";
import Header from "../Header/Header";
import { useMediaQuery } from "react-responsive";
import React from "react";
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const isSmallScreen = useMediaQuery({ query: "(max-width:600px)" });
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {isSmallScreen == false ? (
          <div className={"container_sidebar"}>
            <SideBar />
          </div>
        ) : (
          <></>
        )}

        <div className={cx("content")}>
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
