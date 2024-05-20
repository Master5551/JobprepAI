import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, FiCheckCircle } from "../assets/icons/vander";

export default function Pricing() {
  const [businessPrice, setBusinessPrice] = useState(20);
  const [professionalPrice, setProfessionalPrice] = useState(40);

  let businessUpdate = parseFloat(businessPrice * 0.05).toFixed(1);
  let professionalUpdate = parseFloat(professionalPrice * 0.025).toFixed(1);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-6">
        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold">Free</h5>
            <p className="text-slate-400 mt-2">
              Perfect for exploring JobPrepAI
            </p>
            <div className="flex mt-4">
              <span className="text-lg font-semibold">$</span>
              <span className="text-5xl font-semibold mb-0 ms-1">0</span>
            </div>
            <p className="text-slate-400 uppercase text-xs">per month</p>

            <div className="mt-6">
              <Link
                to=""
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400/5 hover:bg-amber-400 rounded border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white"
              >
                Try For Free
              </Link>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">
                Features:
              </li>

              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  10 Questions of any Job Role
                </span>{" "}
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  4 interview reports with detailded information
                </span>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold">Business</h5>
            <p className="text-slate-400 mt-2">
              Tailored for starting professionals
            </p>

            <div className="relative">
              <div className="flex mt-4">
                <span className="text-lg font-semibold">$</span>
                <span className="">
                  <input
                    type="hidden"
                    id="business-amount"
                    className="form-control"
                  />
                  <p className="text-5xl font-semibold mb-0 ms-1" id="busi-amt">
                    {businessPrice}
                  </p>
                  <p className="text-slate-400 uppercase text-xs">per month</p>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to=""
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded"
              >
                Subscribe Now
              </Link>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">
                Features:
              </li>

              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  50 minutes
                </span>{" "}
                of AI interview preparation per month
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  100 GB
                </span>{" "}
                storage
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  Unlimited
                </span>{" "}
                exports
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                Up to{" "}
                <span className="text-slate-900 dark:text-white mx-1 font-semibold">
                  1
                </span>{" "}
                user
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900text-slate-900 dark:text-white me-1 font-semibold">
                  40 per month
                </span>{" "}
                iStock integration
              </li>
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
          <div className="p-6">
            <h5 className="text-2xl leading-normal font-semibold">
              Professional
            </h5>
            <p className="text-slate-400 mt-2">
              Designed for growing and established professionals
            </p>

            <div className="relative">
              <div className="flex mt-4">
                <span className="text-lg font-semibold">$</span>
                <span className="">
                  <input
                    type="hidden"
                    id="professional-amount"
                    className="form-control"
                  />
                  <p className="text-5xl font-semibold mb-0 ms-1" id="pro-amt">
                    {professionalPrice}
                  </p>
                  <p className="text-slate-400 uppercase text-xs">per month</p>
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to=""
                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded"
              >
                Buy Now
              </Link>
            </div>
          </div>

          <div className="p-6 bg-gray-50 dark:bg-slate-800">
            <ul className="list-none text-slate-400">
              <li className="font-semibold text-slate-900 dark:text-white text-sm uppercase">
                Features:
              </li>

              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  200 minutes
                </span>{" "}
                of AI interview preparation per month
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  400 GB
                </span>{" "}
                storage
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  Unlimited
                </span>{" "}
                exports
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                Up to{" "}
                <span className="text-slate-900 dark:text-white mx-1 font-semibold">
                  1
                </span>{" "}
                user
              </li>
              <li className="flex items-center mt-2">
                <FiCheckCircle className="text-green-600 h-[18px] w-[18px] me-2" />{" "}
                <span className="text-slate-900 dark:text-white me-1 font-semibold">
                  160 per month
                </span>{" "}
                iStock integration
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
