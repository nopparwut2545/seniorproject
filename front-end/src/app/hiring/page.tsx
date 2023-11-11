'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/Hiring.module.css';
import like from '../../../assets/Heart.png';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import searchicon from '../../../assets/Magnifer.png'
import Image from 'next/image';
import Link from 'next/link';
import  jwt_decode  from 'jwt-decode';

interface SearchBoxProps {
  onSearch: (term: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onSearch(value);
  };

  return (
    <div className={styles.searchboxcontainer}>
      <Image
        src={searchicon}
        alt="Search Icon"
        className={styles.searchicon}
      />
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        className={styles.searchinput}
      />
    </div>
  );
};


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
  locationall : string;
};

type favoriteNanny = {
  
  customer_id: number;
  nanny_id: number;
}

type favoriteNannytest = {
  id : number;
  customer_id: number;
  nanny_id: number;
}



export default function HiringPage({ }: Props) {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [favnannies, setFavNannies] = useState<favoriteNannytest[]>([]);
  const [favNannyIds, setFavNannyIds] = useState<number[]>([]); // State for favorited nanny IDs
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleExit = () => {
    localStorage.removeItem('jwt');
    router.push('/login-user');
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');


      
  //     // Decode the JWT to extract user ID
  //     if (token) {
  //       const decodedToken: any = jwt_decode(token);
        
  //       // Extract user ID from the "sub" key in JWT
  //       const userId: number = decodedToken.sub;
        
  //       if (!userId) {
  //         setError("User ID not found in token.");
  //         setLoading(false);
  //         return;
  //       }
      
  //     console.log("User ID:", userId);
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:9000/api/nannies');
  //       const response1 = await axios.get<Customer>(`http://localhost:9000/api/customers/${userId}`);
        
  //       setNannies(response.data);
  //       setCustomer(response1.data);
        
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('An error occurred.');
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }
  // }, []);
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

          setNannies(response.data);
          setCustomer(response1.data);
          setLoading(false);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An error occurred.');
          }
        }
      };

      fetchData();
    }else{
      alert('You need to be logged in first.');
      router.push('/login-user');
    }
  }, []);

  // const handleUpdateStatus = async (username: string) => {
  //   try {
  //     // Send a PUT request to the API endpoint to update the status
  //     await axios.put(`http://localhost:9000/api/nannies/updateStatus/${username}`, {
  //       status: 'Inactive',
  //     });

  //     // After a successful update, you can reload the data or perform other actions
  //     // For example, refetch the nannies list
  //     fetchData();
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       console.error(err.message);
  //     } else {
  //       console.error('An error occurred while updating the status.');
  //     }
  //   }
  // };



  // const AddfavoriteNanny = async (nannyId: number) => {
  //   try {
  //     if (!customer) return <div>Customer not found.</div>;
  //     // Check if the nanny is already in the list of favorite nannies
  //     const response2 = await axios.get(`http://localhost:9000/api/favouriteNanny/getbyId/${customer.id}`);
  //     console.log("Check FavNanny response",response2.data);
      
  //     const isNannyAlreadyFavorite = response2.data.some(
  //       (favoriteNanny: { nanny_id: number; }) => favoriteNanny.nanny_id === nannyId 
  //     );
      
  //     if (isNannyAlreadyFavorite) {
  //       console.log('Nanny is already a favorite.');
  //       // You can show a message or take some action here
  //     } else {
  //       const fav: favoriteNanny = {
  //         customer_id: nannyId,
  //         nanny_id: nannyId,
  //       };
        
  //       const response = await axios.post<favoriteNanny>('http://localhost:9000/api/favouriteNanny', fav);
  //       console.log('Booking created successfully:', response.data);
  
  //       // After a successful update, you can update the state to reflect the new favorite
  //       setNannies((prevNannies) => {
  //         // Filter the nannies to include the newly added favorite
  //         return [...prevNannies, ...nannies.filter((nanny) => nanny.id === nannyId)];
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error creating booking:', error);
  //   }
  // };
  const AddfavoriteNanny = async (nannyId: number) => {
    try {
      if (!customer) return <div>Customer not found.</div>;

      // Check if the nanny is already in the list of favorite nannies
      const response2 = await axios.get(`http://localhost:9000/api/favouriteNanny/getbyId/${customer.id}`);
      console.log("Check FavNanny response", response2.data);

      const isNannyAlreadyFavorite = response2.data.some(
        (favoriteNanny: { nanny_id: number; }) => favoriteNanny.nanny_id === nannyId
      );

      if (isNannyAlreadyFavorite) {
        console.log('Nanny is already a favorite.');
        // You can show a message or take some action here
      } else {
        const fav: favoriteNanny = {
          customer_id: customer.id,
          nanny_id: nannyId,
        };

        const response = await axios.post<favoriteNanny>('http://localhost:9000/api/favouriteNanny', fav);
        console.log('Favorite Nanny added successfully:', response.data);

        // Update the state with the new favorited nanny ID
        setFavNannyIds((prevFavNannyIds) => [...prevFavNannyIds, nannyId]);
      }
    } catch (error) {
      console.error('Error adding favorite nanny:', error);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  function handleSearch(term: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <div className={styles.logoweb}>
      <Image src={logo}alt="" width={200} height={150} layout="fixed" />
      </div>
      <div className={styles.Banner}>
      <h2>Hiring Nanny</h2>
      </div>
      <div className={styles.searchbox}>
      <SearchBox onSearch={handleSearch} />
    </div>
      <div className={`grid grid-cols-3 gap-3 ${styles.cardcontainer}`}>
      {nannies.map((nanny) => (
        nanny.status !== 'Inactive' && (
          <div className={styles.card} key={nanny.username}>
            <Image src={nanny1} alt="" width={200} height={150} layout="fixed" />
            {/* Link to the nanny detail page */}
            <Link href={`/nannydetail/${nanny.username}`}>
              <a>{nanny.username}</a>
            </Link>
                  {/* ... nanny information */}
                  <div className={styles.groupbanner}>
                {/* <button onClick={() => handleUpdateStatus(nanny.username)}>Set Inactive</button> */}
                <button onClick={() => AddfavoriteNanny(nanny.id)}>Add Favourite
                  <Image src={like} alt="" width={50} height={30} layout="fixed" />
                </button>
              </div>
          </div>
              )
            ))}
          </div>
          <button onClick={handleExit}>Exit</button>
    </div>
  );
}



