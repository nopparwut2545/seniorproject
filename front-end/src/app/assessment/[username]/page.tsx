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
    const [customer, setCustomer] = useState<Customer | null>(null); // Initialize as null
    const [nanny, setNanny] = useState<Nanny | null>(null); // Initialize as null

    const [bookingqueuehistory, setBookingqueuehistory] = useState<BookingHistory | null>(null); // Initialize as null
    const [bookingqueue, setBookingqueue] = useState<BookingQueue[]>([]);

    const [bookingqueue2, setBookingqueue2] = useState<BookingQueue | null>(null); // Initialize as null

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [value, onChange] = useState<Value>(new Date());
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

    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [otherOption, setOtherOption] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string>('');

    const handleSuggestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestions(event.target.value);
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (optionValue === 'other') {
            setOtherOption('');
        }

        setSelectedOptions((prevSelectedOptions) => {
            if (isChecked) {
                return [...prevSelectedOptions, optionValue];
            } else {
                return prevSelectedOptions.filter((option) => option !== optionValue);
            }
        });
    };
    const [selectedOption2, setSelectedOption2] = useState<string>('');

    const handleOptionChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption2(event.target.value);
    };

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
            await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusPaidSuccess/${bookingqueue2.id}`, {
                status: 'Success',
            });

            await axios.put(`http://localhost:9000/api/bookinghistory/updatestatuscomplete/${bookingqueue2.id}`, {
                status: 'Completed',
            });


        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error('An error occurred while updating the status.');
            }
        }
    };

    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newScoreValue = parseFloat(e.target.value);
        setNewScore(newScoreValue);
    };

    const handleUpdateScore = async () => {
        if (newScore === null) {
            console.error('New score is missing or invalid.');
            return;
        }
        if (!nanny) return <div>Nanny not found.</div>;
        try {

            const response = await axios.put(`http://localhost:9000/api/nannies/updateScore/${nanny.id}`, newScore, {
                params: {
                    newScore: newScore,
                },
            });

            // Handle the API response here, e.g., show a success message
            console.log('Nanny score updated successfully:', response.data);

            // Optionally, you can update the local state with the new score if needed
            // Example: setNanny({ ...nanny, score: newScore });

        } catch (error) {
            // Handle API error, e.g., show an error message
            console.error('Error updating nanny score:', error);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    if (!customer) return <div>Customer not found.</div>;
    if (!nanny) return <div>Nanny not found.</div>;

    if (!bookingqueuehistory) return <div>Bookingqueuehistory not found.</div>;

    return (

        < div >
            <h2>Confirm Hiring</h2>
            <div>
                <div>
                    <label>For what purpose did you hire a babysitter? (Select multiple options)</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="babysitting"
                                checked={selectedOptions.includes('babysitting')}
                                onChange={handleOptionChange}
                            />
                            Babysitting while working
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="learning"
                                checked={selectedOptions.includes('learning')}
                                onChange={handleOptionChange}
                            />
                            Assisting with learning and skill development
                        </label>
                    </div>

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                value="other"
                                checked={selectedOptions.includes('other')}
                                onChange={handleOptionChange}
                            />
                            Other (please specify):
                        </label>
                    </div>

                    {selectedOptions.includes('other') && (
                        <div>
                            <input
                                type="text"
                                placeholder="Insert text here" // Placeholder text
                                disabled={!selectedOptions.includes('other')}
                                value={selectedOptions.includes('other') ? otherOption : ''}
                                onChange={(event) => setOtherOption(event.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label>How do you think hiring a babysitter helps in taking care of and developing your child? (Choose one)</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="childCareOption"
                                value="creativePlay"
                                checked={selectedOption2 === 'creativePlay'}
                                onChange={handleOptionChange2}
                            />
                            Provides time for the child to learn and play creatively
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="childCareOption"
                                value="safeNurtured"
                                checked={selectedOption2 === 'safeNurtured'}
                                onChange={handleOptionChange2}
                            />
                            Makes the child feel safe and nurtured
                        </label>
                    </div>
                </div>

                <div>
                    <label>Do you have any suggestions or recommendations for improving the babysitting service?</label>
                    <div>
                        <input
                            type="text"
                            value={suggestions}
                            onChange={handleSuggestionsChange}
                            placeholder="Your suggestions..."
                        />
                    </div>
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

                    <button onClick={() => handleUpdateStatus()}>Finish</button>
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
                {/* 
                <div>
                    <label htmlFor="newScore">New Score:</label>
                    <input
                        type="number"
                        id="newScore"
                        name="newScore"
                        value={newScore !== null ? newScore.toString() : ''}
                        onChange={handleScoreChange}
                        step="0.01" // If you allow decimal scores
                    />

                    <Link href={`/successfullyhiring/${nanny.username}`}>
                        <button onClick={handleUpdateScore}>Update Score</button>
                    </Link>

                   
                </div> */}
                <div>
                    <label htmlFor="newScore">New Score:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="newScore1"
                                name="newScore"
                                value="1"
                                checked={newScore === 1}
                                onChange={handleScoreChange}
                            />
                            1
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="newScore2"
                                name="newScore"
                                value="2"
                                checked={newScore === 2}
                                onChange={handleScoreChange}
                            />
                            2
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="newScore3"
                                name="newScore"
                                value="3"
                                checked={newScore === 3}
                                onChange={handleScoreChange}
                            />
                            3
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="newScore4"
                                name="newScore"
                                value="4"
                                checked={newScore === 4}
                                onChange={handleScoreChange}
                            />
                            4
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                id="newScore5"
                                name="newScore"
                                value="5"
                                checked={newScore === 5}
                                onChange={handleScoreChange}
                            />
                            5
                        </label>
                    </div>
                    <Link href={`/reportconclusion/${nanny.username}`}>
                        <button onClick={handleUpdateScore}>Update Score</button>
                    </Link>
                </div>
            </div>
            <button onClick={handleExit}>Exit</button>
        </div >
    );

}