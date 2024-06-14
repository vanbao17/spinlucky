import classNames from "classnames/bind";
import styles from "./Admin.module.scss";

import ItemRow from "./ItemRow";
import { useEffect, useState } from "react";
import React from "react";
const cx = classNames.bind(styles);

function Admin() {
  const [datauser, setdatauser] = useState([]);
  const [st, setst] = useState(false);
  const handleChangeSearch = (e) => {
    let username = e.target.value;
    if (username.length > 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username }),
      };
      fetch("http://localhost:3001/api/v1/finduser", options)
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
      fetch("http://localhost:3001/api/v1/getuser")
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
    fetch("http://localhost:3001/api/v1/getuser")
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
              onChange={handleChangeSearch}
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
                <th style={{ width: "15%" }}>Username</th>
                <th style={{ width: "30%" }}>Password</th>
                <th style={{ width: "35%" }}>Số điện thoại</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datauser !== undefined &&
                datauser.length !== 0 &&
                datauser.map((user, index) => {
                  return (
                    <ItemRow key={index} data={user} statePage={handlePage} />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
