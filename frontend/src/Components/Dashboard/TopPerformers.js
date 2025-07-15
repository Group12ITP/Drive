import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  ButtonGroup,
  Button,
  LinearProgress,
} from '@mui/material';
import axios from 'axios';

const URL = "http://localhost:5000/users";

const TopPerformers = () => {
  const [students, setStudents] = useState([]);

  const progressValues = {
    'Not Started': 0,
    'Theory Learning': 20,
    'Theory Test Passed': 40,
    'Practical Training': 60,
    'Ready for License Test': 80,
    'Licensed': 100
  };

  const progressColors = {
    'Not Started': '#ff4444',
    'Theory Learning': '#ffa726',
    'Theory Test Passed': '#66bb6a',
    'Practical Training': '#42a5f5',
    'Ready for License Test': '#7e57c2',
    'Licensed': '#26a69a'
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(URL);
        const sortedStudents = response.data.Users
          .map(student => ({
            ...student,
            progressValue: progressValues[student.studentProgress] || 0
          }))
          .sort((a, b) => b.progressValue - a.progressValue)
          .slice(0, 3);
        setStudents(sortedStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h6">Top Performers</Typography>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell>{student._id.slice(-6)}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={student.progressValue}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            backgroundColor: progressColors[student.studentProgress] || '#1976d2',
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {student.progressValue}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: progressColors[student.studentProgress] || '#1976d2',
                      fontWeight: 'bold'
                    }}
                  >
                    {student.studentProgress}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopPerformers;