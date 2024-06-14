import classNames from "classnames/bind";
import styles from "./SettingUser.module.scss";
import { useEffect, useRef, useState } from "react";
import Popup from "../Popup/Popup";
const cx = classNames.bind(styles);
function ItemSettingUser({ state, item, sendtoData, userpercent }) {
  const refName = useRef();
  const refPercent = useRef();
  const [isEditable, setIsEditable] = useState(false);
  const [test, settest] = useState(null);
  const [test1, settest1] = useState(null);
  const [items, setitems] = useState();

  const sendData = (e) => {
    let percnetNew = e.target.value;
    if (percnetNew !== "") {
      sendtoData({ id_item: item.id_item, percent: percnetNew });
    }
    settest1(percnetNew);
  };
  const handleInputClick = (e, data) => {
    setIsEditable(true);
    e.target.value = data;
    refName.current.removeAttribute("readOnly");
  };
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/getItems")
      .then((response) => response.json())
      .then((dt1) => {
        if (dt1 != undefined && dt1.length != 0) {
          const check = dt1.filter((it) => it.id_item == item.id_item);
          if (check.length != 0) {
            setitems(check[0].name_item);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={cx("WrapperItem")}>
      <div className={cx("container_input")}>
        <span>Tên item</span>
        <input
          ref={refName}
          type="text"
          className={cx("username")}
          name="username"
          value={items != null ? items : test}
          readOnly={true}
        ></input>
      </div>
      <div className={cx("container_input")}>
        <span>Phần trăm</span>
        <input
          ref={refPercent}
          type="text"
          className={cx("username")}
          name="username"
          value={test1 == null ? item.percent : test1}
          readOnly={!isEditable}
          onClick={(e) => {
            handleInputClick(e, item.percent);
          }}
          onChange={sendData}
        ></input>
      </div>
    </div>
  );
}

export default ItemSettingUser;
