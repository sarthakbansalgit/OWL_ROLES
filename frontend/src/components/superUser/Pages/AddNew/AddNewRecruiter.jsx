import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import './New.scss';
import noImage from '../../../../assets/superuser-dashboard/photo-camera.png';
import axios from 'axios';
import { USER_API_END_POINT } from '../../../../utils/constant';

function AddNewRecruiter({ inputs = [], titlee }) {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        bio: '',
    });

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        // Clear notification after 3 seconds
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!formData.fullname || !formData.email || !formData.phoneNumber || !formData.password) {
            showNotification('Please fill all required fields', 'error');
            return;
        }

        try {
            setLoading(true);
            
            // Create a FormData object to send the file and form data
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });
            
            if (file) {
                data.append('file', file);
            }
            
            // Make the API call
            const response = await axios.post(`${USER_API_END_POINT}/admin/addRecruiter`, data);
            
            if (response.data.success) {
                showNotification('Recruiter created successfully', 'success');
                // Reset form
                setFormData({
                    fullname: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    bio: '',
                });
                setFile(null);
            }
        } catch (error) {
            console.error('Error creating recruiter:', error);
            showNotification(
                error.response?.data?.message || 'Failed to create recruiter', 
                'error'
            );
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="add_new">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="new_page">
                <Navbar />

                <div className="new_page_main">
                    <div className="new_page_content">
                        <p className="add_new_user">{titlee || "Add New Recruiter"}</p>

                        {notification.message && (
                            <div className={`notification ${notification.type}`}>
                                {notification.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <img src={file ? URL.createObjectURL(file) : noImage} alt="Preview" />
                                <label htmlFor="file">
                                    Upload Profile Image: <DriveFolderUploadIcon className="file_icon" />
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            <div className="input_container">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Phone Number *</label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                />
                                <small className="password-hint">
                                    Password must be at least 8 characters with lowercase, uppercase, number, and special character.
                                </small>
                            </div>
                            
                            <div className="input_container">
                                <label>Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    placeholder="Enter recruiter bio"
                                    rows={4}
                                />
                            </div>

                            {inputs && inputs.map((detail) => (
                                <Input
                                    key={detail.id}
                                    {...detail}
                                    value={formData[detail.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <button 
                                type="submit" 
                                className="submit_btn"
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create Recruiter'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewRecruiter;
