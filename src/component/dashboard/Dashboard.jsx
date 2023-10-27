/* eslint-disable no-unused-vars */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef } from "react";
import { db, storage } from "../../fierbase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import  {
  dashboardProducts,
} from "../../Store/slices/dashboardSlice";
import loaderImage from "../../assets/images/loader.svg"
function Dashboard() {
  const [isLoading, setisLoading] = useState(false);
  const allProducts = useSelector((state) => state.dashbord.allProducts);
  const loader = useSelector((state) => state.dashbord.isloading);
  const dispatch = useDispatch();
  const ProductName = useRef();
  useEffect(() => {
    dispatch(dashboardProducts());
  }, []);
  const description = useRef();
  const price = useRef();
  const category = useRef();
  const Uploadimage = useRef();
  const subcategory = useRef();
  const [imageSrc, setimageSrc] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image , the file is a ${typeof image}`);
      return;
    } else {
      setimageSrc(image);
    }
  };
  const handelSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    const storageRef = ref(storage, `images/${imageSrc.name}`);
    const uploadRef = uploadBytesResumable(storageRef, imageSrc);
    uploadRef.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload progress: " + progress + "% bytes transferred");
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
          const collRef = collection(db, "products");
          const productData = {
            name: ProductName.current.value,
            description: description.current.value,
            category: category.current.value,
            price: price.current.value,
            image: downloadURL,
          };
          setisLoading(false);
          // Automatically generate a document ID for the product
          addDoc(collRef, { productData })
            .then((docRef) => {
              // You can access the auto-generated document ID using docRef.id
              productData.id = docRef.id;

              // Now you can update the document with the productData including the ID
              setDoc(doc(collRef, docRef.id), { product: productData })
                .then(() => {
                  // console.log("Document updated with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });

          setTimeout(() => {
            dispatch(dashboardProducts());
          }, 1000);

          const reset = () => {
            ProductName.current.value = "";
            description.current.value = "";
            category.current.value = "";
            price.current.value = "";
            Uploadimage.current.value = "";
            subcategory.current.value = "";
          };
          reset();
        });
      }
    );
  };
  return (
    <>
      <div className="p-2">
        <section className="order-form m-4border-1 border border-primar mt-4   ">
          <div className="container pt-4 pb-5">
            <div className="row">
              <div className="col-12 px-4">
                <h4 className="mb-5 text-center ">Enter Products</h4>
                {/* <hr className="mt-1" /> */}
              </div>
              <form onSubmit={handelSubmit} className="  ">
                <div className="col-12">
                  <div className="row mx-4">
                    <div className="col-sm-12">
                      <label className="form-label" htmlFor="form1">
                        ProductName
                      </label>
                      <div className="form-outline">
                        <input
                          type="text"
                          id="form1"
                          className="form-control order-form-input"
                          required // Add the required attribute
                          ref={ProductName}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3 mx-4">
                    <label className="form-label" htmlFor="form5">
                      description
                    </label>
                    <div className="col-12">
                      <div className="form-outline">
                        <input
                          ref={description}
                          type="text"
                          id="form5"
                          className="form-control order-form-input"
                          required // Add the required attribute
                        />
                      </div>
                    </div>

                    <div className="col-sm-6 mt-2 pe-sm-2">
                      <label className="form-label" htmlFor="form7">
                        price
                      </label>
                      <div className="form-outline">
                        <input
                          ref={price}
                          type="text"
                          id="form7"
                          className="form-control order-form-input"
                          required // Add the required attribute
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 mt-2 ps-sm-0">
                      <label className="form-label" htmlFor="form8">
                        category
                      </label>
                      <div className="form-outline">
                        <input
                          ref={category}
                          type="text"
                          id="form8"
                          className="form-control order-form-input"
                          required // Add the required attribute
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 mt-2 pe-sm-2">
                      <label className="form-label" htmlFor="form9">
                        Upload image
                      </label>
                      <div className="form-outline">
                        <input
                          ref={Uploadimage}
                          onChange={handleChange}
                          type="file"
                          id="form9"
                          className="form-control order-form-input"
                          required // Add the required attribute
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 mt-2 ps-sm-0">
                      <label className="form-label" htmlFor="form10">
                        subcategory
                      </label>
                      <div className="form-outline">
                        <input
                          ref={subcategory}
                          type="text"
                          id="form10"
                          className="form-control order-form-input"
                          required // Add the required attribute
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center  ">
                  <button
                    type="submit"
                    className="btn btn-primary save w-25 mt-4 d-block   m-auto  "
                    disabled={isLoading}
                  >
                    Save
                  </button>
                  {/* <button className="btn btn-primary save w-25 mt-4  m-auto ">Edit</button> */}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
      {/*  */}
       {loader?<div className="d-flex justify-content-center  ">
        <img src={loaderImage} alt="" style={{width:"120px"}}/>
        </div>:null}
        <div className="row justify-content-center  gap-5 ">
          {allProducts &&
            allProducts.map((item) => {
   
              return (
                <div className="card col-md-3  " key={item.product.id}>
                  <img
                    src={item.product.image}
                    className="card-img-top"
                    alt="..."
                  />

                  <div className="card-body">
                    <h5 className="card-title">
                      <span className="span-text"> {item.product.price}$</span>
                      <br />

                      {item.name}
                    </h5>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
       
                        
                        const docRef = doc(db, "products", item.product.id);
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                          
                          if (result.isConfirmed) {
                            try {
                               deleteDoc(docRef);
                               dispatch(dashboardProducts());
                            } catch (e) {
                              console.log(e.message);
                            }
                            //  setInterval(() =>{},2000)

                            Swal.fire(
                              'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            )
                          }
                        })
                        // console.log(item.product.id);
                
                      }}
                    >
                      delete
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        const { value: formValues } = await Swal.fire({
                          title: "Multiple inputs",
                          html:
                            '<input id="swal-input1" class="swal2-input" placeholder="enter new price"  >' +
                            '<input id="swal-input2" class="swal2-input" placeholder="enter new description" =>',

                          focusConfirm: false,
                          preConfirm: () => {
                            return [
                              document.getElementById("swal-input1").value,
                              document.getElementById("swal-input2").value,
                            ];
                          },
                        });
                        const docRef = doc(db, "products", item.product.id);
                        try {
                          await updateDoc(docRef, {
                            product: {
                              id: item.product.id,
                              image: item.product.image,
                              category: item.product.category,
                              name: item.product.name,
                              price:
                                document.getElementById("swal-input1").value,
                              description:
                                document.getElementById("swal-input2").value,
                            },
                          });
                        } catch (e) {
                          console.log(e.message);
                        }
                        dispatch(dashboardProducts());
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
