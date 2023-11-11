'use client'
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
type Props = {};

type Admin = {
  id:number;
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
  age:number;
  gender:string;
  role:string;
};


export default function CustomersPage({}: Props) {
  const [admin, setAdmin] = useState<Admin | null>(null);
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
        const decodedToken: any = jwt_decode(token);
        
        // Extract user ID from the "sub" key in JWT
        const userId: number = decodedToken.sub;
        
        if (!userId) {
          setError("User ID not found in token.");
          setLoading(false);
          return;
        }
  
        console.log("User ID:", userId);
          const fetchData = async () => {
              try {
                  const response = await axios.get(`http://localhost:9000/api/admins/${userId}`);
                  setAdmin(response.data);
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
            <th>Age</th>
            <th>Gender</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
                    {admin && (
                        <tr key={admin.username}>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{admin.pass_word}</td>
                            <td>{admin.district}</td>
                            <td>{admin.sub_district}</td>
                            <td>{admin.province}</td>
                            <td>{admin.zip_code}</td>
                            <td>{admin.street_number}</td>
                            <td>{admin.contact_number}</td>
                            <td>{admin.first_name}</td>
                            <td>{admin.last_name}</td>
                            <td>{admin.age}</td>
                            <td>{admin.gender}</td>
                            <td>{admin.role}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={handleExit}>Exit</button>
        </div>
    );
}
