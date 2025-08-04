import axios from "axios";

import {useUserStore} from "../store/userStore"

export default async function handleLogout(navigate, clearUser) {

  try {
    await axios.post(
      "http://localhost:5001/user/logout",
      {},
      {
        withCredentials: true,
      }
    );

     useUserStore.getState().setUser(null)
    console.log("Logout successful");
    navigate("/login");
    clearUser();
  } catch (err) {
    console.log("Logout Failed", err);
  }
}
