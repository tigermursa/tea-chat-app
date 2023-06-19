import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import { storage } from "../Firebase/FirbaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import Spinner from "../Private/Spiner";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, signInGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState();
  const [userPhoto, setUserPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password, confirm, username, gender, phone, address } = data;
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must contain at least one capital letter!");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character!");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Password did not match!");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const url = await uploadImageToStorage();
      await createUser(email, password, username, url, gender, phone, address);
      setLoading(false);
      navigate(from) || "/login";
      setPhotoUrl(null);
      const saveUser = {
        name: data.username,
        email: data.email,
        image: url,
      };
      fetch(`https://server-tea-chat.vercel.app/users`, {
        method: "POSt",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      });
      Swal.fire({
        title: "Great",
        text: " User  account  created successfully!",
        icon: "success",
      });
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
        const saveUser = {
          name: theUser.displayName,
          email: theUser.email,
          image: theUser.photoURL,
        };
        fetch(`https://server-tea-chat.vercel.app/users`, {
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

  return (
    <div className="mt-0">
      {loading ? (
        <div className="flex justify-center items-center mt-96 mb-96">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="bg-img">
          <div className="content rounded-md">
            <header>Sign up Form</header>
            <h1 className="text-red-600 font-bold mb-10 text-2xl ">{error}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field mb-4 rounded-full">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-red-600">Username is required</span>
                )}
              </div>
              <div className="field rounded-full mb-4">
                <span className="fa fa-user"></span>
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Email or Phone"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>

              <div className="field mb-4 p-2 rounded-full">
                <div>
                  <input
                    className="text-center"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </div>
              </div>

              <div className="field space rounded-full">
                <span className="fa fa-lock"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-key"
                  name="password"
                  required
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <span className="show" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="field space rounded-full">
                <span className="fa fa-lock"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="pass-key"
                  name="confirm"
                  required
                  placeholder="Confirm Password"
                  {...register("confirm", { required: true })}
                />
                {errors.confirm && (
                  <span className="text-red-600">
                    Confirm Password is required
                  </span>
                )}
                <span className="show" onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="pass text-white hidden">
                <p>Forgot Password?</p>
              </div>
              <button className="field mt-5 rounded-full">
                <input className="rounded-full" type="submit" value="SIGN UP" />
              </button>
            </form>
            <div className="login">Or login with</div>
            <div className="links">
              <button
                onClick={handleGoogleSignIn}
                className="google rounded-full"
              >
                <FaGoogle className="me-1 "></FaGoogle>
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
