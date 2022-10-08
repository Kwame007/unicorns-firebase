import { useEffect, useState } from "react";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const useSendEmailLink = (email, callbackFn) => {
  const [emailSentStatus, setEmailSentStatus] = useState(false);
  const [error, setError] = useState(null);

  // send sign in link to email address
  const sendUserSignInLink = async (event) => {
    // prevent default
    event.preventDefault();
    try {
      // Confirm the link is a sign-in with email link.
      const auth = getAuth();

      await sendSignInLinkToEmail(auth, email, {
        url: "https://unicorns-firebase.web.app",
        handleCodeInApp: true,
      });

      // store email in local storage
      window.localStorage.setItem("emailForSignIn", email);

      // The link was successfully sent. Inform the user.
      // show feedback message (modal)
      setEmailSentStatus(true);

      if (emailSentStatus) {
        // hide sign in form modal
        callbackFn.showModal();
      }

      // clear input value
      callbackFn.setEmail("");

      console.log(emailSentStatus);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
      setEmailSentStatus(false);
    }
  };

  return { error, emailSentStatus, sendUserSignInLink, setEmailSentStatus };
};

export default useSendEmailLink;
