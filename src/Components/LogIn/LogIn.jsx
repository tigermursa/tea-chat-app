import React, { useContext, useState } from "react";
import "./LogIn.css";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import useTitle from "../../Hooks/useTitle";

const LogIn = () => {
  // error handling  code here
  const [error, setError] = useState();
  useTitle("Login");
  // the super Navigation code here ...................
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn, signInGoogle } = useContext(AuthContext);

  // main Sign function here ...............

  const handleSignInForm = (e) => {
    setError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        form.reset();
        console.log(loggedInUser);
        navigate(from) || "/"; // replace '/home' with the URL of the page you want to navigate to
      })
      .catch((error) => {
        setError("Your email or password not valid");
      });
    console.log(error);
  };

  // Google Sign In here >>>>>>>>>>

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInGoogle(googleProvider)
      .then((result) => {
        const theUser = result.user;
        console.log(theUser);
        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-0">
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <h1 className="text-red-600 font-bold mb-10 text-2xl ">{error}</h1>
          <form onSubmit={handleSignInForm}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input
                type="text"
                name="email"
                required
                placeholder="Email or Phone"
              />
            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input
                type={showPassword ? "text" : "password"}
                className="pass-key"
                name="password"
                required
                placeholder="Password"
              />
              <span className="show" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="pass">
              <p className="text-white">Forgot Password?</p>
            </div>
            <div className="field">
              <input type="submit" value="LOGIN" />
            </div>
          </form>
          <div className="login">Or login with</div>
          <div className="links">
            <button onClick={handleGoogleSignIn} className="google">
              <FaGoogle className="me-1"></FaGoogle>
              <span>Google</span>
            </button>
          </div>
          <div className="signup">
            Don't have an account? <Link to="/signup">Sign up now</Link>
          </div>
          <div className="signup">
            <Link to="/">Go to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
