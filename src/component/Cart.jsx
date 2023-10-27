import { useDispatch, useSelector } from "react-redux";
import "./cssFiles/cart.css";
import { openCat } from "../Store/slices/cartNav";
import {
  clearCart,
  decreseQuantity,
  increseQuantity,
  removeFeomcart,
} from "../Store/slices/cartSlice";
import Ximg from "../assets/images/pngegg.png";
import { Link } from "react-router-dom";

function Cart() {
  // Add a
  const cartNav = useSelector((state) => state.carNav);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  return (
    <div
      className={cartNav ? "open cartStyle position-fixed " : "close cartStyle"}
    >
      <div className="cartNav">
        <h5>Shopping Cart</h5>
        <h5 className="X" onClick={() => dispatch(openCat(false))}>
          X
        </h5>
      </div>
      {cart.length > 0 ? (
        
        cart.map((cart) => (
          <div key={ Math.floor(Math.random() * (10000 - 1 + 1)) + 1}>
            <div className="d-flex justify-content-between align-items-center pt-5 pb-3 border-bottom">
              <div className="img-container">
                <img
                  style={{ width: "80px", height: "80px" }}
                  src={cart.image}
                  alt={cart.name}
                />
                <div
                  className="remove"
                  onClick={() => {
                    dispatch(removeFeomcart(cart));
                    const local = JSON.parse(localStorage.getItem("cart"));
                    const finded = local.filter(
                      (product) => product.id !== cart.id
                    );
                    finded &&
                      localStorage.setItem("cart", JSON.stringify(finded));
                  }}
                >
                  <img
                    style={{
                      width: "50px",
                      border: "1px solid #000",
                      borderRadius: "50%",
                    }}
                    src={Ximg}
                    alt="remove"
                  />
                </div>
              </div>
              <div style={{ width: "85%" }}>
                <p>
                  {cart.name}
                  <br />
                  <span
                    style={{ color: "rgb(156 163 175)", padding: "10px 0 0 0" }}
                  >
                    Unit price {cart.price}$
                  </span>
                  <br/>
                  <span
                    style={{ color: "rgb(156 163 175)", padding: "10px 0 0 0" ,marginTop:'5px'}}
                  >
                    Size {cart.size}
                  </span>
                </p>

                <div className="d-flex justify-content-between">
                  <div className="d-flex cartqun">
                    <button onClick={() => dispatch(decreseQuantity(cart))}>
                      -
                    </button>
                    <p>{cart.quantity}</p>
                    <button onClick={() => dispatch(increseQuantity(cart))}>
                      +
                    </button>
                  </div>
                  <h5 className="font-weight-bold">
                    {(cart.price * cart.quantity).toFixed(2)}$
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
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

          <Link onClick={() => dispatch(openCat(false))} to="/Shop" className="btn btn-dark mt-2 ">
            {" "}
            Continue shoping
          </Link>
        </div>
      )}
      {cart.length > 0 && (
        <div className="d-flex FixedDiv  mt-2 justify-content-center">
          {" "}
          <Link to="/checkout" onClick={() => dispatch(openCat(false))} className="FixedButton btn  btn-dark pt-2 pb-2   "> Proceed To Checkout : {totalPrice.toFixed(2)}$</Link>{" "}

        </div>
      )}
    </div>
  );
}
export default Cart;
