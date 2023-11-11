'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
export default function Page({ }: Props) {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRoleLevel, setSelectedRoleLevel] = useState<string>('');
  const [selectedTypeOfWork, setSelectedTypeOfWork] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [searchByRoleLevel, setSearchByRoleLevel] = useState<boolean>(false);
  const [searchByTypeOfWork, setSearchByTypeOfWork] = useState<boolean>(false);
  const [searchByGender, setSearchByGender] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Nanny[]>([]);

  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [districtSuggestions, setDistrictSuggestions] = useState<string[]>([]);

  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/nannies');
        setNannies(response.data);

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
  }, []);

  // version ล่าสุด
  // const handleSearch = async () => {
  //   try {
  //     // Construct the search criteria
  //     const criteria = {
  //       keyword: searchTerm,
  //       role_level: searchByRoleLevel ? selectedRoleLevel : null,
  //       type_work: searchByTypeOfWork ? selectedTypeOfWork : null,
  //     };
  //     alert(criteria.keyword+criteria.role_level+criteria.type_work);
  //     const response = await axios.get('http://localhost:9000/api/nannies/searchtestall', {
  //       params: criteria,
  //     });

  //     setSearchResults(response.data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError('An error occurred while searching.');
  //     }
  //   }
  // };

  // ใช้งานได้ ล่าสุด district
  // const handleDistrictSearch = (inputValue: string) => {
  //   const suggestions = nannies
  //     .filter((nanny) => nanny.district.toLowerCase().includes(inputValue.toLowerCase()))
  //     .map((nanny) => nanny.district);

  //   setDistrictSuggestions(suggestions);
  // };

  // const selectDistrictSuggestion = (district: string) => {
  //   setSelectedDistrict(district);
  //   setDistrictSuggestions([]);
  // };

  // const handleSearch = async () => {
  //   try {
  //     const criteria = {
  //       keyword: searchTerm,
  //       role_level: searchByRoleLevel ? selectedRoleLevel : null,
  //       type_work: searchByTypeOfWork ? selectedTypeOfWork : null,
  //       gender: searchByGender ? selectedGender : null,
  //       district: selectedDistrict,
  //     };
  //     alert(criteria.keyword + criteria.role_level + criteria.type_work + criteria.gender + criteria.district);
  //     const response = await axios.get('http://localhost:9000/api/nannies/searchtestall', {
  //       params: criteria,
  //     });

  //     setSearchResults(response.data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError('An error occurred while searching.');
  //     }
  //   }
  // };

  const handleSearch = async () => {
    try {
      const criteria = {
        keyword: searchTerm,
        role_level: searchByRoleLevel ? selectedRoleLevel : null,
        type_work: searchByTypeOfWork ? selectedTypeOfWork : null,
        gender: searchByGender ? selectedGender : null,
        district: selectedDistrict, // Include the selected district in the search criteria
      };
      const response = await axios.get('http://localhost:9000/api/nannies/searchtestall', {
        params: criteria,
      });

      setSearchResults(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while searching.');
      }
    }
  };
  
  const handleDistrictSearch = (inputValue: string) => {
    const suggestions = nannies
      .filter((nanny) => nanny.district.toLowerCase().includes(inputValue.toLowerCase()))
      .map((nanny) => nanny.district);

    setDistrictSuggestions(suggestions);
  };

  const selectDistrictSuggestion = (district: string) => {
    setSelectedDistrict(district);
    setDistrictSuggestions([]);
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // return (
  //   <div>
  //     <h2>List of Nannies</h2>
  //     <div>
  //       {/* Search input field and button */}
  //       <input
  //         type="text"
  //         placeholder="Search by full name"
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //       />

  //       {/* Checkbox to enable searching by role level */}
  //       <label>
  //         Search by Role Level
  //         <input
  //           type="checkbox"
  //           checked={searchByRoleLevel}
  //           onChange={() => setSearchByRoleLevel(!searchByRoleLevel)}
  //         />
  //       </label>

  //       {searchByRoleLevel && ( // Conditionally render the dropdown
  //         // Dropdown to select role level
  //         <select
  //           value={selectedRoleLevel}
  //           onChange={(e) => setSelectedRoleLevel(e.target.value)}
  //         >
  //           <option value="">Select Role Level</option>
  //           <option value="1">1</option>
  //           <option value="2">2</option>
  //           <option value="3">3</option>
  //           <option value="4">4</option>
  //         </select>
  //       )}

  //     </div>
  //       <div>
  //       <button onClick={handleSearch}>Search</button>
  //       </div>
  //     <div>
  //       {searchResults.length > 0 ? (
  //         // Display search results based on the selected criteria
  //         searchResults.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       ) : (
  //         // Display all nannies when no search is performed
  //         nannies.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );

  // Version ล่าสุด
  // return (
  //   <div>
  //     <h2>List of Nannies</h2>
  //     <div>
  //       {/* Search input field and button */}
  //       <input
  //         type="text"
  //         placeholder="Search by full name"
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //       />

  //       {/* Checkbox to enable searching by role level */}
  //       <label>
  //         Search by Role Level
  //         <input
  //           type="checkbox"
  //           checked={searchByRoleLevel}
  //           onChange={() => setSearchByRoleLevel(!searchByRoleLevel)}
  //         />
  //       </label>

  //       {/* Checkbox to enable searching by type of work */}
  //       <label>
  //         Search by Type of Work
  //         <input
  //           type="checkbox"
  //           checked={searchByTypeOfWork}
  //           onChange={() => setSearchByTypeOfWork(!searchByTypeOfWork)}
  //         />
  //       </label>

  //       {searchByRoleLevel && (
  //         // Conditionally render the dropdown when the checkbox is checked
  //         // Dropdown to select role level
  //         <select
  //           value={selectedRoleLevel}
  //           onChange={(e) => setSelectedRoleLevel(e.target.value)}
  //         >
  //           <option value="">Select Role Level</option>
  //           <option value="1">1</option>
  //           <option value="2">2</option>
  //           <option value="3">3</option>
  //           <option value="4">4</option>
  //         </select>
  //       )}

  //       {searchByTypeOfWork && (
  //         // Conditionally render the dropdown when the checkbox is checked
  //         // Dropdown to select type of work
  //         <select
  //           value={selectedTypeOfWork}
  //           onChange={(e) => setSelectedTypeOfWork(e.target.value)}
  //         >
  //           <option value="">Select Type of Work</option>
  //           <option value="F">F</option>
  //           <option value="P">P</option>
  //           <option value="A">A</option>
  //         </select>
  //       )}

  //       <div>
  //         <button onClick={handleSearch}>Search</button>
  //       </div>
  //     </div>

  //     <div>
  //       {searchResults.length > 0 ? (
  //         // Display search results based on the selected criteria
  //         searchResults.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               <p>Type_Work: {nanny.type_work}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       ) : (
  //         // Display all nannies when no search is performed
  //         nannies.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               <p>Type_Work: {nanny.type_work}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );

  // return ล่าสุดมี gender
  // return (
  //   <div>
  //     <h2>List of Nannies</h2>
  //     <div>
  //       {/* Search input field and button */}
  //       <input
  //         type="text"
  //         placeholder="Search by full name"
  //         value={searchTerm}
  //         onChange={(e) => setSearchTerm(e.target.value)}
  //       />

  //       {/* Checkbox to enable searching by role level */}
  //       <label>
  //         Search by Role Level
  //         <input
  //           type="checkbox"
  //           checked={searchByRoleLevel}
  //           onChange={() => setSearchByRoleLevel(!searchByRoleLevel)}
  //         />
  //       </label>

  //       {/* Checkbox to enable searching by type of work */}
  //       <label>
  //         Search by Type of Work
  //         <input
  //           type="checkbox"
  //           checked={searchByTypeOfWork}
  //           onChange={() => setSearchByTypeOfWork(!searchByTypeOfWork)}
  //         />
  //       </label>

  //       <label>
  //         Search by Gender
  //         <input
  //           type="checkbox"
  //           checked={searchByGender}
  //           onChange={() => setSearchByGender(!searchByGender)}
  //         />
  //       </label>

  //       {searchByRoleLevel && (
  //         // Conditionally render the dropdown when the checkbox is checked
  //         // Dropdown to select role level
  //         <select
  //           value={selectedRoleLevel}
  //           onChange={(e) => setSelectedRoleLevel(e.target.value)}
  //         >
  //           <option value="">Select Role Level</option>
  //           <option value="1">1</option>
  //           <option value="2">2</option>
  //           <option value="3">3</option>
  //           <option value="4">4</option>
  //         </select>
  //       )}

  //       {searchByTypeOfWork && (
  //         // Conditionally render the dropdown when the checkbox is checked
  //         // Dropdown to select type of work
  //         <select
  //           value={selectedTypeOfWork}
  //           onChange={(e) => setSelectedTypeOfWork(e.target.value)}
  //         >
  //           <option value="">Select Type of Work</option>
  //           <option value="F">Full Time</option>
  //           <option value="P">Part Time</option>
  //           <option value="A">ALL</option>
  //         </select>
  //       )}

  //       {searchByGender  && (
  //         // Conditionally render the dropdown when the checkbox is checked
  //         // Dropdown to select type of work
  //         <select
  //           value={selectedGender}
  //           onChange={(e) => setSelectedGender(e.target.value)}
  //         >
  //           <option value="">Select Type of Work</option>
  //           <option value="male">male</option>
  //           <option value="female">female</option>
  //           <option value="other">Other</option>
  //         </select>
  //       )}

  //       <div>
  //         <button onClick={handleSearch}>Search</button>
  //       </div>
  //     </div>

  //     <div>
  //       {searchResults.length > 0 ? (
  //         // Display search results based on the selected criteria
  //         searchResults.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               <p>Type_Work: {nanny.type_work}</p>
  //               <p>Gender: {nanny.gender}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       ) : (
  //         // Display all nannies when no search is performed
  //         nannies.map((nanny) => (
  //           nanny.status !== 'Inactive' && (
  //             <div key={nanny.username}>
  //               <h3>Nanny Details</h3>
  //               <p>Username: {nanny.username}</p>
  //               <p>First Name: {nanny.first_name}</p>
  //               <p>Last Name: {nanny.last_name}</p>
  //               <p>Type_Work: {nanny.type_work}</p>
  //               <p>Gender: {nanny.gender}</p>
  //               {/* Display more nanny details as needed */}
  //             </div>
  //           )
  //         ))
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div>
      <h2>List of Nannies</h2>
      <div>
        <input
          type="text"
          placeholder="Search by full name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            
          }}
        />

        <input
          type="text"
          placeholder="Search by district"
          value={selectedDistrict}
          onChange={(e) => {setSelectedDistrict(e.target.value);
            handleDistrictSearch(e.target.value);
          }}
        />

        {districtSuggestions.length > 0 && (
          <ul>
            {districtSuggestions.map((district) => (
              <li
                key={district}
                onClick={() => selectDistrictSuggestion(district)}
              >
                {district}
              </li>
            ))}
          </ul>
        )}
        <label>
          Search by Role Level
          <input
            type="checkbox"
            checked={searchByRoleLevel}
            onChange={() => setSearchByRoleLevel(!searchByRoleLevel)}
          />
        </label>

        <label>
          Search by Type of Work
          <input
            type="checkbox"
            checked={searchByTypeOfWork}
            onChange={() => setSearchByTypeOfWork(!searchByTypeOfWork)}
          />
        </label>

        <label>
          Search by Gender
          <input
            type="checkbox"
            checked={searchByGender}
            onChange={() => setSearchByGender(!searchByGender)}
          />
        </label>

        {searchByRoleLevel && (
          <select
            value={selectedRoleLevel}
            onChange={(e) => setSelectedRoleLevel(e.target.value)}
          >
            <option value="">Select Role Level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        )}

        {searchByTypeOfWork && (
          <select
            value={selectedTypeOfWork}
            onChange={(e) => setSelectedTypeOfWork(e.target.value)}
          >
            <option value="">Select Type of Work</option>
            <option value="F">Full Time</option>
            <option value="P">Part Time</option>
            <option value="A">ALL</option>
          </select>
        )}

        {searchByGender && (
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            {/* <option value="other">Other</option> */}
          </select>
        )}

        <div>
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div>
        {searchResults.length > 0 ? (
          searchResults.map((nanny) => (
            nanny.status !== 'Inactive' && (
              <div key={nanny.username}>
                <h3>Nanny Details</h3>
                <p>Username: {nanny.username}</p>
                <p>First Name: {nanny.first_name}</p>
                <p>Last Name: {nanny.last_name}</p>
                <p>Type_Work: {nanny.type_work}</p>
                <p>Gender: {nanny.gender}</p>
                <p>District: {nanny.district}</p>
              </div>
            )
          ))
        ) : (
          nannies.map((nanny) => (
            nanny.status !== 'Inactive' && (
              <div key={nanny.username}>
                <h3>Nanny Details</h3>
                <p>Username: {nanny.username}</p>
                <p>First Name: {nanny.first_name}</p>
                <p>Last Name: {nanny.last_name}</p>
                <p>Type_Work: {nanny.type_work}</p>
                <p>Gender: {nanny.gender}</p>
                <p>District: {nanny.district}</p>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );

};


