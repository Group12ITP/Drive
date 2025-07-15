import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Components/Home/Home';
import AddUser from "./Components/AddUser/AddUser";
import Users from './Components/UserDetails/Users';
import UpdateUser from './Components/Update User/UpdateUser';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Packages from './Components/Packages/Packages';
import Team from './Components/Team/Team';
import Testimonial from './Components/Testimonial/Testimonial';
import AdminHome from './Components/AdminHome/AdminHome';
import Payments from './Components/Payments/Payments';
import AddInstructor from './Components/AddInstructor/Addinstructor';
import Instructors from './Components/Instructors/Instructors';
import FeedbackDisplay from './Components/feedbackDisplay/feedbackDisplay';
import Dashboard from './Components/Dashboard/Dashboard';
import DisplayCourse from './Components/DisplayCourse';
import StudentDetails from './Components/StudentDetails/StudentDetails';
import AppointmentsPage from './Components/Appointment/AppointmentsPage';
import Payment from './Components/Payment/Payment';

const dashboardTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<Users />} />
        <Route path="/userdetails/:id" element={<UpdateUser />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/payments/*" element={<Payments />} />
        <Route path="/addinstructor" element={<AddInstructor />} />
        <Route path="/instructordetails" element={<Instructors />} />
        <Route path="/feedback" element={<FeedbackDisplay />} />
        <Route path="/DisplayCourse" element={<DisplayCourse />} />
        <Route path="/studentdetails" element={<StudentDetails />} />
        <Route path="/appointment" element={<AppointmentsPage />} />
        <Route path="/pay" element={<Payment />} />
        <Route
          path="/dashboard"
          element={
            <ThemeProvider theme={dashboardTheme}>
              <CssBaseline />
              <Dashboard />
            </ThemeProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
