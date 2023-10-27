import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getFromlocaStore } from "../Store/slices/cartSlice";
import {ProgressBar} from './multiStep/StepProgress'
import "react-step-progress-bar/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { openCat } from "../Store/slices/cartNav";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../fierbase";
import { Step1 } from "./multiStep/Step1";
import { Step2 } from "./multiStep/Step2";
function Checkout (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const  cart = useSelector(state=>state.cart)
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          return user
        }else{
          navigate('/Login')
        }
      });
        const cartLocalstorge = JSON.parse(localStorage.getItem("cart"));
          dispatch(getFromlocaStore(cartLocalstorge));
     
      }, []);
    return (
      <div className='container mt-5' >
        {cart.length > 0 ? <><Step1/><Step2/></>:
        <div className="text-center">
        <div>
          <div className="d-flex  justify-content-center ">
            <img
              style={{ width: "250px" }}
              src="https://cartsy.redq.io/wp-content/themes/cartsy/assets/images/not-found-alt.svg"
              alt="a"
            />
          </div>
          <h5 className="text-center mt-5">No products in the cart.</h5>
        </div>

        <Link to="/Shop" className="btn btn-dark mt-2 " onClick={() => dispatch(openCat(false))}>
          {" "}
          Continue shoping
        </Link>
      </div>
        }
        
    </div>
    )
}
export default Checkout;