import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-200">
      {/* Header Section */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex justify-center items-center">
        <Outlet />
      </main>

      {/* Optional Footer Section */}
      <footer className="w-full text-center py-4 bg-gray-800 text-white">
        Footer Content Here
      </footer>
    </div>
  );
}

export default App;
