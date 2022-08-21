import React, { useState } from "react";
import img from "../assets/images/signup.jpg";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/config";

import { signUp } from "../features";
import { Input } from ".";

const SignUp = ({ changeForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [course, setCourse] = useState("");

  // navigate
  const navigate = useNavigate();

  // dispatch actions
  const dispatch = useDispatch();

  // input state change functions
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUniversityChange = (event) => {
    setUniversity(event.target.value);
  };
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  // create new user account
  const createNewUserAccount = (event) => {
    // prevent default
    event.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(signUp(true));

        navigate("/reviews", { replace: true });

        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div>
      <div className="flex">
        <div className="hidden  md:block md:w-full  ">
          <img src={img} alt="" className="h-fit object-cover rounded-lg" />
        </div>
        <div className="w-full p-5 md:w-9/12 md:px-20">
          <div>
            <h1 className="text-3xl font-medium">New to Unicorns?</h1>
            <p className="text-slate-500">
              Sign up to rate your university & course
            </p>

            <button className="border-2 rounded-lg w-full mt-10 h-12">
              <FcGoogle className="text-3xl inline-block mr-3" />
              Sign up with Google
            </button>

            {/* horizontal rule */}
            <div class="h-3 border-b  text-sm text-center mt-3">
              <span class="bg-white px-3 text-slate-600">or</span>
            </div>
          </div>

          <div className="mt-10 mb-10">
            <form onSubmit={createNewUserAccount}>
              <div>
                <div className="mb-5">
                  <label htmlFor="email">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Email"
                      type="email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label htmlFor="password">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Password"
                      type="password"
                      onChange={handlePasswordChange}
                      value={password}
                    />
                  </label>
                </div>
                {/* horizontal rule */}
                <div class="h-3 border-b  text-sm text-center mb-5">
                  <span class="bg-white px-3 text-slate-600">more info</span>
                </div>
                <div className="mb-5">
                  <label htmlFor="course">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter your course"
                      type="text"
                      onChange={handleCourseChange}
                      value={course}
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label htmlFor="university">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter your university"
                      type="text"
                      onChange={handleUniversityChange}
                      value={university}
                    />
                  </label>
                </div>
                <button
                  className="bg-black text-white w-full h-12 mt-3 mb-2 rounded-lg font-semibold"
                  type="submit"
                >
                  Sign up
                </button>
                <div className="text-center">
                  <p>
                    Already have an account?{" "}
                    <a
                      href=""
                      className="font-medium text-indigo-500 underline inline-block"
                      onClick={changeForm}
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
