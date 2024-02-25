//to use tailwind css
import classNames from "classnames";
//allow to access the location object that represents the active URL
//navigate is use to navigate the pages
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [pageState, setPageState] = useState("Sign in");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
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
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/")
                  ? "text-black border-b-[3px] border-red-500"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/Offers")
                  ? "text-black border-b-[3px] border-red-500"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
              onClick={() => navigate("/Offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold ${
                pathMatchRoute("/SignIn") || pathMatchRoute("/Profile")
                  ? "text-black border-b-[3px] border-red-500"
                  : "text-gray-400 border-b-2 border-transparent"
              }`}
              onClick={() => navigate("/Profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
