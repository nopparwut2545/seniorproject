"use client";
import React, { FormEvent, useState } from "react";
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
              <Link href="/register-nanny">doesn’t have any account ?</Link>
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
