import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import Auth from './pages/auth.jsx';
import Home from './pages/Home.jsx';
import AddBlog from './pages/AddBlog.jsx';
import BlogPage from './pages/BlogPage.jsx';
import Editblog from './pages/editblog.jsx';
import {Provider} from 'react-redux'
import store from './utils/store.js';
import VerifyUser from './components/VerifyUser.jsx';
import Profile from './pages/Profile.jsx';

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
      {
        path: "/blog/edit/:id",
        element: <Editblog/>,
      },     
      {
        path: "/verify-email/:token",
        element: <VerifyUser/>,
      },    
      {
        path: "/profile",
        element: <Profile/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
       <Toaster />
    <RouterProvider router={router} />
 
  </Provider>
  
);
