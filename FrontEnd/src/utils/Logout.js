import axios from "axios";
import { useUserStore } from "../store/userStore";

export default async function handleLogout(navigate) {
  const { setUser } = useUserStore();
  try {
    await axios.post(
      "http://localhost:5000/user/logout",
      {},
      {
        withCredentials: true,
      }
    );

    console.log("Logout successful");
    navigate("/login");
    setUser(null);
  } catch (err) {
    console.log("Logout Failed", err);
  }
}
