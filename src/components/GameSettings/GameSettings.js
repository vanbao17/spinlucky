import classNames from "classnames/bind";
import styles from "./GameSettings.module.scss";
import { useEffect, useRef, useState } from "react";

import ItemRow from "./ItemRow";
import Popup from "../Popup/Popup";
import React from "react";
const cx = classNames.bind(styles);

function GameSettings() {
  const [datauser, setdatauser] = useState([]);
  const [st, setst] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const [warning, setwarning] = useState(null);
  const handlePopup = () => {
    setstatepopup(!setstatepopup);
  };
  const totalPercent = datauser.reduce(
    (acc, segment) => acc + segment.percent,
    0
  );
  const refName = useRef();
  const refPercent = useRef();
  const refColor = useRef();
  const refImage = useRef();
  const handleAdd = () => {
    let name_item = refName.current.value;
    let percent = refPercent.current.value;
    let color = refColor.current.value;
    let image_item = refImage.current.value;

    if (totalPercent <= 1) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name_item, percent, color, image_item }),
      };
      fetch("http://localhost:3003/api/v1/addItem", options)
        .then((response) => {
          if (response.status == 200) {
            setstatepopup(!setstatepopup);
            fetch("http://localhost:3003/api/v1/getItems")
              .then((response) => response.json())
              .then((data) => {
                if (data != undefined) {
                  setdatauser(data);
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
    } else {
      setwarning("Phần trăm đã đủ và bạn chỉ có thể thêm 0 ");
    }
  };
  const handleChangeSearch = (e) => {
    let itemname = e.target.value;
    if (itemname.length > 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemname }),
      };
      fetch("http://localhost:3003/api/v1/finditem", options)
        .then((response) => response.json())
        .then((data) => {
          if (data != undefined) {
            setdatauser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("http://localhost:3003/api/v1/getItems")
        .then((response) => response.json())
        .then((data) => {
          if (data != undefined) {
            setdatauser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetch("http://localhost:3003/api/v1/getItems")
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          setdatauser(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [st]);
  const handlePage = (state) => {
    setst(!st);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("container_header")}>
          <div className={cx("container_search")}>
            <div className={cx("icon")}></div>
            <input
              onChange={handleChangeSearch}
              type="check"
              className={cx("search")}
              placeholder="Nhập từ cần tìm"
            ></input>
          </div>
          <div
            className={cx("add-item")}
            onClick={() => {
              setstatepopup(true);
            }}
          >
            <span>Thêm item</span>
          </div>
        </div>
        {statepopup == true ? (
          <Popup>
            <div className={cx("container_input")}>
              <span>Nhập tên item</span>
              <input
                ref={refName}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập màu của item</span>
              <input
                ref={refColor}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập % của item</span>
              <input
                ref={refPercent}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập Link ảnh</span>
              <input
                ref={refImage}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <span>
              {warning != null
                ? warning
                : "Bạn chỉ được nhập percent dưới " +
                  (1 - totalPercent).toFixed(1)}
            </span>
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
        <div className={cx("container_data")}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Item Id</th>
                <th style={{ width: "20%" }}>Item Name</th>
                <th style={{ width: "20%" }}>Item Image</th>
                <th style={{ width: "15%" }}>Color</th>
                <th style={{ width: "25%" }}>Percent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datauser !== undefined &&
                datauser.length !== 0 &&
                datauser.map((user, index) => {
                  return (
                    <ItemRow
                      totalPercent={totalPercent}
                      key={index}
                      data={user}
                      statePage={handlePage}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GameSettings;
