import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from '../Home/Home'
const URL="http://localhost:5000/userss"

const fetchHandler= async()=>{
    return await axios.get(URL).then((res)=>res.data);
}

function StudentDetails() {
    const [users,setUsers]= useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, userId: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProgress, setSelectedProgress] = useState('All');
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        startDate: '',
        studentProgress: 'Not Started'
    });

    useEffect(()=>{
        fetchHandler().then((data) => setUsers(data.Users));
    },[])

    
    const filteredAndSortedUsers = users
        .filter(user => {
            const matchesSearch = 
                (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                (user._id?.slice(-6)?.toLowerCase() || '').includes(searchQuery.toLowerCase());
            const matchesProgress = selectedProgress === 'All' || user.studentProgress === selectedProgress;
            return matchesSearch && matchesProgress;
        })
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

    const progressOptions = [
        'All',
        'Not Started',
        'Theory Learning',
        'Theory Test Passed',
        'Practical Training',
        'Ready for License Test',
        'Licensed'
    ];

    const getProgressColor = (progress) => {
        const progressColors = {
            'Not Started': '#ff4444',
            'Theory Learning': '#ffa726',
            'Theory Test Passed': '#66bb6a',
            'Practical Training': '#42a5f5',
            'Ready for License Test': '#7e57c2',
            'Licensed': '#26a69a'
        };
        return progressColors[progress] || '#ff4444';
    };

    const getProgressValue = (progress) => {
        const progressValues = {
            'Not Started': 0,
            'Theory Learning': 1,
            'Theory Test Passed': 2,
            'Practical Training': 3,
            'Ready for License Test': 4,
            'Licensed': 5
        };
        return progressValues[progress] || 0;
    };

    const handleDelete = async (id) => {
        setDeleteConfirmation({ show: true, userId: id });
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${URL}/${deleteConfirmation.userId}`);
            setUsers(users.filter(user => user._id !== deleteConfirmation.userId));
            setDeleteConfirmation({ show: false, userId: null });
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ show: false, userId: null });
    };

    const handleEdit = (user) => {
        setEditingUser(user._id);
        const formattedDate = new Date(user.startDate).toISOString().split('T')[0];
        setFormData({
            name: user.name,
            age: user.age,
            startDate: formattedDate,
            studentProgress: user.studentProgress
        });
    };

    const handleUpdate = async (id) => {
        try {
            const updateData = {
                name: formData.name,
                age: formData.age,
                startDate: new Date(formData.startDate),
                studentProgress: formData.studentProgress
            };
            
            const response = await axios.put(`${URL}/${id}`, updateData);
            if (response.data.users) {
                const updatedData = await fetchHandler();
                setUsers(updatedData.Users);
                setEditingUser(null);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{
            padding: '20px',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                padding: '30px'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '30px',
                    color: '#2c3e50',
                    fontSize: '28px',
                    fontWeight: '600'
                }}>Student Progress Timeline</h2>

                <div style={{
                    marginBottom: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    {progressOptions.map((progress) => (
                        <button
                            key={progress}
                            onClick={() => setSelectedProgress(progress)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                backgroundColor: selectedProgress === progress 
                                    ? getProgressColor(progress === 'All' ? 'Licensed' : progress)
                                    : '#f8f9fa',
                                color: selectedProgress === progress ? 'white' : '#2c3e50',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                boxShadow: selectedProgress === progress 
                                    ? '0 2px 4px rgba(0,0,0,0.1)'
                                    : 'none'
                            }}
                        >
                            {progress}
                        </button>
                    ))}
                </div>

                <div style={{
                    marginBottom: '20px',
                    position: 'relative'
                }}>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 20px',
                            fontSize: '16px',
                            border: '2px solid #e9ecef',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#f8f9fa'
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6c757d',
                        cursor: 'pointer'
                    }}>
                        {searchQuery ? '✕' : '🔍'}
                    </div>
                </div>

                {deleteConfirmation.show && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                            maxWidth: '400px',
                            width: '90%'
                        }}>
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete this student?</p>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '10px',
                                marginTop: '20px'
                            }}>
                                <button onClick={confirmDelete} style={{ ...buttonStyle, backgroundColor: '#ff4444' }}>
                                    Delete
                                </button>
                                <button onClick={cancelDelete} style={{ ...buttonStyle, backgroundColor: '#666' }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    {filteredAndSortedUsers && filteredAndSortedUsers.map((user) => (
                        <div key={user._id} style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '10px',
                            padding: '20px',
                            position: 'relative'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <div>
                                    <h3 style={{ margin: 0, color: '#2c3e50' }}>{user.name}</h3>
                                    <p style={{ margin: '5px 0 0', color: '#666', fontSize: '14px' }}>
                                        ID: {user._id.slice(-6)} | Start Date: {new Date(user.startDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {editingUser === user._id ? (
                                        <button
                                            onClick={() => handleUpdate(user._id)}
                                            style={buttonStyle}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                style={{ ...buttonStyle, backgroundColor: '#4CAF50' }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                style={{ ...buttonStyle, backgroundColor: '#ff4444' }}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {editingUser === user._id ? (
                                <div style={{
                                    display: 'flex',
                                    gap: '15px',
                                    flexWrap: 'wrap'
                                }}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="Age"
                                    />
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                    <select
                                        name="studentProgress"
                                        value={formData.studentProgress}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    >
                                        <option value="Not Started">Not Started</option>
                                        <option value="Theory Learning">Theory Learning</option>
                                        <option value="Theory Test Passed">Theory Test Passed</option>
                                        <option value="Practical Training">Practical Training</option>
                                        <option value="Ready for License Test">Ready for License Test</option>
                                        <option value="Licensed">Licensed</option>
                                    </select>
                                </div>
                            ) : (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        backgroundColor: '#e9ecef',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${(getProgressValue(user.studentProgress) / 5) * 100}%` ,
                                            height: '100%',
                                            backgroundColor: getProgressColor(user.studentProgress),
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <span style={{
                                        color: getProgressColor(user.studentProgress),
                                        fontWeight: '500',
                                        minWidth: '150px'
                                    }}>
                                        {user.studentProgress}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '10px'
                }}>
                    <h3 style={{ marginBottom: '15px', color: '#2c3e50' }}>Progress Legend</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '10px'
                    }}>
                        {Object.entries({
                            'Not Started': '#ff4444',
                            'Theory Learning': '#ffa726',
                            'Theory Test Passed': '#66bb6a',
                            'Practical Training': '#42a5f5',
                            'Ready for License Test': '#7e57c2',
                            'Licensed': '#26a69a'
                        }).map(([progress, color]) => (
                            <div key={progress} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: color,
                                    borderRadius: '50%'
                                }} />
                                <span style={{ color: '#2c3e50' }}>{progress}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const inputStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    flex: '1',
    minWidth: '200px'
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
};

export default StudentDetails