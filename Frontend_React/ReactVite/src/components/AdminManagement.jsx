import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../config';

const AdminManagement = () => {
    const path = config.API_URL;

    const [admins, setAdmins] = useState([]);
    const [formData, setFormData] = useState({
        aname: '',
        apwd: '',
        aemail:'',
        role:'ADMIN'
    });

    const [editing, setEditing] = useState(false);
    const fetchAdmins = async () => {
        try {
            const response = await axios.get(`${path}/admin`);
            setAdmins(response.data);
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateAdmin(formData);
        } else {
            await createAdmin(formData);
        }
    };

    const createAdmin = async (admin) => {
        try {
            const response = await axios.post(`${path}/admin`, JSON.stringify(admin), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 201) {
                fetchAdmins();
                setFormData({ aname: '', apwd: '', aemail: '', role: 'ADMIN' });
            }
        } catch (error) {
            console.error("Error creating admin:", error);
        }
    };
    
    const updateAdmin = async (admin) => {
        try {
            const response = await axios.put(`${path}/admin/${admin.aid}`, admin, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                fetchAdmins();
                setFormData({ aname: '', apwd: '', aemail: '' });
                setEditing(false);
            }
        } catch (error) {
            console.error("Error updating admin:", error);
        }
    };

    const handleEdit = (admin) => {
        setFormData(admin);
        setEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${path}/admin/${id}`);
            if (response.status === 204) {
                fetchAdmins();
            }
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">{editing ? 'Edit Admin' : 'Add New Admin'}</h2>
            
            <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-md-6">
                    <label htmlFor="aname" className="form-label">Admin Name:</label>
                    <input
                        type="text"
                        id="aname"
                        name="aname"
                        className="form-control"
                        value={formData.aname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="aemail" className="form-label">Admin Email:</label>
                    <input
                        type="email"
                        id="aemail"
                        name="aemail"
                        className="form-control"
                        value={formData.aemail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="apwd" className="form-label">Password:</label>
                    <input
                        type="password"
                        id="apwd"
                        name="apwd"
                        className="form-control"
                        value={formData.apwd}
                        onChange={handleChange}
                        required
                    />
                </div>

                {editing ? (
                    <div className="col-12">
                        <button type="submit" className="btn btn-warning w-100">Update Admin</button>
                    </div>
                ) : (
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">Add Admin</button>
                    </div>
                )}
            </form>

            <hr />

            <h3 className="mt-5">Admin List</h3>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>SrNo</th>
                        <th>Admin Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin ,index)=> (
                        <tr key={admin.aid}>
                            {/* <td>{admin.aid}</td> */}
                            <td>{index + 1}</td>
                            <td>{admin.aname}</td>
                            <td>{admin.aemail}</td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() => handleEdit(admin)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => handleDelete(admin.aid)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminManagement;
