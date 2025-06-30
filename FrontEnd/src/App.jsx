import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      <CreateAccount />
    </>
  );
}

export default App;
