// components/Navbar.tsx

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/Logo.png';
import React, { useState } from 'react';
import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                {/* Logo */}
                <Link href="/">
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

                {/* Navigation Links */}
                <div className="d-flex justify-content-end flex-grow-1">
                    <Link href="/services">
                        <a className={`col text-white ${styles.editService}`}>
                          Service
                        </a>
                    </Link>
                    <Link href="/customer-service">
                        <a className={`col text-white ${styles.editService}`}>
                            Customer Service
                        </a>
                    </Link>
                    <Link href="/messages">
                        <a className={`col text-white ${styles.editService}`}>
                            Message
                        </a>
                    </Link>
                    <Link href="/notifications">
                        <a className={`col text-white ${styles.editService}`}>
                            Notification
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
