import React, { useState, useEffect, useContext } from "react";
import Input from "./Input";
import { context } from "../store";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { XIcon } from "@heroicons/react/outline";
import { Modal } from ".";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useSendEmailLink } from "../hooks";

// feedback component
const FeedBack = ({ isShowing = true, setEmailSentStatus, showModal }) => {
  return (
    <Modal isShowing={isShowing}>
      <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-5/12 m-auto  shadow-md z-50 rounded-lg ">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-3 leading-7">
            Email link successfully sent 📧
          </h1>
          <p className="text-sm text-slate-500">
            Please click the link in your inbox to complete sign in. If you did
            not receive an email, check your spam folder! If it's not in your
            spam folder either, see our help page
          </p>

          <button
            className="bg-red-500  transition-all duration-500 text-md text-white w-32 h-12 mt-5 mb-3 rounded-lg font-semibold hover:bg-red-600"
            onClick={() => {
              showModal();
              setEmailSentStatus(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const SignIn = ({ isShowing, showModal }) => {
  const db = getFirestore(app);

  const { signIn } = useContext(context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [signingIn, setSigningIn] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);

  // handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // send email link hook
  const { error, sendUserSignInLink, emailSentStatus, setEmailSentStatus } =
    useSendEmailLink(email, { showModal, setEmail });

  useEffect(() => {
    const createNewUser = async () => {
      try {
        // Confirm the link is a sign-in with email link.
        const auth = getAuth();
        if (isSignInWithEmailLink(auth, window.location.href)) {
          // Get the email if available. This should be available if the user completes
          // the flow on the same device where they started it.
          let email = window.localStorage.getItem("emailForSignIn");

          if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt("Please provide your email for confirmation");
          }

          const result = await signInWithEmailLink(
            auth,
            email,
            window.location.href
          );

          // signed in user additional data
          const userInfo = getAdditionalUserInfo(result);

          // destructure accessToken & expiration date from results
          const { accessToken, expirationTime } = result.user.stsTokenManager;

          // get expiration date from expiration time ( from firebase)
          const expirationDate = new Date(expirationTime);

          // document reference
          const docRef = doc(db, "users", email);
          const docSnap = await getDoc(docRef);

          setSigningIn(true);

          // store signed in user in local storage
          localStorage.setItem("id", email);

          // check signed user exists or not
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            await setDoc(docRef, {
              email,
              createdAt: serverTimestamp(),
            });

            console.log("No such document!");
            console.log("new user");
          }

          setSigningIn(false);

          // remove email from local storage
          window.localStorage.removeItem("emailForSignIn");

          // redirect to homepage
          navigate("/", { replace: true });

          // sign in user
          signIn(accessToken, expirationDate);
        }
      } catch (error) {
        console.log(error);
      }
    };

    createNewUser();
  }, [db, navigate, signIn]);

  useEffect(() => {
    if (email.includes("@") && email.includes(".")) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  }, [email]);

  return (
    <>
      {!emailSentStatus && isShowing && (
        <Modal isShowing={isShowing}>
          <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-5/12 m-auto  shadow-md z-50 rounded-lg ">
            <XIcon
              className="w-6 absolute top-2 right-2 cursor-pointer"
              onClick={showModal}
            />
            <form onSubmit={sendUserSignInLink}>
              <div className="w-full mx-auto">
                <div className="mb-5">
                  <h1 className="text-3xl font-semibold mb-3 leading-5">
                    Sign In for full access!
                  </h1>
                  <p className="text-sm text-slate-500">
                    Enter your email and we'll send you a sign in link for
                    authentication. No password required!
                  </p>
                </div>
                <div className="mb-0">
                  <label htmlFor="email">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </label>
                </div>

                <button
                  className="bg-indigo-500  transition-all duration-500 text-white w-32 h-12 mt-5 mb-3 rounded-lg font-semibold disabled:bg-slate-400 disabled:cursor-not-allowed hover:bg-indigo-700"
                  type="submit"
                  disabled={!emailIsValid}
                >
                  Send email
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {emailSentStatus && (
        <FeedBack
          showModal={showModal}
          setEmailSentStatus={setEmailSentStatus}
        />
      )}
      {signingIn && <p>Signing in</p>}
    </>
  );
};

export default SignIn;
