'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

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
  locationall : string;
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
      <h2>Hiring Nanny</h2>
      <div>
        <p>Username: {nanny.username}</p>
        <p>Name: {nanny.first_name}  {nanny.last_name}</p>
        <p>Location: {customer .district}</p>
        <p>Email: {nanny.email}</p>
        <p>Contact Number: {nanny.contact_number}</p>
        <p>Total: {nanny.cost}  baht</p>
        <p>Total: {nanny.type_work}</p>
        <p>Role: {nanny.role_level}</p>
        {/* ... display other nanny information here */}

        <div  key={nanny.username}>
              {/* Link to the nanny detail page */}
              <Link href={`/nannydetaildate/${nanny.username}`}>
                <a>Hiring</a>
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

