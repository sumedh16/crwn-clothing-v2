import { useContext, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartMenu from "../../components/cart-wrapper/cart-menu.component";
import { usePlatformNavigate } from "../../utils/platformNavigate";
import { SpinnerContext } from "../../context/spinner.context";

const Navigation = () => {
  const { currentUser } = useContext(userContext);
  const { setIsCartOpen } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const platformNavigate = usePlatformNavigate();
  const { setIsSpinnerOpen } = useContext(SpinnerContext);

  useEffect(() => {
    setIsSpinnerOpen(false);
    setIsCartOpen(false);
  }, [location]);

  return (
    <>
      <div className="navigation">
        <span className="logo-container"onClick={() => platformNavigate('/')} >
          <CrwnLogo className="logo" />
        </span>
        <div className="nav-links-container">
          <span
            className="nav-link"
            onClick={() => {
              platformNavigate("/shop");
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
            <span className="nav-link" onClick={() => platformNavigate("/sign-in")}>
              SIGN IN
            </span>
          )}
          <CartMenu />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
