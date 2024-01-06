'use client'
import RootLayout from "../layout";
import logo from '../../../assets/Logo.png';
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import styles from "../../../styles/Register.module.css";
import axios from "axios";
import { useRouter } from 'next/navigation'
type Props = {};

export default function RegisterAdminpage({ }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    district: '',
    sub_district: '',
    province: '',
    zip_code: '',
    street_number: '',
    contact_number: '',
    role: 'ADMIN',
    age: '',
    gender: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/admins/register', formData);
      const data = response.data;
      console.log('Registered:', data);
      router.push("/login-admin");
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        alert("Email is already in use.")
      }
      console.error('Error registering:', error);
    }
  };
  return (
    <div className={styles.rootContainer}>

      <RootLayout showNavbar={false}>
        <div className="flex justify-center mx-auto">
          <div className="text-center mt-5">
            <Image src={logo} className="img-fluid" width="250" height="150" alt="" />
          </div>
        </div>

        <div className="text-center">
          <div className={`p-4 m-10 rounded-2xl ${styles.borderBox}`}>
            <span style={{ fontFamily: 'Comfortaa' }} className="text-xl mt-4 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-black font-bold">
              Register Admin
            </span>
            <form onSubmit={handleSubmit} className="flex flex-col lg:grid lg:grid-cols-2 gap-2 text-center items-center">
              <div className="mt-10 username">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 firstname">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 lastname">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 emails">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 passwords">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 districts">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 subDistricts">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Sub District</label>
                <input
                  type="text"
                  name="sub_district"
                  value={formData.sub_district}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 streetnums">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Street Number</label>
                <input
                  type="text"
                  name="street_number"
                  value={formData.street_number}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 provice">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Province</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 zipcode">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Zip Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 contactNum">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Contact Number</label>
                <input
                  type="text"
                  name="contact_number"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>

              <div className="mt-10 age">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className={`p-2 rounded-3xl`}
                  style={{ fontFamily: 'Comfortaa' }}
                />
              </div>



              <div className="mt-10 gender">
                <label style={{ fontFamily: 'Comfortaa' }} className="block text-start text-black mb-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm font-semibold">Gender</label>
                <select name='gender' value={formData.gender} onChange={handleChange} required>
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="Male">Male</option>
                  <option value="PreferNotToSay">Prefer not to say</option>
                </select>
              </div>

              <div className="mt-10 col-span-2 text-white bg-red-300 p-4 rounded-2xl">
                <button style={{ fontFamily: 'Comfortaa' }} type="submit">Register</button>
              </div>
            </form>
          </div>
        </div>

      </RootLayout>

    </div>
  );


}
