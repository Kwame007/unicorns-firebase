import React, { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { showModal } from "../features";
import { Modal } from ".";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailSentStatus, setEmailSentStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // create new user function
  const sendUserSignInLink = (event) => {
    console.log("clicked");
    // prevent default
    event.preventDefault();

    // Confirm the link is a sign-in with email link.
    const auth = getAuth();

    sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/dashboard/my-reviews",
      handleCodeInApp: true,
    })
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);

        // show feedback message
        setEmailSentStatus(true);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <Modal>
      {!emailSentStatus ? (
        <form onSubmit={sendUserSignInLink}>
          <div className="w-full mx-auto">
            <div className="mb-5">
              <h1 className="text-2xl">Sign In for full access!</h1>
              <p className="text-sm text-slate-500">
                Enter your email and we'll send you a sign in link for
                authentication. No password required!
              </p>
            </div>
            <div className="mb-0">
              <label htmlFor="email">
                <Input
                  className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
            </div>

            <button
              className="bg-black text-white w-48 h-12 mt-5 mb-3 rounded-lg font-semibold"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl mb-5 font-medium">
            Email link successfully sent 📧
          </h1>
          <p className="text-sm text-slate-500">
            Please click the link in your inbox to complete sign in. If you did
            not receive an email, check your spam folder! If it's not in your
            spam folder either, see our help page
          </p>

          <button
            className="bg-black text-white w-48 h-12 mt-5 mb-3 rounded-lg font-semibold"
            type="submit"
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default SignIn;
