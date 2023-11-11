'use client'
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
type Props = {};

type Customer = {
  id : number;
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
  role:string;
  age: number;
  gender: string;
};

type Role = 'USER' | 'ADMIN' |'NANNY' ;

type DecodedToken = {
  sub: string;
  exp: number;
  a: Role[];
};


export default function CustomersPage({}: Props) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter(); // Initialize the router

  const handleExit = () => {
      localStorage.removeItem('jwt'); // Remove the JWT token
      router.push('/login-user'); // Redirect to /login
  };

  useEffect(() => {
      const token = localStorage.getItem('jwt');


      
      // Decode the JWT to extract user ID
      if (token) {
        const decodedToken: DecodedToken = jwt_decode(token);

        if (!decodedToken.a.includes('USER')) {
          setError('Access denied. You do not have the required permissions.');
          setLoading(false);
          return;
        }
  
        // Extract user ID from the "sub" key in JWT
        const userId = decodedToken.sub;
        
        if (!userId) {
          setError("User ID not found in token.");
          setLoading(false);
          return;
        }
        
        console.log("User ID:", userId);
          const fetchData = async () => {
              try {
                  const response = await axios.get(`http://localhost:9000/api/customers/${userId}`);
                  setCustomer(response.data);
              } catch (err) {
                  if (err instanceof Error) {
                      setError(err.message);
                  } else {
                      setError('An error occurred.');
                  }
              }
              setLoading(false);
          };

          fetchData();
      }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Customers</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>District</th>
            <th>Sub District</th>
            <th>Province</th>
            <th>Zip Code</th>
            <th>Street Number</th>
            <th>Contact Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
                    {customer && (
                        <tr key={customer.username}>
                            <td>{customer.username}</td>
                            <td>{customer.email}</td>
                            <td>{customer.pass_word}</td>
                            <td>{customer.district}</td>
                            <td>{customer.sub_district}</td>
                            <td>{customer.province}</td>
                            <td>{customer.zip_code}</td>
                            <td>{customer.street_number}</td>
                            <td>{customer.contact_number}</td>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.role}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={handleExit}>Exit</button>
        </div>
    );
}
