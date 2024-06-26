import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-icon-64.png";
import Switcher from "../components/switcher";

export default function Signup() {
  const navigate = useNavigate();
  function postData(event) {
    event.preventDefault();
    console.log("in the post data ");
    const username = document.getElementById("RegisterName").value;
    const email = document.getElementById("LoginEmail").value;
    const password = document.getElementById("LoginPassword").value;
    console.log(username);
    const formData = {
      username: username,
      email: email,
      password: password,
    };
    console.log(formData);

    fetch("http://localhost:8080/api/candidate/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse response body as JSON
      })
      .then((data) => {
        // Handle successful response
        console.log("Success:", data);
        navigate("/login");
      })
      .catch((error) => {
        // Handle error response
        console.error("Error:", error);
      });
  }
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
                  Create an account
                </h5>

                <form className="text-start mt-4">
                  <div className="grid grid-cols-1">
                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="RegisterName">
                        Username:
                      </label>
                      <input
                        id="RegisterName"
                        type="text"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Jatan"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginEmail">
                        Email Address:
                      </label>
                      <input
                        id="LoginEmail"
                        type="email"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="name@example.com"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="font-semibold" htmlFor="LoginPassword">
                        Password:
                      </label>
                      <input
                        id="LoginPassword"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0"
                        placeholder="Password:"
                      />
                    </div>

                    <div className="mb-4">{/*  */}</div>

                    <div className="mb-4">
                      <input
                        type="submit"
                        id="registration"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amberbg-amber-500 text-white rounded-md w-full"
                        value="Register"
                        onClick={postData}
                      />
                    </div>

                    <div className="text-center">
                      <span className="text-slate-400 me-2">
                        Already have an account ?{" "}
                      </span>{" "}
                      <Link
                        to="/login"
                        className="text-slate-900 dark:text-white font-bold inline-block"
                      >
                        Sign in
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
