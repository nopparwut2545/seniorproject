'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import { Loader } from "@googlemaps/js-api-loader"
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxComponent from '@/app/mapbox/page';
import { userlocationcontext } from '../../../../context/userlocationcontext';

type Props = {};

type Customer = {
  id: number;
  username: string;
  email: string;
  pass_word: string;
  district: string;
  sub_district: string;
  province: string;
  zip_code: string;
  street_number: string;
  contact_number: string;
  first_name: string;
  last_name: string;
  role: string;
  age: number;
  gender: string;
  locationall: string;
};

type Nanny = {
  username: string;
  email: string;
  pass_word: string;
  district: string;
  sub_district: string;
  province: string;
  zip_code: string;
  street_number: string;
  contact_number: string;
  first_name: string;
  last_name: string;
  role_level: string;
  cost: number | null;
  type_work: string;
  status: string;
  age: number;
  gender: string;
};

type MapboxComponentProps = {
  center: LngLatLike; // Pass center as a prop
};

export default function Page({ params }: { params: { username: string } }) {
  const [customer, setCustomer] = useState<Customer | null>(null); // Initialize as null
  const [nanny, setNanny] = useState<Nanny | null>(null); // Initialize as null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [showMap, setShowMap] = useState<boolean>(false); // New state for map visibility
  // const [userlocation, setuserlocation] = useState<any>();
  // const getUserLocation = ()=>{
  //   navigator.geolocation.getCurrentPosition(function(pos){
  //     setuserlocation({
  //       lat: pos.coords.latitude , lng: pos.coords.longitude
  //     })
  //     console.log(pos);
  //   })
  // }


  const handleExit = () => {
    localStorage.removeItem('jwt');
    router.push('/login-admin');
  };

  const loadGoogleMaps = () => {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAhTX3_S1Ek_2nxNDMV8PtdHNB9HKJeAuc&libraries=places`;
    window.document.body.appendChild(googleMapsScript);
    return googleMapsScript;

  };
  const [map1, setMap1] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    // getUserLocation();
    const token = localStorage.getItem('jwt');
    if (token) {
      const decodedToken: any = jwt_decode(token);

      const userId: number = decodedToken.sub;

      if (!userId) {
        setError("User ID not found in token.");
        setLoading(false);
        return;
      }
      console.log("User ID:", userId);
      const fetchData = async () => {
        try {
          const response = await axios.get<Customer>(`http://localhost:9000/api/customers/${userId}`);
          const response1 = await axios.get<Nanny>(`http://localhost:9000/api/nannies/getbyusername/${params.username}`);
          setCustomer(response.data);
          setNanny(response1.data);
          console.log(response.data);
          console.log(response1.data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An error occurred.');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      alert('You need to be logged in first.');
      router.push('/login-user');
    }
  }, [params.username]);



  const handleLocationChange = (location: google.maps.LatLng) => {
    // Do something with the selected location
    console.log('Selected Location:', location.toString());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!customer) return <div>Customer not found.</div>;
  if (!nanny) return <div>Nanny not found.</div>;

  const handleEnterLocation = () => {
    // Set showMap to true when the "Enter New Location" button is clicked
    setShowMap(true);
  };
  // return (
  //   <div>
  //     <div className="block justify-center">
  //       <div className="flex justify-center">
  //         <h2>Hiring Nanny</h2>
  //       </div>
  //       <div className="bg-white bg-opacity-40 p-5 rounded-2xl shadow-lg md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
  //         <div className="flex justify-center text-center">
  //           <h3>Where do you want to get the nanny?</h3>
  //         </div>

  //         <div className="flex flex-col sm:flex-row">
  //           {/* Shared location details */}
  //           <div className="bg-rose-200 p-5 rounded-lg shadow-lg mb-5 sm:mb-0 sm:mr-5 w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 mx-auto">
  //             <h4>Home</h4>
  //             <p>Customer username: {customer.username}</p>
  //             <p>Email: {customer.email}</p>
  //             <p>Contact number: {customer.contact_number}</p>
  //             <p>District: {customer.district}</p>
  //             <p>Sub-district: {customer.sub_district}</p>
  //             <p>Zip code: {customer.zip_code}</p>
  //             <p>Street number: {customer.street_number}</p>
  //           </div>

  //           <div className="bg-rose-200 p-5 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 ml-5 mx-auto">
  //             <h3>Enter New Location</h3>
  //             <div key={nanny.username}>
  //               {/* Link to the nanny detail page */}
  //               <Link href={`/nannydetail2/${nanny.username}`}>
  //                 <a>{customer.district}</a>
  //               </Link>
  //               {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
  //             </div>
  //             <button onClick={handleExit}>Exit</button>


  //           </div>
  //         </div>

  //       </div>
  //     </div>


  //     <div>
  //       <h1>Map with Marker</h1>
  //       <MapboxComponent />
  //     </div>

  //   </div>
  // );

  // return (
  //   <div>
  //     <div className="block justify-center">
  //       <div className="flex justify-center">
  //         <h2>Hiring Nanny</h2>
  //       </div>
  //       <div className="bg-white bg-opacity-40 p-5 rounded-2xl shadow-lg md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
  //         <div className="flex justify-center text-center">
  //           <h3>Where do you want to get the nanny?</h3>
  //         </div>

  //         <div className="flex flex-col sm:flex-row">
  //           {/* Shared location details */}
  //           <div className="bg-rose-200 p-5 rounded-lg shadow-lg mb-5 sm:mb-0 sm:mr-5 w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 mx-auto">
  //             <h4>Home</h4>
  //             <p>Customer username: {customer.username}</p>
  //             <p>Email: {customer.email}</p>
  //             <p>Contact number: {customer.contact_number}</p>
  //             <p>District: {customer.district}</p>
  //             <p>Sub-district: {customer.sub_district}</p>
  //             <p>Zip code: {customer.zip_code}</p>
  //             <p>Street number: {customer.street_number}</p>
  //           </div>

  //           <div className="bg-rose-200 p-5 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 ml-5 mx-auto">
  //             <h3>Enter New Location</h3>
  //             <div key={nanny.username}>
  //               {/* Link to the nanny detail page */}
  //               <Link href={`/nannydetail2/${nanny.username}`}>
  //                 <a>{customer.district}</a>
  //               </Link>
  //               {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
  //             </div>
  //             <button onClick={() => setShowMap(true)}>Enter New Location</button>
  //             <button onClick={handleExit}>Exit</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Conditionally render the MapboxComponent */}
  //     {showMap && (
  //       <div>
  //         <h1>Map with Marker</h1>
  //         <MapboxComponent />
  //       </div>
  //     )}
  //   </div>
  // );
  return (
    <div>
      <div className="block justify-center">
        <div className="flex justify-center">
          <h2>Hiring Nanny</h2>
        </div>
        <div className="bg-white bg-opacity-40 p-5 rounded-2xl shadow-lg md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
          <div className="flex justify-center text-center">
            <h3>Where do you want to get the nanny?</h3>
          </div>

          <div className="flex flex-col sm:flex-row">
            {/* Shared location details */}
            <div className="bg-rose-200 p-5 rounded-lg shadow-lg mb-5 sm:mb-0 sm:mr-5 w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 mx-auto">
              <h4>Home</h4>
              <div className="rounded-2xl overflow-hidden" style={{
                background: 'linear-gradient(0deg, #FF7093 0%, #FF7093 100%), linear-gradient(0deg, #FF7093 0%, #FF7093 100%), #FF7093',
                borderRadius: '30px',
              }}>
                {/* <p>Customer username: {customer.username}</p>
                <p>Contact number: {customer.contact_number}</p>
                <p>District: {customer.district}</p>
                <p>Sub-district: {customer.sub_district}</p>
                <p>Zip code: {customer.zip_code}</p>
                <p>Street number: {customer.street_number}</p>   */}
                <p className="text-sm m-3">Location : {customer.locationall}</p>
              </div>

             

            </div>

            <div className="bg-rose-200 p-5 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/2 xl:w-3/5 ml-5 mx-auto">
              <h3>Enter New Location</h3>
              <div key={nanny.username}>
                {/* Link to the nanny detail page */}
                <Link href={`/nannydetail2/${nanny.username}`}>
                  <a>{customer.district}</a>
                </Link>
                {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
              </div>
              <button onClick={() => setShowMap(true)}>Enter New Location</button>
              <button onClick={handleExit}>Exit</button>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the MapboxComponent */}
      {showMap && (
        <div>
          <button onClick={() => setShowMap(false)}>Close Map</button>
          <h1>Map with Marker</h1>
          <MapboxComponent />
        </div>
      )}
    </div>
  );


}

