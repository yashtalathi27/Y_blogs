import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const data2 = JSON.parse(localStorage.getItem("user"));
  const token=data2?.token;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="bg-gray-800 text-white w-[80%] mx-auto h-[8vh] rounded-md mt-4 shadow-md">
      <div>
        <ul className="flex justify-between items-center h-full px-8">
          <li className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300">
            <Link to={"/"}>All Blogs</Link>
          </li>
          <li className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300">
            <Link to={"/addblog"}>Add Blog</Link>
          </li>
          {token?(            <>
              <li className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300">
                <Link to={"/profile"}>Profile</Link>
              </li>
              <li
                onClick={handleLogout}
                className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300 cursor-pointer"
              >
                Logout
              </li>
            </>
):
          (            <>
            <li className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300">
              <Link to={"/signin"}>Sign In</Link>
            </li>
            <li className="hover:bg-slate-200 hover:text-black px-4 py-2 rounded transition duration-300">
              <Link to={"/signup"}>Sign Up</Link>
            </li>
          </>)}


        </ul>
      </div>
    </div>
  );
}

export default Navbar;
