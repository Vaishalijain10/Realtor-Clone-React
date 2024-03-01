import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
export default function Contact(userRef, listing) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState("")
    useEffect(()=>{
        async function getLandlord(){
            console.log(userRef)
            const docRef = doc(db, "users", "E9e3LGnV7wM8BDVQrZMZuv13RKz1")
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }else{
                toast.error("Could not get landlord data")
            }
        }
        getLandlord()
    }, [userRef, listing])

    function onChange(e){
        setMessage(e.target.value)
    }
  return (
    <>
        {landlord !== null && (
            <div className="flex flex-col w-full">
                <p>Contact {landlord.fullname} for the {listing.name} </p>
                <div className="mt-3 mb-6">
                    <textarea name="message" id="message" rows="2" value={message} onChange={onChange} className="w-full px-4 py-2 text-xl text-gray-700 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600">

                    </textarea>
                </div>
                <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                    <button className='px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg transition duration-150 ease-in-out w-full text-center active:bg-blue-800 mb-6'>Send Message</button>
                </a>
            </div>
        )}
    </>
  )
}