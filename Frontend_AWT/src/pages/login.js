import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-icon-64.png";
import Switcher from "../components/switcher";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoggedIn(true);

        // Save token in localStorage
        localStorage.setItem("token", data.token);
<<<<<<< HEAD

        // Print token and user ID to console for verification
        console.log(data.token);
=======
       
        // Print token and user ID to console for verification
        console.log(data.token);
        
>>>>>>> c87e8289b4dd53f06a9d1c5b524df5f774bbee5e

        // Navigate to the home page
        navigate("/");
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section className="relative overflow-hidden h-screen flex items-center bg-[url('../../assets/images/bg/bg-ai.jpg')] bg-no-repeat bg-left bg-cover bg-fixed">
        <div className="absolute inset-0 bg-slate-950/20"></div>
        <div className="container relative">
          <div className="md:flex justify-end">
            <div className="lg:w-1/3 md:w-2/4">
              <div className="rounded shadow bg-white dark:bg-slate-900 p-6">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>

                <h5 className="mt-6 text-xl font-semibold">
                  Sign in to your account
                </h5>

                <form className="text-start mt-4" onSubmit={handleFormSubmit}>
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginEmail">
                        Email Address:
                      </label>
                      <input
                        id="LoginEmail"
                        name="email"
                        type="email"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="name@example.com"
                        value={email || ""}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginPassword">
                        Password:
                      </label>
                      <input
                        id="LoginPassword"
                        name="password"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Password:"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full"
                        value="Login / Sign in"
                      />
                    </div>
                    <div className="mb-4">
                      <Link
                        to=""
                        className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-gray-800/5 hover:bg-gray-800 border-gray-800/10 hover:border-gray-800 text-gray-800 dark:text-white hover:text-white rounded-md w-full"
                      >
                        <i className="mdi mdi-google"></i> Sign in with Google
                      </Link>
                    </div>
                    <div className="text-center">
                      <span className="text-slate-400 me-2">
                        Don't have an account ?
                      </span>{" "}
                      <Link
                        to="/signup"
                        className="text-slate-900 dark:text-white font-bold inline-block"
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
    </>
  );
}
