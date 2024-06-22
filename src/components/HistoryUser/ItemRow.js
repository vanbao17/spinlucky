import classNames from "classnames/bind";
import styles from "./HistoryUser.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import Popup from "../Popup/Popup";
import { useNavigate } from "react-router-dom";
import React from "react";
const cx = classNames.bind(styles);

function ItemRow({ data, statePage }) {
  const [nameitem, setnameitem] = useState("");
  useEffect(() => {
    fetch("http://localhost:3003/api/v1/getItems")
      .then((response) => response.json())
      .then((data1) => {
        if (data1 != undefined) {
          let check = data1.filter((item) => item.id_item == data.id_item);
          setnameitem(check[0].name_item);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <tr>
      <td>{data.id_ds}</td>
      <td>{nameitem}</td>
      <td>{data.date}</td>
    </tr>
  );
}

export default ItemRow;
