import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Input } from ".";
import img from "../assets/images/login.jpg";

const LogIn = ({ changeForm }) => {
  return (
    <div>
      <div className="flex">
        <div className="w-full p-5 md:w-9/12 md:p-20">
          <div>
            <h1 className="text-3xl font-medium">Welcome to Unicorns</h1>
            <p className="text-slate-500">LogIn to resume rating...</p>

            <button className="border-2 rounded-lg w-full mt-10 h-12">
              <FcGoogle className="text-3xl inline-block mr-3" /> Login with
              Google
            </button>

            {/* horizontal rule */}
            <div class="h-3 border-b  text-sm text-center mt-6">
              <span class="bg-white px-3 text-slate-600">or</span>
            </div>
          </div>

          <div className="mt-20 mb-10">
            <form>
              <div>
                <div className="mb-5">
                  <label htmlFor="email">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Email"
                      type="email"
                    />
                  </label>
                </div>
                <div className="mb-5">
                  <label htmlFor="email">
                    <Input
                      className="border-2 w-full h-12 px-2 rounded-lg focus:border-3 focus:border-indigo-500 focus:outline-none"
                      placeholder="Password"
                      type="password"
                    />
                  </label>
                </div>
                <a
                  href=""
                  className="font-medium text-indigo-500 underline block"
                >
                  Forgot Password
                </a>
                <button className="bg-black text-white w-full h-12 mt-5 mb-3 rounded-lg font-semibold">
                  Log in
                </button>
                <div className="text-center">
                  <p>
                    Don't have an account?{" "}
                    <a
                      href=""
                      className="font-medium text-indigo-500 underline inline-block"
                      onClick={changeForm}
                    >
                      Sign up for free
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden  md:block md:w-full ">
          <img src={img} alt="" className="h-full object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
