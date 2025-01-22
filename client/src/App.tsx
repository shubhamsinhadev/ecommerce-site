import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import User from "./components/user/User";
import LoginMain from "./components/auth/login/LoginMain";
import RegistrationMain from "./components/auth/registration/RegistrationMain";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/registration" element={<RegistrationMain />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
