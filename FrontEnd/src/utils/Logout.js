import axios from "axios";

export default async function handleLogout(navigate, clearUser) {
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
    clearUser();
  } catch (err) {
    console.log("Logout Failed", err);
  }
}
