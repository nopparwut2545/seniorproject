'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import { add, format, parseISO, addHours } from "date-fns"
import { useRouter } from 'next/navigation'
import jwt_decode from 'jwt-decode';
import nanny1 from '../../../../assets/hanni.png'
import Image from 'next/image';

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

type BookingHistory = {
    booking_id: number,
    status: string,
    time_session: number
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

    const [bookingqueuehistory, setBookingqueuehistory] = useState<BookingHistory | null>(null); // Initialize as null
    const [bookingqueue, setBookingqueue] = useState<BookingQueue[]>([]);

    const [bookingqueue2, setBookingqueue2] = useState<BookingQueue | null>(null); // Initialize as null

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
                            const response2 = await axios.get<BookingQueue[]>(`http://localhost:9000/api/bookingqueue/getbookings/${response.data.id}/${response1.data.id}`);
                            setBookingqueue(response2.data);
                            console.log("All DATA Booking ", response2.data);
                            // Loop through bookingqueue and create BookingHistory for each booking

                            const response4 = await axios.get<BookingQueue>(`http://localhost:9000/api/bookingqueue/getbookingsteststatus/${response.data.id}/${response1.data.id}`);
                            setBookingqueue2(response4.data);
                            console.log("All DATA Booking TEST STATUS ", response4.data);
                            console.log("All DATA Booking TEST STATUS ", response4.data.id);
                            // for (const booking of response2.data) {

                            const response3 = await axios.get<BookingHistory>(`http://localhost:9000/api/bookinghistory/getbybookingid/${response4.data.id}`);
                            setBookingqueuehistory(response3.data);
                            //   console.log("Booking ID:", response3.data.booking_id);
                            console.log("All DATA Booking History", response3.data);
                            // }
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

    // Confirm Hiring เป็นหน้ากดปุ่ม Confirm เพื่อ post ข้อมูล ลง Booking History เพื่อไปเรียกใช้ ในหน้า success fully hiring

    // const createBookingHistory = async () => {
    //     try {
    //         if (!nanny) {
    //             console.error('Nanny data is missing or null.');
    //             return;
    //         }

    //         const bookingIds = bookingqueue.map((bookingqueues) => bookingqueues.id);

    //         for (const bookingId of bookingIds) {
    //             const bookingHistory = {
    //                 booking_id: bookingId,
    //                 status: "Completed",
    //                 time_session: 5
    //             };

    //             const response = await axios.post<BookingHistory>('http://localhost:9000/api/bookinghistory', bookingHistory);
    //             console.log('Booking history created successfully for booking ID:', bookingId);
    //         }
    //     } catch (error) {
    //         console.error('Error creating booking history:', error);
    //     }
    // };
    const handleUpdateStatus = async () => {
        try {

            if (!bookingqueue2) return <div>Bookingqueuehistory not found.</div>;
            console.log(bookingqueue2?.id)
            // await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusPaidSuccess/${bookingqueue2.id}`, {
            //     status: 'Success',
            // });


        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('An error occurred while updating the status.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer not found.</div>;
    if (!nanny) return <div>Nanny not found.</div>;

    if (!bookingqueuehistory) return <div>Bookingqueuehistory not found.</div>;

    return (

        < div >
            <div className="block justify-center">
                <div className="flex justify-center">
                    <h2>Confirm Hiring</h2>
                </div>
                <div className="bg-white bg-opacity-40 p-5 rounded-2xl shadow-lg md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="mb-4 md:mr-4">
                            <Image src={nanny1} alt="" width={200} height={150} layout="fixed" />
                        </div>
                        <div className="ml-5">
                        <p>Username: {customer.username}</p>
                        <p>Email: {customer.email}</p>
                        <p>Contact_number: {customer.contact_number}</p>

                        <p>District: {customer.district}</p>
                        <p>Sub_district: {customer.sub_district}</p>

                        <p>Zip_code: {customer.zip_code}</p>
                        <p>Street_number: {customer.street_number}</p>
                        <p>Nanny ID: {nanny.id}</p>

                        <p>Username: {nanny.username}</p>
                        <p>Name: {nanny.first_name}  {nanny.last_name}</p>
                        <p>Location: {customer.district}</p>
                        <p>Email: {nanny.email}</p>
                        <p>Contact Number: {nanny.contact_number}</p>
                        <p>Total: {nanny.cost}  baht</p>
                        <p>Total: {nanny.type_work}</p>
                        <p>Role: {nanny.role_level}</p>

                        <div>
                            {bookingqueue.map((bookingqueues) => (
                                bookingqueues.status_payment === 'Paid' && (
                                    <div key={bookingqueues.id}>
                                        <p>ID Bookings: {bookingqueues.id}</p>
                                        <p>Hours: {bookingqueues.hours}</p>
                                        <p>Customer ID: {bookingqueues.customer_id}</p>
                                        <p>Nanny ID: {bookingqueues.nanny_id}</p>
                                        <p>Start Date: {bookingqueues.start_date.toString()}</p>
                                        <p>End Date: {bookingqueues.end_date.toString()}</p>
                                    </div>
                                )
                            ))}
                        </div>
                        </div>
                        <div className="ml-5" >
                            {/* <Link href={`/successfullyhiring/${nanny.username}`}>
                        <button >Set Inactive</button>
                    </Link> */}

                            <p>booking_id: {bookingqueuehistory.booking_id}</p>
                            <p>status: {bookingqueuehistory.status}</p>
                            <p>time_session: {bookingqueuehistory.time_session}</p>

                            <button onClick={() => handleUpdateStatus()}>createBookingHistory</button>
                            {/* <button onClick={() => createBookingHistory()}>createBookingHistory</button> */}

                            <Link href={`/assessment/${nanny.username}`}>
                                <button >End</button>
                            </Link>

                        </div>
                    </div>

                </div>
                <button onClick={handleExit}>Exit</button>
            </div>
        </div >
    );

}