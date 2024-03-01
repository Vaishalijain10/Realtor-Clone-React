import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { MdLocationOn } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { FaBath, FaChair } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { FaShare } from "react-icons/fa";
import Contact from "../components/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { register } from "swiper/element/bundle";

export default function Listing() {
  const auth = getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [sharelinkcopy, setsharelinkcopy] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  // register Swiper custom elements
  register();

  useEffect(() => {
    //   async function fetchListing() {
    //     // const auth = getAuth();
    //     const docRef = doc(db, "listings", params.listingId);
    //     const docSnap = await getDoc(docRef);
    //     if (docSnap) {
    //       setListing(docSnap.data());
    //       console.log(docSnap.data());
    //       setLoading(false);
    //       if (
    //         !auth.currentUser ||
    //         docSnap.data().userRef !== auth.currentUser.uid
    //       )
    //         setShowButton(true);
    //     } else {
    //       setLoading(false);
    //       toast.error(
    //         "Listing does not exits. Check the URL again and then try."
    //       );
    //       navigate("/profile");
    //     }
    //   }
    //   fetchListing();
    // }, []);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {listing && listing.imgUrls.length >= 1 ? (
        <swiper-container
          slides-per-view="1"
          speed="3000"
          loop="true"
          css-mode="true"
          autoplay={false}
          pagination
          navigation
        >
          {listing.imgUrls.map((img, index) => {
            return (
              <swiper-slide key={index}>
                <div
                  style={{
                    background: `url(${img}) center no-repeat`,
                  }}
                  className="w-[80%] mx-auto h-[300px] cursor-pointer"
                >
                  <FaShare
                    className="bg-black rounded-full h-5 w-5 p-1 fixed text-red-500 top-[30%] right-[10%] hover:text-white cursor-pointer "
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setsharelinkcopy(true);
                      console.log("CLCICIC");
                      setTimeout(() => {
                        setsharelinkcopy(false);
                      }, 1000);
                    }}
                  />
                  {sharelinkcopy && (
                    <p className="p-2 fixed top-[20%] right-[3%] bg-black text-white z-10">
                      copied to clipboard
                    </p>
                  )}
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      ) : (
        // code  to copy
        <div
          className="w-[80%] relative h-[300px] mx-auto"
          style={{ background: `url(${listing.imgUrls[0]}) center no-repeat` }}
        >
          <FaShare
            className="bg-black rounded-full h-5 w-5 p-1 fixed text-red-500 top-[30%] right-[10%] hover:text-white cursor-pointer z-11"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setsharelinkcopy(true);
              console.log("CLCICIC");
              setTimeout(() => {
                setsharelinkcopy(false);
              }, 1000);
            }}
          />
          {sharelinkcopy && (
            <p className="p-2 fixed top-[20%] right-[3%] bg-black text-white z-10">
              copied to clipboard
            </p>
          )}
        </div>
      )}

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <MdLocationOn className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>

          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>

          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.beds >= 1 ? listing.beds + " Beds" : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.baths >= 1 ? listing.baths + " Baths" : "1 Bath"}
            </li>

            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking === "true" ? "Parking spot" : "No parking"}
            </li>

            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished === "yes" ? "Furnished" : "Not furnished"}
            </li>
          </ul>

          {listing.userRef !== auth.currentUser?.uid && !contact && (
            <div className="mt-6">
              <button
                onClick={() => setContact(true)}
                className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contact && <Contact userRef={listing.userRef} listing={listing} />}
        </div>
        <div className="w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2">
          <MapContainer
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
