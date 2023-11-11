'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import styles from '../../../styles/rankingNanny.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { act } from 'react-dom/test-utils';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/navigation";
type Props = {};

interface ActivityProgramPageProps {
    customer_id: number;
}

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

type ActivityProgram = {
    ProgramID: number;
    Normal_Period1: string;
    Normal_Period2: string;
    Normal_Period3: string;
    Normal_Period4: string;
    Normal_Period5: string;
    Overnight_Period1: string;
    Overnight_Period2: string;
    Overnight_Period3: string;
    Overnight_Period4: string;
    Overnight_Period5: string;
    customer_id: number;
}

export default function ActivityProgramPage({ }: Props) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [activity, setActivity] = useState<ActivityProgram[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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
                    const response = await axios.get<Customer>( `http://localhost:9000/api/customers/${userId}`);
                    const response2 = await axios.get<ActivityProgram[]>( `http://localhost:9000/api/activityprogram/getbyusername/${userId}`);
                    setCustomer(response.data);
                    setActivity(response2.data);
                    console.log('Response from API:', response2.data);
                    console.log('Customer id: ', response.data.username);
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





    const handleInputChange = async (index: number, field: string, value: string) => {
        const updatedActivityCopy = [...activity];
        updatedActivityCopy[index] = { ...updatedActivityCopy[index], [field]: value };
        setActivity(updatedActivityCopy);
    };



    const handleConfirmEdit = async () => {
        try {
            for (let i = 0; i < activity.length; i++) {
                const response = await axios.put(`http://localhost:9000/api/activityprogram/${activity[i].customer_id}`, activity[i]);
                console.log('Activity program updated:', response.data);
            }
        } catch (error) {
            console.error('Error updating activity program:', error);
            setError('Error updating activity program');
        }
    };



    if (!activity) return <div>Activity not found.</div>;
    console.log('Activity mek:', activity);

    return (
        <>
            <div>
                {activity.map((activityProgram, index) => (
                    <div key={index}>
                        <label htmlFor="normalPeriod1">Normal Period 1:</label>
                        <input
                            className='rounded-lg'
                            type='text'
                            value={activityProgram ? activityProgram.Normal_Period1 : ''}
                            onChange={(e) => handleInputChange(index, 'Normal_Period1', e.target.value)}
                        />
                        <input
                            className='rounded-lg'
                            type='text'
                            value={activityProgram ? activityProgram.Normal_Period2 : ''}
                            onChange={(e) => handleInputChange(index, 'Normal_Period2', e.target.value)}
                        />
                        <input
                            className='rounded-lg'
                            type='text'
                            value={activityProgram ? activityProgram.Normal_Period3 : ''}
                            onChange={(e) => handleInputChange(index, 'Normal_Period3', e.target.value)}
                        />
                        <input
                            className='rounded-lg'
                            type='text'
                            value={activityProgram ? activityProgram.Normal_Period4 : ''}
                            onChange={(e) => handleInputChange(index, 'Normal_Period4', e.target.value)}
                        />
                        <input
                            className='rounded-lg'
                            type='text'
                            value={activityProgram ? activityProgram.Normal_Period5 : ''}
                            onChange={(e) => handleInputChange(index, 'Normal_Period5', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button className='rounded-lg bg-black py-2 text-white' onClick={handleConfirmEdit}>Confirm Edit</button>
            <button onClick={handleExit}>Exit</button>
        </>
    );


}      