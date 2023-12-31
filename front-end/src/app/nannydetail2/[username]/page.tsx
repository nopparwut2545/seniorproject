'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';
import nanny1 from '../../../../assets/hanni.png'
import Image from 'next/image';
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

export default function Page({ params }: { params: { username: string } }) {
  const [nanny, setNanny] = useState<Nanny | null>(null); // Initialize as null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const router = useRouter();
  const handleExit = () => {
    localStorage.removeItem('jwt');
    router.push('/login-admin');
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userId: number = decodedToken.sub;

        if (!userId) {
          setError("User ID not found in token");
          return;
        }

        console.log("User ID:", userId);

        const response = await axios.get<Nanny>(`http://localhost:9000/api/nannies/getbyusername/${params.username}`);
        const response1 = await axios.get<Customer>(`http://localhost:9000/api/customers/${userId}`);
        setNanny(response.data);
        setCustomer(response1.data);
        setLoading(false);
      } else {
        alert('You need to be logged in first.');
        router.push('/login-user');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.username]);

  //   const handleUpdateStatus = async (username: string) => {
  //     try {
  //       // Send a PUT request to the API endpoint to update the status
  //       await axios.put(`http://localhost:9000/api/nannies/updateStatus/${username}`, {
  //         status: 'Inactive',
  //       });

  //       // After a successful update, you can reload the data or perform other actions
  //       // For example, refetch the nannies list
  //       fetchData();
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.error(err.message);
  //       } else {
  //         console.error('An error occurred while updating the status.');
  //       }
  //     }
  //   };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Customer not found.</div>;
  if (!nanny) return <div>Nanny not found.</div>;

  return (
    <div>
      <div className="block justify-center">
        <div className="text-center text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold">
          <span style={{ fontFamily: 'Montserrat', }} className="text-white">Hiring Nanny</span>
        </div>
        <div className="mt-5 bg-white bg-opacity-40 p-5 rounded-2xl shadow-lg md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">

          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="mb-4 md:mr-4">
              <Image src={nanny1} alt="" width={200} height={150} layout="fixed" />
            </div>

            <div className="mb-4 md:mb-0">
              <div style={{ fontFamily: 'Montserrat' }}>
                <p><strong>Username:</strong> {nanny.username}</p>
                <p><strong>Name:</strong> {nanny.first_name} {nanny.last_name}</p>
                <p><strong>Location:</strong> {customer.district}</p>
                <p><strong>Email:</strong> {nanny.email}</p>
                <p><strong>Contact Number:</strong> {nanny.contact_number}</p>
                <p><strong>Total:</strong> {nanny.cost} baht</p>
                <p><strong>Type of Work:</strong> {nanny.type_work}</p>
                <p><strong>Role:</strong> {nanny.role_level}</p>
              </div>
            </div>

            <div style={{ fontFamily: 'Montserrat' }}>
              <p><strong>Total: </strong>{nanny.cost} baht</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8" key={nanny.username}>
          {/* Link to the nanny detail page */}
          <Link href={`/nannydetaildate/${nanny.username}`}>
            <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-5">
              <div style={{ fontFamily: 'Montserrat', }}>
                Hiring
              </div>
            </button>
          </Link>
          {/* ... nanny information */}
          {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
        </div>
      </div>
      <button onClick={handleExit}>Exit</button>
    </div>
  );

}



function fetchData() {
  throw new Error('Function not implemented.');
}

