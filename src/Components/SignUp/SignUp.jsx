import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { storage } from "/src/Components/Firebase/firebaseConfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Spinner from "../Private/Spiner";
import useTitle from "../../Hooks/useTitle";

const SignUp = () => {
  // REDIRECT CODE IS HERE........................................................
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // ................................................................................
  useTitle("Signup");
  // CONTEXT API HERE..............................................................
  const { createUser, signInGoogle } = useContext(AuthContext);
  // ..............................................................................

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  // THE MAIN FUNCTION OF SUBMIT FORM .......................................................
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const username = form.username.value;
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      setError("Password did not match!");
      setLoading(false);
      return;
    }
    // PHOTO UPLOADING THINGS HERE BE CAREFUL ........................
    setLoading(true);
    try {
      const url = await uploadImageToStorage();
      await createUser(email, password, username, url);
      setLoading(false);
      form.reset();
      navigate(from) || "/login";
      setPhotoUrl(null);
    } catch (error) {
      setLoading(false);
      setError("Error occurred!");
      console.log(error);
    }
  };

  const handlePhotoChange = (event) => {
    setUserPhoto(event.target.files[0]);
  };

  const uploadImageToStorage = async () => {
    if (!userPhoto) {
      return null;
    }
    const imageRef = ref(storage, `images/${userPhoto.name}`);
    await uploadBytes(imageRef, userPhoto);
    const url = await getDownloadURL(imageRef);
    setPhotoUrl(url);
    return url;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInGoogle(googleProvider)
      .then((result) => {
        const theUser = result.user;
        console.log(theUser);
        navigate(from) || "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(error);
  return (
    <div className="mt-0">
      {loading ? (
        <div className="flex justify-center items-center mt-96 mb-96">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="bg-img">
          <div className="content">
            <header>Sign up Form</header>
            <h1 className="text-red-600 font-bold mb-10 text-2xl ">{error}</h1>
            <form onSubmit={handleSubmit}>
              <div className="field mb-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Username"
                />
              </div>
              <div className="field mb-4 p-2">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>
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
              <div className="field space">
                <span className="fa fa-lock"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-key"
                  name="confirm"
                  required
                  placeholder="Confirm Password"
                />
                <span className="show" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="pass text-white hidden">
                <p>Forgot Password?</p>
              </div>
              <button className="field mt-5">
                <input type="submit" value="SIGN UP" />
              </button>
            </form>
            <div className="login">Or login with</div>
            <div className="links">
              <button onClick={handleGoogleSignIn} className="google">
                <FaGoogle className="me-1"></FaGoogle>
                <span>Google</span>
              </button>
            </div>
            <div className="signup">
              Already have an account ? <Link to="/login">Sign in </Link>
            </div>
            <div className="signup">
              <Link to="/">Go to Home</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
