import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import Navbar from "./components/navbar/Navbar";
import User from "./components/user/User";
import LoginMain from "./components/auth/login/LoginMain";
import RegistrationMain from "./components/auth/registration/RegistrationMain";
import { Toaster } from "@/components/ui/toaster";
import AddressMain from "./components/address/AddressMain";
import UserProfile from "./components/user/UserProfile";
import OrderMain from "./components/orders/OrderMain";
import CartDisplay from "./components/cart/CartDisplay";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartDisplay />} />
          <Route path="/user" element={<User />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="address" element={<AddressMain />} />
            <Route path="order" element={<OrderMain />} />
          </Route>
          <Route path="/login" element={<LoginMain />} />
          <Route path="/registration" element={<RegistrationMain />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
