'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';
import { useRouter } from "next/navigation";
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
};

type ActivityProgram = {
    // ProgramID: number;
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
};

export default function PreActivityProgramPage({ }: Props) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [activity, setActivity] = useState<ActivityProgram[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const handleExit = () => {
        localStorage.removeItem('jwt');
        router.push('/login-admin');
    };

    const createNullActivityProgram = async () => {
        if (!customer) return <div>Customer Null ...</div>;
        try {
            // Check if there are existing activity programs
            if (activity.length === 0 || !activity[0] || Object.values(activity[0]).every(val => val === '')) {
                const newActivityProgram: ActivityProgram = {
                    Normal_Period1: '',
                    Normal_Period2: '',
                    Normal_Period3: '',
                    Normal_Period4: '',
                    Normal_Period5: '',
                    Overnight_Period1: '',
                    Overnight_Period2: '',
                    Overnight_Period3: '',
                    Overnight_Period4: '',
                    Overnight_Period5: '',
                    customer_id: customer.id,
                };

                const response = await axios.post<ActivityProgram>(
                    'http://localhost:9000/api/activityprogram',
                    newActivityProgram
                );
                console.log('Null Activity Program created:', response.data);
                setActivity([response.data]);
            } else {
                console.log('User already has an activity program');
                // You can provide feedback to the user if needed
            }
        } catch (error) {
            console.error('Error creating Null Activity Program:', error);
        }
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
                    const customerResponse = await axios.get<Customer>(
                        `http://localhost:9000/api/customers/${userId}`
                    );
                    const activityResponse = await axios.get<ActivityProgram[]>(
                        `http://localhost:9000/api/activityprogram/getbyusername/${userId}`
                    );
                    setCustomer(customerResponse.data);
                    setActivity(activityResponse.data);
                    console.log('customer id: ', customerResponse.data.username);
                    console.log('Response from API:', activityResponse.data);
                    if (activityResponse.data.length === 0) {
                        alert('You dont have an activity program. Creating a null activity program via press the button " Add ".');
                        createNullActivityProgram();
                    }

                    if (activityResponse.data[0] && activityResponse.data[0].Normal_Period1 === '0') {
                        console.log('No yeast');
                    }
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

    return (
        <>
            <div className="mt-10 text-center text-4xl sm:text-xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-6xl font-bold">
                <span style={{ fontFamily: 'Montserrat', }} className="text-white">Activity Program</span>
            </div>
            <div className="mt-10 flex justify-center items-center">
                <Link href={`/activityprogram`}>
                    <button style={{ fontFamily: 'Montserrat', }}
                        className="text-white bg-red-200 p-4 rounded-3xl font-normal"
                        onClick={createNullActivityProgram}>
                        Add
                    </button>
                </Link>
            </div>
            <button onClick={handleExit}>Exit</button>
        </>
    );
}
