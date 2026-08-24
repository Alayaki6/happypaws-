import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dogs from "./pages/Dogs";
import Cats from "./pages/Cats";
import OtherPets from "./pages/OtherPets";
import PetDetails from "./pages/PetDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import "./styles/index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/other-pets" element={<OtherPets />} />
        <Route path="/pets/:petId" element={<PetDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
