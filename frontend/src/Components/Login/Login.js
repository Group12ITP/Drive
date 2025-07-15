import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav2';
import './Login.css';

function Login() {
    const history = useNavigate();
    const [user, setUser] = useState({
        gmail: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({...prevUser, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check for admin credentials
        if(user.gmail === "admin" && user.password === "admin") {
            alert("Admin Login Successful!");
            history("/admin");
            return;
        }
        if(user.gmail === "ins" && user.password === "ins") {
            alert("Instructor Login Successful!");
            history("/studentdetails");
            return;
        }
        
        // Regular user login
        try {
            const response = await sendRequest();
            if(response.status === "ok") {
                alert("Login Successful");
                history("/mainhome");
            } else {
                alert("Invalid credentials");
            }
        } catch(err) {
            alert("Error: " + err.message);
        }
    };

    const sendRequest = async() => {
        return axios.post("http://localhost:5000/login", {
            gmail: user.gmail,
            password: user.password,
        })
        .then((res) => res.data);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="modern-login-container">
            <Nav/>
            <div className="login-card">
                <div className="login-form-container">
                    <div className="login-header">
                        <div className="login-icon"></div>
                        <h1>Log In</h1>
                        <p>Welcome back! Please enter your details</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className='modern-login-form'>
                        <div className="input-field">
                            <label htmlFor="gmail">Email</label>
                            <input 
                                type="text" 
                                id="gmail"
                                value={user.gmail} 
                                onChange={handleInputChange} 
                                name="gmail" 
                                placeholder="Enter your email"
                                required 
                            />
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <div className="password-field">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    id="password" 
                                    value={user.password} 
                                    onChange={handleInputChange} 
                                    name="password"
                                    placeholder="Enter your password"
                                    required 
                                />
                                <button 
                                    type="button" 
                                    className="toggle-password" 
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="form-extras">
                            <a href="#" className="forgot-password">forgot password?</a>
                        </div>

                        <button type="submit" className="login-btn form-login-btn">Log In</button>
                        
                        <div className="login-divider">
                            <span>Or Continue With</span>
                        </div>
                        
                        <div className="social-login">
                            <button type="button" className="google-btn">
                                <span className="social-icon google-icon"></span>
                                Google
                            </button>
                            <button type="button" className="facebook-btn">
                                <span className="social-icon facebook-icon"></span>
                                Facebook
                            </button>
                        </div>
                        
                        <p className="signup-prompt">
                            Don't have an account? <a href="/register">Sign up</a>
                        </p>
                    </form>
                </div>
                <div className="login-image">
                    {/* The image will be added via CSS */}
                </div>
            </div>
        </div>
    )
}

export default Login
