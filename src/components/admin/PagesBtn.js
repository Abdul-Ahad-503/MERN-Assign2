import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux'
import { addItem } from '../../redux/pageSlice'
import { useNavigate } from 'react-router-dom'

function PagesBtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [pglinks , setpglinks] = useState([])

    const btnclick = (pglink)=>{
        dispatch(addItem(`/${pglink}`))
        navigate(`/${pglink}`)
    }

    useEffect(()=>{
        const fetchpg = async()=>{
            const res = await fetch('http://localhost:5000/pages',{
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            const data = await res.json()
            console.log(data)
            setpglinks(data.map((pg)=>{return pg.permanentLink}))

        }
        fetchpg()
    },[])
    console.log(pglinks);
  return (
    <>
        <div className='mt-5'>
            <h1 className='text-center'>Your Pages</h1>
        <div className="d-flex justify-content-center gap-4 mt-5 ms-5">
        {pglinks.map((pglink)=>(
                    <button className="btn btn-primary" onClick={()=>{btnclick(pglink)}}>{pglink}</button>
                    ))}
            
        </div>
        </div>
    
    </>
  )
}

export default PagesBtn
