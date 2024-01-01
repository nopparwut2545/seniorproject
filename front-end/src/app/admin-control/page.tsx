'use client'
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import styles from '../../../styles/Hiring.module.css';
import like from '../../../assets/Heart.png';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import searchicon from '../../../assets/Magnifer.png'
import Image from 'next/image';
import Link from 'next/link';
type Props = {};

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
type Role = 'USER' | 'ADMIN' |'NANNY' ;

type DecodedToken = {
  sub: string;
  exp: number;
  a: Role[];
};
// ของเก่า 
export default function CustomersPage({ }: Props) {
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [nannies, setNannies] = useState<Nanny[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);
    const router = useRouter(); // Initialize the router

    const handleExit = () => {
        localStorage.removeItem('jwt'); // Remove the JWT token
        router.push('/login-admin'); // Redirect to /login
    };

    const handleEditNanny = (nanny: Nanny) => {
        setSelectedNanny(nanny);
    };

    const handleUpdateNanny = async (updatedNanny: Nanny) => {
        try {
            // Make an API request to update the nanny data
            await axios.put(`http://localhost:9000/api/nannies/updatebyAdmin/${updatedNanny.id}`, updatedNanny);
            alert(updatedNanny.id);
            // Reload the nanny data
            const response = await axios.get('http://localhost:9000/api/nannies');
            setNannies(response.data);
            // Clear the selected nanny
            setSelectedNanny(null);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An error occurred.');
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        // Decode the JWT to extract user ID
        if (token) {
            const decodedToken: any = jwt_decode(token);
            if (!decodedToken.a.includes('ADMIN')) {
                setError('Access denied. You do not have the required permissions.');
                setLoading(false);
                return;
              }
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
                    const response1 = await axios.get('http://localhost:9000/api/nannies');
                    setAdmin(response.data);
                    setNannies(response1.data);
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
            router.push('/login-admin');
        }
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!nannies) return <div>Nannies Not found {error}</div>;
    return (
        <div>
            <div className={styles.logoweb}>
                {/* Display admin information */}
            </div>
            <div className={styles.Banner}>
                <h2>Admin Set Up Nanny</h2>
            </div>
            <div className={`grid grid-cols-3 gap-3 ${styles.cardcontainer}`}>
                {nannies.map((nanny) => (
                    // nanny.status !== 'Inactive' && (
                    <div className={styles.card} key={nanny.username}>
                        <Image src={nanny1} alt="" width={200} height={150} layout="fixed" />
                        <div className={styles.groupbanner}>
                            {/* Display nanny information */}
                            {selectedNanny?.id === nanny.id ? (
                                // Show edit form
                                <div>
                                    {/* Edit form for nanny data */}
                                    <form onSubmit={() => handleUpdateNanny(selectedNanny)}>

                                        {/*  /* No password  กับ id */}
                                        <input type="text" value={selectedNanny?.username ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, username: e.target.value })} />
                                        <input type="text" value={selectedNanny?.email ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, email: e.target.value })} />
                                        <input type="text" value={selectedNanny?.district ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, district: e.target.value })} />
                                        <input type="text" value={selectedNanny?.sub_district ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, sub_district: e.target.value })} />
                                        <input type="text" value={(selectedNanny?.age ?? 0).toString()} onChange={(e) => setSelectedNanny({ ...selectedNanny, age: parseInt(e.target.value, 10) || 0 })} />
                                        <select
                                            value={(selectedNanny?.role_level?.toString() ?? '1')}
                                            onChange={(e) => {
                                                setSelectedNanny({ ...selectedNanny, role_level: e.target.value });
                                            }}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>

                                        <input type="text" value={(selectedNanny?.cost ?? 0).toString()} onChange={(e) => setSelectedNanny({ ...selectedNanny, cost: parseFloat(e.target.value) || 0 })} />
                                        <select value={selectedNanny?.type_work} onChange={(e) => setSelectedNanny({ ...selectedNanny, type_work: e.target.value })}>
                                            <option value="F">Full Time</option>
                                            <option value="P">Part Time</option>
                                            <option value="A">Both</option>
                                        </select>

                                        {/* Additional input fields for Nanny object   */}
                                        <input type="text" value={selectedNanny?.contact_number ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, contact_number: e.target.value })} />
                                        <input type="text" value={selectedNanny?.first_name ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, first_name: e.target.value })} />
                                        <input type="text" value={selectedNanny?.last_name ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, last_name: e.target.value })} />
                                        <input type="text" value={selectedNanny?.zip_code ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, zip_code: e.target.value })} />
                                        <input type="text" value={selectedNanny?.province ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, province: e.target.value })} />
                                        <input type="text" value={selectedNanny?.street_number ?? ""} onChange={(e) => setSelectedNanny({ ...selectedNanny, street_number: e.target.value })} />
                                        <input type="text" value={(selectedNanny?.score ?? 0).toString()} onChange={(e) => setSelectedNanny({ ...selectedNanny, score: parseFloat(e.target.value) || 0 })} />

                                        <select value={selectedNanny?.status} onChange={(e) => setSelectedNanny({ ...selectedNanny, status: e.target.value })}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                       
                                        
                                        {/* ... Add more input fields as needed ... */}

                                        <button type="submit">Save</button>
                                        <button type="button" onClick={() => setSelectedNanny(null)}>Cancel</button>
                                    </form>
                                </div>
                            ) : (
                                // Show nanny information
                                <div>
                                    <h3>{nanny.username}</h3>
                                    {/* Other nanny information */}
                                    <button onClick={() => handleEditNanny(nanny)}>Edit</button>
                                </div>
                            )}
                        </div>
                    </div>
                    // )
                ))}
            </div>
            <button onClick={handleExit}>Exit</button>
        </div>
    );
}

