'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import { add, format, parseISO, addHours } from "date-fns"

import * as fs from 'fs';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation'
import jwt_decode from 'jwt-decode';

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
};

type Customertest = {

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
};

type Nannytest = {

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

    type_work: string;
    status: string;

    gender: string;

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

    const [customertest, setCustomertest] = useState<Customertest | null>(null);
    const [nannytest, setNannytest] = useState<Nannytest | null>(null);

    const [customer, setCustomer] = useState<Customer | null>(null); // Initialize as null
    const [nanny, setNanny] = useState<Nanny | null>(null); // Initialize as null

    const [bookingqueuehistory, setBookingqueuehistory] = useState<BookingHistory | null>(null); // Initialize as null
    const [bookingqueue, setBookingqueue] = useState<BookingQueue[]>([]);

    const [bookingqueue2, setBookingqueue2] = useState<BookingQueue | null>(null); // Initialize as null

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [response1, setResponse1] = useState<Nanny | null>(null);

    const [newScore, setNewScore] = useState<number | null>(null);

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
                        setCustomertest(response.data);
                        setNannytest(response1.data);

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

    const handleUpdateStatus = async () => {
        try {

            if (!bookingqueue2) return <div>Bookingqueuehistory not found.</div>;
            console.log(bookingqueue2?.id)
            await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusPaidSuccess/${bookingqueue2.id}`, {
                status: 'Success',
            });

            await axios.put(`http://localhost:9000/api/bookinghistory/updatestatuscomplete/${bookingqueue2.id}`, {
                status: 'Completed',
            });
            router.push('/hiring');

        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('An error occurred while updating the status.');
            }
        }
    };

    const handleDownloadData = (startDate: string, endDate: string) => {
        // Create a new PDF document
        const doc = new jsPDF();

        if (!customer || !nanny || !customertest || !nannytest || !startDate || !endDate) {
            // Handle case when data is missing
            doc.text('Customer or Nanny data not found.', 10, 20);
        } else {
            // Define the table headers and data
            const headers = ['Field', 'Customer', 'Nanny'];
            const data = [
                ['Username', customertest.username, nannytest.username],
                ['Email', customertest.email, nannytest.email],
                ['Start Date', startDate],
                ['End Date', endDate],
                // Add more rows and columns as needed
            ];

            // Set the position and size of the table
            const tableX = 10;
            let tableY = 40; // Update tableY to start below the headers
            const tableWidth = 180;

            // Set the position and size of individual cells
            const cellMargin = 2;
            const cellWidth = tableWidth / headers.length;
            const cellHeight = 10;

            // Add headers to the PDF
            doc.setFont('helvetica'); // Use 'helvetica' font
            doc.setFontSize(12);

            headers.forEach((header, index) => {
                doc.text(header, tableX + index * cellWidth, tableY);
            });

            data.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    const cellX = tableX + cellIndex * cellWidth;
                    const cellY = tableY + (rowIndex + 1) * cellHeight;
                    doc.text(cell.toString(), cellX, cellY);
                });
            });
        }

        // Save the PDF as a Blob
        const pdfBlob = doc.output('blob');

        // Create a download link for the PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(pdfBlob);
        downloadLink.download = 'customer_nanny_data.pdf';

        // Simulate a click to trigger the download
        downloadLink.click();
    };





    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer not found.</div>;
    if (!nanny) return <div>Nanny not found.</div>;

    if (!bookingqueuehistory) return <div>Bookingqueuehistory not found.</div>;

    return (

        < div >
            <h2>Report Conclusion</h2>
            <div>

                <div>
                    {/* ... (your existing JSX code) */}

                </div>

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
                                {/* <p>Start Date: {format(parseISO(bookingqueues.start_date.toString()), "yyyy-MM-dd HH:mm:ss")}</p>
                            <p>End Date: {format(parseISO(bookingqueues.end_date.toString()), "yyyy-MM-dd HH:mm:ss")}</p> */}
                                <button onClick={() => handleDownloadData(bookingqueues.start_date.toString(), bookingqueues.end_date.toString())}>Download Customer and Nanny Data</button>
                            </div>
                        )
                    ))}
                </div>

                <div>
                    {/* <Link href={`/successfullyhiring/${nanny.username}`}>
                        <button >Set Inactive</button>
                    </Link> */}

                    <p>booking_id: {bookingqueuehistory.booking_id}</p>
                    <p>status: {bookingqueuehistory.status}</p>
                    <p>time_session: {bookingqueuehistory.time_session}</p>

                    <button onClick={() => handleUpdateStatus()}>Set</button>
                    {/* <button onClick={() => createBookingHistory()}>createBookingHistory</button> */}

                    {/* <Link href={`/successfullyhiring/${nanny.username}`}>
                        <button >End</button>
                    </Link> */}

                    <form >
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                // value={formData.name}
                                // onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                // value={formData.email}
                                // onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit">Submit</button>
                    </form>

                </div>
                <button onClick={handleExit}>Exit</button>

            </div>
        </div >
    );

}