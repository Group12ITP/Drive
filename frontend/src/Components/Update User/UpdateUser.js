import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom' 
import { useNavigate } from 'react-router-dom'
import Nav from '../Nav/Nav'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UpdateUser.css';

function UpdateUser() {
    const [inputs,setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;

    useEffect(()=>{
        const fetchHandler = async () => {
            await axios
            .get(`http://localhost:5000/users/${id}`)
            .then((res)=>res.data)
            .then((data)=>setInputs(data.user));
        }
        fetchHandler();
    },[id]);

    const sendRequest = async ()=>{
        await axios
        .put(`http://localhost:5000/users/${id}`,{
        name:String(inputs.name),
        gmail:String(inputs.gmail),
        age:String(inputs.age),
        address:String(inputs.address),
        })
        .then((res)=>res.data);
    };

    const handleChange = (e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };
    
    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(inputs);
        sendRequest().then(()=>
        history('/userdetails'));
    };

  return (
    <div>
      <Nav/>
      <div className="auth-container">
        <div className="auth-card">
          <div className="welcome-section">
            <div className="logo"></div>
            <h2>Update User</h2>
            <p>Edit user information and click update to save your changes</p>
            <a href="/userdetails" className="sign-btn">BACK TO USERS</a>
          </div>
          
          <div className="form-section">
            <h2>Edit User Info</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  onChange={handleChange} 
                  name="name" 
                  value={inputs.name || ""} 
                  placeholder="Name" 
                  required
                />
              </div>
              
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  onChange={handleChange} 
                  name="gmail" 
                  value={inputs.gmail || ""} 
                  placeholder="Email"
                  required
                />
              </div>
              
              <div className="input-field">
                <i className="fas fa-calendar-alt"></i>
                <input 
                  type="text" 
                  onChange={handleChange} 
                  name="age" 
                  value={inputs.age || ""} 
                  placeholder="Age"
                  required
                />
              </div>
              
              <div className="input-field">
                <i className="fas fa-map-marker-alt"></i>
                <input 
                  type="text" 
                  onChange={handleChange} 
                  name="address" 
                  value={inputs.address || ""} 
                  placeholder="Address"
                  required
                />
              </div>
              
              <button type="submit" className="signup-btn">UPDATE USER</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser
