import React from 'react';
import { useState } from 'react';
import './Signup.css';
function Signup() {
  const [name, setName] = useState('');
    const [npassword, setnewPassword] = useState('');
    const [rpassword, setrePassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: name,
            npassword: npassword,
            rpassword : rpassword,
        };
        // Convert the data to JSON
        const jsonData = JSON.stringify(data);

        // Send the JSON data to your server
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error));
    };
  return (
    <div >
    <div className='overall'>
    <form onSubmit={handleSubmit}>
    <div className="signup">
      <h1>SignUp</h1>
      <label value={name} onChange={(event) => setName(event.target.value)} className='label'>Username</label>
      <input type="text" className='textbox1' />
      <label value={npassword} onChange={(event) => setnewPassword(event.target.value)}  className='label'>New Password</label>
      <input type="text"  className='textbox1'/>
      <label value={rpassword} onChange={(event) => setrePassword(event.target.value)} className='label'>Re-Enter Password</label>
      <input type="text"  className='textbox1'/>
      <button>Signup</button>
    </div>
    </form>
    </div>
  </div>
  )
}

export default Signup
