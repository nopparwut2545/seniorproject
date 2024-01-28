'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/Logo.png';
import { Menu } from '@headlessui/react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from '../../styles/Navbar.module.css';
import jwt_decode from 'jwt-decode';
import 'tailwindcss/tailwind.css';
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

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
        <div className={styles.rootContainer}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Link href="/">
                        <a>
                            <Image src={logo}
                                alt={'logo-webapp'}
                                className={`${styles.pics}`}
                                width={250}
                                height={180}
                            />
                        </a>
                    </Link>
                </div>
                <div className={styles.services}>
                    <Link href="/home">
                        <a className={styles.service}>Service</a>
                    </Link>
                    <Link href="/customerservice">
                        <a className={styles.service}>Help</a>
                    </Link>
                    {/* <Link href="/service3">
                        <a className={styles.service}>Service 3</a>
                    </Link> */}
                    <Link href="/home">
                        <a className={styles.service}>Notification</a>
                    </Link>
                    {userProfile && (
                            <div className={`${styles.menu}`}>
                                <Image
                                    src={"data: image/png;base64," + userProfile}
                                    alt='user-profile'
                                    width={40}
                                    height={40}
                                    className='rounded-xl'
                                />
                            </div>
                        )}
                </div>
            </nav>
        </div>
    );
};

export default CustomNavbar;
function async() {
    throw new Error('Function not implemented.');
}

