import React, { useEffect, useRef, useState } from 'react'
import Nav from '../Nav/Nav';
import axios from 'axios';
import User from '../User/User';
import {useReactToPrint} from "react-to-print";
import { data, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './users.css'

const URL = "http://localhost:5000/users";


const fetchHandler = async () =>{
  return await axios.get(URL).then((res)=>res.data);
}

function Users(props) {

  const [users,setUsers] = useState();
  useEffect(() => {
    fetchHandler().then((data)=> setUsers(data.users));
  },[])

  const ComponentsRef = useRef();
  const handlePrint = () =>{
    const input = ComponentsRef.current;
    html2canvas(input).then((canvas)=>{
      const imgData = canvas. toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf. internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
    });
  };

  const [searchQuery,setSearchQuery] = useState();
  const[noResults,setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  };
  
  const handleSendReport = () => {
    const phoneNumber = "+94766324158";
    const message = `selected User Reports`
    const WhatsAppUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(WhatsAppUrl,"_blank");
  }

  return (
    <div className="users-page">
      <Nav/>
   
      <div className="search-container">
        <input 
          onChange={(e)=>setSearchQuery(e.target.value)}
          type='text'
          name='search'
          placeholder='Search Users Details'
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {noResults ? (
        <div className="no-results">
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef} className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gmail</th>
                <th>Age</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user,i) => (
                <User key={i} user={user}/>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="button-container">
        <button className="button-1" onClick={handlePrint}>Download Report</button>
        <button className="button-2" onClick={handleSendReport}>Send WhatsApp Message</button>
      </div>
    </div>
  )
}

export default Users
