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
  sendSignInLinkToEmail,
} from "firebase/auth";

// feedback component
const FeedBack = ({ isShowing = true, setEmailSentStatus }) => {
  return (
    <Modal isShowing={isShowing}>
      <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-4/12 m-auto  shadow-md z-50 rounded-lg ">
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
            onClick={() => setEmailSentStatus(false)}
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
  const [emailSentStatus, setEmailSentStatus] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  // handle email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // send sign in link to email address
  const sendUserSignInLink = (event) => {
    console.log("clicked");
    // prevent default
    event.preventDefault();

    // Confirm the link is a sign-in with email link.
    const auth = getAuth();

    sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/sign-in",
      handleCodeInApp: true,
    })
      .then(() => {
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);

        // The link was successfully sent. Inform the user.
        // show feedback message
        setEmailSentStatus(true);

        showModal();

        // clear input value
        setEmail("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  //

  useEffect(() => {
    const createNewUser = async () => {
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

        const userInfo = getAdditionalUserInfo(result);

        window.localStorage.removeItem("emailForSignIn");

        const { accessToken, expirationTime } = result.user.stsTokenManager;

        const expirationDate = new Date(expirationTime);

        signIn(accessToken, expirationDate);

        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);

        setIsSigning(true);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          await setDoc(docRef, {
            email,
            createdAt: serverTimestamp(),
          });

          console.log("No such document!");
          console.log("new user");

          localStorage.setItem("id", email);
        }

        console.log(result);
        console.log(userInfo);
        console.log(accessToken);
        console.log(expirationTime);
        console.log(result.user.uid);
        console.log(expirationDate);
        console.log(docSnap.data());
        setIsSigning(false);

        navigate("/", { replace: true });
      }
    };

    createNewUser();
  }, [db, navigate, signIn]);

  return (
    <>
      <Modal isShowing={isShowing}>
        <div className="px-10 py-5 bg-white fixed inset-0 max-h-fit w-4/12 m-auto  shadow-md z-50 rounded-lg ">
          <XIcon
            className="w-6 absolute top-2 right-2 cursor-pointer"
            onClick={showModal}
          />
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
                className="bg-black text-white w-48 h-12 mt-5 mb-3 rounded-lg font-semibold disabled:bg-slate-600 disabled:cursor-not-allowed"
                type="submit"
                // disabled={!isSigning}
              >
                Send email
              </button>
            </div>
          </form>
        </div>
      </Modal>
      {emailSentStatus && (
        <FeedBack
          showModal={showModal}
          setEmailSentStatus={setEmailSentStatus}
        />
      )}
      {isSigning && <p>Signing in</p>}
    </>
  );
};

export default SignIn;
