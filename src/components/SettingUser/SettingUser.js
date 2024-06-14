import classNames from "classnames/bind";
import styles from "./SettingUser.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ItemSettingUser from "./ItemSettingUser";
import Popup from "../Popup/Popup";
import React from "react";
const cx = classNames.bind(styles);

function SettingUser() {
  const location = useLocation();
  const id_user = location.state?.dt;
  const [items, setitems] = useState([]);
  const [userpercent, setuserpercent] = useState([]);
  const [dataChange, setdataChange] = useState([]);
  const [statepopup, setstatepopup] = useState(false);
  let nav = useNavigate();
  const handleData = (data) => {
    const check = dataChange.filter((item) => item.id_item == data.id_item);
    const objNew = {
      id_item: data.id_item,
      percent: data.percent,
      id_user: id_user,
    };
    if (check.length == 0) {
      setdataChange([...dataChange, objNew]);
    } else {
      const updatedData = dataChange.map((item) => {
        if (item.id_item === check[0].id_item) {
          return { ...item, percent: data.percent };
        }
        return item;
      });
      setdataChange(updatedData);
    }
  };
  useEffect(() => {
    const totalPercent = Math.round(
      dataChange.reduce((acc, segment) => acc + segment.percent, 0)
    );
    if (totalPercent > 1) {
      setstatepopup(true);
    }
  }, [dataChange]);
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/getItems")
      .then((response) => response.json())
      .then((dt1) => {
        if (dt1 != undefined && dt1.length != 0) {
          setitems([...dt1]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/getuserpercent", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id_user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined && data.length != 0) {
          setuserpercent(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleUpdateData = () => {
    userpercent.map((item, index) => {
      let check = dataChange.filter(
        (dt) => dt.id_item == item.id_item && dt.id_user == id_user
      );
      if (check.length != 0) {
        item.percent = parseFloat(check[0].percent);
      }
      fetch("http://localhost:3001/api/v1/deleteuserpercent", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id_user }),
      })
        .then((response) => {
          if (response.status == 200) {
            let id_user = item.id_user;
            let id_item = item.id_item;
            let percent = item.percent;
            fetch("http://localhost:3001/api/v1/adduserpercent", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ id_user, id_item, percent }),
            })
              .then((response1) => {
                if (response1.status == 200) {
                  console.log("oke");
                }
              })
              .catch((err1) => {
                console.log(err1);
              });
            nav("/Admin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container_search")}>
          <div>Chỉnh sửa tỉ lệ cho user tổng tỉ lệ nhỏ hơn hoặc bằng 1</div>
        </div>
        <div className={cx("container_data")}>
          {/* {userpercent.length != 0
            ? userpercent.map((item, index) => {
                return (
                  <ItemSettingUser
                    sendtoData={handleData}
                    key={index}
                    item={item}
                    userpercent={true}
                  />
                );
              })
            : items.map((item, index) => {
                return (
                  <ItemSettingUser
                    sendtoData={handleData}
                    key={index}
                    item={item}
                  />
                );
              })} */}
          {userpercent.map((item, index) => {
            return (
              <ItemSettingUser
                sendtoData={handleData}
                key={index}
                item={item}
                userpercent={true}
              />
            );
          })}
          {/* {items.map((item, index) => {
            return (
              <ItemSettingUser
                sendtoData={handleData}
                key={index}
                item={item}
              />
            );
          })} */}
        </div>
      </div>
      <div className={cx("action_btn")}>
        <div></div>
        <div className={cx("btns")}>
          <button
            onClick={() => {
              nav("/Admin");
            }}
          >
            <span>Hủy</span>
          </button>
          <button onClick={handleUpdateData}>
            <span>Thực hiện</span>
          </button>
        </div>
      </div>
      {/* {statepopup == true ? (
        <Popup>
          <div className={cx("container_input")}>
            <span style={{ color: "black" }}>
              Tổng % tất cả các item phải nhỏ hơn hoặc bằng 1
            </span>
          </div>
          <div
            className={cx("container_btn")}
            style={{ width: "100%", display: "flex" }}
          >
            <button
              onClick={() => {
                setstatepopup(false);
              }}
              className={cx("close")}
            >
              <span>Đóng</span>
            </button>
          </div>
        </Popup>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default SettingUser;
