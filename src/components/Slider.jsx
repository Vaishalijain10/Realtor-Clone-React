import React, { useState, useEffect } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";


import { register } from "swiper/element/bundle";
// register Swiper custom elements

import { useNavigate } from "react-router-dom";
export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  register();

  useEffect(() => {
    async function fetchListings() {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timeStamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      console.log(listings);
      setLoading(false);
    }
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return (
      <div>
        <h1>We have no Listings yet </h1>
      </div>
    );
  }
  return (
    listings && (
      <>
        <swiper-container
          slides-per-view="1"
          speed="3000"
          loop="true"
          css-mode="true"
          autoplay={false}
          pagination
          navigation
        >
          {listings.map(({ data, id }) => {
            return (
              <swiper-slide key={id}>
                <div
                  style={{
                    background: `url(${data.imgUrls[0]}) center no-repeat`,
                  }}
                  className="w-[80%] mx-auto h-[400px] relative cursor-pointer"
                  onClick={() => navigate(`/category/${data.type}/${id}`)}
                >
                  <p className="absolute left-1 top-3 text-white px-2 py-1 bg-black text-sm font-bold shadow-lg opacity-90 rounded-br-lg">
                    {data.name}
                  </p>
                  <p className="absolute left-1 bottom-3 text-white bg-green-700 text-[10px] font-bold px-2 py-1">
                    $ {data.regPrice} {data.type === "rent" && "/Month"}
                  </p>
                </div>
              </swiper-slide>
            );
          })}
        </swiper-container>
      </>
    )
  );
}
