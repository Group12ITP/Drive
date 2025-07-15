import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

const AppointmentForm = ({ open, onClose, onSubmit, appointment }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    instructorId: '',
    date: '',
    time: '',
    status: 'pending'
  });

  // Mock instructor data
  const instructors = [
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

  useEffect(() => {
    if (appointment) {
      setFormData({
        studentId: appointment.studentId || '',
        instructorId: appointment.instructorId || '',
        date: appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '',
        time: appointment.time || '',
        status: appointment.status || 'pending'
      });
    } else {
      setFormData({
        studentId: '',
        instructorId: '',
        date: '',
        time: '',
        status: 'pending'
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {appointment ? 'Edit Appointment' : 'New Appointment'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            name="studentId"
            label="Student ID"
            value={formData.studentId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            name="instructorId"
            label="Instructor"
            select
            value={formData.instructorId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            {instructors.map((instructor) => (
              <MenuItem key={instructor._id} value={instructor._id}>
                {instructor.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="time"
            label="Time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="status"
            label="Status"
            select
            value={formData.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {appointment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppointmentForm; 