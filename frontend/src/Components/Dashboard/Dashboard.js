import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Event as EventIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import StatisticsCards from './StatisticsCards';
import TopPerformers from './TopPerformers';
import StudentDetails from '../StudentDetails/StudentDetails.js';
import './Dashboard.css';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth + 'px',
    height: '100vh',
    overflow: 'auto',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showOptions, setShowOptions] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, value: 'overview', path: '/dashboard' },
    { text: 'Students', icon: <PeopleIcon />, value: 'students', path: '/students' },
    { text: 'Progress', icon: <AssessmentIcon />, value: 'progress', path: '/progress' },
    { text: 'Events', icon: <EventIcon />, value: 'events', path: '/events' },
    { text: 'Payments', icon: <PaymentIcon />, value: 'payments', path: '/payments' },
    { text: 'Settings', icon: <SettingsIcon />, value: 'settings', path: '/settings' },
    { text: 'Logout', icon: <ExitToAppIcon />, value: 'logout', path: '/logout' },
  ];

  const renderDashboardContent = () => (
    <>
      <Grid item xs={12}>
        <StatisticsCards />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TopPerformers />
        </Paper>
      </Grid>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Grid container spacing={3}>
            {renderDashboardContent()}
          </Grid>
        );
      case 'progress':
        return <StudentDetails />;
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Driving School Management
          </Typography>
          <Button
            color="inherit"
            onClick={toggleOptions}
            startIcon={showOptions ? <VisibilityOffIcon /> : <VisibilityIcon />}
            sx={{ ml: 2 }}
          >
            {showOptions ? 'Hide Options' : 'Show Options'}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: showOptions ? drawerWidth : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: showOptions ? drawerWidth : 0,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease-in-out',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {showOptions && (
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={activeTab === item.value}
                onClick={() => handleTabChange(null, item.value)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {renderContent()}
        </Container>
      </Main>
    </Box>
  );
};

export default Dashboard;