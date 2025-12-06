import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';
import noImage from '../../../../assets/superuser-dashboard/photo-camera.png';
import axios from 'axios';

function AddNewApplicant({ inputs = [], titlee }) {
    const [userInp, setUserInp] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: 'student', // Default role for applicants
    });

    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });
        
        try {
            const formData = new FormData();
            formData.append('fullname', userInp.fullname);
            formData.append('email', userInp.email);
            formData.append('phoneNumber', userInp.phoneNumber);
            formData.append('password', userInp.password);
            formData.append('role', userInp.role);
            
            if (file) {
                formData.append('file', file);
            }
            
            const response = await axios.post('/api/v1/user/admin/addApplicant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setMessage({ text: 'Applicant created successfully!', type: 'success' });
            // Reset form
            setUserInp({
                fullname: '',
                email: '',
                phoneNumber: '',
                password: '',
                role: 'student',
            });
            setFile('');
        } catch (error) {
            console.error('Error creating applicant:', error);
            setMessage({ 
                text: error.response?.data?.message || 'Failed to create applicant', 
                type: 'error' 
            });
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
                        <p className="add_new_user">{titlee || "Add New Applicant"}</p>

                        {message.text && (
                            <div className={`message ${message.type}`}>
                                {message.text}
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

                            {/* Form inputs for applicant matching the user model */}
                            <div className="input_container">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={userInp.fullname}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInp.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Phone Number</label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={userInp.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userInp.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            {inputs && inputs.map((detail) => (
                                <Input
                                    key={detail.id}
                                    {...detail}
                                    value={userInp[detail.name]}
                                    onChange={handleChange}
                                />
                            ))}

                            <button type="submit" className="submit_btn" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Applicant'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewApplicant;
