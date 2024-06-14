import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./GameSettings.module.scss";
import { useContext, useRef, useState } from "react";
import Popup from "../Popup/Popup";
const cx = classNames.bind(styles);
function ItemRow({ data, statePage, totalPercent }) {
  const [state, setstate] = useState(false);
  const [statepopupupdate, setstatepopupupdate] = useState(false);
  const [state1, setstate1] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const refPassword = useRef();
  const refName = useRef();
  const refPercent = useRef();
  const refColor = useRef();
  const refImage = useRef();
  const [test, settest] = useState(null);
  const [test1, settest1] = useState(null);
  const [test2, settest2] = useState(null);
  const [test3, settest3] = useState(null);
  const [warning, setwarning] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const handleInputClick = (e, data) => {
    setIsEditable(true);
    e.target.value = data;
    refName.current.removeAttribute("readOnly");
  };
  const handleUpdateClass = () => {
    let name_item = refName.current.value;
    let color = refColor.current.value;
    let percent = refPercent.current.value;
    let image_item = refImage.current.value;
    let id_item = data.id_item;
    if (percent <= 1 - totalPercent || percent == 1) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name_item,
          color,
          percent,
          image_item,
          id_item,
        }),
      };
      fetch("http://localhost:3001/api/v1/updateItems", options)
        .then((response) => {
          if (response.status == 200) {
            statePage(state1);
            setstate1(!state1);
            setstatepopup(false);
            setstatepopupupdate(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setwarning("bạn đã nhập quá giới hạn percent cho phép");
    }
  };
  const handleDelete = () => {
    const id_item = data.id_item;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id_item }),
    };
    fetch("http://localhost:3001/api/v1/deleteItem", options)
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
      <td>{data.id_item}</td>
      <td>{data.name_item}</td>
      <td>{data.image_item}</td>
      <td>{data.color}</td>
      <td>{data.percent}</td>
      <td>
        <div
          className={cx("icon")}
          onClick={() => {
            setstate(!state);
          }}
        >
          <FontAwesomeIcon icon="ellipsis-v" />
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
                setstatepopupupdate(true);
                setstate(false);
              }}
            >
              Chỉnh sửa item
            </li>
            <li onClick={handleDelete}>Xóa</li>
          </ul>
        ) : (
          <></>
        )}
      </td>
      {statepopupupdate == true ? (
        <Popup>
          <div className={cx("container_input")}>
            <span>Nhập tên item</span>
            <input
              ref={refName}
              type="text"
              className={cx("username")}
              name="username"
              value={test == null ? data.name_item : test}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.name_item);
              }}
              onChange={(e) => settest(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập màu cho item</span>
            <input
              ref={refColor}
              type="text"
              className={cx("username")}
              name="username"
              value={test1 == null ? data.color : test1}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.color);
              }}
              onChange={(e) => settest1(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập giá trị phần trăm</span>
            <input
              ref={refPercent}
              type="text"
              className={cx("username")}
              name="username"
              value={test2 == null ? data.percent : test2}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.percent);
              }}
              onChange={(e) => settest2(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập Link ảnh</span>
            <input
              ref={refImage}
              type="text"
              className={cx("username")}
              name="username"
              value={test3 == null ? data.image_item : test3}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.image_item);
              }}
              onChange={(e) => settest3(e.target.value)}
            ></input>
          </div>
          <span>
            {warning != null
              ? warning
              : " Bạn chỉ được nhập percent <=" + (1 - totalPercent).toFixed(1)}
          </span>
          <div
            className={cx("container_btn")}
            style={{ width: "100%", display: "flex" }}
          >
            <button onClick={handleUpdateClass} className={cx("update")}>
              <span>Sửa</span>
            </button>

            <button
              onClick={() => {
                setstatepopupupdate(false);
              }}
              className={cx("close")}
            >
              <span>Hủy</span>
            </button>
          </div>
        </Popup>
      ) : (
        <></>
      )}
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
