import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

const AdminHome = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  const handleCardSelect = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-home-container">
      <div className="admin-content">
        <h2 className="admin-home-title">Admin Dashboard</h2>
        
        <div className="admin-cards-container">
          <div className={`admin-card ${animate ? 'animate' : ''}`} style={{ animationDelay: '0.1s' }}>
            <div className="card-icon">
              <FaUserGraduate />
            </div>
            <h3>Student Operations</h3>
            <p>Manage student profiles, enrollments, and academic progress tracking</p>
            <button className="select-button" onClick={() => handleCardSelect('/userdetails')}>Select</button>
          </div>

          <div className={`admin-card ${animate ? 'animate' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="card-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Instructor Operations</h3>
            <p>Manage instructor profiles, course assignments, and performance reviews</p>
            <button className="select-button" onClick={() => handleCardSelect('/studentdetails')}>Select</button>
          </div>

          <div className={`admin-card ${animate ? 'animate' : ''}`} style={{ animationDelay: '0.5s' }}>
            <div className="card-icon">
              <FaBook />
            </div>
            <h3>Course Operations</h3>
            <p>Manage course schedules, curriculum, and class assignments</p>
            <button className="select-button" onClick={() => handleCardSelect('/DisplayCourse')}>Select</button>
          </div>

          <div className={`admin-card ${animate ? 'animate' : ''}`} style={{ animationDelay: '0.7s' }}>
            <div className="card-icon">
              <FaMoneyBillWave />
            </div>
            <h3>Payment Operations</h3>
            <p>Manage fee collection, payment processing, and financial reports</p>
            <button className="select-button" onClick={() => handleCardSelect('/payments')}>Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
