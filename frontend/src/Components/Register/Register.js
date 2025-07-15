import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Register.css';
import Nav2 from '../Nav/Nav2';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Register() {
    const history = useNavigate();
    const [user,setUser] = useState({
        name:"",
        gmail:"",
        password:"",
        confirmPassword:"",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const handleInputChange = (e) => {
    const {name,value} = e.target;
    setUser((prevUser) => ({...prevUser,[name]:value}));
}

const handleSubmit = (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    
    sendRequest().then(()=>{
        alert("Register Success");
        history("/login")
    })
    .catch((err)=> {
        alert(err.message);
    });
};


const sendRequest = async() => {
    await axios .post("http://localhost:5000/register",{
        name:String(user.name),
        gmail:String(user.gmail),
        password:String(user.password),
    })
    .then((res) => res.data);
}
  return (
    <div>
      <Nav2 />
      <div className="auth-container">
        <div className="auth-card">
          <div className="welcome-section">
            <div className="logo">
              
            </div>
            <h2>Welcome Back!</h2>
            <p>To keep connected with us please login with your personal info</p>
            <a href="/login" className="sign-btn">SIGN IN</a>
          </div>
          
          <div className="form-section">
            <h2>Create Account</h2>
            
            <div className="social-icons">
              <a href="#" className="social-icon facebook-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon google-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon instagram-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            
            <p className="or-text">or use your email for registration:</p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={handleInputChange} 
                  name="name" 
                  placeholder="Name"
                  required 
                />
              </div>
              
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  value={user.gmail} 
                  onChange={handleInputChange} 
                  name="gmail" 
                  placeholder="Email"
                  required 
                />
              </div>
              
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={user.password} 
                  onChange={handleInputChange} 
                  name="password" 
                  placeholder="Password"
                  required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={user.confirmPassword} 
                  onChange={handleInputChange} 
                  name="confirmPassword" 
                  placeholder="Confirm Password"
                  required
                />
                <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
              {error && <p className="error-message">{error}</p>}
              
              <button type="submit" className="signup-btn">SIGN UP</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
