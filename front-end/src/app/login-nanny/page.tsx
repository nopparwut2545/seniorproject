"use client";
import logo from '../../../assets/Logo.png';
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import RootLayout from "../layout";
import styles from "../../../styles/Login.module.css";
type Props = {};
import Link from "next/link";
import axios from "axios";
import { login, login_admin, login_nanny, setAuthToken } from '../../../Component/apiService';
import { useRouter } from "next/navigation";
export default function Loginpage({}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);

      const response = await login_nanny(formData.email, formData.password);
      
      const data = response.data;
      
      if (data && data.acessToken) {
        
          localStorage.setItem('jwt', data.acessToken);
          
          setAuthToken(data.acessToken);
          
          router.push("/home");
      }
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      alert("You're not a nanny")
      localStorage.removeItem('jwt');
      router.push('/login-nanny'); 
  } else  if (error.response.status === 401) {
    alert("Incorrect password")
  }else if (error.request ) {

        console.error("Request Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  };
  return (
<div className={styles.rootContainer}>
      <RootLayout showNavbar={false}>
        <div className="flex justify-center mx-auto">
          <div className="text-center mt-5 sm:mt-6">
            <Image src={logo} className="img-fluid" width="250" height="150" alt="" />
          </div>
        </div>

        <div className="mt-6 text-center text-3xl sm:text-xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl font-bold">
          <div className={`p-4 m-10 rounded-2xl ${styles.borderBox}`}>
            <span style={{ fontFamily: 'Comfortaa' }} className="text-xl mt-4 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-black font-bold">
              Welcome Nanny !
            </span>
            <form onSubmit={handleSubmit}>
              <div className="email p-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`mt-10 p-2 rounded-3xl ${styles.emailInput}`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>
              <div className="password p-4">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`mt-4 p-2 rounded-3xl ${styles.passwordInput}`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>
              <div className="mt-4">
                <Link href="/register-nanny">
                  <a style={{ fontFamily: 'Comfortaa', color: 'black', textDecoration: 'underline' }}>
                    <div className="text-center text-2xl sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-bold">
                      Don&apos;t have an account? Register now !
                    </div>
                  </a>
                </Link>
              </div>
              <div className="mt-10 text-white bg-red-300 p-4 rounded-2xl">
                <button style={{ fontFamily: 'Comfortaa',}} type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
