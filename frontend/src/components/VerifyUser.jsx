import axios from 'axios';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

function VerifyUser() {

    const {token}=useParams();
    console.log(token);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate=useNavigate();

    useEffect(()=>{
        async function verifytoken() {
            try {
                const res=await axios.get(`${backendUrl}/verify-email/${token}`);
                toast.success(res.data.message)
                navigate('/signin');
            } catch (error) {
                toast.error("error")
            }
        }
        verifytoken()
    })
    
  return (
    <div>VerifyUser</div>
  )
}

export default VerifyUser