import React, { useState, useEffect } from 'react';
import { People as PeopleIcon } from '@mui/icons-material';
import axios from 'axios';
import './StatisticsCards.css';

const API_URL = "http://localhost:5000/userss";

const StatCard = ({ title, value, icon, type }) => (
  <div className={`stat-card ${type}`}>
    <div className="stat-icon">
      {icon}
    </div>
    <div className="stat-content">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  </div>
);

const StatisticsCards = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setTotalStudents(response.data.Users.length);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load student data');
        setTotalStudents(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const stats = [
    {
      title: 'Students',
      value: isLoading ? '...' : totalStudents.toString(),
      icon: <PeopleIcon />,
      type: 'students'
    }
  ];

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatisticsCards;