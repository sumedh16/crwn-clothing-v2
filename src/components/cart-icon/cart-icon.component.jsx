import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { CartContext } from "../../context/cart.context";
const CartIcon = (props) => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  return (
    <div
      className={`cart-icon-container ${props.className || ""}`}
      tabIndex={0}
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      <ShoppingIcon aria-label="shopping cart icon" className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
