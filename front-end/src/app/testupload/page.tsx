'use client'
import jwt_decode from 'jwt-decode';
import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import styles from '../../../styles/UploadImg.module.css';
import like from '../../../assets/Heart.png';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import searchicon from '../../../assets/Magnifer.png'
import Image from 'next/image';
import Link from 'next/link';

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
  profile_image_url: string;
};

type Admin = {
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
  age: number;
  gender: string;
  role: string;
};

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
  role: string;
};
type Role = 'USER' | 'ADMIN' | 'NANNY';

type DecodedToken = {
  sub: string;
  exp: number;
  a: Role[];
};
// ของเก่า 
export default function CustomersPage({ }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (!decodedToken.a.includes('USER')) {
        setError(
          'Access denied. You do not have the required permissions.'
        );
        setLoading(false);
        return;
      }

      const userId: number = decodedToken.sub;

      if (!userId) {
        setError('User ID not found in token.');
        setLoading(false);
        return;
      }

      const fetchData = async () => {
        try {
          const response = await axios.get<Customer>(
            `http://localhost:9000/api/customers/${userId}`
          );
          setCustomer(response.data);
          console.log(response.data.profile_image_url);
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
    } else {
      alert('You need to be logged in first.');
      router.push('/login-user');
    }
  }, []);

  // Test upload
  const triggerFileInputChange = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleConfirmation = async () => {
    setConfirmationOpen(false);
    console.log(customer?.id);

    if (customer?.id) {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      console.log("1");
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();

        formData.append('profileImage', file);
        console.log("2");
        try {
          const response = await axios.put<Customer>(
            `http://localhost:9000/api/customers/${customer.id}/uploadProfileImage`,
            formData

          );

          setCustomer(response.data);
        } catch (error) {
          console.error('Error uploading profile image:', error);
        }
      }
    }
    router.push('/user-profile_information');
  };

  // const handleFileInputChange = () => {
  //   setConfirmationOpen(true);
  // };
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files && fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }

    setConfirmationOpen(true);
  };

  const handleCancelConfirmation = () => {
    setConfirmationOpen(false);
    setSelectedImage(null);
    router.push('/user-profile_information');
  };
  const BacktoProfile = () => {
    router.push('/user-profile_information');
  };
  // if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!customer) return <div>Customer Null ...</div>;

  return (
    <div>

      <div className={styles.Banner}>
        <h2>Edit Profile Image</h2>
      </div>

      <div className='flex items-center justify-center '>
        <div className={`flex items-center justify-center ${styles.cardcontainer}`}>
          <div className={styles.card}>

            <div className='flex items-center justify-center mb-2'>
              <button className=" mt-2 bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300"
                onClick={triggerFileInputChange}>Upload Profile Image</button>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
              />
            </div>

            {isConfirmationOpen && (
              <div>
                <div className='m-2 '>
                <p>Are you sure you want to upload the profile image?</p>
                </div>

                <div className='mt-2 flex items-center justify-center'>
                  <div>
                    {selectedImage && <img src={selectedImage} alt="Selected" width={200} height={150} />}
                    <div className=' flex items-center justify-center'>
                      <button className="mt-2 mb-2 bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300"
                        onClick={handleConfirmation}>Save</button>
                      <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
                        onClick={handleCancelConfirmation}>Cancle</button>
                    </div>
                  </div>
                </div>

                <div className='mt-1 ml-2 flex items-center justify-start'>
                  <p>Previous Profile Img</p>
                </div>


              </div>
            )}
            <div className='mt-1 flex items-center justify-center'>
              <Image src={"data:image/png;base64," + customer.profile_image_url} alt="" width={200} height={150} layout="fixed" />
            </div>
            <div className='flex items-center justify-center '>
              <button className="mb-2 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                onClick={BacktoProfile}>Back</button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}



