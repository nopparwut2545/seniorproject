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
    id: number,
    booking_id: number,
    status: string,
    time_session: number
};
type Role = 'USER' | 'ADMIN' |'NANNY' ;

type DecodedToken = {
  sub: string;
  exp: number;
  a: Role[];
};

// ของเก่า 
export default function CustomersPage({ }: Props) {
   
    const [nannies, setNannies] = useState<Nanny[]>([]);

    // const [bookinghistory, setbookinghistory] = useState<BookingHistory | null>(null);
    // const [bookingqueue, setbookingqueue] = useState<BookingQueue | null>(null);

   
    const [bookingqueue, setbookingqueue] = useState<BookingQueue []>([]);
    
    const [nanny, setnanny] = useState<Nanny | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize the router

    const handleExit = () => {
        localStorage.removeItem('jwt'); // Remove the JWT token
        router.push('/login-nanny'); // Redirect to /login
    };

    

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        // Decode the JWT to extract user ID
        if (token) {
            const decodedToken: any = jwt_decode(token);
            if (!decodedToken.a.includes('NANNY')) {
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
                    const response = await axios.get<BookingQueue[]>(`http://localhost:9000/api/nannies/booking-queues/pending/${userId}`);
                    setbookingqueue(response.data);
                    setLoading(false);

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
            router.push('/login-nanny');
        }
    }, []);

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

    // const handleUpdateStatusCancle = async () => {

    //     try {

    //         const bookingIds = bookingqueue.map((bookingqueues) => bookingqueues.id);
    //         for (const bookingId of bookingIds) {

    //             await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusCancle/${bookingId}`, {
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
    const handleUpdateStatus = async (bookingId: number) => {
        try {
          await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusPaid/${bookingId}`, {
            status: 'Bookings',
          });
          window.location.reload();
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
          } else {
            console.error('An error occurred while updating the status.');
          }
        }
      };
    
      const handleUpdateStatusCancel = async (bookingId: number) => {
        try {
          await axios.put(`http://localhost:9000/api/bookingqueue/updateStatusCancle/${bookingId}`, {
            status: 'Bookings',
          });
          window.location.reload();
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

   
    if (!bookingqueue) return <div>Bookingqueue Not found {error}</div>;
    // return (
    //     <div>
    //         <div className={styles.logoweb}>
    //             {/* Display admin information */}
    //         </div>
    //         <div className={styles.Banner}>
    //             <h2>Nanny History</h2>
    //         </div>

    //         <button onClick={handleExit}>Exit</button>
    //     </div>
    // );
    // return (
    //     <div>
    //       {/* Display booking queue */}
    //       <div>
    //         <h3>Booking Queue</h3>
    //         {bookingqueue.length > 0 ? (
    //           bookingqueue.map((queue) => (
    //             <div key={queue.id}>
    //               <p>ID: {queue.id}</p>
    //               <p>Customer ID: {queue.customer_id}</p>
    //               <p>Nanny ID: {queue.nanny_id}</p>
    //               <p>Start Date: {queue.start_date.toString()}</p>
    //               <p>End Date: {queue.end_date.toString()}</p>
    //               <p>Total Amount: {queue.total_amount}</p>
    //               <p>Status Payment: {queue.status_payment}</p>
    //               <p>Hours: {queue.hours}</p>
    //               {/* Display all other properties of 'queue' */}
    //             </div>
    //           ))
    //         ) : (
    //           <p>Booking Queue data not found</p>
    //         )}
    //       </div>
    //       <button onClick={() => handleUpdateStatus()}>Confirm</button> 
    //       <button onClick={() => handleUpdateStatusCancle()}>Cancle</button> 
    //       <button onClick={handleExit}>Exit</button>
    //     </div>
    //   );
//     return (
//         <div>
//           {/* Display booking queue */}
//           <div>
//             <h3>Booking Queue</h3>
//             {bookingqueue.length > 0 ? (
//               bookingqueue.map((queue) => (
//                 <div key={queue.id}>
//                   <p>ID: {queue.id}</p>
//                   <p>Customer ID: {queue.customer_id}</p>
//                   <p>Nanny ID: {queue.nanny_id}</p>
//                   <p>Start Date: {queue.start_date.toString()}</p>
//                   <p>End Date: {queue.end_date.toString()}</p>
//                   <p>Total Amount: {queue.total_amount}</p>
//                   <p>Status Payment: {queue.status_payment}</p>
//                   <p>Hours: {queue.hours}</p>
//                   {/* Display all other properties of 'queue' */}
//                 </div>
//               ))
//             ) : (
//               <p>Booking Queue data not found</p>
//             )}
//           </div>
          
//           {/* Conditional rendering of Confirm and Cancel buttons */}
//           {bookingqueue.length > 0 && (
//             <div>
//               <button onClick={() => handleUpdateStatus()}>Confirm</button>
//               <button onClick={() => handleUpdateStatusCancle()}>Cancel</button>
//             </div>
//           )}
      
//           <button onClick={handleExit}>Exit</button>
//         </div>
//       );
      
// }
return (
    <div>
      <div>
        <h3>Booking Queue</h3>
        {bookingqueue.length > 0 ? (
          bookingqueue.map((queue) => (
            <div key={queue.id}>
              <p>ID: {queue.id}</p>
              <p>Customer ID: {queue.customer_id}</p>
              <p>Nanny ID: {queue.nanny_id}</p>
              <p>Start Date: {queue.start_date.toString()}</p>
              <p>End Date: {queue.end_date.toString()}</p>
              <p>Total Amount: {queue.total_amount}</p>
              <p>Status Payment: {queue.status_payment}</p>
              <p>Hours: {queue.hours}</p>

              <div>
                <button onClick={() => handleUpdateStatus(queue.id)}>Confirm</button>
                <button onClick={() => handleUpdateStatusCancel(queue.id)}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p>No Notifications</p>
        )}
      </div>

      <button onClick={handleExit}>Exit</button>
    </div>
  );
}

