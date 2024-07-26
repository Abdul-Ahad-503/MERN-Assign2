import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import AdminPanel from './components/admin/AdminPanel';
import UserList from './components/admin/UserList';
import ManageUser from './components/admin/ManageUser';
import AddPage from './components/admin/AddPage';
import PageDisplay from './components/admin/PageDisplay';
import { useSelector } from "react-redux";


function App() {
  const permanentLink = useSelector((state) => state.pages.value);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />           
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Signin/>} />
          <Route path="/admin" element={<AdminPanel/>} />
          <Route path="/userlist" element={<UserList/>} />
          <Route path="/order" element={<ManageUser/>} />
          <Route path="/addpg" element={<AddPage/>} />
          <Route path={permanentLink} element={<PageDisplay/>} />
          
          

        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
