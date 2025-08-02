import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
import SignUp from "./components/sign-up/sign-up.component";
import Shop from "./routes/shop/shop.component";
import CheckOut from "./components/checkout/checkout.component";
import { useContext } from "react";
import { SpinnerContext } from "./context/spinner.context";
import Spinner from "./components/spinner/spinner.component";

const App = () => {
  const { isSpinnerOpen } = useContext(SpinnerContext);
  return (
    <>
      {isSpinnerOpen && <Spinner />}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="review" element={<CheckOut />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
