import { useContext, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartMenu from "../../components/cart-wrapper/cart-menu.component";


const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { setIsCartOpen } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();

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
          <span
            className="nav-link"
            onClick={() => {
              navigate("/shop");
            }}
          >
            SHOP
          </span>
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
          <CartMenu />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
