import { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import CreateAccount from "./Pages/CreateAccount";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Messages from "./Pages/Messages";
import { useUserStore } from "./store/userStore";
import { axiosInstance } from "./API/axios";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";

function App() {
  const { setUser, user, loading, setLoading } = useUserStore();
  let isLoggedIn = useUserStore((state) => state.isLoggedIn());

  // useEffect(() => {
  //   if (!user) {
  //     axiosInstance
  //       .get("/user/getUser")
  //       .then((res) => setUser(res.data.user))
  //       .catch(() => setUser(null))
  //       .finally(() => setLoading(false));
  //   }
  // }, [user]);

  useEffect(() => {
    useUserStore.getState().fetchLoggedInUser();
  }, [user]);

  if (loading) {
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
        <Toaster />
        <Routes>
          <Route path="/" element={user&&<Home />} />
          <Route path="/login" element={!user && <Login />} />
          <Route
            path="/createAccount"
            element={!user ? <CreateAccount /> : <Navigate to="/login" />}
          />
          <Route
            path="/messages"
            element={user ? <Messages /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
