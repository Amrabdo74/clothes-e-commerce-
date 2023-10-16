/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../fierbase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export const Authcontext = createContext();

function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [isloading, setisloading] = useState(false);
  const singup = (email, password) => {
   return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    localStorage.setItem('user',null)
    return signOut(auth);

  };
  const login = (email, password) => {
  return  signInWithEmailAndPassword(auth, email, password);
  };
  const restPaswords = (email) => {
    return sendPasswordResetEmail(auth, email)

  }
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user))
      setisloading(false);
    });
    return () => {
      unSubcribe();
    };
  }, []);
  return (
    <Authcontext.Provider value={{ currentUser, singup, logout, login,restPaswords }}>
      {!isloading && props.children}
    </Authcontext.Provider>
  );
}
export default AuthProvider;
