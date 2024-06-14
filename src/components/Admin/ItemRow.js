import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { useContext, useRef, useState } from "react";
import Popup from "../Popup/Popup";
import { useNavigate } from "react-router-dom";
import React from "react";
const cx = classNames.bind(styles);

function ItemRow({ data, statePage }) {
  const nav = useNavigate();
  const [state, setstate] = useState(false);
  const [state1, setstate1] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const refPassword = useRef();
  const handleDelete = () => {
    const iduser = data.id_user;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ iduser }),
    };
    fetch("http://localhost:3001/api/v1/deleteuser", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
          setstatepopup(false);
          setstate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePopup = (state) => {
    setstatepopup(false);
  };

  const handleAdd = () => {
    let username = data.username;
    let password = refPassword.current.value;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    fetch("http://localhost:3001/api/v1/findwithusername", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != undefined || data.length != 0) {
          const iduser = username == "Admin" ? 1 : data[0].id_user;
          const options1 = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ password, iduser }),
          };
          fetch("http://localhost:3001/api/v1/updatePassword", options1)
            .then((response1) => {
              if (response1.status == 200) {
                setstatepopup(!setstatepopup);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <td>{data.username}</td>
      <td>{data.password}</td>
      <td>{data.sdt}</td>
      <td>
        <div
          className={cx("icon")}
          onClick={() => {
            setstate(!state);
          }}
        >
          Sửa
        </div>
        {state == true ? (
          <ul className={cx("combobox_item")}>
            <li
              onClick={() => {
                setstatepopup(true);
                setstate(false);
              }}
            >
              Đổi mật khẩu
            </li>
            <li
              onClick={() => {
                nav("/Admin/SettingUser", { state: { dt: data.id_user } });
              }}
            >
              Chỉnh sửa tỉ lệ
            </li>
            <li onClick={handleDelete}>Xóa</li>
          </ul>
        ) : (
          <></>
        )}
      </td>
      {statepopup == true ? (
        <Popup>
          <div className={cx("container_input")}>
            <span style={{ color: "black" }}>
              Nhập mật khẩu mới Ít nhất 2 ký tự*
            </span>
            <input
              ref={refPassword}
              type="text"
              className={cx("username")}
              name="username"
            ></input>
          </div>
          <div
            className={cx("container_btn")}
            style={{ width: "100%", display: "flex" }}
          >
            <button onClick={handleAdd} className={cx("update")}>
              <span>Thêm</span>
            </button>
            <button onClick={handlePopup} className={cx("close")}>
              <span>Hủy</span>
            </button>
          </div>
        </Popup>
      ) : (
        <></>
      )}
    </tr>
  );
}

export default ItemRow;
