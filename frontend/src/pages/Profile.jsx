import React, { useEffect, useState } from 'react';
import { googleAuth } from '../utils/firebase';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await googleAuth();
        setUserData(data); // Assuming `googleAuth()` returns user details
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[60%] mx-auto mt-10 bg-gray-100 p-5 rounded-md shadow-md">
      {userData ? (
        <div className="text-center">
          <img
            src={userData.photoURL || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h1 className="text-2xl font-bold mt-4">{userData.displayName}</h1>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-500 mt-2">{userData.uid}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
}

export default Profile;
