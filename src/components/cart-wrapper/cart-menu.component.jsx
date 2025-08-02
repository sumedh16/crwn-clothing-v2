import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
import { useNavigate } from "react-router-dom";

const CartMenu = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setIsCartOpen(false);
    navigate("/review");
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsCartOpen(true)}
      onMouseLeave={() => setIsCartOpen(false)}
      onFocus={() => setIsCartOpen(true)}
      onBlur={() => setIsCartOpen(false)}
      tabIndex={0}
    >
      <CartIcon onIconClick={handleIconClick} />
      {isCartOpen && <CartDropDown />}
    </div>
  );
};

export default CartMenu;
