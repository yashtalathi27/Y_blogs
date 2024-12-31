import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Auth from './pages/auth.jsx';
import Home from './pages/Home.jsx';
import AddBlog from './pages/AddBlog.jsx';
import BlogPage from './pages/BlogPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home  />,
      },
      {
        path: "/signin",
        element: <Auth type={"signin"} />,
      },
      {
        path: "/signup",
        element: <Auth type={"signup"}/>,
      },
      {
        path: "/addblog",
        element: <AddBlog/>,
      },
      {
        path: "/blog/:id",
        element: <BlogPage/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <RouterProvider router={router} />
  </React.StrictMode>
);
