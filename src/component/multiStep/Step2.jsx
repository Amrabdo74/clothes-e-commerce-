/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
// import { fromSubit } from "../../Store/slices/authSlice";
import { db } from "../../fierbase";
import { addDoc, collection } from "firebase/firestore";
import "../cssFiles/cart.css";
import { useRef } from "react";
// import StepProgressBar from "react-step-progress";

export const Step2 = () => {
  const cart = useSelector(state=>state.cart)
  const dispath = useDispatch();
  const fullNmame= useRef();
  const streetAddress = useRef();
  const City= useRef();
  const Region= useRef();
  const Phone= useRef();
  const antherPhone  = useRef();
  const handelSubmit = (e) => {
    e.preventDefault();
    const collRef = collection(db, "usersOrders");
    addDoc(collRef, {
      order: {
        fullNmame:fullNmame.current.value,
        streetAddress:streetAddress.current.value,
        City:City.current.value,
        Region:Region.current.value,
        Phone:Phone.current.value,
        antherPhone:antherPhone.current.value
      },
      cart
    });
    fullNmame.current.value='';
    streetAddress.current.value='';
    City.current.value ='';
    Region.current.value='',
    Phone.current.value ='';
    antherPhone.current.value ='';
  };
  return (
    <div className="p-2">
      <section
        className="order-form m-4border-1 border border-primar mt-4   "
        
      >
        <div className="container pt-4 pb-5">
          <div className="row">
            <div className="col-12 px-4">
              <h4 className="mb-5 text-center ">Enter Your data</h4>
              {/* <hr className="mt-1" /> */}
            </div>
            <form onSubmit={handelSubmit} className="  ">
              <div className="col-12">
                <div className="row mx-4">
                  <div className="col-sm-12">
                    <label className="form-label" htmlFor="form1">
                      Full Name
                    </label>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form1"
                        className="form-control order-form-input"
                        required // Add the required attribute
                        ref={fullNmame}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-3 mx-4">
                  <label className="form-label" htmlFor="form5">
                    Street Address
                  </label>
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                      ref={streetAddress}
                        type="text"
                        id="form5"
                        className="form-control order-form-input"
                        required // Add the required attribute
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 mt-2 pe-sm-2">
                    <label className="form-label" htmlFor="form7">
                      City
                    </label>
                    <div className="form-outline">
                      <input
                      ref={City}
                        type="text"
                        id="form7"
                        className="form-control order-form-input"
                        required // Add the required attribute
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mt-2 ps-sm-0">
                    <label className="form-label" htmlFor="form8">
                      Region
                    </label>
                    <div className="form-outline">
                      <input
                      ref={Region}
                        type="text"
                        id="form8"
                        className="form-control order-form-input"
                        required // Add the required attribute
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mt-2 pe-sm-2">
                    <label className="form-label" htmlFor="form9">
                      Phone
                    </label>
                    <div className="form-outline">
                      <input
                      ref={Phone}
                        type="text"
                        id="form9"
                        className="form-control order-form-input"
                        required // Add the required attribute
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mt-2 ps-sm-0">
                    <label className="form-label" htmlFor="form10">
                      Anther Phone
                    </label>
                    <div className="form-outline">
                      <input
                      ref={antherPhone}
                        type="text"
                        id="form10"
                        className="form-control order-form-input"
                        required // Add the required attribute
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary save w-25 mt-4 d-block m-auto  ">
                Save
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};