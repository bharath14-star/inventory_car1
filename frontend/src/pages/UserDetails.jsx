import React, { useEffect, useState } from 'react'
import API from '../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function UserDetails(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error('Failed to load user:', err);
      alert('Failed to load user details');
      navigate('/user-records');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/users/${id}`, formData);
      setUser(res.data.user);
      setEditing(false);
      alert('User updated successfully');
    } catch (err) {
      console.error('Failed to update user:', err);
      alert('Failed to update user');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    loadUser();
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
      setEditing(true);
    }
  }, [id]);

  if (loading) return <div>Loading user details...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{editing ? 'Edit User' : 'User Details'}</h2>
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={() => navigate('/user-records')}>
          <i className="bi bi-arrow-left me-2"></i>Back to User Records
        </button>
        {!editing && (
          <button className="btn btn-warning" onClick={() => setEditing(true)}>
            <i className="bi bi-pencil me-2"></i>Edit User
          </button>
        )}
      </div>

      <div className="card">
        <div className="card-body">
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  name="employeeId"
                  value={formData.employeeId || ''}
                  onChange={handleInputChange}
                  required
                  maxLength="16"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  name="role"
                  value={formData.role || 'user'}
                  onChange={handleInputChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-check me-2"></i>Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>
                  <i className="bi bi-x me-2"></i>Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <p><strong>First Name:</strong> {user.firstName}</p>
                  <p><strong>Last Name:</strong> {user.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Employee ID:</strong> {user.employeeId}</p>
                  <p><strong>Role:</strong>
                    <span className={`badge ms-2 ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                      {user.role}
                    </span>
                  </p>
                  <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
