import React from 'react'
import { Outlet } from 'react-router-dom'
// import {  useDispatch } from 'react-redux'
// import {addItem} from '../redux/pageSlice'


function Home() {
  // const dispatch = useDispatch()
  


  
  return (
    <div className='text-center'>
      <h1 style={{fontSize:'450px'}} className='mt-5 pt-5 '>Hello</h1>
      <Outlet/>

    </div>
  )
}

export default Home
