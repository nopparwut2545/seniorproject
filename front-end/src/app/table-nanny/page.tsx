'use client'
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
type Props = {};


type Nanny = {
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
  role_level: string;
  cost: number | null;
  type_work: string;
  status: string;
  age: number;
  gender: string;
  score :number;
  role: string;
};

export default function NannyPage({}: Props) {
  const [nanny, setNanny] = useState<Nanny | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleExit = () => {
      localStorage.removeItem('jwt');
      router.push('/login-nanny');
  };

  useEffect(() => {
      const token = localStorage.getItem('jwt');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userId: number = decodedToken.sub;
        if (!userId) {
          setError("User ID not found in token.");
          setLoading(false);
          return;
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/nannies/getby/${userId}`);
                setNanny(response.data);
            } catch (err : any) {
                setError(err.message || 'An error occurred.');
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
      <h2>Nannies</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>District</th>
            <th>Sub District</th>
            <th>Province</th>
            <th>Zip Code</th>
            <th>Street Number</th>
            <th>Contact Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role Level</th>
            <th>Cost</th>
            <th>Type Work</th>
            <th>Status</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Role</th>
            
          </tr>
        </thead>
        <tbody>
          {nanny && (
            <tr key={nanny.username}>
              <td>{nanny.username}</td>
              <td>{nanny.email}</td>
              <td>{nanny.district}</td>
              <td>{nanny.sub_district}</td>
              <td>{nanny.province}</td>
              <td>{nanny.zip_code}</td>
              <td>{nanny.street_number}</td>
              <td>{nanny.contact_number}</td>
              <td>{nanny.first_name}</td>
              <td>{nanny.last_name}</td>
              <td>{nanny.role_level}</td>
              <td>{nanny.cost}</td>
              <td>{nanny.type_work}</td>
              <td>{nanny.status}</td>
              <td>{nanny.age}</td>
              <td>{nanny.gender}</td>
              <td>{nanny.role}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleExit}>Exit</button>
    </div>
  );
}