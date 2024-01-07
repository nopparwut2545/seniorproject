// Import necessary modules

'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/Logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../../styles/Navbar.module.css';
import jwt_decode from 'jwt-decode';
import Head from 'next/head';
import { NavbarCollapse, NavbarToggle } from 'react-bootstrap';
import { useDebugValue, useEffect, useState } from 'react';
import axios from 'axios';
import { profile } from 'console';


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
    profile_image_url: string;
};


// Navbar component
const CustomNavbar = () => {
    const [userProfile, setUserProfile] = useState("");
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('jwt');
            if (token) {
                try {
                    const decodedToken: any = jwt_decode(token);
                    const userId: number = decodedToken.sub;

                    if (!userId) {
                        setError("User ID not found in token.");
                        setLoading(false);
                        return;
                    }

                    console.log("User ID:", userId);

                    // Fetch user profile data
                    const profileResponse = await axios.get<Customer>(
                        `http://localhost:9000/api/customers/${userId}`
                    );

                    // Check if the response is a valid Customer object
                    if (profileResponse.data) {
                        setCustomer(profileResponse.data); // setCustomer should handle the null case
                        setUserProfile(profileResponse.data.profile_image_url);
                    } else {
                        setError("Invalid user profile data");
                    }

                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setLoading(false);
                }
            }
        };

        fetchUserProfile();
    }, []);


    return (
        <>
            {/* Old Navbar */}
            <Head>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8sh+WyDHdesTI4pFhDblG9L4ZBho67M5dXlZ"
                    crossOrigin="anonymous"
                />
                <script
                    src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
                    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.7/dist/umd/popper.min.js"
                    integrity="sha384-fz1YvbB/QB2R9WRh8Fddp5qLahto4t9ouSM4nFUEcfxlKlHvZo5TCCG8OYlaP8WG"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
                    integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8sh+WyDHdesTI4pFhDblG9L4ZBho67M5dXlZ"
                    crossOrigin="anonymous"
                ></script>
            </Head>
            
            <Navbar expand="lg" variant="light">
                <div className="container">
                    <Link href="/home">
                        <a className="navbar-brand">
                            <Image
                                src={logo}
                                alt=""
                                className="img-fluid"
                                width="200"
                                height="100"
                            />
                        </a>
                    </Link>

                    <NavbarToggle aria-controls="navbarNav" />
                    <NavbarCollapse id="navbarNav">
                        <Nav className={`mx-auto ${styles.navLinks}`}>
                            <Link href="/">
                                <a style={{ fontFamily: 'Montserrat', textDecoration: 'none' }} className={`nav-link ${styles.editService}`}>Service</a>
                            </Link>
                            <Link href="/">
                                <a style={{ fontFamily: 'Montserrat' }} className={`nav-link ${styles.editService}`}>Customer Service</a>
                            </Link>
                            <Link href="/">
                                <a style={{ fontFamily: 'Montserrat' }} className={`nav-link ${styles.editService}`}>Message</a>
                            </Link>
                            <Link href="/">
                                <a style={{ fontFamily: 'Montserrat' }} className={`nav-link ${styles.editService}`}>Notification</a>
                            </Link>
                            <Link href="/">
                                {userProfile && (
                                    <div className="profile-pics">
                                        <Image
                                            src={"data:image/png;base64," + userProfile}
                                            alt="Profile"
                                            width="40"
                                            height="40"
                                            className={`${styles.circularImage}`}
                                        />
                                    </div>
                                )}
                            </Link>
                        </Nav>
                    </NavbarCollapse>
                </div>
            </Navbar>
        </>
    );
};

export default CustomNavbar;
function async() {
    throw new Error('Function not implemented.');
}

