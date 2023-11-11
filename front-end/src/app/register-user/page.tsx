'use client'
import React, { FormEvent, useState } from "react";
import styles from "../../../styles/Register.module.css";
import axios from "axios";
import { useRouter } from 'next/navigation'
type Props = {};

export default function RegisterUserpage({ }: Props) {
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
    role: 'USER',
    age: '',
    gender: '',
    locationall: ''
  });

  // const handleChange = (e: any) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   // const newLocation = `${formData.district} ${formData.sub_district} ${formData.province} ${formData.zip_code} ${formData.street_number}`;
  //   // setFormData({ ...formData, locationall: newLocation });
  // }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update locationall based on other fields' values
    const newLocation = `${formData.district} ${formData.sub_district} ${formData.province} ${formData.zip_code} ${formData.street_number}`;
    setFormData((prevFormData) => ({ ...prevFormData, locationall: newLocation }));
  }
  // const handleChangeLocation = (e: any) => {

  //   const { district, sub_district, province, zip_code, street_number } = formData;
  //   const newLocation = `${district}, ${sub_district}, ${province}, ${zip_code}, ${street_number}`;
  //   setFormData({ ...formData, locationall: newLocation });
  // }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/customers/register', formData);
      const data = response.data;
      console.log('Registered:', data);
      router.push("/login-user");
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        alert("Email is already in use.")
      }
      console.error('Error registering:', error);
    }

  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src="/Logo.png" alt="Logo" />
      </div>
      <div className={styles.box}>
        <div className={styles.header}>
          <h1>Register for user</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>UserName</h2>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <h2>FirstName </h2>
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>LastName</h2>
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <h2>Email</h2>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Password</h2>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />

            </div>


            <div className={styles.inputGroup}>
              <h2>District</h2>
              <input type="text" name="district" value={formData.district} onChange={handleChange} required />
            </div>


          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Subdistrict</h2>
              <input type="text" name="sub_district" value={formData.sub_district} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <h2>Street Number</h2>
              <input type="text" name="street_number" value={formData.street_number} onChange={handleChange} required />
            </div>
          </div>


          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Province</h2>
              <input type="text" name="province" value={formData.province} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <h2>Zip code</h2>
              <input type="text" name="zip_code" value={formData.zip_code} onChange={handleChange} required />
            </div>
          </div>


          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Contact Number</h2>
              <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <h2>Age</h2>
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Gender</h2>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <h2>Location</h2>
              <input
                type="text"
                name="locationall"
                value={formData.locationall}
                readOnly // Make the field read-only
                required
              />
            </div>
          </div>

          <div className={styles.LoginBox}>
            <div className={styles.login}>
              <button type="submit" >Register</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );


}
