import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PagesBtn from './PagesBtn'


function AdminPanel() {
    const navigate = useNavigate()
  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
      <button className='card  text-center p-5 btn btn-primary bg-secondary' onClick={()=>{navigate('/order')}}><h1 className='px-5'>Add Order</h1></button>
      <button className='card  text-center p-5 btn btn-primary bg-secondary' onClick={()=>{navigate('/userlist')}}><h1 className='px-5'>Users List</h1></button>
      <button className='card  text-center p-5 btn btn-primary bg-secondary' onClick={()=>{navigate('/addpg')}}><h1 className='px-5'>Add Page</h1></button>
      </div>
      <Outlet/>
      <PagesBtn/>
    </div>
  )
}

export default AdminPanel
