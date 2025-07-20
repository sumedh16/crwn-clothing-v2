import Button from "../button/button.component";
import "./cart-dropdown.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckout = () => {
    console.log("sumedh clicked");
    navigate("/review");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length > 0 &&
          cartItems.map((item) => <CartItem key={item.id} {...item} />)}
        {cartItems.length === 0 && (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button buttonType="inverted" onClick={goToCheckout}>
        Go To Checkout
      </Button>
    </div>
  );
};

export default CartDropDown;
