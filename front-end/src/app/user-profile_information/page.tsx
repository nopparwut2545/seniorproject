'use client'
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import styles from '../../../styles/UserProfile.module.css';
import like from '../../../assets/Heart.png';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import searchicon from '../../../assets/Magnifer.png'
import Image from 'next/image';
import Link from 'next/link';
import Customerpage from '@/app/testupload/page';
import 'bootstrap/dist/css/bootstrap.min.css';
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


    // const [customer, setcustomer] = useState<Customer | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);

    const [editing, setEditing] = useState<boolean>(false);
    const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
    const editableFields: (keyof Customer)[] = ['first_name', 'last_name', 'email', 'contact_number', 'district'];
    const router = useRouter(); // Initialize the router

    const handleExit = () => {
        localStorage.removeItem('jwt'); // Remove the JWT token
        router.push('/login-user'); // Redirect to /login
    };

    const handleEdit = () => {
        if (customer) {
            setEditing(true);
            setEditedCustomer({ ...customer });
        }
    };

    const EditImage = () => {
        router.push('/testupload');
    };

    const handleSave = async () => {
        try {
            const response = await axios.put<Customer>(
                `http://localhost:9000/api/customers/${customer?.id}`,
                editedCustomer
            );
            setCustomer(response.data);
            setEditing(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred.');
            }
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedCustomer({
            ...editedCustomer!,
            [e.target.name]: e.target.value,
        });


    };

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


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer Null ...</div>;
    // return (
    //     <div>
    //         <div className={styles.logoweb}></div>
    //         <div className={styles.Banner}>
    //             <h2>Edit Profile</h2>
    //         </div>
    //         <div className={`grid grid-cols-3 gap-3 ${styles.cardcontainer}`}>
    //             <div className={styles.card} key={customer?.username}>
    //             <Image className="mb-4" src={"data:image/png;base64,"+customer.profile_image_url} alt="" width={200} height={150} layout="fixed" />
    //                 <div className={styles.groupbanner}>
    //                     {editing ? ( 
    //                         <div>
    //                             {editableFields.map((field) => (
    //                                 <div key={field} className="mb-4">
    //                                     <label className="text-white">{field.replace(/_/g, ' ')} :  </label>

    //                                     <input
    //                                         type="text"
    //                                         name={field}
    //                                         value={editedCustomer ? editedCustomer[field] : ''}
    //                                         onChange={handleInputChange}
    //                                         className="bg-white border rounded-md px-3 py-2 w-full"
    //                                     />

    //                                 </div>
    //                             ))}
    //                              <button onClick={EditImage}
    //                              className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //                              >Edit Image</button>
    //                         </div>
    //                     ) : (
    //                         <div>
    //                             {editableFields.map((field) => (
    //                                 <p key={field} className="mb-4">
    //                                     {field.replace(/_/g, ' ')} : {customer ? customer[field] : ''}
    //                                 </p>
    //                             ))}
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //             {/* <Customerpage /> */}

    //         </div>
    //         {!editing && (
    //             <div className="flex space-x-4">
    //                 <button onClick={handleEdit}
    //                 className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    //                 >Edit</button>

    //                 <button onClick={handleExit}
    //                 className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
    //                 >Exit</button>
    //             </div>
    //         )}
    //         {editing && <button onClick={handleSave}
    //          className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300"
    //          >Save</button>}

    //     </div>
    // );

    return (
        <div>
            <div className={styles.logoweb}></div>
            <div className={styles.Banner}>
                <h2>Edit Profile</h2>
            </div>
            <div className='flex items-center justify-center' >
                {/* <div className="flex items-center justify-center text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold"> */}
                <div className={` ${styles.cardcontainer}`}>
                    <div className={styles.card} key={customer?.username}>
                        <div className="block items-center justify-center" >
                            <div className="flex mb-4 items-center justify-center">
                                <Image className="flex ml-5 items-center justify-center" src={"data:image/png;base64," + customer.profile_image_url}
                                    alt="" width={200} height={150} layout="fixed" />
                            </div>

                            <div className={styles.groupbanner}>
                                {editing ? (
                                    // <div className="flex flex-col items-center justify-center mx-auto max-w-2xl">  
                                    //     {editableFields.map((field) => (
                                    //         <div key={field} className="mb-4 flex items-center justify-center w-full">
                                    //             <div className="col-span-5">
                                    //                 <span >{field.replace(/_/g, ' ')}:</span>
                                    //             </div>
                                    //             <div className="ml-2 col-span-7">
                                    //                 <input
                                    //                     type="text"
                                    //                     name={field}
                                    //                     value={editedCustomer ? editedCustomer[field] : ''}
                                    //                     onChange={handleInputChange}
                                    //                     className="bg-white border rounded-md px-3 py-2"
                                    //                 />
                                    //             </div>

                                    //         </div>
                                    //     ))}
                                    //     <div className='flex items-center justify-center'>
                                    //         <button
                                    //             onClick={EditImage}
                                    //             className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    //         >Edit Image</button>
                                    //     </div>
                                    // </div>
                                    <div className="flex flex-col items-center justify-center mx-auto max-w-2xl">
                                        {editableFields.map((field) => (
                                            <div key={field} className="mb-4 flex items-center justify-center w-full">
                                                <div className="col-span-5">
                                                    <span>{field.replace(/_/g, ' ')}:</span>
                                                </div>
                                                <div className="ml-2 col-span-7">
                                                    <input
                                                        type="text"
                                                        name={field}
                                                        value={editedCustomer ? editedCustomer[field] : ''}
                                                        onChange={handleInputChange}
                                                        className="bg-white border rounded-md px-3 py-2 w-full"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <div className='flex items-center justify-center'>
                                            <button
                                                onClick={EditImage}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                            >
                                                Edit Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div >
                                        {editableFields.map((field) => (
                                            <p key={field} className="mb-4 flex items-center">
                                                <span >{field.replace(/_/g, ' ')}:</span>
                                                <span >{customer ? customer[field] : ''}</span>
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            {!editing && (
                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleEdit}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    >Edit</button>
                                    <button
                                        onClick={handleExit}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-300"
                                    >Exit</button>
                                </div>
                            )}
                            {editing && <button
                                onClick={handleSave}
                                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-green-300"
                            >Save</button>}
                        </div>
                    </div>
                    {/* <Customerpage /> */}
                </div>


            </div>
        </div>
    );
}

