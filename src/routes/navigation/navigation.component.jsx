import { useContext, useEffect} from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { userContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const location = useLocation();

   useEffect(() => {
    setIsCartOpen(false);
  }, [location, setIsCartOpen]);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span
              className="nav-link"
              onClick={async () => {
                const res = await signOutUser();
                console.log(res);
              }}
            >
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/sign-in">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {isCartOpen && <CartDropDown />}
      <Outlet />
    </>
  );
};

export default Navigation;
