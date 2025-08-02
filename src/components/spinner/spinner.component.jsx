import ReactDOM from "react-dom";
import "./spinner.styles.scss";

const Spinner = ({ overlay = true }) => {
  return (
    <div
      className={overlay ? "spinner-overlay" : "spinner-inline"}
    >
      <div className={"spinner"} />
    </div>
  );

  // return overlay
  //   ? ReactDOM.createPortal(spinnerMarkup, document.getElementById("spinner-root"))
  //   : spinnerMarkup;
};

export default Spinner;
