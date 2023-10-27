import "./testimonials.css";

import { Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import {
  addTocart,
  decreseQuantity,
  increseQuantity,
} from "../Store/slices/cartSlice";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchProdects } from "../Store/slices/prodects-slice";

const Sliderswiper = () => {
  useEffect(() => {
    dispatch(fetchProdects());
  }, []);
  const products = useSelector((state) => state.prodects);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <section id="testimonials" className="container">
      <h2>Clothes</h2>
      <Swiper
      
        className="container testimonials__container"
        // install Swiper modules
        modules={[Pagination,Autoplay]}
        spaceBetween={40}
        // slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
        breakpoints={{
          // Define responsive breakpoints
          500: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2, // Set slidesPerView to 1 for screens with a width of 768 pixels or less
          },
          992: {
            slidesPerView: 3, // Set slidesPerView to 2 for screens with a width of 992 pixels or less
          },
          1200: {
            slidesPerView: 4, // Set slidesPerView to 3 for screens with a width of 1200 pixels or less
          },
          // Add more breakpoints as needed
        }}
        //   autoplay={{
        //     delay: 3000, // 3 seconds delay between slides
     
        //   }}
      >
        {products.slice(1, 10).map((product) => {
          const item = cart.find((item) => item.id === product.id);
          const quantityInitem = item ? item.quantity : 0;
          return (
            <SwiperSlide key={product.id} className="testimonials">
              <div
                className="card homeCard "
                style={{
                  width: "18rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Link to={`/shop/${product.id}`}>
                  {" "}
                  <img
                    className="card-img-top"
                    src={product.image}
                    alt="Card image cap"
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text"></p>
                  <Link to={`/shop/${product.id}`}
                      className="btn btn-primary addButton"
                      // onClick={() => {
                      //   // dispatch(addTocart(product));
                      //   const Toast = Swal.mixin({
                      //     toast: true,
                      //     position: "top-end",
                      //     showConfirmButton: false,
                      //     timer: 3000,
                      //     timerProgressBar: true,
                      //     didOpen: (toast) => {
                      //       toast.addEventListener(
                      //         "mouseenter",
                      //         Swal.stopTimer
                      //       );
                      //       toast.addEventListener(
                      //         "mouseleave",
                      //         Swal.resumeTimer
                      //       );
                      //     },
                      //   });

                      //   Toast.fire({
                      //     icon: "success",
                      //     title: product.name,
                      //   });
                      // }}
                    >
                      Add
                    </Link>
                  {/* {quantityInitem === 0 ? (
                    <button
                      className="btn btn-primary addButton"
                      onClick={() => {
                        dispatch(addTocart(product));
                        const Toast = Swal.mixin({
                          toast: true,
                          position: "top-end",
                          showConfirmButton: false,
                          timer: 3000,
                          timerProgressBar: true,
                          didOpen: (toast) => {
                            toast.addEventListener(
                              "mouseenter",
                              Swal.stopTimer
                            );
                            toast.addEventListener(
                              "mouseleave",
                              Swal.resumeTimer
                            );
                          },
                        });

                        Toast.fire({
                          icon: "success",
                          title: product.name,
                        });
                      }}
                    >
                      Add
                    </button>
                  ) : (
                    <div className="d-flex cartqun quntityShop">
                      <button onClick={() => dispatch(decreseQuantity(item))}>
                        -
                      </button>
                      <p>{item.quantity}</p>
                      <button
                        onClick={() => {
                          dispatch(increseQuantity(item));
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}{" "} */}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Sliderswiper;
