import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

function Signin() {
    const navigate = useNavigate();
    const istoken = Cookies.get('jwtoken')
    if(istoken){
        console.log(istoken);
        navigate('/') 
    }
  const [userdata, setuserdata] = useState([]);
  const handleinp = (e) => {setuserdata({ ...userdata, [e.target.name]: e.target.value });};
  const handlesubmit = async(e)=>{
    e.preventDefault() 
    const res = await fetch('http://localhost:5000/login',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            'credentials':'include',
            body: JSON.stringify(userdata)
            });
            const data = await res.json();
      if(res.status===200){toast.success('Login Successful');Cookies.set("jwtoken", data.token, { expires: 1 }); setTimeout(() => { navigate('/')},2000)}
      else if(res.status===400){toast.error('Invalid Credentials')}
      else if(res.status===405){toast.error('User Not Found')}
      else{toast.error('Something Went Wrong')}


  }


  return (
    <div>
        <div><Toaster/></div>
      <div className="container-fluid my-5 bg-secondary rounded-5 py-5 w-25 p-3">
        <div className="head text-center">
          <h1>Login</h1>
        </div>
        <div className="form-group ">
          <form
            className="d-flex flex-column align-items-center justify-content-center"
            onSubmit={handlesubmit}
          >
            <input
              className="w-100 rounded-4 p-2 my-2 fs-4"
              type="email"
              name="Email"
              id="email"
              onChange={handleinp}
              placeholder="Email"
            />
            <input
              className="w-100 rounded-4 p-2 my-2 fs-4"
              type="password"
              name="Password"
              id="password"
              onChange={handleinp}
              placeholder="Password"
            />
            <button
              type="submit"
              className="btn btn-primary w-100 p-3 rounded-4"
            >
              Log In
            </button>
            <p>
              Don't have account{" "}
              <button
                className="btn text-primary"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Register
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
