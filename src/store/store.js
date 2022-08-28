import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let signOutTimer;

export const context = createContext({
  isLoggedIn: false,
  token: "",
  signIn: (token) => {},
  signOut: () => {},
});

// calculate remaining time
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

// retrieve token from local storage
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  // calculate remaining time again when token is retrieved from local storage
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  // clear token & expiration time if remaining time is less than 1minute
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    console.log("removing token");

    return null;
  }

  return {
    token: storedToken,
    remainingTime,
  };
};

const ContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  const navigate = useNavigate();

  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [isShowing, setIsShowing] = useState(false);

  const isLoggedIn = !!token;

  const signOutHandler = useCallback(() => {
    setToken(null);

    // optional: redirect user here
    // history.replace("/");

    // remove token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userID");

    // clear timer
    if (signOutTimer) {
      clearTimeout(signOutTimer);
    }

    // redirect to home page
    navigate("/", { replace: true });
  }, []);

  const signInHandler = (token, expirationTime) => {
    setToken(token);

    // store token in local storage
    localStorage.setItem("token", token);
    // stored expiration time in local storage
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    signOutTimer = setTimeout(signOutHandler, remainingTime);
  };

  // show modal
  const toggleModal = () => {
    setIsShowing((prevState) => !prevState);
  };

  useEffect(() => {
    if (tokenData) {
      // sign user out when remaining time is less than 1 minute
      signOutTimer = setTimeout(signOutHandler, tokenData.remainingTime);
    }
  }, [tokenData, signOutHandler]);

  const contextValue = {
    isLoggedIn,
    token,
    isShowing,
    toggleModal,
    signIn: signInHandler,
    signOut: signOutHandler,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default ContextProvider;
