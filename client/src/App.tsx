import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
