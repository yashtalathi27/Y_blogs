import React from 'react'

function Signup() {
  return (
    <div className='w-[20%] flex flex-col items-center gap-5'>
        <h1 className='text-3xl '>Sign_up</h1>
        <input type="text" name="" 
        className='w-full bg-gray-400 h-[6vh] text-black text-xl rounded-lg focus:outline-none'
        placeholder='Enter your Email' />
        <input type="text" name="" 
        className='w-full bg-gray-400 h-[6vh] text-black text-xl rounded-lg focus:outline-none' 
        placeholder='Enter your Password'/>

        <button className='w-[50%] bg-gray-800 h-[6vh] text-white text-xl rounded-lg focus:outline-none' >Login</button>
    </div>
  )
}

export default Signup