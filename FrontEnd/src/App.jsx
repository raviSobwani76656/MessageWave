import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Login />
      <CreateAccount />
    </>
  );
}

export default App;
