import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ManageUser() {
    const navigate = useNavigate();
    const [users , setusers] = useState([])
    const [order,setorder] = useState([])

    const handleinp = (e)=>{setorder({...order,[e.target.name]:e.target.value})}

    const handlesubmit = async(e)=>{
        e.preventDefault()
        const totalprice = order.price*order.quantity;
        const {userId,name,price,quantity} = order;
        const res = await fetch('http://localhost:5000/addOrder',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(
                {
                    userId,
                    name,
                    price,
                    quantity,
                    totalprice
                    }
            )
            })
            
            if(res.status === 201){alert("Order Placed")}
    }
    
    useEffect(()=>{
        const fetchusers = async()=>{
            const res = await fetch('http://localhost:5000/users',{method:'GET', headers: {'Content-Type': 'application/json',}, credentials:'include'})
            const data = await res.json()
            setusers(data)}
        fetchusers();
    },[])
  return (
    <>
    <button className='btn btn-primary fs-3 py-0 float-start ms-3 mt-3' onClick={()=>{navigate('/admin')}}>⬅</button>
    <div className="container mt-5 d-flex justify-content-center">
    

        <form onSubmit={handlesubmit} className='d-flex flex-column gap-3 w-50 justify-content-center  '>
        <select
          name="userId"
          className="p-3 fs-4 bg-info rounded-pill  "
          id="user-select"
          onChange={handleinp}
        >
          <option selected disabled >Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}  className="dropdown-item text-dark">
              {user.Name}
            </option>
          ))}
        </select>
            <input onChange={handleinp} className='p-1 rounded-3 fs-3' type="text" name="name"   placeholder='Item Name'/>
            <input onChange={handleinp} className='p-1 rounded-3 fs-3' type="number" name="quantity"  placeholder='Quantity'/>
            <input onChange={handleinp} className='p-1 rounded-3 fs-3' type="number" name="price"  placeholder='Price'/>
            <span className='fs-2'> Total Price: {order.price?order.price*order.quantity:''}</span>   
            <button className="btn btn-primary  p-1 rounded-3 fs-3" type='submit'>Add</button>
        </form>
    
    </div>

    <button className='btn btn-primary mt-5' onClick={()=>{navigate('/userlist')}}>View Users</button>
    
    </>
  )
}

export default ManageUser
