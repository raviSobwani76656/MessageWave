import axios from "axios";

export default async function handleLogout(navigate) {
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
  } catch (err) {
    console.log("Logout Failed", err);
  }
}
