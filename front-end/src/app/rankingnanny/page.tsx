'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import styles from '../../../styles/rankingNanny.module.css'
import Image from 'next/image';
import Link from 'next/link';

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
};



export default function HiringPage({ }: Props) {
    // const [nannies, setNannies] = useState<Nanny[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [nannies, setNannies] = useState<Nanny[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get('http://localhost:9000/api/nannies/getbyranking');
                setNannies(response1.data);

                const response = await axios.get<Customer>('http://localhost:9000/api/customers/1');
                const response2 = await axios.get('http://localhost:9000/api/nannies/getbyranking');
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
    }, []);

    if (!nannies) return <div>Customer not found.</div>;
    return (
        <div>
            <div className={styles.logoweb}>
                <Image src={logo} alt="" width={200} height={150} layout="fixed" />
            </div>
            <div className={styles.Banner}>
                <h2>Ranking Nanny</h2>
            </div>
            <div className={styles.showscore}>
                {nannies.length > 0 ? (
                    nannies.map((nanny) => (
                        <div key={nanny.id}>
                            <div className={styles.showscoredetail}>
                                <p>Nanny ID: {nanny.id}</p>
                                <p>Nanny Name: {nanny.first_name} {nanny.last_name}</p>
                                <p>Score: {nanny.score}</p>
                            </div>
                            {/* <div>
                                <p>Nanny Name: {nanny.first_name} {nanny.last_name}</p>
                             
                            </div>
                            <div>
                                <p>Score: {nanny.score}</p>
                              
                            </div> */}
                            {/* Display other details about the nanny */}
                        </div>
                    ))
                ) : (
                    <div>No nannies found.</div>
                )}
            </div>
        </div>
    );
}