import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Products from "./components/product/Products";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
