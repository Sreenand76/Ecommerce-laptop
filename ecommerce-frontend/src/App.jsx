import React from 'react';
import Home from './components/home';
import NavBar from './components/navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingComponent from './components/shop/ShoppingComponent';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/auth/Login';
import { LaptopProvider } from './components/context/LaptopContext';
import { UserProvider } from './components/context/UserContext';
import { AuthProvider } from './components/auth/AuthProvider';
import Registration from './components/auth/Registration';
import LogOut from './components/auth/LogOut';
import UpdateLaptop from './components/Laptop/UpdateLaptop';
import LaptopDetails from './components/Laptop/LaptopDetails';
import LaptopList from './components/Laptop/LaptopList';
import AdminPanel from './components/admin/AdminPanel';
import Cart from './components/cart';
import Profile from './components/auth/Profile';
import Wishlist from './components/wishlist';
import Checkout from './components/checkout';
import Orders from './components/Order';
import AboutSection from './components/about';
import ContactSection from './components/contact';
import AllOrders from './components/admin/AllOrders';
import ManageUsers from './components/admin/ManageUsers';
import AddLaptop from './components/Laptop/AddLaptop';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './stripe';
import ColdStartToast from './coldstartToast';

function App() {

  return (
    <>
      <AuthProvider>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
        <ColdStartToast/>
          <ToastContainer />
          <UserProvider>
            <LaptopProvider>
              <NavBar />
              <Routes>               
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/contact" element={<ContactSection />} />
                <Route path='/shopping-cart' element={<ShoppingComponent />} />
                <Route path='/' element={<Home />} />
                <Route path="/laptop-details/:id" element={<LaptopDetails />} />
                <Route path="/laptop-list" element={<LaptopList />} />
                <Route path="/add-laptop" element={<AddLaptop/>} />
                <Route path="/update-laptop/:id" element={<UpdateLaptop />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/all-orders" element={<AllOrders />} />
                <Route path="/manage-users" element={<ManageUsers />} />
              </Routes>
            </LaptopProvider>
          </UserProvider>
        </BrowserRouter>
        </Elements>
      </AuthProvider>
    </>
  )
}

export default App;
