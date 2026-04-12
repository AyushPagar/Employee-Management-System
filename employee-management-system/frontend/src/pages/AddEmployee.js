import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const AddEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        employeeId: '',
        department: '',
        position: '',
        phone: '',
        address: '',
        salary: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/employees', formData);
            navigate('/employees');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add employee');
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Employee</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" />
                </div>
                <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Position</label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
                </div>
                <button type="submit" className="btn">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;
