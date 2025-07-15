import React, { useState } from 'react';
import StatisticsCards from './StatisticsCards';
import TopPerformers from './TopPerformers';
import AttendanceChart from './AttendanceChart';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-range">
          <span>Last 7 days</span>
        </div>
      </div>

      <div className="dashboard-content">
        <StatisticsCards />
        
        <div className="dashboard-grid">
          <div className="grid-item">
            <TopPerformers />
          </div>
          <div className="grid-item">
            <AttendanceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;