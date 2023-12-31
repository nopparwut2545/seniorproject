'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FC } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DateTimePicker from 'react-datetime-picker';
import { add, format } from "date-fns"
import { addHours } from 'date-fns';
import { useRouter } from 'next/navigation';
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

    customer_id: number,
    nanny_id: number,
    start_date: Date;
    end_date: Date;
    total_amount: number,
    status_payment: string,
    hours: number
};


type BookingQueuetest = {
    id: number;
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
    const [checkbk, setCheckbk] = useState<BookingQueuetest | null>(null); // Initialize as null

    const [checkbktest, setCheckbktest] = useState<BookingQueuetest[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [value, onChange] = useState<Value>(new Date());
    const [response1, setResponse1] = useState<Nanny | null>(null);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedTime2, setSelectedTime2] = useState<Date | null>(null);
    const [startdate, setstartDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })

    const [enddate, setEndtDate] = useState<DateType>({
        justDate: null,
        dateTime: null,
    })

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
                    const response1 = await axios.get<Nanny>(`http://localhost:9000/api/nannies/getbyusername/${params.username}`);

                    setCustomer(response.data);
                    setNanny(response1.data);


                    // const response2 = await axios.get<BookingQueuetest>(`http://localhost:9000/api/bookingqueue/getbookingstestdate/${response1.data.id}`);
                    // setCheckbk(response2.data);
                    // console.log("Booking DATA", response2.data);

                    const response3 = await axios.get(`http://localhost:9000/api/bookingqueue/getbookingstestdate/${response1.data.id}`);
                    setCheckbktest(response3.data);
                    console.log("Booking DATA TEST", response3.data);

                    console.log("All DATA", response1.data);
                    console.log("Nanny DATA", response1.data.email);

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

    //         // for (const booking of checkbktest) {
    //         //     const bookingStartDate = new Date(booking.start_date);
    //         //     const bookingEndDate = new Date(booking.end_date);

    //         //     if (
    //         //         (startdate.dateTime >= bookingStartDate && startdate.dateTime <= bookingEndDate) ||
    //         //         (enddate.dateTime >= bookingStartDate && enddate.dateTime <= bookingEndDate)
    //         //     ) {
    //         //         return false; // Dates overlap with an existing booking
    //         //     }
    //         // }


    //         const startDate = addHours(startdate.dateTime, 7);
    //         const endDate = addHours(enddate.dateTime, 7);
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
    const isDateOverlapping = (startDate: Date, endDate: Date, bookings: BookingQueuetest[]): boolean => {
        for (const booking of bookings) {
            const bookingStartDate = new Date(booking.start_date);
            const bookingEndDate = new Date(booking.end_date);

            if (
                (startDate.getTime() == bookingStartDate.getTime()) ||
                (endDate.getTime() == bookingEndDate.getTime())
            ) {
                return true; // Dates overlap with an existing booking
            }
        }
        return false; // No overlap found
    };

    const isDateInPast = (date: Date): boolean => {
        const currentDate = new Date(); // Get the current date and time
        return date.getTime() < currentDate.getTime();
    };

    const createBookingQueue = async (): Promise<void> => {
        try {
            if (!startdate.dateTime || !enddate.dateTime) {
                console.error('Nanny data or selected date is missing or null.');
                return;
            }

            if (!nanny) {
                console.error('Nanny data is missing or null.');
                return;
            }
            if (!customer) {
                console.error('Customer data is missing or null.');
                return;
            }

            if (isDateInPast(startdate.dateTime) || isDateInPast(enddate.dateTime)) {
                alert('Selected dates are in the past. Please choose future dates.');
                return;
            }

            const startDate = addHours(startdate.dateTime, 7);
            const endDate = addHours(enddate.dateTime, 7);

            // Check for date overlap
            for (const booking of checkbktest) {
                const bookingStartDate = new Date(booking.start_date);
                const bookingEndDate = new Date(booking.end_date);

                if (
                    (startDate.getTime() >= endDate.getTime()) ||
                    (startDate.getTime() >= bookingStartDate.getTime() && startDate.getTime() <= bookingEndDate.getTime()) ||
                    (endDate.getTime() >= bookingStartDate.getTime() && endDate.getTime() <= bookingEndDate.getTime())
                ) {
                    alert('Selected dates overlap with existing bookings. Please choose different dates.');
                    return; // Dates overlap with an existing booking
                }

            }

            // If no overlap found, create the booking
            const bookingData: BookingQueue = {
                customer_id: customer.id,
                nanny_id: nanny.id,
                start_date: startDate,
                end_date: endDate,
                total_amount: 75.50,
                status_payment: 'Pending',
                hours: 4,
            };

            const response = await axios.post<BookingQueue>('http://localhost:9000/api/bookingqueue', bookingData);
            console.log('Booking created successfully:', response.data);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer not found.</div>;
    if (!nanny) return <div>Nanny not found.</div>;

    // if (!checkbk) return <div>BKK Test not found.</div>;

    if (!checkbktest) return <div>BKK Test not found 2.</div>;
    // return (
    //     <div>
    //         <div className="block justify-center">
    //             <div className="flex justify-center">
    //                 <h2>Hiring Date</h2>
    //             </div>
    //             <p>createBookingQueues</p>
    //             {/* <div className='h-screen flex flex-col justify-center items-center'> */}
    //             {startdate.justDate ? (
    //                 <div>
    //                     <div className='flex gap-4'>
    //                         {starttimes?.map((time, i) => (
    //                             <div key={`time-${i}`} className='rounded-sm bg-grey-100 p-2'>
    //                                 <button
    //                                     type='button'
    //                                     onClick={() => setstartDate((prev) => ({ ...prev, dateTime: time }))}
    //                                 >
    //                                     {format(time, 'kk:mm')}
    //                                 </button>
    //                             </div>
    //                         ))}
    //                     </div>

    //                 </div>
    //             ) : (
    //                 <DateTimePicker
    //                     className='REACT-CALENDAR p-2'
    //                     onChange={onChange}
    //                     value={value}
    //                     view='month'
    //                     onClickDay={(date) => {
    //                         setstartDate((prev) => ({ ...prev, justDate: date }));
    //                         console.log("Selected Date:", date); // Access the selected date here
    //                     }}
    //                 />
    //             )}
    //             {/* </div> */}

    //             {/* ------------------------------------------------------------ */}

    //             {/* <div className='h-screen flex flex-col justify-center items-center'> */}
    //             {enddate.justDate ? (
    //                 <div>
    //                     <div className='flex gap-4'>
    //                         {endtimes?.map((time, i) => (
    //                             <div key={`time-${i}`} className='rounded-sm bg-grey-100 p-2'>
    //                                 <button
    //                                     type='button'
    //                                     onClick={() => setEndtDate((prev) => ({ ...prev, dateTime: time }))}
    //                                 >
    //                                     {format(time, 'kk:mm')}
    //                                 </button>
    //                             </div>
    //                         ))}
    //                     </div>

    //                 </div>
    //             ) : (
    //                 <DateTimePicker
    //                     className='REACT-CALENDAR p-2'
    //                     onChange={onChange}
    //                     value={value}
    //                     view='month'
    //                     onClickDay={(date) => {
    //                         setEndtDate((prev) => ({ ...prev, justDate: date }));
    //                         console.log("Selected Date:", date); // Access the selected date here
    //                     }}
    //                 />
    //             )}
    //             {/* </div> */}

    //             <p>Username: {customer.username}</p>
    //             <p>Email: {customer.email}</p>
    //             <p>Contact_number: {customer.contact_number}</p>

    //             <p>District: {customer.district}</p>
    //             <p>Sub_district: {customer.sub_district}</p>

    //             <p>Zip_code: {customer.zip_code}</p>
    //             <p>Street_number: {customer.street_number}</p>
    //             <p>Nanny ID: {nanny.id}</p>
    //             {/* ... display other nanny information here */}

    //             {/* <p>Booking Check Start Date: {checkbk.start_date.toString()}</p>
    //             <p>Booking Check End Date: {checkbk.end_date.toString()}</p> */}

    //             {checkbktest.map((nanny) => (

    //                 <div key={nanny.id}>
    //                     <p>Booking Check ID TEST: {nanny.id}</p>
    //                     <p>Booking Check Start Date TEST: {nanny.start_date.toString()}</p>
    //                     <p>Booking Check End Date TEST: {nanny.end_date.toString()}</p>
    //                     <p>Booking Check ID TEST: {nanny.status_payment}</p>
    //                 </div>

    //             ))}

    //             <button onClick={() => createBookingQueue()}>Confirm</button>
    //             <Link href={`/payment/${nanny.username}`}>
    //                 Next
    //             </Link>
    //             <button onClick={handleExit}>Exit</button>
    //         </div>
    //     </div>
    // );
    // return (
    //     <div>
    //       <div className="block justify-center">
    //         <div className="flex justify-center">
    //           <h2>Hiring Date</h2>
    //         </div>
    //         <p>createBookingQueues</p>

    //         {startdate.justDate ? (
    //           <div>
    //             <div className="flex gap-4">
    //               {starttimes?.map((time, i) => (
    //                 <div
    //                   key={`time-${i}`}
    //                   className={`rounded-sm p-2 ${
    //                     selectedTime &&
    //                     selectedTime.getTime() === time.getTime()
    //                       ? 'bg-blue-500 text-white' // Change background color on selection
    //                       : 'bg-gray-100'
    //                   }`}
    //                 >
    //                   <button
    //                     type="button"
    //                     onClick={() => {
    //                       setstartDate((prev) => ({ ...prev, dateTime: time }));
    //                       setSelectedTime(time); // Update selected time
    //                     }}
    //                   >
    //                     {format(time, 'kk:mm')}
    //                   </button>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ) : (
    //           <DateTimePicker
    //             className="REACT-CALENDAR p-2"
    //             onChange={onChange}
    //             value={value}
    //             view="month"
    //             onClickDay={(date) => {
    //               setstartDate((prev) => ({ ...prev, justDate: date }));
    //               console.log('Selected Date:', date); // Access the selected date here
    //             }}
    //           />
    //         )}

    //         {enddate.justDate ? (
    //           <div>
    //             <div className="flex gap-4">
    //               {endtimes?.map((time, i) => (
    //                 <div
    //                   key={`time-${i}`}
    //                   className={`rounded-sm p-2 ${
    //                     selectedTime &&
    //                     selectedTime.getTime() === time.getTime()
    //                       ? 'bg-blue-500 text-white' // Change background color on selection
    //                       : 'bg-gray-100'
    //                   }`}
    //                 >
    //                   <button
    //                     type="button"
    //                     onClick={() => {
    //                       setEndtDate((prev) => ({ ...prev, dateTime: time }));
    //                       setSelectedTime(time); // Update selected time
    //                     }}
    //                   >
    //                     {format(time, 'kk:mm')}
    //                   </button>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ) : (
    //           <DateTimePicker
    //             className="REACT-CALENDAR p-2"
    //             onChange={onChange}
    //             value={value}
    //             view="month"
    //             onClickDay={(date) => {
    //               setEndtDate((prev) => ({ ...prev, justDate: date }));
    //               console.log('Selected Date:', date); // Access the selected date here
    //             }}
    //           />
    //         )}

    //         <p>Username: {customer.username}</p>
    //         <p>Email: {customer.email}</p>
    //         <p>Contact_number: {customer.contact_number}</p>

    //         <p>District: {customer.district}</p>
    //         <p>Sub_district: {customer.sub_district}</p>

    //         <p>Zip_code: {customer.zip_code}</p>
    //         <p>Street_number: {customer.street_number}</p>
    //         <p>Nanny ID: {nanny.id}</p>

    //         {checkbktest.map((nanny) => (
    //           <div key={nanny.id}>
    //             <p>Booking Check ID TEST: {nanny.id}</p>
    //             <p>Booking Check Start Date TEST: {nanny.start_date.toString()}</p>
    //             <p>Booking Check End Date TEST: {nanny.end_date.toString()}</p>
    //             <p>Booking Check ID TEST: {nanny.status_payment}</p>
    //           </div>
    //         ))}

    //         <button onClick={() => createBookingQueue()}>Confirm</button>
    //         <Link href={`/payment/${nanny.username}`}>Next</Link>
    //         <button onClick={handleExit}>Exit</button>
    //       </div>
    //     </div>
    //   );


    // return (
    //     <div>
    //       <div className="block justify-center">
    //         <div className="flex justify-center">
    //           <h2 className="text-2xl font-bold">Hiring Date</h2>
    //         </div>
    //         <p className="text-lg">Create Booking Queues</p>

    //         {startdate.justDate ? (
    //           <div>
    //             <div className="flex gap-4">
    //               {starttimes?.map((time, i) => (
    //                 <div key={`time-${i}`} className="rounded-md bg-gray-200 p-2">
    //                   <button
    //                     type="button"
    //                     onClick={() =>
    //                       setstartDate((prev) => ({ ...prev, dateTime: time }))
    //                     }
    //                   >
    //                     {format(time, 'kk:mm')}
    //                   </button>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ) : (
    //           <DateTimePicker
    //             className="REACT-CALENDAR p-2"
    //             onChange={onChange}
    //             value={value}
    //             view="month"
    //             onClickDay={(date) => {
    //               setstartDate((prev) => ({ ...prev, justDate: date }));
    //               console.log('Selected Date:', date);
    //             }}
    //           />
    //         )}

    //         {enddate.justDate ? (
    //           <div>
    //             <div className="flex gap-4">
    //               {endtimes?.map((time, i) => (
    //                 <div key={`time-${i}`} className="rounded-md bg-gray-200 p-2">
    //                   <button
    //                     type="button"
    //                     onClick={() =>
    //                       setEndtDate((prev) => ({ ...prev, dateTime: time }))
    //                     }
    //                   >
    //                     {format(time, 'kk:mm')}
    //                   </button>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ) : (
    //           <DateTimePicker
    //             className="REACT-CALENDAR p-2"
    //             onChange={onChange}
    //             value={value}
    //             view="month"
    //             onClickDay={(date) => {
    //               setEndtDate((prev) => ({ ...prev, justDate: date }));
    //               console.log('Selected Date:', date);
    //             }}
    //           />
    //         )}

    //         <p className="mt-4">Username: {customer.username}</p>
    //         <p>Email: {customer.email}</p>
    //         <p>Contact Number: {customer.contact_number}</p>

    //         <p>District: {customer.district}</p>
    //         <p>Sub-district: {customer.sub_district}</p>

    //         <p>Zip Code: {customer.zip_code}</p>
    //         <p>Street Number: {customer.street_number}</p>
    //         <p>Nanny ID: {nanny.id}</p>

    //         {checkbktest.map((nanny) => (
    //           <div key={nanny.id} className="mt-4">
    //             <p>Booking Check ID TEST: {nanny.id}</p>
    //             <p>Booking Check Start Date TEST: {nanny.start_date.toString()}</p>
    //             <p>Booking Check End Date TEST: {nanny.end_date.toString()}</p>
    //             <p>Booking Check ID TEST: {nanny.status_payment}</p>
    //           </div>
    //         ))}

    //         <button
    //           className="bg-blue-500 text-white p-2 mt-4"
    //           onClick={() => createBookingQueue()}
    //         >
    //           Confirm
    //         </button>
    //         <Link href={`/payment/${nanny.username}`} passHref>
    //           <a className="text-blue-500 underline ml-2">Next</a>
    //         </Link>
    //         <button
    //           className="bg-gray-500 text-white p-2 ml-2"
    //           onClick={handleExit}
    //         >
    //           Exit
    //         </button>
    //       </div>
    //     </div>
    //   );


    return (
        <div>
            <div className="block justify-center">
                <div className="mt-5 text-center text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl font-bold">
                    <span style={{ fontFamily: 'Montserrat', }} className="text-white">Hiring Date</span>
                </div>


                <p style={{ fontFamily: 'Montserrat', }} className="mt-5 mb-5 text-white text-center text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-semibold">
                    Create Booking Queues
                </p>

                <div className="mb-5 flex justify-center">
                    {startdate.justDate ? (
                        <div className='justify-items-center'>
                            {starttimes?.map((time, i) => (
                                <div
                                    key={`time-${i}`}
                                    className={`rounded-md bg-gray-200 p-2 ${selectedTime && selectedTime.getTime() === time.getTime()
                                        ? 'bg-blue-500 text-white' // Change background color on selection
                                        : ''
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setstartDate((prev) => ({ ...prev, dateTime: time }));
                                            setSelectedTime(time); // Update selected time
                                        }}
                                    >
                                        {format(time, 'kk:mm')}
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-gray-500 text-white p-2 mt-2"
                                onClick={() => {
                                    setstartDate((prev) => ({ ...prev, justDate: null }));
                                    setSelectedTime(null);
                                }}
                            >
                                Clear Selection
                            </button>
                        </div>
                    ) : (
                        <DateTimePicker
                            className="REACT-CALENDAR p-2 justify-items-center"
                            onChange={onChange}
                            value={value}
                            view="month"
                            onClickDay={(date) => {
                                setstartDate((prev) => ({ ...prev, justDate: date }));
                                console.log('Selected Date:', date);
                            }}
                        />
                    )}
                </div>

                <div className="mb-5 flex justify-center">
                    {enddate.justDate ? (
                        <div>
                            <div className="flex gap-4 justify-items-center">
                                {endtimes?.map((time, i) => (
                                    <div
                                        key={`time-${i}`}
                                        className={`rounded-md bg-gray-200 p-2 ${selectedTime2 && selectedTime2.getTime() === time.getTime()
                                            ? 'bg-blue-500 text-white' // Change background color on selection
                                            : ''
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEndtDate((prev) => ({ ...prev, dateTime: time }));
                                                setSelectedTime2(time); // Update selected time
                                            }}
                                        >
                                            {format(time, 'kk:mm')}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="bg-gray-500 text-white p-2 mt-2"
                                onClick={() => {
                                    setEndtDate((prev) => ({ ...prev, justDate: null }));
                                    setSelectedTime2(null);
                                }}
                            >
                                Clear Selection
                            </button>
                        </div>
                    ) : (
                        <DateTimePicker
                            className="REACT-CALENDAR p-2 justify-items-center"
                            onChange={onChange}
                            value={value}
                            view="month"
                            onClickDay={(date) => {
                                setEndtDate((prev) => ({ ...prev, justDate: date }));
                                console.log('Selected Date:', date);
                            }}
                        />
                    )}
                </div>
            </div>
            <div className='p-4 bg-slate-500 text-center m-10 rounded-xl'>
                <p style={{ fontFamily: 'Montserrat', }} className="mt-5 mb-5 text-white text-center text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl font-semibold">
                    User Information
                </p>
                <div className='p-2 bg-red-400 text-center m-10 rounded-xl'>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Username: {customer.username}</p>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Email: {customer.email}</p>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Contact Number: {customer.contact_number}</p>

                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>District: {customer.district}</p>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Sub-district: {customer.sub_district}</p>

                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Zip Code: {customer.zip_code}</p>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Street Number: {customer.street_number}</p>
                    <p style={{ fontFamily: 'Montserrat', color: 'white' }}>Nanny ID: {nanny.id}</p>

                    {checkbktest.map((nanny) => (
                        <div key={nanny.id} className="mt-4">
                            <p>Booking Check ID TEST: {nanny.id}</p>
                            <p>Booking Check Start Date TEST: {nanny.start_date.toString()}</p>
                            <p>Booking Check End Date TEST: {nanny.end_date.toString()}</p>
                            <p>Booking Check ID TEST: {nanny.status_payment}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex justify-center p-4'>
                <button
                    className="bg-blue-500 text-white mx-2"
                    onClick={() => createBookingQueue()}
                >
                    Confirm
                </button>
                <Link href={`/payment/${nanny.username}`} passHref>
                    <a className="text-blue-500 underline mx-2">Next</a>
                </Link>
                <button
                    className="bg-gray-500 text-white mx-2"
                    onClick={handleExit}
                >
                    Exit
                </button>
            </div>
        </div>
    );
}