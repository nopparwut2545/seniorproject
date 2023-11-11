'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import { add, format, parseISO, addHours } from "date-fns"
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';

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
    locationall : string;
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
};

type BookingQueue = {
    id: number,
    customer_id: number,
    nanny_id: number,
    start_date: Date;
    end_date: Date;
    total_amount: number,
    status_payment: string,
    hours: number
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateType {
    justDate: Date | null,
    dateTime: Date | null,
}



export default function Page({ params }: { params: { username: string } }) {
    const [customer, setCustomer] = useState<Customer | null>(null); // Initialize as null
    const [nanny, setNanny] = useState<Nanny | null>(null); // Initialize as null
    const [bookingqueue, setBookingqueue] = useState<BookingQueue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [value, onChange] = useState<Value>(new Date());
    const [response1, setResponse1] = useState<Nanny | null>(null);
    const [startdate, setstartDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })

    const [enddate, setEndtDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })


    const getstartTimes = () => {
        if (!startdate.justDate) return

        const { justDate } = startdate
        const beginning = add(justDate, { hours: 9 })
        const end = add(justDate, { hours: 17 })
        const interval = 30

        const starttimes = []
        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
            starttimes.push(i)
        }
        return starttimes
    }

    const getendTimes = () => {
        if (!enddate.justDate) return

        const { justDate } = enddate
        const beginning = add(justDate, { hours: 9 })
        const end = add(justDate, { hours: 17 })
        const interval = 30

        const endtimes = []
        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
            endtimes.push(i)
        }
        return endtimes
    }

    const starttimes = getstartTimes()
    const endtimes = getendTimes()
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
                    if (!customer || !nanny) {
                        const response = await axios.get<Customer>(`http://localhost:9000/api/customers/${userId}`);
                        const response1 = await axios.get<Nanny>(`http://localhost:9000/api/nannies/getbyusername/${params.username}`);
                        setCustomer(response.data);
                        setNanny(response1.data);

                        if (response.data && response1.data) {
                            // const response2 = await axios.get(`http://localhost:9000/api/bookingqueue/getbookings/${response.data.id}/${response1.data.id}`);
                            const response2 = await axios.get(`http://localhost:9000/api/bookingqueue/getbookingstatus/${response.data.id}/${response1.data.id}`);
                            setBookingqueue(response2.data);

                            console.log("All DATA", response1.data);
                            console.log("Nanny DATA", response1.data.email);

                            console.log("Booking QUEUE", response2.data);
                            console.log("Booking QUEUE DATE", response2.data.hours);
                        }
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError('An error occurred.');
                    }
                } finally {
                    setLoading(false);
                }
            };

            fetchData(); // Fetch data when the component mounts
        } else {
            alert('You need to be logged in first.');
            router.push('/login-user');
        }
        // Use an effect to update the nanny state when response1 changes
    }, [params.username, response1]);



    // const createBookingQueue = async () => {
    //     try {

    //         if (!startdate.dateTime || !enddate.dateTime) {
    //             console.error('Nanny data or selected date is missing or null.');
    //             return;
    //         }

    //         if (!nanny) {
    //             console.error('Nanny data or selected date is missing or null.');
    //             return;
    //         }


    //         const startDate = addHours(startdate.dateTime, 7);
    //         const endDate = addHours(enddate.dateTime, 7);
    //         // const username = response1.username
    //         // console.log("NANNY ID", response1.id);
    //         const bookingData: BookingQueue = {
    //             customer_id: 1,
    //             nanny_id: nanny.id,
    //             start_date: startDate,
    //             end_date: endDate,
    //             total_amount: 75.50,
    //             status_payment: 'Pending',
    //             hours: 4,
    //         };

    //         const response = await axios.post<BookingQueue>('http://localhost:9000/api/bookingqueue', bookingData);
    //         console.log('Booking created successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error creating booking:', error);
    //     }
    // };

    // const handleUpdateStatus = async () => {

    //     try {

    //         const bookingIds = bookingqueue.map((bookingqueues) => bookingqueues.id);
    //         for (const bookingId of bookingIds) {

    //             await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusPaid/${bookingId}`, {
    //                 status: 'Bookings',
    //             });

    //         }
    //     } catch (err) {
    //         if (err instanceof Error) {
    //             console.error(err.message);
    //         } else {
    //             console.error('An error occurred while updating the status.');
    //         }
    //     }
    // };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer not found.</div>;
    if (!nanny) return <div>Nanny not found.</div>;



    return (
        <div>
            <h2>Payment</h2>
            <div>

                {/* <p>Username: {customer.username}</p>
                <p>Email: {customer.email}</p>
                <p>Contact_number: {customer.contact_number}</p>

                <p>District: {customer.district}</p>
                <p>Sub_district: {customer.sub_district}</p>

                <p>Zip_code: {customer.zip_code}</p>
                <p>Street_number: {customer.street_number}</p>
                <p>Nanny ID: {nanny.id}</p> */}

                {/* <div >
                    {bookingqueue.map((bookingqueues) => (

                        <div key={bookingqueues.id}>
                            <p>ID Bookings: {bookingqueues.id}</p>

                            <p>Customer ID: {bookingqueues.customer_id}</p>
                            <p>Nanny ID: {bookingqueues.nanny_id}</p>
                            <p>Start Date: {bookingqueues.start_date.toString()}</p>
                            <p>End Date: {bookingqueues.end_date.toString()}</p>
                        </div>

                    ))}
                </div> */}

                <div>
                    <Link href={`/confirmhiring/${nanny.username}`}>
                        {/* <button onClick={() => handleUpdateStatus()}>Confirm</button> */}
                        <button >Confirm</button>
                    </Link>

                </div>
                <button onClick={handleExit}>Exit</button>
            </div>
        </div>
    );

}