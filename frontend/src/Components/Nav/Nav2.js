import React from 'react'
import './Nav.css';
import {Link} from "react-router-dom";

function Nav2() {
  return (
    <div>
      <ul className="home-ul">
        <li className='home-ll'>
          <Link to="/mainhome" className="active home-a">
            <h1>Home</h1>
          </Link>
        </li>

        {/* About Us Dropdown */}
        <li className='home-ll dropdown'>
          <a href="" className="home-a">
            <h1>About Us</h1>
          </a>
          <div className="dropdown-content">
            <Link to="/aboutus">Our Story</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/testimonials">Testimonials</Link>
          </div>
        </li>

        {/* Services Dropdown */}
        <li className='home-ll dropdown'>
          <a href="#" className="home-a">
            <h1>Services</h1>
          </a>
          <div className="dropdown-content">
            <Link to="/driving-lessons">Driving Lessons</Link>
            <Link to="/license-assistance">License Assistance</Link>
            <Link to="/refresher-courses">Refresher Courses</Link>
            <Link to="/defensive-driving">Defensive Driving</Link>
          </div>
        </li>

        {/* Education Dropdown */}
        <li className='home-ll dropdown'>
          <a href="#" className="home-a">
            <h1>Education</h1>
          </a>
          <div className="dropdown-content">
            <Link to="/pay">Theory Classes</Link>
            <Link to="/practical-training">Practical Training</Link>
            <Link to="/road-safety">Road Safety</Link>
            <Link to="/test-preparation">Test Preparation</Link>
          </div>
        </li>

        <li className='home-ll'>
          <Link to="/packages" className="home-a">
            <h1>Packages</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/appointment" className="home-a">
            <h1>Appointment</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/contactus" className="home-a">
            <h1>Contact Us</h1>
          </Link>
        </li>

        <li className='home-ll'>
          <Link to="/feedback" className="home-a">
            <h1>Feedback</h1>
          </Link>
        </li>

        

        <li className='home-ll login-btn'>
          <Link to="/login" className="btn2">
            <button>Login</button>
          </Link>
        </li>

        <li className='home-ll register-btn'>
          <Link to="/register" className="btn1">
            <button>Register</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Nav2
