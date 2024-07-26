import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';

function AddPage() {
    const navigate = useNavigate();
    const [html, setHtml] = useState('my <b>HTML</b>');
    const [slang, setSlang] = useState('');
    const [permanentLink, setPermanentLink] = useState('');
    function onChange(e) {
        setHtml(e.target.value);
      }
    console.log(html);
    const handlesubmit = async(e)=>{
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slang,
                    permanentLink,
                    html
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            // dispatch(changelink(`${permanentLink}`))
            alert(data.message);
        } catch (error) {
            alert(error.message);
        }
    }
  return (
    <div className="admin-panel container-fluid test-left">
        <button className='btn btn-primary fs-3 py-0 float-start ms-3 mt-3' onClick={()=>{navigate('/admin')}}>⬅</button> <br />

            <h1 className='text-center text-white'>Add New Page</h1>
            <form onSubmit={handlesubmit}>
                <div className=''>
                    <label><h1>Slang:</h1></label><br />
                    <input className='w-100 ms-2 mt-3 py-2 fs-3'
                        type="text"
                        value={slang}
                        onChange={(e) => setSlang(e.target.value)}
                        required
                    />
                </div>
                <div className=''>
                    <label><h1>Link:</h1></label>
                    <br />
                    <input className='w-100 ms-2 mt-3 py-2 fs-3'
                        type="text"
                        value={permanentLink}
                        onChange={(e) => setPermanentLink(e.target.value)}
                        required
                        
                    />
                </div>
                <div className=''>
                    <label><h1>Body(HTML):</h1></label><br /> <br />
                    <Editor value={html}  className="text-white" onChange={onChange}/>

                         
                </div>
                <button type="submit">Add Page</button>
            </form>


            {/* <button onClick={()=>{navigate(pglink)}}>Show new page</button> */}
        </div>
  )
}

export default AddPage
