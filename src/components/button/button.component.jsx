import "./button.styles.scss";
import { useContext } from "react";
import { SpinnerContext } from "../../context/spinner.context";

const button_types = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, className ,...otherProps }) => {

  const handleClick = () => {
    if(!isSpinnerOpen) {
      setIsSpinnerOpen(true);
    }
    setTimeout(async () => {
      await otherProps.onClick && otherProps.onClick();
      setIsSpinnerOpen(false);
    }, 300);

  };
  
  const { isSpinnerOpen, setIsSpinnerOpen } = useContext(SpinnerContext);

  return (
    <button
      className={`button-container ${button_types[buttonType] || ""} ${className}`}
      {...otherProps} onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
