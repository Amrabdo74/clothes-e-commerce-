import "./cssFiles/Navbar.css";
import logo from "../assets/images/grocery-store-low-resolution-color-logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { openCat } from "../Store/slices/cartNav";
import { useEffect, useState } from "react";
import { logOutAsync } from "../Store/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fierbase";
import signOut from '../assets/images/logout.png'
import loginImage from '../assets/images/lock.png'
import DarkMode from "./DarkMode";
function Navbar() {
  const cart = useSelector((state) => state.cart);
  const [currentUser, setCrrentuser] = useState();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCrrentuser(user);
      } else {
        setCrrentuser("");
      }
    });
  }, [currentUser]);
  return (
    <>
      <nav className="navbar navbar-expand-lg auto">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Logo"
              width="90"
              className="d-inline-block align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={true}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(false)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${
              expanded ? "hide" : "show"
            } `}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              <li className="nav-item " onClick={() => setExpanded(true)}>
                <Link className="nav-link active " aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" onClick={() => setExpanded(true)}>
                <Link className="nav-link active" to="/Shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item" onClick={() => setExpanded(true)}>
                <Link className="nav-link active" to="/FAQs">
                  FAQs
                </Link>
              </li>
              <li className="nav-item" onClick={() => setExpanded(true)}>
                <Link className="nav-link active" to="/Blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item" onClick={() => setExpanded(true)}>
                <Link className="nav-link active" to="/Terms">
                  Terms
                </Link>
              </li>

              <li className="nav-item" onClick={() => setExpanded(true)}>
                <Link className="nav-link active" to="/Contact">
                  Contact
                </Link>
              </li>
              {currentUser ? (
                <li
                  className="nav-item"
                  onClick={() => {
                    setExpanded(true);
                    dispatch(logOutAsync());
                  }}
                >
                  <Link className="nav-link active" to="/">
                    <img
                      style={{ width: "25px", marginRight: "10px" }}
                      src={signOut}
                      alt=""
                    />
                    Sign Out
                  </Link>
                </li>
              ) : (
                <li
                  className="nav-item"
                  onClick={() => {
                    setExpanded(true);
                  }}
                >
                  <Link className="nav-link active" to="/Login">
                    <img
                      style={{ width: "25px", marginRight: "10px" }}
                      src={loginImage}
                      alt=""
                    />
                    Login
                  </Link>
                </li>
                
              )}
                      <DarkMode/>

            </ul>
          </div>
        </div>

      </nav>
      <button
        className="nav-link active cart cart-car p-2"
        onClick={() => dispatch(openCat(true))}
      >
        <HiOutlineShoppingCart />
        <span className="cart-num">{cart && cart.length}</span>
      </button>
      <Cart />
    </>
  );
}
export default Navbar;
