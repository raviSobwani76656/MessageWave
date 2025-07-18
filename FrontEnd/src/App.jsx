import { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Navbar from "./Components/Navbar/Navbar";
import { Home } from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./Components/Navbar/Footer";
import Messages from "./Pages/Messages";
import { useUserStore } from "./store/userStore";
import { axiosInstance } from "./API/axios";
import { ToastContainer, toast } from "react-toastify";
import { Loader } from "lucide-react";
import Profile from "./Pages/Profile";
function App() {
  const { setUser, user, setLoading } = useUserStore();
  let isLoggedIn = useUserStore((state) => state.isLoggedIn());
  const notify = () => toast("🎉 This is a toast notification!");

  useEffect(() => {
    if (!user) {
      axiosInstance
        .get("/user/getUser")
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div data-theme="cupcake">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={!user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route
            path="/messages"
            element={!user ? <Messages /> : <Navigate to="/login" />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
