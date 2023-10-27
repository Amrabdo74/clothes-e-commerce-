import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { logOutAsync } from "../Store/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fierbase";

function Home() {
  const [currentUser,setCrrentuser] = useState('')  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCrrentuser(user)
      }
    });
  }, []);
  return (
    <>
      <h1>{currentUser&& currentUser.email}</h1>
      {/* <h1>{user&& user.displayName}</h1> */}
      <button
        onClick={() => {
          dispatch(logOutAsync());
          navigate("/");
        }}
      >
        LogOut
      </button>
    </>
  );
}
export default Home;
