import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerContext } from "../context/spinner.context";

export const usePlatformNavigate = () => {
  const navigate = useNavigate();
  const { setIsSpinnerOpen } = useContext(SpinnerContext);

  return (destination, options) => {
    setTimeout(() => {
      navigate(destination, options);
    }, 300);
    setIsSpinnerOpen(true);
  };
};
