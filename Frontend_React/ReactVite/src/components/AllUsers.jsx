import React, { useState, useEffect } from "react";
import AdminService from "../services/AdminService"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const AllUsers = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    AdminService.getAllUsers()
      .then(response => {
        console.log(response.data);
        setUsers(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []); 

  const handleDelete = (userId) => {
    AdminService.deleteUser(userId) 
      .then(response => {
        setUsers(users.filter(user => user.uid !== userId));
      })
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">All Users</h3>
      <table className="table table-bordered text-center table-hover">
        <thead className="table-primary">
          <tr>
            <th>Sr.No</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.uid}>
                <td>{index + 1}</td>
                <td>{user.uid}</td>
                <td>{user.ufirstName} {user.ulastName}</td>
                <td>{user.uemail}</td>
                <td>{user.mobNo}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.uid)} 
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
