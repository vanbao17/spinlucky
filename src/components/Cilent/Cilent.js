import { useEffect, useRef, useState } from "react";

import WheelComponent from "react-wheel-of-prizes";
import WheelWrapper from "../../WheelWrapper";
import { useNavigate } from "react-router-dom";
import media from "../../Assets";
import classNames from "classnames/bind";
import styles from "./Cilent.module.scss";
import Popup from "../Popup/Popup";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { FaTimes } from "react-icons/fa";
const cx = classNames.bind(styles);

function Cilent() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [state, setState] = useState(0);
  const [winner, setwinner] = useState(null);
  const [smallScreen, setsmallScreen] = useState(false);
  const [historydb, sethistorydb] = useState([]);
  const refName = useRef();
  if (!localStorage.getItem("history")) {
    localStorage.setItem("history", JSON.stringify([]));
  }
  function addToLocalStorageArray(obj) {
    let myArray = JSON.parse(localStorage.getItem("history"));
    myArray.push(obj);
    localStorage.setItem("history", JSON.stringify(myArray));
  }
  const isSmallScreen = useMediaQuery({ query: "(max-width:768px)" });
  const userSession = sessionStorage.getItem("username");
  useEffect(() => {
    if (userSession == null || userSession == "Admin") {
      fetch("https://vongquay.xyz/api/v1/getItems")
        .then((response) => response.json())
        .then((dt3) => {
          if (dt3 != undefined && dt3.length != 0) {
            setdata([...dt3]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);
  function getRandomElement(elements) {
    if (elements.length != 0) {
      const totalPercent = Math.round(
        elements.reduce((acc, segment) => acc + segment.percent, 0)
      );
      // if (totalPercent !== 1) {
      //   console.error("Tổng phần trăm không bằng 1.");
      //   return null;
      // }
      const ranges = [];
      let startRange = 0;
      elements.forEach((segment) => {
        const endRange = startRange + segment.percent;
        ranges.push({
          name: segment.name_item,
          start: startRange,
          end: endRange,
        });
        startRange = endRange;
      });
      const randomNumber = Math.random();
      const winningSegment = ranges.find(
        (range) => randomNumber >= range.start && randomNumber < range.end
      );
      return winningSegment ? winningSegment.name : null;
    }
  }
  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }
  const dt = data.length != 0 ? getRandomElement(data) : "";
  function getRandomColor() {
    let color;
    do {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      color = `rgb(${r},${g},${b})`;
    } while (color === "rgb(0,0,0)");
    return color;
  }
  useEffect(() => {
    if (isSmallScreen == true) {
      setsmallScreen(true);
    } else {
      setsmallScreen(false);
    }
  }, [isSmallScreen]);
  // localStorage.setItem("history", JSON.stringify(historydb));
  const handleAdd = () => {
    let name_item = refName.current.value;
    let percent = 0;
    let color = getRandomColor();
    let image_item = "refImage";
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name_item, percent, color, image_item }),
    };
    fetch("https://vongquay.xyz/api/v1/addItem", options)
      .then((response) => {
        if (response.status == 200) {
          fetch("https://vongquay.xyz/api/v1/getItems")
            .then((response) => response.json())
            .then((dt3) => {
              if (dt3 != undefined && dt3.length != 0) {
                refName.current.value = "";
                setdata([...dt3]);
                setState(!state);
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
  const handleDelete = (dt) => {
    const id_item = dt.id_item;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id_item }),
    };
    if (data.length == 1) {
      fetch("https://vongquay.xyz/api/v1/resetAuto")
        .then((rs) => {
          if (rs.status == 200) {
            console.log("oke");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      fetch("https://vongquay.xyz/api/v1/deleteItem", options)
        .then((response) => {
          if (response.status == 200) {
            fetch("https://vongquay.xyz/api/v1/getItems")
              .then((response) => response.json())
              .then((dt3) => {
                if (dt3 != undefined && dt3.length != 0) {
                  setdata([...dt3]);
                  setState(!state);
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
      fetch("https://vongquay.xyz/api/v1/deleteItem", options)
        .then((response) => {
          if (response.status == 200) {
            fetch("https://vongquay.xyz/api/v1/getItems")
              .then((response) => response.json())
              .then((dt3) => {
                if (dt3 != undefined && dt3.length != 0) {
                  setdata([...dt3]);
                  setState(!state);
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
    }
  };
  return (
    <div className={cx("wrapper")}>
      <img className={cx("imgTitle")} src={media.imgTitle}></img>
      <div className={cx("video-background")}>
        <img src={media.imgBackGround}></img>
      </div>
      <div className={cx("container")}>
        <div className={cx("containerhistory")}>
          <button
            onClick={() => {
              localStorage.clear();
              setState(!state);
            }}
          >
            <span>Xóa lịch sử trúng thưởng </span>
          </button>
          <div
            className={cx("history")}
            style={{ backgroundImage: `url(${media.imgHistory})` }}
          >
            <h2>Lịch sử trúng thưởng</h2>
            {JSON.parse(localStorage.getItem("history")).length == 0 ? (
              <h3
                style={{
                  width: "100%",
                  textAlign: "center",
                  display: "block",
                  marginTop: "40px",
                  color: "#fff",
                }}
              >
                Chưa có lịch sử
              </h3>
            ) : (
              <div className={cx("containerTable")}>
                <table>
                  <tbody>
                    {JSON.parse(localStorage.getItem("history")).map(
                      (item, index) => {
                        const name = data.filter(
                          (item1) => item1.id_item == item.id_item
                        );
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{name.length != 0 ? name[0].name_item : ""}</td>
                            <td>{item.date}</td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className={cx("elementwheel")}>
          {data.length != 0 ? (
            <WheelComponent
              key={state}
              segments={data.map((segment) => segment.name_item)}
              segColors={data.map((segment) => segment.color)}
              onFinished={(wn) => {
                const checkitem = data.filter((item) => item.name_item == wn);
                let dataInsert = {
                  id_item: checkitem[0].id_item,
                  date: formatDate(new Date()),
                };
                addToLocalStorageArray(dataInsert);
                setTimeout(() => {
                  setwinner(wn);

                  sethistorydb([...historydb, dataInsert]);
                }, 1000);
              }}
              primaryColor="white"
              contrastColor="black"
              buttonText="Quay"
              winningSegment={dt}
              isOnlyOnce={false}
              size={smallScreen == true ? 180 : 230}
              // size={230}
              upDuration={data.length>50?0:100}
              downDuration={data.length>50?1000 * data.length:1500}
              fontFamily="Arial"
            />
          ) : (
            <></>
          )}
        </div>
        <div className={cx("container_add_item")}>
          <div className={cx("form")}>
            <div
              className={cx("container_input")}
              style={{ backgroundImage: `url(${media.imgKhungInput})` }}
            >
              <input ref={refName} type="text"></input>
            </div>
            <button onClick={handleAdd}>
              <span>Thêm</span>
            </button>
          </div>
          <ul
            className={cx("list_item")}
            style={{ backgroundImage: `url(${media.imgKhungUser})` }}
          >
            {data.map((it, index) => {
              return (
                <li key={index}>
                  <span>
                    {it.id_item} -- {it.name_item}
                  </span>
                  <div
                    className={cx("icon")}
                    onClick={() => {
                      handleDelete(it);
                    }}
                  >
                    <FaTimes />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {winner != null ? (
        <div className={cx("congrats-overlay")}>
          <div
            className={cx("congrats-box")}
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundImage: `url(${media.imgCong})` }}
          >
            <div className={cx("congrats-content")}>
              <h2>Chúc mừng bạn đã trúng {winner}</h2>
              <div
                className={cx("btn-close")}
                onClick={() => {
                  setwinner(null);
                  setState((prev) => prev + 1);
                }}
              >
                Đóng
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Cilent;
