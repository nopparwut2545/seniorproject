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


  return (
    <div>
      <h2>Hiring Nanny</h2>
      <div>
        <h3>Where do you want to get the nanny?</h3>
        <div>
          {/* Shared location details */}
          <div>
            <h4>Home</h4>
            <p>Customer username: {customer.username}</p>
            <p>Email: {customer.email}</p>
            <p>Contact number: {customer.contact_number}</p>
            <p>District: {customer.district}</p>
            <p>Sub-district: {customer.sub_district}</p>
            <p>Zip code: {customer.zip_code}</p>
            <p>Street number: {customer.street_number}</p>
          </div>
        </div>

        <div>
          {/* Section for new user input */}
          <h3>Enter New Location</h3>
          {/* Add form inputs for new user input here */}
        </div>

        {/* Display other nanny information here */}

        <div key={nanny.username}>
          {/* Link to the nanny detail page */}
          <Link href={`/nannydetail2/${nanny.username}`}>
            <a>{customer.district}</a>
          </Link>
          {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
        </div>
        <button onClick={handleExit}>Exit</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search for a location"
          onChange={(e) => {
            // Perform autocomplete search here using Google Places Autocomplete API
            // Update the map based on the selected location
            // You can use AutocompleteService and GeocodingService provided by Google Maps API
          }}
        />
        {/* <div id="map" style={{ height: '400px', width: '100%' }}></div> */}
      </div>

   
        <div>
          {/* <userlocationcontext.Provider value={{userlocation, setuserlocation}}> */}
            
          <div>
            <h1>Map with Marker</h1>
            <MapboxComponent/>
          </div>

          {/* </userlocationcontext.Provider> */}
         
        </div>
   

    </div>
  );
}

