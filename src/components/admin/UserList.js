import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function UserList() {
    const navigate = useNavigate()
const [users , setusers] = useState([])
const [orders,setorders] = useState([])

useEffect(()=>{
    const fetchusers = async()=>{
        const res = await fetch('http://localhost:5000/users',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                },
                credentials:'include'
        })
        const data = await res.json()
        setusers(data)}
        fetchusers()
},[])
useEffect(()=>{
    const fetchorders = async()=>{
        const response = await fetch('http://localhost:5000/orders')
        const data = await response.json()
        setorders(data)}
        fetchorders()
        
},[])

  return (
    <div>
        <button className='btn btn-primary fs-3 py-0 float-start ms-3 mt-3' onClick={()=>{navigate('/admin')}}>⬅</button>
        <h1 className='text-center'>Users</h1>
        <table className="table table-striped  mt-5 ">
        <thead>
            <tr>
                <th>Name</th>
                <th>Order Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
            </tr>
        </thead>
    <tbody>
        {users.map((user) => (
            <tr className='' key={user._id}>
                <td>{user.Name}</td>
                <td>
                {orders.map((order) =>order.userId === user._id ? (<h6>{order.name}</h6>) : null)}
                </td>
                <td >
                {orders.map((order) =>
                    order.userId === user._id ? (<h6>{order.quantity}</h6>) : null)}
                    </td>
                <td >
                {orders.map((order) =>
                    order.userId === user._id ? (<h6>{order.price}</h6>) : null)}
                    </td>
                <td >
                {orders.map((order) =>
                    order.userId === user._id ? (<h6>{new Date(order.date).toLocaleDateString()}</h6>) : null)}
                    </td>
            </tr>
            
        ))}
    </tbody>
</table>

      
    </div>
  )
}

export default UserList
