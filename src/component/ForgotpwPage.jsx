import {  useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPasswordAsync } from "../Store/slices/authSlice";
// import { Authcontext } from "../context/Authcontext";

function ForgotpwPage() {
  // const myContect = useContext(Authcontext);
  const dispatch = useDispatch()
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState(false);
  const emailRef = useRef();
  // const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("check your email");
      setisloading(true);
      dispatch(resetPasswordAsync(emailRef.current.value))
      // navigate('/')
    } catch (error) {
      setError("Faild to reset Email: " + error.message);
    }
    setisloading(false);
  };
  return (
    <>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3 position-absolute top-50 start-50  translate-middle w-100  ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 mt-4">
              <div className="card">
                <div className="card-body mt-5 ">
                  <h2 className="text-uppercase text-center ">Rest Password</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      {error && (
                        <div className="alert alert-info" role="alert">
                          {error}
                        </div>
                      )}
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                        ref={emailRef}
                        required
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        disabled={isloading}
                      >
                        Reset PassWord
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Go To Login Page{" "}
                      <Link to="/Login" className="fw-bold text-body">
                        <u>Login Page</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotpwPage;
