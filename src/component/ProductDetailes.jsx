import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./cssFiles/productDetails.css";
import {
  addTocart,
  decreseQuantity,
  getFromlocaStore,
  increseQuantity,
} from "../Store/slices/cartSlice";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { openCat } from "../Store/slices/cartNav";

function ProductDetailes() {
  const [size, setSize] = useState("");
  let { productId } = useParams();
  const [product, setProducts] = useState([]);
  //const product = products[productId];
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const item = cart.find((item) => item.id === product.id);
  const quantityInitem = item ? item.quantity : 0;
  if (cart.length >= 1) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  useEffect(() => {
    fetch("https://amrabdo74.github.io/render-json-server-main-master/db.json")
      .then((res) => res.json())
      .then((data) => {
        const prodectDetail = data.item[productId - 1];
        //const prodectClone = { ...prodectDetail, quantity: 0 };
        setProducts(prodectDetail);
      });
    if (cart.length >= 1) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const cartLocalstorge = JSON.parse(localStorage.getItem("cart"));
    dispatch(getFromlocaStore(cartLocalstorge));
  }, []);
  return (
    <>
      <div className="prodectDetail " key={product.id}>
        <div className="img-content">
          <img src={product.image} className="card-img-top" alt="..." />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h5 className="span-text"> ${product.price}</h5>
          <p className="span-par"> {product.description}</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              product.size = size;
              // console.log(size);
              // console.log(product);
              dispatch(openCat(true));
              // const prodectClone = { ...product, quantity: +1 };
              // setProducts(prodectClone);
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                title: product.name,
              });
              dispatch(addTocart(product));
            }}
          >
            <h6>Select Size:</h6>

            <br />

            <div className="form-check form-check-inline mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                onChange={() => setSize("M")}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                M
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
                onChange={() => setSize("L")}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                L
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
                onChange={() => setSize("XL")}
                required
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                XL
              </label>
            </div>
            <br />

            <input
                type="submit"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="btn btn-primary "
                value="Add"
              />
            {/* {quantityInitem === 0 ? (
              <input
                type="submit"
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="btn btn-primary "
                value="Add"
              />
            ) : (
              <div className="d-flex cartqun ">
                <input type='button' onClick={() => dispatch(decreseQuantity(item))} value='-' />
              
                <p>{item.quantity}</p>
                <input
                  onClick={() => {
                    dispatch(increseQuantity(item));
                  }}
                value='+'
                type="button"
                />
              </div>
            )} */}
          </form>
        </div>
      </div>
    </>
  );
}
export default ProductDetailes;
