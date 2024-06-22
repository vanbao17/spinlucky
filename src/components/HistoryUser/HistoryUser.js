import classNames from "classnames/bind";
import styles from "./HistoryUser.module.scss";
import { useEffect, useState } from "react";
import ItemRow from "./ItemRow";
import { json, useLocation } from "react-router-dom";
const cx = classNames.bind(styles);
function HistoryUser() {
  const [datauser, setdatauser] = useState([]);
  const location = useLocation();
  const id_user = location.state?.dt;
  const [st, setst] = useState(false);
  //   const handleChangeSearch = (e) => {
  //     let username = e.target.value;
  //     if (username.length > 0) {
  //       const options = {
  //         method: "POST",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //         body: JSON.stringify({ username }),
  //       };
  //       fetch("https://vongquay.xyz/api/v1/finduser", options)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data != undefined) {
  //             setdatauser(data);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       fetch("https://vongquay.xyz/api/v1/getuser")
  //         .then((response) => response.json())
  //         .then((data) => {
  //           if (data != undefined) {
  //             setdatauser(data);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   };
  useEffect(() => {
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
        <div className={cx("container_search")}>
          <div>
            <div className={cx("icon")}></div>
            <input
              //   onChange={handleChangeSearch}
              type="check"
              className={cx("search")}
              placeholder="Nhập từ cần tìm"
            ></input>
          </div>
          <div></div>
        </div>
        <div className={cx("container_data")}>
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>ID</th>
                <th style={{ width: "30%" }}>Item Name</th>
                <th style={{ width: "35%" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {datauser.length !== 0 ? (
                datauser.map((user, index) => {
                  return (
                    <ItemRow key={index} data={user} statePage={handlePage} />
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
          {datauser.length == 0 && (
            <span
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Chưa có lịch sử quay
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryUser;
