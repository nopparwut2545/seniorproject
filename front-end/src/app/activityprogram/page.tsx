'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import logo from '../../../assets/Logo.png'
import nanny1 from '../../../assets/hanni.png'
import Image from 'next/image';
import Link from 'next/link';
import { act } from 'react-dom/test-utils';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/navigation";
import styles from '../../../styles/activityprogram.module.css'
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
                    const response = await axios.get<Customer>(`http://localhost:9000/api/customers/${userId}`);
                    const response2 = await axios.get<ActivityProgram[]>(`http://localhost:9000/api/activityprogram/getbyusername/${userId}`);
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
        <div className={styles.rootContainer}>
            <div className='contentContainer p-2'>
                <div className="mt-10 text-center text-4xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-bold">
                    <span style={{ fontFamily: 'Montserrat', }} className="text-white">Activity Program</span>
                </div>
                <div className="flex justify-center mt-5 md:flex-row">
                    {activity.map((activityProgram, index) => (
                        <div key={index} className="mb-4">
                            <div className='flex justify-center'>
                                <div className={`activity-1 p-6 mt-4 mb-4 text-center mx-auto text-medium bg-slate-400 rounded-lg flex flex-col items-center  ${styles.act}`}>
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="normalPeriod1" className="mb-2">Normal Period 1:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Normal_Period1 : ''}
                                        onChange={(e) => handleInputChange(index, 'Normal_Period1', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="normalPeriod2" className="mb-2">Normal Period 2:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Normal_Period2 : ''}
                                        onChange={(e) => handleInputChange(index, 'Normal_Period2', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="normalPeriod3" className="mb-2">Normal Period 3:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Normal_Period3 : ''}
                                        onChange={(e) => handleInputChange(index, 'Normal_Period3', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="normalPeriod4" className="mb-2">Normal Period 4:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Normal_Period4 : ''}
                                        onChange={(e) => handleInputChange(index, 'Normal_Period4', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="normalPeriod5" className="mb-2">Normal Period 5:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Normal_Period5 : ''}
                                        onChange={(e) => handleInputChange(index, 'Normal_Period5', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="overnightPeriod1" className="mb-2">Overnight Period 1:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Overnight_Period1 : ''}
                                        onChange={(e) => handleInputChange(index, 'Overnight_Period1', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="overnightPeriod2" className="mb-2">Overnight Period 2:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Overnight_Period2 : ''}
                                        onChange={(e) => handleInputChange(index, 'Overnight_Period2', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="overnightPeriod3" className="mb-2">Overnight Period 3:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Overnight_Period3 : ''}
                                        onChange={(e) => handleInputChange(index, 'Overnight_Period3', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="overnightPeriod4" className="mb-2">Overnight Period 4:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Overnight_Period4 : ''}
                                        onChange={(e) => handleInputChange(index, 'Overnight_Period4', e.target.value)}
                                    />
                                    <label style={{ fontFamily: 'Montserrat', }} htmlFor="overnightPeriod5" className="mb-2">Overnight Period 5:</label>
                                    <input
                                        className='rounded-lg mb-2'
                                        type='text'
                                        value={activityProgram ? activityProgram.Overnight_Period5 : ''}
                                        onChange={(e) => handleInputChange(index, 'Overnight_Period5', e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className='rounded-lg bg-black py-2 p-4 text-white flex justify-center mx-auto' onClick={handleConfirmEdit}>Confirm Edit</button>
                            <button className='block mx-auto mt-3' onClick={handleExit}>Exit</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );


}      