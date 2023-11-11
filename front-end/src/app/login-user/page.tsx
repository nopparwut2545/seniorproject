"use client";
import React, { FormEvent, useState } from "react";
import styles from "../../../styles/Login.module.css";
type Props = {};
import Link from "next/link";
import axios from "axios";
import { login, setAuthToken } from '../../../Component/apiService';
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

      // Use the login function from the apiService to authenticate
      const response = await login(formData.email, formData.password);
      
      const data = response.data;
      
      if (data && data.acessToken) {
          // Store the JWT in the local storage
          localStorage.setItem('jwt', data.acessToken);
          
          // Set the token for future axios requests
          setAuthToken(data.acessToken);
          
          // Navigate to home or another appropriate page after successful login
          router.push("/home");
      }
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
        alert("You're not a user")
        localStorage.removeItem('jwt');
        router.push('/login-user'); // Redirect to login page
    } else  if (error.response.status === 401) {
      alert("Incorrect password")
    }
      else if (error.request) {
        // The request was made but no response was received
        console.error("Request Error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
      console.error("Error Config:", error.config);
    }
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.image}>
          <img src="/Logo.png" alt="Logo" />
        </div>
        <div className={styles.box}>
          <div className={styles.header}>
            <h1>Welcome nanny !</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.email}>
              <div className={styles.icon}>
                <img src="/public/Email_icon.svg" alt="icon" />
              </div>
              <div className={styles.line}></div>
              <div className={styles.emailinput}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.password}>
              <div className={styles.icon}>
                <img src="/public/Email_icon.svg" alt="icon" />
              </div>
              <div className={styles.line}></div>
              <div className={styles.emailinput}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.account}>
              <Link href="/register-user">doesn’t have any account ?</Link>
            </div>
            <div className={styles.LoginBox}>
              <div className={styles.login}>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
