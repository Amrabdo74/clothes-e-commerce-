import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

function SigupPage() {
  const myContect = useContext(Authcontext);
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState(false); 
  const emailRef = useRef();
  const passwordRef = useRef();
  const repetpasswordRef = useRef();
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== repetpasswordRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError("");
      setisloading(true);
      await myContect.singup(emailRef.current.value, passwordRef.current.value);
      navigate('/')
    } catch (error) {
      setError("Failed to create account: " + error.message);
    }
    setisloading(false);
  };
  
  return (
    <>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3  ">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 mt-4">
              <div className="card">
                <div className="card-body mt-5 ">
                  <h2 className="text-uppercase text-center ">
                    Create an account
                  </h2>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    {/* <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                      />
                    </div> */}

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                      <input
                      ref={emailRef}
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                      <input
                      ref={passwordRef}
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="form3Example4cdg">
                        Repeat your password
                      </label>
                      <input
                      ref={repetpasswordRef}
                      required

                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        disabled={isloading}
                        className="btn btn-success btn-block btn-lg gradient-custom-4"
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/" className="fw-bold text-body">
                        <u>Login here</u>
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
export default SigupPage;
