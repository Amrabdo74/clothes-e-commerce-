import { useContext, useRef, useState } from "react";
import { BsFacebook, BsGithub, BsGoogle, BsTwitter } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

function LoginPage() {
  const myContect = useContext(Authcontext);
  const [error, setError] = useState("");
  const [isloading, setisloading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setisloading(true);
      await myContect.login(emailRef.current.value, passwordRef.current.value);
      navigate('/Home' ,{replace: false});
    } catch (error) {
      setError("Failed to Login Email or Password isn't correct");
    }
    setisloading(false);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container position-absolute top-50 start-50  translate-middle "
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
