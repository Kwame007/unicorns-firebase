import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showModal, signInUser } from "../../features";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";

// calculate remaining time
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const UserReviews = () => {
  // const [token, setToken] = useState("");
  // const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = (token, expirationTime) => {
    // setToken(token);

    // store token in local storage
    localStorage.setItem("token", token);
    // stored expiration time in local storage
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    // set isLogged in to true
    dispatch(signInUser(true));
    navigate("/", { replace: true });

    // logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    const createUser = () => {
      // Confirm the link is a sign-in with email link.
      const auth = getAuth();
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          // email = window.prompt("Please provide your email for confirmation");
          dispatch(showModal(true));
        }

        Promise.all([
          signInWithEmailLink(auth, email, window.location.href).then(
            (result) => {
              const userInfo = getAdditionalUserInfo(result);
              // Clear email from storage.
              window.localStorage.removeItem("emailForSignIn");
              // You can access the new user via result.user
              console.log(result.user);
              console.log(userInfo);
              console.log(result.additionalUserInfo);

              // get user access token & token expiration time
              const { accessToken, expirationTime } =
                result.user.stsTokenManager;

              // convert expiration time to date
              const expirationDate = new Date(expirationTime);

              // sign in user based on token & expiration time & returns remaining time for token to expire
              signInHandler(accessToken, expirationDate);
            }
          ),
        ]).catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log(error);
        });
      }
    };

    createUser();
  }, [dispatch]);
  return <div>UserReviews</div>;
};

export default UserReviews;
