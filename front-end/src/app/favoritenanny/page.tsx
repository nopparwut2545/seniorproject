'use client';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import styles from '../../../styles/favoriteNanny.module.css';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';
// type Props = {};

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Image from 'next/image';
// import logo from '../../../assets/Logo.png';
// import styles from '../../../styles/favoriteNanny.module.css';

type Props = {};

type Nanny = {
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
  role_level: string;
  cost: number | null;
  type_work: string;
  status: string;
  age: number;
  gender: string;
  score: number;
};

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
};

type favoriteNanny = {
  customer_id: number;
  nanny_id: number;
};

export default function FavoriteNanny({ }: Props) {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(true); // Initialize as loading
  const router = useRouter();

  const handleExit = () => {
    localStorage.removeItem('jwt');
    router.push('/login-admin');
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

      console.log("User ID:", userId);
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:9000/api/nannies');
          const response1 = await axios.get<Customer>(
            `http://localhost:9000/api/customers/${userId}`
          );
          const response2 = await axios.get(`http://localhost:9000/api/favouriteNanny/getbyId/${response1.data.id}`);

          setCustomer(response1.data);
          // Map the list of favoriteNannies to an array of Promises that fetch nanny data
          const nannyPromises = response2.data.map(async (favoriteNanny: favoriteNanny) => {
            const response3 = await axios.get(`http://localhost:9000/api/nannies/getby/${favoriteNanny.nanny_id}`);
            return response3.data;
          });

          // Wait for all the Promises to resolve
          const nanniesData = await Promise.all(nannyPromises);
          setNannies(nanniesData);

          setLoading(false); // Data fetching is complete
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An error occurred.');
          }
          setLoading(false); // Set loading to false even in case of an error
        }
      };

      fetchData();
    }else{
      alert('You need to be logged in first.');
      router.push('/login-user');
    }
  }, []);

  return (
    <div>
      <button onClick={handleExit}>Exit</button>
      <div className={styles.logoweb}>
        <Image src={logo} alt="" width={200} height={150} layout="fixed" />
      </div>
      <div className={styles.Banner}>
        <h2>Favorite Nanny</h2>
      </div>

      <div className={styles.test3}>
        <h2>Nanny Details</h2>
        {loading ? (
          <div>Loading...</div>
        ) : nannies.length > 0 ? (
          nannies.map((nanny) => (
            <div key={nanny.id}>
              <p>Nanny ID: {nanny.id}</p>
              <p>
                Nanny Name: {nanny.first_name} {nanny.last_name}
              </p>
              {/* Display other details about the nanny from response3 */}
            </div>
          ))
        ) : (
          <div>No nannies found.</div>
        )}
      </div>
    </div>
  );
}



