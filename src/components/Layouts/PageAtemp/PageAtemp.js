import classNames from "classnames/bind";
import styles from "./PageAtemp.module.scss";
const cx = classNames.bind(styles);

function PageAtemp({ children }) {
  return (
    <div className={cx("wrapper")}>
      <div className="content">{children}</div>
    </div>
  );
}

export default PageAtemp;
