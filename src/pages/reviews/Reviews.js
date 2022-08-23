import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../../features";

import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const Reviews = () => {
  const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const createUser = () => {
      // Confirm the link is a sign-in with email link.
      // const auth = getAuth();
      // if (isSignInWithEmailLink(auth, window.location.href)) {
      //   // Additional state parameters can also be passed via URL.
      //   // This can be used to continue the user's intended action before triggering
      //   // the sign-in operation.
      //   // Get the email if available. This should be available if the user completes
      //   // the flow on the same device where they started it.
      //   let email = window.localStorage.getItem("emailForSignIn");
      //   if (!email) {
      //     // User opened the link on a different device. To prevent session fixation
      //     // attacks, ask the user to provide the associated email again. For example:
      //     email = window.prompt("Please provide your email for confirmation");
      //   }
      //   // The client SDK will parse the code from the link for you.
      //   signInWithEmailLink(auth, email, window.location.href)
      //     .then((result) => {
      //       // sign user in
      //       dispatch(signInUser(true));
      //       // Clear email from storage.
      //       window.localStorage.removeItem("emailForSignIn");
      //       // You can access the new user via result.user
      //       console.log(result.user);
      //       // Additional user info profile not available via:
      //       // result.additionalUserInfo.profile == null
      //       // You can check if the user is new or existing:
      //       // result.additionalUserInfo.isNewUser
      //       console.log(result.additionalUserInfo);
      //     })
      //     .catch((error) => {
      //       // Some error occurred, you can inspect the code: error.code
      //       // Common errors could be invalid email and invalid or expired OTPs.
      //       console.log(error);
      //     });
      // }

      console.log('executed')
    };

    createUser();
  }, []);
  return <div>Reviews</div>;
};

export default Reviews;
