import { useState } from "react";

import "./App.css";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Navbar from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Navbar/Footer";
import Messages from "./Pages/Messages";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
