import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
import "./checkout.styles.scss";
import { SpinnerContext } from "../../context/spinner.context";

const CheckOut = () => {
  const {
    cartCount,
    cartItems,
    removeItemFromCart,
    addItemToCart,
    clearItemFromCart,
    cartTotal,
  } = useContext(CartContext);
  const { isSpinnerOpen, setIsSpinnerOpen } = useContext(SpinnerContext);
  if (cartCount === 0 || cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty</h2>
      </div>
    );
  }
  return (
    <div className="checkout-container">
      <h2>Cart Summary </h2>
      <table className="checkout-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="product-img-cell">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="checkout-product-img"
                />
              </td>
              <td>{item.name}</td>
              <td className="quantity-cell">
                <span
                  className="quantity-btn"
                  onClick={() => removeItemFromCart(item)}
                >
                  -
                </span>
                <span className="quantity-value">{item.quantity}</span>
                <span
                  className="quantity-btn"
                  onClick={() => addItemToCart(item)}
                >
                  +
                </span>
              </td>{" "}
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => {
                    if (!isSpinnerOpen) {
                      setIsSpinnerOpen(true);
                    }
                    setTimeout(() => {
                      clearItemFromCart(item);
                      setIsSpinnerOpen(false);
                    }, 350);
                  }}
                  aria-label={`Remove ${item.name}`}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="checkout-total">Total : ${cartTotal}</h3>
    </div>
  );
};

export default CheckOut;
