import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import React, { useState } from 'react';
import Input from '../../Components/Input/Input';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './New.scss';
import noImage from '../../../../assets/superuser-dashboard/photo-camera.png';
import axios from 'axios';

function AddNewCompany({ inputs = [], titlee }) {
    const [userInp, setUserInp] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
    });

    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setUserInp({ ...userInp, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            const formData = new FormData();
            
            // Add all form fields to formData
            for (const key in userInp) {
                formData.append(key, userInp[key]);
            }
            
            // Add the logo file if it exists
            if (file) {
                formData.append('logo', file);
            }
            
            const response = await axios.post('/api/company/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if (response.data.success) {
                setSuccess('Company added successfully!');
                setUserInp({
                    name: '',
                    description: '',
                    website: '',
                    location: '',
                });
                setFile('');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding company');
            console.error(err);
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
                        <p className="add_new_user">{titlee || "Add New Company"}</p>

                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}

                        <form onSubmit={handleSubmit} className="form">
                            <div className="form_inp">
                                <img src={file ? URL.createObjectURL(file) : noImage} alt="Preview" />
                                <label htmlFor="file">
                                    Upload Company Logo: <DriveFolderUploadIcon className="file_icon" />
                                </label>

                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>

                            {/* Form inputs for company */}
                            <div className="input_container">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInp.name}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    required
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={userInp.description}
                                    onChange={handleChange}
                                    placeholder="Company Description"
                                    rows="4"
                                ></textarea>
                            </div>
                            
                            <div className="input_container">
                                <label>Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    value={userInp.website}
                                    onChange={handleChange}
                                    placeholder="Company Website"
                                />
                            </div>
                            
                            <div className="input_container">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={userInp.location}
                                    onChange={handleChange}
                                    placeholder="Company Location"
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
                                {loading ? 'Creating...' : 'Create Company'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewCompany;
