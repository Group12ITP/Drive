import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import axios from 'axios';

const URL = "http://localhost:5000/userss";

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      alignItems: 'center',
      bgcolor: color,
      color: 'white',
    }}
  >
    <Box sx={{ p: 1 }}>{icon}</Box>
    <Box sx={{ ml: 2 }}>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </Box>
  </Paper>
);

const StatisticsCards = () => {
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(URL);
        setTotalStudents(response.data.Users.length);
      } catch (error) {
        console.error('Error fetching students:', error);
        setTotalStudents(0);
      }
    };

    fetchStudents();
  }, []);

  const stats = [
    {
      title: 'Students',
      value: totalStudents.toString(),
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Earnings',
      value: '$42.8k',
      icon: <MoneyIcon sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} key={stat.title}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatisticsCards;