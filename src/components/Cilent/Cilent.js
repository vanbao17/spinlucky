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
const cx = classNames.bind(styles);

function Cilent() {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [statepopup, setstatepopup] = useState(false);
  const refPassword = useRef();
  const [user, setuser] = useState();
  const username = sessionStorage.getItem("username");
  const [state, setState] = useState(0);
  const [winner, setwinner] = useState(null);
  const [smallScreen, setsmallScreen] = useState(false);
  const [historydb, sethistorydb] = useState([]);
  // const [data, setdata] = useState([...segments2]);
  const isSmallScreen = useMediaQuery({ query: "(max-width:768px)" });
  const userSession = sessionStorage.getItem("username");
  useEffect(() => {
    if (userSession == null) {
      navigate("/Account");
    } else {
      if (userSession == "Admin" || userSession == "admin") {
        navigate("/Admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);
  const handlePopup = () => {
    setstatepopup(!setstatepopup);
  };

  const handleAdd = () => {
    let username = sessionStorage.getItem("username");
    let password = refPassword.current.value;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    fetch("https://vongquay.xyz/api/v1/findwithusername", options)
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
          fetch("https://vongquay.xyz/api/v1/updatePassword", options1)
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
  useEffect(() => {
    fetch("https://vongquay.xyz/api/v1/findwithusername", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          setuser(data[0]);
          let id_user = data[0].id_user;
          fetch("https://vongquay.xyz/api/v1/getdstrungthuong", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ id_user }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data != undefined) {
                sethistorydb(data);
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
  }, []);
  useEffect(() => {
    fetch("https://vongquay.xyz/api/v1/findwithusername", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((dt1) => {
        const id_user = dt1[0].id_user;
        if (dt1 != undefined || dt1.length != 0) {
          fetch("https://vongquay.xyz/api/v1/findPercentUser", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ id_user }),
          })
            .then((response) => response.json())
            .then((dt11) => {
              if (dt11.length != 0) {
                fetch("https://vongquay.xyz/api/v1/getalluserpercent", {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({ id_user }),
                })
                  .then((response) => response.json())
                  .then((dt2) => {
                    if (dt2 != undefined && dt2.length != 0) {
                      setdata([...dt2]);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
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
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function getRandomColor() {
  //   const letters = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  function getRandomElement(elements) {
    if (elements.length != 0) {
      const totalPercent = Math.round(
        elements.reduce((acc, segment) => acc + segment.percent, 0)
      );
      if (totalPercent !== 1) {
        console.error("Tổng phần trăm không bằng 1.");
        return null;
      }
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
  const handleAddHistory = (history) => {
    const id_user = history.id_user;
    const id_item = history.id_item;
    const date = history.date;

    fetch("https://vongquay.xyz/api/v1/addHistory", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id_user, id_item, date }),
    })
      .then((response) => {
        if (response.status == 200) {
          fetch("https://vongquay.xyz/api/v1/getdstrungthuong", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ id_user }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data != undefined) {
                sethistorydb(data);
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
  useEffect(() => {
    if (isSmallScreen == true) {
      setsmallScreen(true);
    } else {
      setsmallScreen(false);
    }
  }, [isSmallScreen]);
  return (
    <div className={cx("wrapper")}>
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
      <div className={cx("btn-action")}>
        <button
          onClick={() => {
            setstatepopup(!statepopup);
          }}
        >
          <span>Đổi mật khẩu</span>
        </button>
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/Account");
          }}
        >
          <span>Đăng xuất</span>
        </button>
      </div>
      <span>
        <img className={cx("imgTitle")} src={media.imgTitle}></img>
      </span>
      {/* <textarea
        onKeyDown={handleAddInput}
        id="w3review"
        name="w3review"
        rows="4"
        cols="50"
      ></textarea> */}
      <div className={cx("video-background")}>
        {/* <video autoPlay loop muted>
          <source src={media.videobg} type="video/mp4" />
        </video> */}
        <img src={media.imgBackGround}></img>
      </div>
      {/* {<span>target: {dt}</span>} */}
      <div className={cx("container")}>
        <div className={cx("elementwheel")}>
          {data.length != 0 ? (
            <WheelComponent
              key={state}
              segments={data.map((segment) => segment.name_item)}
              segColors={data.map((segment) => segment.color)}
              onFinished={(wn) => {
                setTimeout(() => {
                  setwinner(wn);
                  const checkitem = data.filter((item) => item.name_item == wn);
                  let dataInsert = {
                    id_item: checkitem[0].id_item,
                    id_user: user.id_user,
                    date: formatDate(new Date()),
                  };

                  handleAddHistory(dataInsert);
                }, 1000);
              }}
              primaryColor="white"
              contrastColor="black"
              buttonText="Quay"
              winningSegment={dt}
              isOnlyOnce={false}
              size={smallScreen == true ? 180 : 230}
              // size={230}
              upDuration={0}
              downDuration={1000 * data.length}
              fontFamily="Arial"
            />
          ) : (
            <></>
          )}
        </div>

        <div className={cx("containerhistory")}>
          <div
            className={cx("history")}
            style={{ backgroundImage: `url(${media.imgHistory})` }}
          >
            {/* <img className={cx("imgHistory")} src={media.imgHistory}></img> */}
            <h2>Lịch sử trúng thưởng</h2>
            {historydb.length == 0 ? (
              <h3
                style={{
                  width: "100%",
                  textAlign: "center",
                  display: "block",
                  marginTop: "30px",
                }}
              >
                Chưa có lịch sử
              </h3>
            ) : (
              // <div className={cx("test")}>
              //   {historydb.map((item, index) => {
              //     const name = data.filter(
              //       (item1) => item1.id_item == item.id_item
              //     );
              //     return (
              // <span>
              //   <span>{index + 1}</span>
              //   <span>{name.length != 0 ? name[0].name_item : ""}</span>
              //   <span>{formatDate(item.date)}</span>
              // </span>
              //     );
              //   })}
              // </div>
              <div className={cx("containerTable")}>
                <table>
                  <tbody>
                    {historydb.map((item, index) => {
                      const name = data.filter(
                        (item1) => item1.id_item == item.id_item
                      );
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{name.length != 0 ? name[0].name_item : ""}</td>
                          <td>{formatDate(item.date)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
