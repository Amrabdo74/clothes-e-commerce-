import { useEffect, useRef } from "react";
import { BsFacebook, BsGithub, BsGoogle, BsTwitter } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logInAsync } from "../Store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFromlocaStore } from "../Store/slices/cartSlice";

function LoginPage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const error = useSelector((state) => state.auth.error);
  const isloading = useSelector((state) => state.auth.isLoading);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(logInAsync(userData));
  };
  useEffect(() => {
    const cartLocalstorge = JSON.parse(localStorage.getItem("cart"));
    dispatch(getFromlocaStore(cartLocalstorge));
  }, []);
  useEffect(() => {
    if (currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container position-absolute top-50 start-50  translate-middle z-n1  "
      >
        <h2 className="text-center mb-3">Login In</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            ref={emailRef}
            required
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            ref={passwordRef}
            required
          />
        </div>

        <div className="text-center mb-4">
          <button
            type="submit"
            disabled={isloading}
            className="btn btn-primary btn-block mb-4 w-50  "
          >
            Sign in
          </button>
          <br />
          <div className="">
            <Link to="/ForgotpwPage">Forgot password?</Link>
          </div>
        </div>

        <div className="text-center">
          <p>
            Not a member? <Link to="/Sigup">Register</Link>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <BsFacebook />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <BsGoogle />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <BsTwitter />
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <BsGithub />
          </button>
        </div>
      </form>
    </>
  );
}
export default LoginPage;
