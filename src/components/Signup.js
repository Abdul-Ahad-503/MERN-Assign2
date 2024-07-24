import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';


function Signup() {
    const navigate = useNavigate()
    const [userdata,setuserdata] = useState([])
    const notify = ()=>{
        toast.error('Email Already Exist')
    }
    const istoken = Cookies.get('jwtoken')
    if(istoken){
        console.log(istoken);
        navigate('/')
    }
    const handleinp = (e)=>{setuserdata({ ...userdata, [e.target.name]: e.target.value });
    
}
    const handlesubmit = async(e)=>{e.preventDefault()
        const res = await fetch('http://localhost:5000/register',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
                'credentials':'include',
                body: JSON.stringify(userdata)
                });


                if(res.status === 422){notify()}
                else if(res.status === 201){ toast.success('Registration Successfull');setTimeout(() => { navigate('/login')},2000) }
                else{toast.error('Registration Failed')}
            }
    
  return (
    <div>

        <div className="container-fluid my-5 bg-secondary rounded-5 py-5 w-25 p-3">
        <div><Toaster/></div>
                <div className="head text-center">
                    <h1>Register</h1>
                </div>
                <div className="form-group mx-1 ">
                    <form className='d-flex flex-column align-items-center justify-content-center ' onSubmit={handlesubmit}>
                        <input className='w-100 rounded-4  text-dark fs-4 p-2 my-2' autoComplete='none' type="text" name="Name" id="name"  onChange={handleinp} placeholder='Name'/>
                        <input className='w-100 rounded-4  text-dark fs-4 p-2 my-2' autoComplete='none' type="email" name="Email" id="email"  onChange={handleinp} placeholder='Email'/>
                        <input className='w-100 rounded-4  text-dark fs-4 p-2 my-2' autoComplete='none' type="password" name="Password" id="password"  onChange={handleinp} placeholder='Password'/>
                        <input className='w-100 rounded-4  text-dark fs-4 p-2 my-2' autoComplete='none' type="number" name='Phone' id='Phone'  onChange={handleinp} placeholder='Phone'/>
                        <div className="roles ">
                        <label className='pe-5 fw-bolder fs-4 pb-3'>Role:</label>
                        <label htmlFor="role-user" className='fs-5'>User</label><input className='mx-2 p-1'  type="radio" name="Role" id="role-user"  onClick={handleinp} value={'user'}/>
                        <label htmlFor="role-admin" className='fs-5'>Admin</label><input className='mx-2 p-1' type="radio" name="Role" id="role-admin" onClick={handleinp} value={'admin'} />
                        </div>
                        <button type='submit' className='btn btn-primary w-100  p-3 rounded-pill'>Register</button>
                        <p>Already have account <button className='btn text-primary' onClick={()=>{navigate('/login')}}>Login</button></p>
                    </form>
                </div>
            </div>
      
    </div>
  )
}

export default Signup
