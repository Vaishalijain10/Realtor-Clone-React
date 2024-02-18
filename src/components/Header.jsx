import React from "react";
//allow to access the location object that represents the active URL
// navigate is use to navigate the pages
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  function pathMathRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3  max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            srcset=""
            className="h-5 cursor-pointer"
            //here,arrow function is use on clicking the img i.e website logo it will redirect the page to home page through navigate
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            {/* py- padding , text-sm - size of the text, border-b is border button */}
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/Offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/SignIn") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/SignIn")}
            >
              Sign In
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
