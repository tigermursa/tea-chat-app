import React, { useContext, useState } from "react";
import "./LogIn.css";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const LogIn = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignInForm = (data) => {
    const { email, password } = data;
    setErrorMessage(""); // Clear the error message

    signIn(email, password)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        navigate(from) || "/";
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password");
      });
  };

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInGoogle(googleProvider)
      .then((result) => {
        const theUser = result.user;
        console.log(theUser);
        const saveUser = {
          name: theUser.displayName,
          email: theUser.email,
          image: theUser.photoURL,
        };
        fetch(`http://localhost:4000/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        });
        navigate(from) || "/";
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
    <div className="mt-0 ">
      <div className="bg-img">
        <div className="content rounded-xl">
          <header>Login Form</header>
          {errorMessage && (
            <p className="text-red-600 font-bold mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(handleSignInForm)}>
            <div className="field rounded-full">
              <span className="fa fa-user"></span>
              <input
                type="text"
                name="email"
                {...register("email", {
                  required: "Email or Phone is required",
                })}
                placeholder="Email or Phone"
              />
            </div>
            <div className="field space rounded-full">
              <span className="fa fa-lock"></span>
              <input
                type={showPassword ? "text" : "password"}
                className="pass-key "
                name="password"
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder="Password"
              />
              <span className="show" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="pass text-center">
              <p className="text-white">Forgot Password?</p>
            </div>
            <div className="field rounded-full ">
              <input className="rounded-full" type="submit" value="LOGIN" />
            </div>
          </form>
          <div className="login">Or login with</div>
          <div className="links">
            <button
              onClick={handleGoogleSignIn}
              className="google rounded-full"
            >
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
