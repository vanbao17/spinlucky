import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import media from "../../Assets";
import { useMediaQuery } from "react-responsive";
import React from "react";
const cx = classNames.bind(styles);

function Login() {
  const nav = useNavigate();
  const [warning, setwarning] = useState("");
  const refUsername = useRef();
  const refPassword = useRef();
  const isSmallScreen = useMediaQuery({ query: "(max-width:768px)" });
  const [index, setindex] = useState(1);
  const handleLogin = () => {
    let username = refUsername.current.value;
    let password = refPassword.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    fetch("https://vongquay.xyz/api/v1/login", options)
      .then((response) => {
        if (response.status == 200) {
          if (username == "admin") {
            sessionStorage.setItem("username", "Admin");
            nav("/Admin");
          } else {
            sessionStorage.setItem("username", username);
            nav("/");
          }
        } else {
          setwarning("Đăng nhập không thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < 3) {
        setindex((previndex) => previndex + 1);
      } else {
        setindex(1);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);
  return (
    <div
      className={cx("wrapper")}
      style={{
        backgroundImage: `url(${media.backgroundLogin})`,
        position: "relative",
      }}
    >
      <div className={cx("container")}>
        <div className={cx("content-left")}></div>
        <div
          className={cx("container_center")}
          // style={{ backgroundImage: `url(${media.formLogin})` }}
        >
          <img
            style={{
              width: "90%",
              height: "auto",
              zIndex: "0",
              top: "50px",
              left: "0",
              position: "absolute",
            }}
            src={media.form}
          ></img>
          <div className={cx("infor")} style={{ zIndex: "999" }}>
            <div>
              <img
                style={{ zIndex: "999", position: "relative" }}
                src={media.logo}
              ></img>
            </div>
          </div>
          <div className={cx("formlogin")} style={{ zIndex: "999" }}>
            <div className={cx("form")}>
              <span className={cx("titleinput1")}>Tên đăng nhập</span>
              <div className={cx("container_input")}>
                <input
                  ref={refUsername}
                  type="text"
                  className={cx("username")}
                  name="username"
                ></input>
              </div>
              <span className={cx("titleinput2")}>Mật khẩu</span>
              <div className={cx("container_input")}>
                <input
                  ref={refPassword}
                  type="password"
                  className={cx("password")}
                  name="password"
                ></input>
              </div>
            </div>

            <div className={cx("warning_login")}>
              <div className={cx("icon-tele")}>
                <a href="https://t.me/TANLONGLIVE" target="_blank">
                  <img src={media.tele}></img>
                </a>
              </div>
              {warning.length > 1 ? (
                <a href="https://t.me/TANLONGLIVE" target="_blank">
                  <span
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    Liên hệ admin để kích hoạt tài khoản
                  </span>
                </a>
              ) : (
                <></>
              )}
            </div>
            <div className={cx("container_button")}>
              <img onClick={handleLogin} src={media.loginButton}></img>
              <img
                onClick={() => {
                  nav("/Register");
                }}
                src={media.registerButton}
              ></img>
              {/* <button onClick={handleLogin} className={cx("login")}></button>
              <button
                onClick={() => {
                  nav("/Account/Register");
                }}
                className={cx("register")}
              >
                
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
