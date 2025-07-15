import React from 'react'
import Nav from '../Nav/Nav'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './user.css'

function User(props) {
const {_id,name,gmail,age,address} = props.user;

const history = useNavigate();

const deleteHandler = async() =>{
    await axios.delete(`http://localhost:5000/users/${_id}`)
    .then(res=>res.data)
    .then(() => history("/"))
    .then(() => history("/userdetails"))
}
  return (
    <tr>
        <td>{_id}</td>
        <td>{name}</td>
        <td>{gmail}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
            <Link to={`/userdetails/${_id}`} className="update-btn">Update</Link>
            <button onClick={deleteHandler} className="delete-btn">Delete</button>
        </td>
    </tr>
  )
}

export default User
