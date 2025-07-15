import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TopPerformers.css';

const API_URL = "http://localhost:5000/userss";

const getStatusClass = (status) => {
  const statusMap = {
    'Not Started': 'status-not-started',
    'Theory Learning': 'status-theory-learning',
    'Theory Test Passed': 'status-theory-passed',
    'Practical Training': 'status-practical-training',
    'Ready for License Test': 'status-ready-test',
    'Licensed': 'status-licensed'
  };
  return statusMap[status] || 'status-not-started';
};

const getProgressValue = (status) => {
  const progressMap = {
    'Not Started': 0,
    'Theory Learning': 20,
    'Theory Test Passed': 40,
    'Practical Training': 60,
    'Ready for License Test': 80,
    'Licensed': 100
  };
  return progressMap[status] || 0;
};

const TopPerformers = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        const sortedStudents = response.data.Users
          .map(student => ({
            ...student,
            progressValue: getProgressValue(student.studentProgress)
          }))
          .sort((a, b) => b.progressValue - a.progressValue)
          .slice(0, 3);
        setStudents(sortedStudents);
        setError(null);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load student data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (isLoading) {
    return <div className="loading">Loading top performers...</div>;
  }

  return (
    <div className="top-performers">
      <div className="top-performers-header">
        <h2 className="top-performers-title">Top Performers</h2>
      </div>

      <table className="performers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Progress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>
                <span className="student-id">
                  {student._id.slice(-6)}
                </span>
              </td>
              <td>
                <span className="student-name">
                  {student.name}
                </span>
              </td>
              <td>
                <div className="progress-bar-container">
                  <div 
                    className={`progress-bar ${getStatusClass(student.studentProgress)}`}
                    style={{ width: `${student.progressValue}%` }}
                  />
                </div>
                <span className="progress-value">
                  {student.progressValue}%
                </span>
              </td>
              <td>
                <span className={`status-chip ${getStatusClass(student.studentProgress)}`}>
                  {student.studentProgress}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopPerformers;