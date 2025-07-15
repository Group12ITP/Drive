import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppointmentForm from './AppointmentForm';
import './AppointmentsPage.css';
import { images } from '../../assets/imageUrls';

const AppointmentsPage = () => {
  // State management for appointments and UI
  const [appointments, setAppointments] = useState([]);
  const [instructors, setInstructors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    fetchInstructors();
    fetchAppointments();
  }, []);

  // Fetch instructors data from API
  const fetchInstructors = async () => {
    try {
      // Mock instructor data
      const mockInstructors = [
        { _id: '1', name: 'John Smith', gender: 'male' },
        { _id: '2', name: 'Sarah Johnson', gender: 'female' },
        { _id: '3', name: 'Michael Brown', gender: 'male' },
        { _id: '4', name: 'Emma Wilson', gender: 'female' },
        { _id: '5', name: 'David Lee', gender: 'male' },
        { _id: '6', name: 'Lisa Anderson', gender: 'female' },
        { _id: '7', name: 'Robert Taylor', gender: 'male' },
        { _id: '8', name: 'Jennifer Davis', gender: 'female' },
        { _id: '9', name: 'William Miller', gender: 'male' },
        { _id: '10', name: 'Mary Johnson', gender: 'female' }
      ];

      const instructorsMap = {};
      mockInstructors.forEach(instructor => {
        instructorsMap[instructor._id] = instructor;
      });
      setInstructors(instructorsMap);
      setError(null);
    } catch (error) {
      console.error('Error setting up instructors:', error);
      setError('Error setting up instructors: ' + error.message);
    }
  };

  // Fetch appointments data from API
  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setAppointments(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for create/update
  const handleSubmit = async (formData) => {
    try {
      const url = selectedAppointment
        ? `http://localhost:5000/appointments/${selectedAppointment._id}`
        : 'http://localhost:5000/appointments';
      
      const response = selectedAppointment
        ? await axios.put(url, formData)
        : await axios.post(url, formData);

      if (response.data) {
        await fetchAppointments();
        setIsModalOpen(false);
        setSelectedAppointment(null);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      setError(error.response?.data?.message || 'Failed to save appointment');
    }
  };

  // Handle edit appointment action
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Handle delete appointment action
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://localhost:5000/appointments/${id}`);
        await fetchAppointments();
        setError(null);
      } catch (error) {
        console.error('Error deleting appointment:', error);
        setError('Error deleting appointment: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  // Helper function for status color coding
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ff9800';    // Orange
      case 'confirmed': return '#4CAF50';  // Green
      case 'cancelled': return '#f44336';  // Red
      default: return '#757575';           // Grey
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  // Main component render
  return (
    <div className="appointments-page">
      {/* Hero section */}
      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${images.hero.appointments})` }}
      >
        <div className="hero-content">
          <h1>Manage Your Appointments</h1>
          <p>Schedule, view, and manage your driving lessons</p>
        </div>
      </section>

      {/* Appointments section */}
      <section className="appointments-section">
        <div className="appointments-header">
          <h2>Your Appointments</h2>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedAppointment(null);
              setIsModalOpen(true);
            }}
          >
            New Appointment
          </Button>
        </div>

        {/* Error message display */}
        {error && (
          <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
            {error}
          </div>
        )}

        {/* Appointments table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No appointments found. Create your first appointment!
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((appointment) => (
                  <TableRow key={appointment._id}>
                    <TableCell>{appointment.studentId}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img 
                          src={instructors[appointment.instructorId]?.gender === 'female' 
                            ? images.instructors.female 
                            : images.instructors.default}
                          alt={instructors[appointment.instructorId]?.name}
                          style={{ width: 30, height: 30, borderRadius: '50%' }}
                        />
                        <span>{instructors[appointment.instructorId]?.name || 'Loading...'}</span>
                      </Box>
                    </TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Box
                        component="span"
                        sx={{
                          backgroundColor: getStatusColor(appointment.status),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.9em'
                        }}
                      >
                        {appointment.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(appointment)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(appointment._id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      {/* Call-to-action section */}
      <section 
        className="cta-section"
        style={{ backgroundImage: `url(${images.cta.booking})` }}
      >
        <div className="cta-content">
          <h2>Need More Lessons?</h2>
          <p>Book additional lessons to perfect your driving skills</p>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => {
              setSelectedAppointment(null);
              setIsModalOpen(true);
            }}
          >
            Schedule More Lessons
          </Button>
        </div>
      </section>

      {/* Modal for create/edit form */}
      <AppointmentForm
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppointment(null);
        }}
        onSubmit={handleSubmit}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentsPage;