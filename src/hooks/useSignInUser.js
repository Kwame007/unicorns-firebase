import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../store";
import { app } from "../firebase";

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

const useSignInUser = () => {
  const db = getFirestore(app);
  const [signingIn, setSigningIn] = useState(false);

  // context
  const { signIn } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const createNewUser = async () => {
      try {
        setSigningIn(true);
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

          const docRef = doc(db, "users", email);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            signIn(accessToken, expirationDate);
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

          navigate("/", { replace: true });
        }
      } catch (error) {}
      setSigningIn(false);
    };
    createNewUser();
  }, [db, navigate, signIn]);
  return { signingIn };
};

export default useSignInUser;
