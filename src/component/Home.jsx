import { useContext, useEffect } from "react";
import { Authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

function Home() {
  const myContect = useContext(Authcontext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user == null) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <h1>{user&& user.email}</h1>
      <button
        onClick={() => {
          myContect.logout();
          navigate("/");
        }}
      >
        LogOut
      </button>
    </>
  );
}
export default Home;
